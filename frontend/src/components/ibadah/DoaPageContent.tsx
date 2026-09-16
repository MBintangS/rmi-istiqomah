"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import toast from "react-hot-toast";
import { useEffect, useMemo, useState } from "react";
import { PageHero } from "@/components/layout/PageHero";
import { Button, EmptyState, Input, Label, Select, Skeleton } from "@/components/ui";
import { useDoaCatalog } from "@/hooks/useDoa";
import { getApiErrorMessage } from "@/lib/api";
import { filterDoaItems, suggestDoaId } from "@/lib/doa";
import { cn } from "@/lib/utils";
import type { DoaItem } from "@/types/api";

function readIdFromUrl(): number | null {
  if (typeof window === "undefined") return null;
  const raw = new URLSearchParams(window.location.search).get("id");
  const id = Number(raw);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function writeIdToUrl(id: number) {
  const url = new URL(window.location.href);
  url.searchParams.set("id", String(id));
  window.history.replaceState(null, "", url);
}

function DoaReader({ item, arabicClassName }: { item: DoaItem; arabicClassName: string }) {
  const reduceMotion = useReducedMotion();

  async function copyDoa() {
    const text = [item.arabic, item.latin, item.translation].filter(Boolean).join("\n\n");
    await navigator.clipboard.writeText(text);
    toast.success("Doa disalin");
  }

  return (
    <article className="relative overflow-hidden rounded-[1.75rem] border border-foreground/10 bg-surface px-5 py-6 sm:px-8 sm:py-8">
      <span
        className="absolute bottom-6 left-0 top-6 w-1 rounded-full bg-secondary"
        aria-hidden="true"
      />

      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-primary">{item.group}</p>
      <h2 className="font-display mt-2 text-2xl font-bold tracking-tight text-heading sm:text-3xl">
        {item.name}
      </h2>

      <AnimatePresence mode="wait">
        <motion.div
          key={item.id}
          initial={reduceMotion ? false : { opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={reduceMotion ? undefined : { opacity: 0, y: -8 }}
          transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
        >
          <p
            lang="ar"
            dir="rtl"
            className={cn(
              arabicClassName,
              "mt-8 text-right text-[1.85rem] font-bold leading-[2.05] text-heading sm:text-[2.15rem]",
            )}
          >
            {item.arabic}
          </p>
          <p className="mt-5 text-sm italic leading-relaxed text-foreground/65">{item.latin}</p>
          <p className="mt-4 text-body text-foreground/80">{item.translation}</p>
        </motion.div>
      </AnimatePresence>

      {item.tags.length > 0 ? (
        <ul className="mt-6 flex flex-wrap gap-2">
          {item.tags.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-foreground/10 px-2.5 py-1 text-[11px] font-medium uppercase tracking-[0.12em] text-foreground/55"
            >
              {tag}
            </li>
          ))}
        </ul>
      ) : null}

      {item.source ? (
        <details className="mt-6 border-t border-foreground/10 pt-4">
          <summary className="cursor-pointer text-caption font-medium text-primary">Sumber</summary>
          <p className="mt-2 whitespace-pre-line text-sm leading-relaxed text-foreground/65">{item.source}</p>
        </details>
      ) : null}

      <div className="mt-6">
        <Button type="button" variant="outline" size="sm" onClick={copyDoa}>
          Salin doa
        </Button>
      </div>
    </article>
  );
}

export function DoaPageContent({ arabicClassName }: { arabicClassName: string }) {
  const { data, isLoading, isError, error, refetch } = useDoaCatalog();
  const [query, setQuery] = useState("");
  const [group, setGroup] = useState("");
  const [tag, setTag] = useState("");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const filtered = useMemo(
    () => filterDoaItems(data?.items ?? [], { group: group || undefined, tag: tag || undefined, query }),
    [data, group, tag, query],
  );

  useEffect(() => {
    const fromUrl = readIdFromUrl();
    if (fromUrl) {
      setSelectedId(fromUrl);
      return;
    }
    if (data?.items.length) {
      const suggested = suggestDoaId(data.items);
      if (suggested) {
        setSelectedId(suggested);
        writeIdToUrl(suggested);
      }
    }
  }, [data]);

  const selected =
    data?.items.find((item) => item.id === selectedId) ?? filtered[0] ?? null;

  function selectDoa(id: number) {
    setSelectedId(id);
    writeIdToUrl(id);
  }

  return (
    <>
      <PageHero
        title="Doa"
        description="Cari doa yang kamu butuhkan."
        breadcrumb={[
          { label: "Beranda", href: "/" },
          { label: "Ibadah", href: "/ibadah" },
          { label: "Doa" },
        ]}
      />

      <section className="bg-background py-10 sm:py-14">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          {isLoading && !data ? (
            <div className="grid gap-6 lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.3fr)]" aria-busy="true">
              <Skeleton className="h-[28rem] rounded-[1.75rem]" />
              <Skeleton className="h-[28rem] rounded-[1.75rem]" />
            </div>
          ) : isError || !data ? (
            <EmptyState
              title="Doa tidak bisa dimuat"
              description={getApiErrorMessage(error, "Periksa koneksi, lalu coba lagi.")}
              actionLabel="Coba lagi"
              onAction={() => refetch()}
            />
          ) : (
            <div className="space-y-6">
              <div className="grid gap-3 sm:grid-cols-[minmax(0,1fr)_16rem]">
                <div>
                  <Label htmlFor="doa-search">Cari doa</Label>
                  <Input
                    id="doa-search"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Misalnya tidur, perjalanan, atau ilmu"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="doa-group">Kumpulan</Label>
                  <Select
                    id="doa-group"
                    value={group}
                    onChange={(event) => setGroup(event.target.value)}
                    className="mt-1"
                  >
                    <option value="">Semua kumpulan</option>
                    {data.groups.map((name) => (
                      <option key={name} value={name}>
                        {name}
                      </option>
                    ))}
                  </Select>
                </div>
              </div>

              <div className="flex gap-2 overflow-x-auto pb-1">
                <button
                  type="button"
                  className={cn(
                    "shrink-0 rounded-full border px-3 py-1.5 text-caption font-medium transition-colors",
                    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    tag === ""
                      ? "border-secondary bg-secondary text-ink"
                      : "border-foreground/15 text-foreground/70 hover:bg-primary/10",
                  )}
                  aria-pressed={tag === ""}
                  onClick={() => setTag("")}
                >
                  Semua
                </button>
                {data.tags.map((name) => (
                  <button
                    key={name}
                    type="button"
                    className={cn(
                      "shrink-0 rounded-full border px-3 py-1.5 text-caption font-medium capitalize transition-colors",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                      tag === name
                        ? "border-secondary bg-secondary text-ink"
                        : "border-foreground/15 text-foreground/70 hover:bg-primary/10",
                    )}
                    aria-pressed={tag === name}
                    onClick={() => setTag(name === tag ? "" : name)}
                  >
                    {name}
                  </button>
                ))}
              </div>

              <p className="text-caption text-foreground/55">{filtered.length} doa</p>

              <div className="grid gap-6 lg:grid-cols-[minmax(16rem,0.9fr)_minmax(0,1.3fr)] lg:items-start">
                <div className="max-h-[34rem] overflow-y-auto rounded-[1.5rem] border border-foreground/10 bg-background">
                  {filtered.length === 0 ? (
                    <div className="p-6">
                      <EmptyState
                        title="Tidak ada doa yang cocok"
                        description="Ubah kata kunci, atau pilih tag lain."
                        actionLabel="Hapus filter"
                        onAction={() => {
                          setQuery("");
                          setGroup("");
                          setTag("");
                        }}
                      />
                    </div>
                  ) : (
                    <ul>
                      {filtered.map((item) => {
                        const active = selected?.id === item.id;
                        return (
                          <li key={item.id} className="border-b border-foreground/8 last:border-b-0">
                            <button
                              type="button"
                              className={cn(
                                "w-full px-4 py-3 text-left transition-colors",
                                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-primary",
                                active ? "bg-secondary/20" : "hover:bg-primary/5",
                              )}
                              aria-current={active ? "true" : undefined}
                              onClick={() => selectDoa(item.id)}
                            >
                              <span className="block font-medium text-heading">{item.name}</span>
                              <span className="mt-0.5 block text-caption text-foreground/55">{item.group}</span>
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>

                {selected ? (
                  <DoaReader item={selected} arabicClassName={arabicClassName} />
                ) : null}
              </div>

              <p className="text-caption text-foreground/45">Sumber: EQuran.id · Hisnul Muslim</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
