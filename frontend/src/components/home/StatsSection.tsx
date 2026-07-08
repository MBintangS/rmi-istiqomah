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
    <MotionSection className="bg-primary py-14 sm:py-16">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-caption font-medium text-secondary">Pencapaian RMI</p>
          <h2 className="text-white">Angka yang Membanggakan</h2>
        </div>

        <dl className="grid grid-cols-2 gap-6 sm:grid-cols-4 sm:gap-8">
          {statItems.map(({ key, label, suffix }) => (
            <div key={key} className="text-center">
              <dt className="text-caption mb-2 font-medium text-white/80">{label}</dt>
              <dd className="text-3xl font-bold text-white sm:text-4xl">
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
