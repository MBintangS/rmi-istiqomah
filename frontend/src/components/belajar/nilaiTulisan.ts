export interface TitikGambar {
  x: number;
  y: number;
}

export interface HasilTulisan {
  cocok: boolean;
  kosong: boolean;
  terlaluLuar: boolean;
  titikBelum: boolean;
  bentukCukup: boolean;
}

const KOTAK = 400;
const UKURAN = 180;
const AMBANG = 140;
/** Lebar pena saat menilai, dalam satuan viewBox. Lebih tebal dari garis yang terlihat. */
const KUAS = 52;
/** Kelonggaran di luar siluet huruf sebelum tinta dihitung menyimpang. */
const LONGAR = 36;
const TUTUP_MIN = 0.32;
const LUAR_MAX = 0.45;
/** Subpath yang hampir tidak tampak pada huruf jadi (lubang) tidak dinilai. */
const LUBANG_MAX = 0.2;

function pecah(d: string): string[] {
  return d
    .split(/[Zz]/)
    .map((bagian) => bagian.trim())
    .filter((bagian) => /[Mm]/.test(bagian))
    .map((bagian) => `${bagian}Z`);
}

function siap(ctx: CanvasRenderingContext2D) {
  const skala = UKURAN / KOTAK;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, UKURAN, UKURAN);
  ctx.setTransform(skala, 0, 0, skala, 0, 0);
}

function ambil(ctx: CanvasRenderingContext2D): ImageData {
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  return ctx.getImageData(0, 0, UKURAN, UKURAN);
}

function gambarTinta(ctx: CanvasRenderingContext2D, goresan: readonly TitikGambar[][]) {
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.lineCap = "round";
  ctx.lineJoin = "round";
  ctx.lineWidth = KUAS;
  for (const garis of goresan) {
    if (garis.length === 0) continue;
    if (garis.length === 1) {
      ctx.beginPath();
      ctx.arc(garis[0].x, garis[0].y, KUAS / 2, 0, Math.PI * 2);
      ctx.fill();
      continue;
    }
    ctx.beginPath();
    ctx.moveTo(garis[0].x, garis[0].y);
    for (let i = 1; i < garis.length; i++) ctx.lineTo(garis[i].x, garis[i].y);
    ctx.stroke();
  }
}

const GAGAL: HasilTulisan = {
  cocok: false,
  kosong: true,
  terlaluLuar: false,
  titikBelum: false,
  bentukCukup: false,
};

/**
 * Membandingkan goresan bebas dengan siluet huruf.
 * Tiap bagian yang terlihat (badan dan titik) harus tertutup;
 * lubang di dalam huruf tidak wajib diisi.
 */
export function nilaiTulisan(pathD: string, goresan: readonly TitikGambar[][]): HasilTulisan {
  if (typeof document === "undefined") return GAGAL;
  const adaTitik = goresan.some((garis) => garis.length > 0);
  if (!adaTitik) return GAGAL;

  const kanvas = document.createElement("canvas");
  kanvas.width = UKURAN;
  kanvas.height = UKURAN;
  const ctx = kanvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return { ...GAGAL, kosong: false };

  siap(ctx);
  ctx.fillStyle = "#000";
  ctx.fill(new Path2D(pathD), "nonzero");
  const penuh = ambil(ctx);

  siap(ctx);
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#000";
  ctx.lineJoin = "round";
  ctx.lineWidth = LONGAR;
  const bentuk = new Path2D(pathD);
  ctx.fill(bentuk, "nonzero");
  ctx.stroke(bentuk);
  const zona = ambil(ctx);

  siap(ctx);
  gambarTinta(ctx, goresan);
  const tinta = ambil(ctx);

  const bagian: { luas: number; kena: number }[] = [];
  for (const potongan of pecah(pathD)) {
    siap(ctx);
    ctx.fillStyle = "#000";
    ctx.fill(new Path2D(potongan), "nonzero");
    const sub = ambil(ctx);
    let milik = 0;
    let tampak = 0;
    let kena = 0;
    for (let i = 3; i < sub.data.length; i += 4) {
      if (sub.data[i] <= AMBANG) continue;
      milik += 1;
      if (penuh.data[i] <= AMBANG) continue;
      tampak += 1;
      if (tinta.data[i] > AMBANG) kena += 1;
    }
    if (milik < 8 || tampak / milik < LUBANG_MAX) continue;
    bagian.push({ luas: tampak, kena });
  }

  let tintaPx = 0;
  let luar = 0;
  for (let i = 3; i < tinta.data.length; i += 4) {
    if (tinta.data[i] <= AMBANG) continue;
    tintaPx += 1;
    if (zona.data[i] <= AMBANG) luar += 1;
  }

  const kosong = tintaPx < 20 || bagian.length === 0;
  const terbesar = bagian.reduce((maks, item) => Math.max(maks, item.luas), 0);
  const cukup = (item: { luas: number; kena: number }) => item.luas > 0 && item.kena / item.luas >= TUTUP_MIN;
  const bentukCukup = !kosong && bagian.every(cukup);
  const badanLulus = bagian.some((item) => item.luas >= terbesar * 0.5 && cukup(item));
  const titikBelum = !kosong && !bentukCukup && badanLulus && bagian.some((item) => item.luas < terbesar * 0.5 && !cukup(item));
  const terlaluLuar = !kosong && luar / tintaPx > LUAR_MAX;

  return {
    cocok: bentukCukup && !terlaluLuar,
    kosong,
    terlaluLuar,
    titikBelum,
    bentukCukup,
  };
}
