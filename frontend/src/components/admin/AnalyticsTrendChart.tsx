"use client";

import { useEffect, useId, useMemo, useState } from "react";
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import type { TooltipContentProps } from "recharts";
import { cn } from "@/lib/utils";
import type { DashboardAnalyticsPoint } from "@/types/api";

type Grain = "day" | "month";

interface AnalyticsTrendChartProps {
  series: DashboardAnalyticsPoint[];
  grain: Grain;
}

const VIEWS = "rgb(78 131 10)";
const USERS = "rgb(192 163 78)";

function formatCount(value: number) {
  return value.toLocaleString("id-ID");
}

function formatLabel(iso: string, grain: Grain) {
  if (grain === "month") {
    const [year, month] = iso.split("-").map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString("id-ID", { month: "short" });
  }

  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "short",
  });
}

function formatFull(iso: string, grain: Grain) {
  if (grain === "month") {
    const [year, month] = iso.split("-").map(Number);
    return new Date(year, month - 1, 1).toLocaleDateString("id-ID", {
      month: "long",
      year: "numeric",
    });
  }

  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year, month - 1, day).toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
  });
}

type ChartRow = DashboardAnalyticsPoint & { label: string; full: string };

function AnalyticsTooltip({ active, payload }: TooltipContentProps) {
  if (!active || !payload?.length) return null;

  const row = payload[0]?.payload as ChartRow | undefined;
  if (!row) return null;

  return (
    <div className="min-w-[11.5rem] rounded-rmi border border-foreground/10 bg-background/95 px-3 py-2.5 shadow-soft backdrop-blur-sm">
      <p className="text-[11px] font-medium text-foreground/50">{row.full}</p>
      <dl className="mt-2 space-y-1.5">
        <div className="flex items-center justify-between gap-6">
          <dt className="flex items-center gap-1.5 text-[11px] text-foreground/60">
            <span className="h-1.5 w-1.5 rounded-full bg-primary" aria-hidden="true" />
            Tayangan
          </dt>
          <dd className="text-[11px] font-semibold tabular-nums text-heading">
            {formatCount(row.pageViews)}
          </dd>
        </div>
        <div className="flex items-center justify-between gap-6">
          <dt className="flex items-center gap-1.5 text-[11px] text-foreground/60">
            <span className="h-1.5 w-1.5 rounded-full bg-secondary-alt" aria-hidden="true" />
            Pengunjung
          </dt>
          <dd className="text-[11px] font-semibold tabular-nums text-heading">
            {formatCount(row.activeUsers)}
          </dd>
        </div>
      </dl>
    </div>
  );
}

export function AnalyticsTrendChart({ series, grain }: AnalyticsTrendChartProps) {
  const gradientId = useId().replace(/:/g, "");
  const [active, setActive] = useState(Math.max(series.length - 1, 0));

  useEffect(() => {
    setActive(Math.max(series.length - 1, 0));
  }, [series]);

  const data = useMemo<ChartRow[]>(
    () =>
      series.map((point) => ({
        ...point,
        label: formatLabel(point.date, grain),
        full: formatFull(point.date, grain),
      })),
    [grain, series],
  );

  const selected = data[active] ?? data[data.length - 1];

  if (!selected) {
    return null;
  }

  return (
    <div className="space-y-1">
      <div className="flex flex-wrap items-end justify-between gap-3 px-4 pt-4">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-wide text-foreground/50">
            {selected.full}
          </p>
          <p className="mt-1 font-display text-lg font-semibold tracking-tight text-heading">
            <span className="tabular-nums">{formatCount(selected.pageViews)}</span>
            <span className="ml-1 text-sm font-medium text-foreground/45">tayangan</span>
            <span className="mx-2 text-foreground/20">·</span>
            <span className="tabular-nums">{formatCount(selected.activeUsers)}</span>
            <span className="ml-1 text-sm font-medium text-foreground/45">pengunjung</span>
          </p>
        </div>
        <ul className="flex flex-wrap gap-4 text-[11px] text-foreground/55">
          <li className="flex items-center gap-1.5">
            <span className="h-0.5 w-5 rounded-full bg-primary" aria-hidden="true" />
            Tayangan
          </li>
          <li className="flex items-center gap-1.5">
            <span
              className="h-px w-5 border-t-2 border-dashed border-secondary-alt"
              aria-hidden="true"
            />
            Pengunjung
          </li>
        </ul>
      </div>

      <div className="h-64 px-2 pb-1 sm:h-72">
        <ResponsiveContainer width="100%" height="100%">
          <ComposedChart
            key={grain}
            data={data}
            margin={{ top: 16, right: 12, left: 0, bottom: 4 }}
            onMouseMove={(state) => {
              const index = Number(state.activeTooltipIndex);
              if (Number.isFinite(index)) setActive(index);
            }}
            onMouseLeave={() => setActive(data.length - 1)}
          >
            <defs>
              <linearGradient id={`${gradientId}-views`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={VIEWS} stopOpacity={0.28} />
                <stop offset="72%" stopColor={VIEWS} stopOpacity={0.06} />
                <stop offset="100%" stopColor={VIEWS} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} stroke="rgba(20, 32, 10, 0.07)" />
            <XAxis
              dataKey="label"
              tick={{ fill: "rgba(31, 41, 55, 0.45)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              interval={grain === "day" ? 3 : 0}
              minTickGap={16}
            />
            <YAxis
              allowDecimals={false}
              width={36}
              tick={{ fill: "rgba(31, 41, 55, 0.45)", fontSize: 11 }}
              tickLine={false}
              axisLine={false}
              tickFormatter={formatCount}
              domain={[0, (max: number) => Math.max(max, 1)]}
            />
            <Tooltip
              cursor={{ stroke: VIEWS, strokeOpacity: 0.2, strokeWidth: 1 }}
              content={AnalyticsTooltip}
              animationDuration={200}
            />
            <Area
              type="monotone"
              dataKey="pageViews"
              name="Tayangan"
              stroke={VIEWS}
              strokeWidth={2.5}
              fill={`url(#${gradientId}-views)`}
              dot={false}
              activeDot={{ r: 5, stroke: "#fff", strokeWidth: 2, fill: VIEWS }}
              animationDuration={800}
              animationEasing="ease-out"
            />
            <Line
              type="monotone"
              dataKey="activeUsers"
              name="Pengunjung"
              stroke={USERS}
              strokeWidth={2}
              strokeDasharray="6 4"
              dot={false}
              activeDot={{ r: 4.5, stroke: "#fff", strokeWidth: 2, fill: USERS }}
              animationDuration={800}
              animationEasing="ease-out"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      <details className="border-t border-foreground/5 px-4 py-3">
        <summary className="cursor-pointer text-[11px] font-medium text-foreground/55 hover:text-heading">
          Tampilkan tabel tren
        </summary>
        <div className="mt-3 overflow-x-auto">
          <table className="min-w-full text-left text-xs">
            <thead className="text-foreground/50">
              <tr>
                <th className="py-1.5 pr-3 font-medium">Periode</th>
                <th className="py-1.5 pr-3 text-right font-medium">Tayangan</th>
                <th className="py-1.5 text-right font-medium">Pengunjung</th>
              </tr>
            </thead>
            <tbody>
              {data.map((point, index) => (
                <tr
                  key={point.date}
                  className={cn(index === active && "bg-primary/[0.06] font-medium text-heading")}
                >
                  <td className="py-1 pr-3">{point.full}</td>
                  <td className="py-1 pr-3 text-right tabular-nums">{formatCount(point.pageViews)}</td>
                  <td className="py-1 text-right tabular-nums">{formatCount(point.activeUsers)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </details>
    </div>
  );
}
