"use client";

import { useEffect, useState } from "react";

/** False on SSR + first client paint; true after mount. Avoids hydration mismatches. */
export function useHasMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}
