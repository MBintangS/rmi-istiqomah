import Link from "next/link";
import { type ReactNode } from "react";
import { DOA_SESUDAH_WUDU, FARDU_WUDU, LANGKAH_WUDU_BELAJAR, NIAT_WUDU, PEMBATAL_WUDU } from "@/data/belajar/wudu";
import { cn } from "@/lib/utils";

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function Bacaan({ arab, latin, arti }: { arab: string; latin: string; arti: string }) {
  return (
    <>
      <p lang="ar" dir="rtl" className="font-arabic text-2xl leading-[2.4] text-heading sm:text-3xl sm:leading-[2.4]">
        {arab}
      </p>
      <p className="mt-3 text-sm italic text-foreground/75">{latin}</p>
      <p className="mt-2 text-sm text-foreground/75">Artinya: {arti}</p>
    </>
  );
}

function Panel({ title, children, className }: { title: string; children: ReactNode; className?: string }) {
  return (
    <section className={cn("rounded-[1.75rem] border border-foreground/10 bg-surface p-5 sm:p-6", className)}>
      <h2 className="font-display text-lg font-bold text-heading">{title}</h2>
      <div className="mt-3">{children}</div>
    </section>
  );
}

export function TataCaraWuduBelajar() {
  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_22rem] lg:items-start">
        <section aria-labelledby="langkah-wudu">
          <h2 id="langkah-wudu" className="font-display text-2xl font-bold tracking-tight text-heading">
            Urutan wudu
          </h2>
          <p className="mt-1 text-sm text-foreground/70">
            Kerjakan dari atas ke bawah. Anggota tubuh yang kanan didahulukan.
          </p>

          <ol className="mt-6">
            {LANGKAH_WUDU_BELAJAR.map((langkah, i) => {
              const last = i === LANGKAH_WUDU_BELAJAR.length - 1;
              return (
                <li key={langkah.id} className="relative flex gap-4 pb-6 last:pb-0">
                  {!last ? (
                    <span className="absolute left-5 top-11 h-[calc(100%-2.75rem)] w-px bg-primary/25" aria-hidden="true" />
                  ) : null}
                  <span
                    className={cn(
                      "relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold",
                      langkah.fardu ? "bg-primary text-white" : "border-2 border-primary/40 bg-background text-primary",
                    )}
                    aria-hidden="true"
                  >
                    {i + 1}
                  </span>
                  <div className="min-w-0 flex-1 rounded-2xl border border-foreground/10 bg-surface p-4 sm:p-5">
                    <h3 className="font-display text-base font-bold text-heading sm:text-lg">{langkah.label}</h3>
                    <p className="mt-1.5 text-sm text-foreground/75">{langkah.detail}</p>
                    <div className="mt-3 flex flex-wrap gap-2 text-xs font-medium">
                      <span
                        className={cn(
                          "rounded-full px-2.5 py-1",
                          langkah.fardu ? "bg-primary/10 text-primary" : "bg-foreground/[0.06] text-foreground/70",
                        )}
                      >
                        {langkah.hukum}
                      </span>
                      {langkah.kali ? (
                        <span className="rounded-full bg-secondary/20 px-2.5 py-1 text-heading">{langkah.kali}</span>
                      ) : null}
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
          <p className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-foreground/60">
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full bg-primary" aria-hidden="true" />
              Ada bagian fardu, wajib dikerjakan
            </span>
            <span className="inline-flex items-center gap-2">
              <span className="h-3 w-3 rounded-full border-2 border-primary/40" aria-hidden="true" />
              Sunnah, dianjurkan
            </span>
          </p>
        </section>

        <div className="space-y-5 lg:sticky lg:top-24">
          <Panel title="Lafaz niat">
            <Bacaan {...NIAT_WUDU} />
            <p className="mt-3 border-l-2 border-secondary pl-3 text-xs text-foreground/65">
              Yang wajib adalah niat di dalam hati. Lafaz ini boleh diucapkan untuk membantu menghadirkan niat.
            </p>
          </Panel>
          <Panel title="Fardu wudu">
            <ol className="list-decimal space-y-1.5 pl-5 text-sm text-foreground/80 marker:font-semibold marker:text-primary">
              {FARDU_WUDU.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
            <p className="mt-3 text-xs text-foreground/60">Dasar: QS. Al-Ma&apos;idah ayat 6.</p>
          </Panel>
        </div>
      </div>

      <div className="grid gap-5 md:grid-cols-2">
        <Panel title="Yang membatalkan wudu">
          <ul className="space-y-2 text-sm text-foreground/80">
            {PEMBATAL_WUDU.map((item) => (
              <li key={item} className="flex gap-2.5">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" aria-hidden="true" />
                {item}
              </li>
            ))}
          </ul>
          <p className="mt-3 text-xs text-foreground/60">Mengikuti mazhab Syafi&apos;i yang umum dipakai di Indonesia.</p>
        </Panel>
        <Panel title="Doa sesudah wudu">
          <Bacaan {...DOA_SESUDAH_WUDU} />
          <p className="mt-3 text-xs text-foreground/60">{DOA_SESUDAH_WUDU.sumber}</p>
        </Panel>
      </div>

      <div className="flex flex-col gap-4 rounded-[1.75rem] bg-primary/[0.06] p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
        <p className="max-w-[60ch] text-sm text-foreground/75">Sudah hafal urutannya? Coba susun langkah wudu dengan benar.</p>
        <Link
          href="/permainan/urutan-wudu"
          className={cn(
            "inline-flex min-h-11 shrink-0 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90",
            focusRing,
          )}
        >
          Latihan di Urutan Wudu →
        </Link>
      </div>
    </div>
  );
}
