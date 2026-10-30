import { amiriPlay, fredoka } from "@/lib/permainan-fonts";

export default function EdukasiLayout({ children }: { children: React.ReactNode }) {
  return <div className={`${fredoka.variable} ${amiriPlay.variable}`}>{children}</div>;
}
