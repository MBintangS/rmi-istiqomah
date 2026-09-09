export const GA_MEASUREMENT_ID = process.env.NEXT_PUBLIC_GA_ID?.trim() ?? "";

export const isGaEnabled = GA_MEASUREMENT_ID.startsWith("G-");

export function shouldTrackPath(pathname: string) {
  return pathname !== "/admin" && !pathname.startsWith("/admin/");
}

declare global {
  interface Window {
    dataLayer: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

let didInit = false;

function ensureGtag() {
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== "function") {
    window.gtag = function gtag() {
      // Official GA snippet queues the `arguments` object.
      // eslint-disable-next-line prefer-rest-params
      window.dataLayer.push(arguments);
    };
  }
}

export function initGoogleAnalytics() {
  if (!isGaEnabled || typeof window === "undefined" || didInit) return;

  ensureGtag();
  window.gtag?.("js", new Date());
  window.gtag?.("config", GA_MEASUREMENT_ID, {
    anonymize_ip: true,
    send_page_view: false,
  });
  didInit = true;
}

export function sendPageview(url: string) {
  if (!isGaEnabled || typeof window === "undefined") return;

  initGoogleAnalytics();
  window.gtag?.("event", "page_view", {
    page_path: url,
    page_location: `${window.location.origin}${url}`,
    page_title: document.title,
  });
}
