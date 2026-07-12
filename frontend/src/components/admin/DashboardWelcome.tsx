"use client";

import { useAuth } from "@/hooks/useAuth";

function greetingForHour(hour: number) {
  if (hour < 11) return "Selamat pagi";
  if (hour < 15) return "Selamat siang";
  if (hour < 18) return "Selamat sore";
  return "Selamat malam";
}

export function DashboardWelcome() {
  const { user } = useAuth();
  const now = new Date();
  const greeting = greetingForHour(now.getHours());
  const dateLabel = now.toLocaleDateString("id-ID", {
    weekday: "long",
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  const roleLabel = user?.role === "superadmin" ? "Super Admin" : "Admin";

  return (
    <section className="relative overflow-hidden rounded-rmi border border-foreground/10 bg-background shadow-[0_1px_2px_rgba(20,32,10,0.04)]">
      <div
        className="pointer-events-none absolute inset-y-0 left-0 w-1 bg-primary"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -right-10 -top-10 h-36 w-36 rounded-full bg-primary/10 blur-2xl"
        aria-hidden="true"
      />
      <div className="relative flex flex-col gap-1 px-5 py-4 sm:flex-row sm:items-end sm:justify-between sm:px-6 sm:py-5">
        <div className="min-w-0">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-primary">
            Panel CMS
          </p>
          <h2 className="mt-1.5 font-display text-xl font-semibold tracking-tight text-heading sm:text-2xl">
            {greeting}
            {user?.name ? `, ${user.name.split(" ")[0]}` : ""}
          </h2>
          <p className="mt-1 text-sm text-foreground/60">
            Ringkasan konten dan pesan masuk Remaja Masjid Istiqomah.
          </p>
        </div>
        <div className="mt-3 shrink-0 text-left sm:mt-0 sm:text-right">
          <p className="text-sm font-medium text-heading">{dateLabel}</p>
          <p className="text-[11px] text-foreground/50">{roleLabel}</p>
        </div>
      </div>
    </section>
  );
}
