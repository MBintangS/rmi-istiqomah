"use client";

import { Button } from "@/components/ui";
import { MotionSection } from "@/components/home/MotionSection";

export function JoinCtaSection() {
  return (
    <MotionSection tone="soft" className="bg-primary py-16 text-white sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-4 sm:px-6 lg:flex-row lg:items-end lg:justify-between lg:px-8">
        <div className="max-w-xl space-y-3">
          <h2 className="text-white">Dukung gerak remaja masjid</h2>
          <p className="text-body text-white/85">
            Donasi membantu kegiatan dakwah, pembinaan, dan aksi sosial RMI tetap berjalan.
          </p>
        </div>
        <Button
          href="/donasi"
          size="lg"
          variant="secondary"
          // className="w-full shrink-0 text-black hover:bg-white/90 sm:w-auto"
        >
          Donasi
        </Button>
      </div>
    </MotionSection>
  );
}
