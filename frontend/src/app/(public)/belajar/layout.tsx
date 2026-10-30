import { amiriPlay } from "@/lib/permainan-fonts";

export default function BelajarLayout({ children }: { children: React.ReactNode }) {
  return <div className={amiriPlay.variable}>{children}</div>;
}
