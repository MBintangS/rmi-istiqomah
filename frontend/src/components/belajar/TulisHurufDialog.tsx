"use client";

import { useRef, useState, type PointerEvent as ReactPointerEvent } from "react";
import { Modal } from "@/components/ui/Modal";
import { GORESAN_VIEWBOX, goresanHuruf } from "@/data/belajar/hijaiyah-goresan";
import { nilaiTulisan, type HasilTulisan, type TitikGambar } from "@/components/belajar/nilaiTulisan";
import { cn } from "@/lib/utils";
import type { HurufBelajar } from "@/types/belajar";

const LEBAR_PENA = 30;

const focusRing =
  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background";

const AWALAN = "Ikuti pola, termasuk titiknya.";

type NilaiPapan = "awal" | "sesuai" | "belum";

function svgPoint(svg: SVGSVGElement, clientX: number, clientY: number): TitikGambar | null {
  const matrix = svg.getScreenCTM();
  if (!matrix) return null;
  const point = svg.createSVGPoint();
  point.x = clientX;
  point.y = clientY;
  const local = point.matrixTransform(matrix.inverse());
  return { x: local.x, y: local.y };
}

function pesanHasil(hasil: HasilTulisan, name: string): string {
  if (hasil.kosong) return "Gambar dulu hurufnya, termasuk titiknya.";
  if (hasil.cocok) return `Huruf ${name} sesuai.`;
  if (hasil.titikBelum) return "Bentuknya sudah dekat. Titiknya belum kena.";
  if (hasil.bentukCukup && hasil.terlaluLuar) return "Masih banyak garis di luar bentuk huruf.";
  return "Belum sesuai. Ikuti bentuk hurufnya, termasuk titiknya.";
}

function PapanTulis({ glyph, name }: { glyph: string; name: string }) {
  const data = goresanHuruf(glyph);
  const svgRef = useRef<SVGSVGElement>(null);
  const menggambar = useRef(false);
  const [garis, setGaris] = useState<TitikGambar[][]>([]);
  const [note, setNote] = useState(AWALAN);
  const [nilai, setNilai] = useState<NilaiPapan>("awal");

  const ulang = () => {
    menggambar.current = false;
    setGaris([]);
    setNilai("awal");
    setNote(AWALAN);
  };

  const periksa = () => {
    if (!data) return;
    const hasil = nilaiTulisan(data.path, garis);
    setNilai(hasil.cocok ? "sesuai" : "belum");
    setNote(pesanHasil(hasil, name));
  };

  const onPointerDown = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (event.button !== 0) return;
    const svg = svgRef.current;
    if (!svg) return;
    const point = svgPoint(svg, event.clientX, event.clientY);
    if (!point) return;
    event.preventDefault();
    svg.setPointerCapture(event.pointerId);
    menggambar.current = true;
    setNilai("awal");
    setNote(AWALAN);
    setGaris((semua) => [...semua, [point]]);
  };

  const onPointerMove = (event: ReactPointerEvent<SVGSVGElement>) => {
    if (!menggambar.current) return;
    const svg = svgRef.current;
    if (!svg) return;
    const point = svgPoint(svg, event.clientX, event.clientY);
    if (!point) return;
    setGaris((semua) => {
      if (semua.length === 0) return semua;
      const terakhir = semua[semua.length - 1];
      const ujung = terakhir[terakhir.length - 1];
      if (ujung && Math.hypot(ujung.x - point.x, ujung.y - point.y) < 2) return semua;
      const next = semua.slice();
      next[next.length - 1] = [...terakhir, point];
      return next;
    });
  };

  const onPointerUp = () => {
    menggambar.current = false;
  };

  if (!data) {
    return <p className="text-sm text-foreground/70">Pola huruf ini belum tersedia.</p>;
  }

  const judul = nilai === "sesuai" ? "Sesuai" : nilai === "belum" ? "Belum sesuai" : null;

  return (
    <div className="flex flex-col gap-4">
      <div
        className={cn(
          "rounded-2xl px-4 py-3 transition-colors",
          nilai === "awal" && "bg-surface text-foreground/75",
          nilai === "sesuai" && "bg-primary text-white",
          nilai === "belum" && "bg-error text-white dark:text-ink",
        )}
        aria-live="polite"
      >
        {judul ? <p className="font-display text-2xl font-semibold tracking-tight">{judul}</p> : null}
        <p className={cn("text-sm", judul && "mt-1", nilai === "sesuai" && "text-white/90")}>{note}</p>
      </div>
      <div
        className={cn(
          "belajar-ruled overflow-hidden rounded-2xl border-2 bg-background transition-colors [--rule-gap:2.25rem]",
          nilai === "awal" && "border-foreground/10",
          nilai === "sesuai" && "border-primary",
          nilai === "belum" && "border-error",
        )}
      >
        <svg
          ref={svgRef}
          viewBox={GORESAN_VIEWBOX}
          className="mx-auto block h-[min(42dvh,18rem)] w-auto max-w-full touch-none select-none"
          role="img"
          aria-label={`Papan menulis huruf ${name}`}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onContextMenu={(event) => event.preventDefault()}
        >
          <path
            d={data.path}
            fillRule="nonzero"
            className="fill-primary/10 stroke-foreground/45"
            strokeWidth={5}
            strokeDasharray="0 12"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {garis.map((goresan, index) =>
            goresan.length === 1 ? (
              <circle key={index} cx={goresan[0].x} cy={goresan[0].y} r={LEBAR_PENA / 2} className="fill-primary" />
            ) : (
              <polyline
                key={index}
                points={goresan.map((titik) => `${titik.x},${titik.y}`).join(" ")}
                fill="none"
                strokeWidth={LEBAR_PENA}
                strokeLinecap="round"
                strokeLinejoin="round"
                className="stroke-primary"
              />
            ),
          )}
        </svg>
      </div>
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={ulang}
          className={cn(
            "inline-flex min-h-11 items-center justify-center rounded-full border border-foreground/10 bg-surface px-5 text-sm font-semibold text-heading transition-colors hover:border-primary hover:bg-primary/10",
            focusRing,
          )}
        >
          Ulangi
        </button>
        <button
          type="button"
          onClick={periksa}
          className={cn(
            "inline-flex min-h-11 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-white transition-colors hover:bg-primary/90",
            focusRing,
          )}
        >
          Periksa
        </button>
      </div>
    </div>
  );
}

export function TulisHurufDialog({
  open,
  huruf,
  onClose,
}: {
  open: boolean;
  huruf: HurufBelajar;
  onClose: () => void;
}) {
  return (
    <Modal open={open} onClose={onClose} title={`Menulis ${huruf.name}`} className="sm:!max-w-xl">
      <PapanTulis key={huruf.glyph} glyph={huruf.glyph} name={huruf.name} />
    </Modal>
  );
}
