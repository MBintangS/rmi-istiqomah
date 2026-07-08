import { MotionSection } from "@/components/home/MotionSection";
import { mockSettings } from "@/data/mock";
export function VisionMissionSection() {
  const { vision, mission } = mockSettings;

  return (
    <MotionSection className="bg-surface py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="mb-10 text-center">
          <p className="text-caption font-medium text-primary">Visi &amp; Misi</p>
          <h2>Landasan Perjalanan RMI</h2>
        </div>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          <div className="rounded-rmi border border-primary/20 bg-primary/5 p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-primary">Visi</h3>
            <blockquote className="text-body border-l-4 border-secondary pl-4 text-heading italic">
              &ldquo;{vision}&rdquo;
            </blockquote>
          </div>

          <div className="rounded-rmi border border-foreground/10 bg-background p-6 sm:p-8">
            <h3 className="mb-4 text-lg font-semibold text-primary">Misi</h3>
            <ul className="space-y-3">
              {mission.map((item, index) => (
                <li key={item} className="flex gap-3 text-body text-foreground/80">
                  <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
                    {index + 1}
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MotionSection>
  );
}
