import "server-only";
import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { AppError } from "@/server/errors";
import type {
  DashboardAnalytics,
  DashboardAnalyticsPoint,
  DashboardAnalyticsTotals,
} from "@/types/api";

const RANGE_DAYS = 28;
const MONTH_COUNT = 12;
const CACHE_MS = 15 * 60 * 1000;
const TOP_PAGES_LIMIT = 8;
const JAKARTA = "Asia/Jakarta";

const emptyTotals: DashboardAnalyticsTotals = { activeUsers: 0, pageViews: 0 };

const emptyAnalytics = (): DashboardAnalytics => ({
  configured: false,
  rangeDays: RANGE_DAYS,
  activeUsers: 0,
  pageViews: 0,
  periods: {
    today: emptyTotals,
    yesterday: emptyTotals,
    last30Days: emptyTotals,
    last365Days: emptyTotals,
  },
  seriesDaily: [],
  seriesMonthly: [],
  topPages: [],
});

const localhostFilter = {
  notExpression: {
    orGroup: {
      expressions: [
        {
          filter: {
            fieldName: "hostName",
            stringFilter: { matchType: "CONTAINS" as const, value: "localhost" },
          },
        },
        {
          filter: {
            fieldName: "hostName",
            stringFilter: { matchType: "CONTAINS" as const, value: "127.0.0.1" },
          },
        },
      ],
    },
  },
};

type Ga4Config = {
  propertyId: string;
  clientEmail: string;
  privateKey: string;
};

type CacheEntry = {
  expiresAt: number;
  data: DashboardAnalytics;
};

type ReportRow = {
  dimensionValues?: Array<{ value?: string | null }>;
  metricValues?: Array<{ value?: string | null }>;
};

let cachedClient: BetaAnalyticsDataClient | null = null;
let cachedClientKey = "";
let reportCache: CacheEntry | null = null;

function unwrapEnv(value: string): string {
  const trimmed = value.trim();
  if (
    (trimmed.startsWith('"') && trimmed.endsWith('"')) ||
    (trimmed.startsWith("'") && trimmed.endsWith("'"))
  ) {
    return trimmed.slice(1, -1);
  }
  return trimmed;
}

function getGa4Config(): Ga4Config | null {
  const propertyId = unwrapEnv(process.env.GA4_PROPERTY_ID ?? "").replace(/^properties\//, "");
  const clientEmail = unwrapEnv(process.env.GA4_CLIENT_EMAIL ?? "");
  const privateKey = unwrapEnv(process.env.GA4_PRIVATE_KEY ?? "").replace(/\\n/g, "\n");

  if (!propertyId || !clientEmail || !privateKey.includes("BEGIN PRIVATE KEY")) {
    return null;
  }

  return { propertyId, clientEmail, privateKey };
}

function getClient(config: Ga4Config): BetaAnalyticsDataClient {
  const key = `${config.clientEmail}:${config.propertyId}`;
  if (cachedClient && cachedClientKey === key) {
    return cachedClient;
  }

  cachedClient = new BetaAnalyticsDataClient({
    credentials: {
      client_email: config.clientEmail,
      private_key: config.privateKey,
    },
  });
  cachedClientKey = key;
  return cachedClient;
}

function metricInt(row: ReportRow | undefined, index: number): number {
  const raw = row?.metricValues?.[index]?.value;
  const parsed = Number(raw);
  return Number.isFinite(parsed) ? parsed : 0;
}

function totalsFromRow(row: ReportRow | undefined): DashboardAnalyticsTotals {
  return {
    activeUsers: metricInt(row, 0),
    pageViews: metricInt(row, 1),
  };
}

function todayJakarta(): string {
  return new Intl.DateTimeFormat("en-CA", { timeZone: JAKARTA }).format(new Date());
}

function addUtcDays(ymd: string, delta: number): string {
  const [year, month, day] = ymd.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1, day + delta));
  return date.toISOString().slice(0, 10);
}

function addUtcMonths(ym: string, delta: number): string {
  const [year, month] = ym.split("-").map(Number);
  const date = new Date(Date.UTC(year, month - 1 + delta, 1));
  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function enumerateDays(endYmd: string, count: number): string[] {
  return Array.from({ length: count }, (_, index) => addUtcDays(endYmd, index - (count - 1)));
}

function enumerateMonths(endYm: string, count: number): string[] {
  return Array.from({ length: count }, (_, index) => addUtcMonths(endYm, index - (count - 1)));
}

function gaDateToIso(value: string): string {
  return `${value.slice(0, 4)}-${value.slice(4, 6)}-${value.slice(6, 8)}`;
}

function gaMonthToIso(value: string): string {
  return `${value.slice(0, 4)}-${value.slice(4, 6)}`;
}

function fillSeries(
  keys: string[],
  rows: ReportRow[] | undefined,
  parseKey: (raw: string) => string,
): DashboardAnalyticsPoint[] {
  const byKey = new Map<string, DashboardAnalyticsTotals>();
  for (const row of rows ?? []) {
    const raw = row.dimensionValues?.[0]?.value;
    if (!raw) continue;
    byKey.set(parseKey(raw), totalsFromRow(row));
  }

  return keys.map((date) => ({
    date,
    ...(byKey.get(date) ?? emptyTotals),
  }));
}

function mapGaError(err: unknown): AppError {
  const message = err instanceof Error ? err.message : String(err);

  if (/PERMISSION_DENIED|403/.test(message)) {
    return new AppError(
      502,
      "GA4_PERMISSION",
      "Service account belum punya akses Viewer di properti GA4.",
    );
  }

  if (/UNAUTHENTICATED|invalid_grant|invalid_client|401/.test(message)) {
    return new AppError(
      502,
      "GA4_AUTH",
      "Kredensial GA4 tidak valid. Periksa GA4_CLIENT_EMAIL dan GA4_PRIVATE_KEY.",
    );
  }

  console.error("[ga4]", err);
  return new AppError(502, "GA4_ERROR", "Gagal mengambil data Google Analytics.");
}

export function isGa4ReportingConfigured(): boolean {
  return getGa4Config() !== null;
}

export async function getDashboardAnalytics(): Promise<DashboardAnalytics> {
  const config = getGa4Config();
  if (!config) {
    return emptyAnalytics();
  }

  if (reportCache && reportCache.expiresAt > Date.now()) {
    return reportCache.data;
  }

  try {
    const client = getClient(config);
    const property = `properties/${config.propertyId}`;
    const today = todayJakarta();
    const currentMonth = today.slice(0, 7);

    const periodRanges = [
      { startDate: "today", endDate: "today" },
      { startDate: "yesterday", endDate: "yesterday" },
      { startDate: "30daysAgo", endDate: "today" },
      { startDate: "365daysAgo", endDate: "today" },
      { startDate: `${RANGE_DAYS}daysAgo`, endDate: "today" },
    ] as const;

    const reportTotals = (dateRange: { startDate: string; endDate: string }) =>
      client.runReport({
        property,
        dateRanges: [dateRange],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
        dimensionFilter: localhostFilter,
      });

    const [todayRes, yesterdayRes, last30Res, last365Res, last28Res, dailyRes, monthlyRes, pagesRes] =
      await Promise.all([
        ...periodRanges.map(reportTotals),
        client.runReport({
        property,
        dateRanges: [{ startDate: `${RANGE_DAYS}daysAgo`, endDate: "today" }],
        dimensions: [{ name: "date" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
        orderBys: [{ dimension: { dimensionName: "date" } }],
        limit: RANGE_DAYS,
        dimensionFilter: localhostFilter,
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate: "365daysAgo", endDate: "today" }],
        dimensions: [{ name: "yearMonth" }],
        metrics: [{ name: "activeUsers" }, { name: "screenPageViews" }],
        orderBys: [{ dimension: { dimensionName: "yearMonth" } }],
        limit: MONTH_COUNT,
        dimensionFilter: localhostFilter,
      }),
      client.runReport({
        property,
        dateRanges: [{ startDate: `${RANGE_DAYS}daysAgo`, endDate: "today" }],
        dimensions: [{ name: "pagePath" }, { name: "pageTitle" }],
        metrics: [{ name: "screenPageViews" }],
        orderBys: [{ metric: { metricName: "screenPageViews" }, desc: true }],
        limit: TOP_PAGES_LIMIT,
        dimensionFilter: localhostFilter,
      }),
    ]);

    const last28 = totalsFromRow(last28Res[0].rows?.[0]);

    const data: DashboardAnalytics = {
      configured: true,
      rangeDays: RANGE_DAYS,
      activeUsers: last28.activeUsers,
      pageViews: last28.pageViews,
      periods: {
        today: totalsFromRow(todayRes[0].rows?.[0]),
        yesterday: totalsFromRow(yesterdayRes[0].rows?.[0]),
        last30Days: totalsFromRow(last30Res[0].rows?.[0]),
        last365Days: totalsFromRow(last365Res[0].rows?.[0]),
      },
      seriesDaily: fillSeries(enumerateDays(today, RANGE_DAYS), dailyRes[0].rows, gaDateToIso),
      seriesMonthly: fillSeries(enumerateMonths(currentMonth, MONTH_COUNT), monthlyRes[0].rows, gaMonthToIso),
      topPages: (pagesRes[0].rows ?? []).map((row) => {
        const path = row.dimensionValues?.[0]?.value || "/";
        const title = row.dimensionValues?.[1]?.value?.trim() || path;
        return {
          path,
          title: title === "(not set)" ? path : title,
          views: metricInt(row, 0),
        };
      }),
    };

    reportCache = { expiresAt: Date.now() + CACHE_MS, data };
    return data;
  } catch (err) {
    throw mapGaError(err);
  }
}
