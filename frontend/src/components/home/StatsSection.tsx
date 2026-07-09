import { MotionSection } from "@/components/home/MotionSection";
import { mockSettings } from "@/data/mock";

const statItems = [
  { key: "totalEvents", label: "Kegiatan", suffix: "+" },
  { key: "totalPengurus", label: "Pengurus", suffix: "" },
  { key: "totalMembers", label: "Anggota Aktif", suffix: "+" },
  { key: "establishedYear", label: "Tahun Berdiri", suffix: "" },
] as const;

export function StatsSection() {
  const { stats } = mockSettings;

  return (
    <MotionSection tone="soft" className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <dl className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4">
          {statItems.map(({ key, label, suffix }) => (
            <div key={key} className="min-w-0">
              <dt className="text-caption font-medium text-foreground/55">{label}</dt>
              <dd className="mt-2 font-display text-4xl font-extrabold tracking-tight text-primary sm:text-5xl">
                {stats[key]}
                {suffix}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </MotionSection>
  );
}
