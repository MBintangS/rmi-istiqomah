import Image from "next/image";
import rmiLogo from "@/assets/RMI_LOGO.png";
import { cn } from "@/lib/utils";

type RmiLogoProps = {
  /** Pixel size (width & height). Default 36. */
  size?: number;
  className?: string;
  priority?: boolean;
};

export function RmiLogo({ size = 36, className, priority }: RmiLogoProps) {
  return (
    <Image
      src={rmiLogo}
      alt="Logo Remaja Masjid Al-Istiqomah"
      width={size}
      height={size}
      className={cn("shrink-0 rounded-full object-cover", className)}
      priority={priority}
    />
  );
}
