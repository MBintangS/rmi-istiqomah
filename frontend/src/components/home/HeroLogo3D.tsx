"use client";

import { Component, Suspense, useMemo, type ReactNode } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, OrbitControls, useGLTF } from "@react-three/drei";
import logoUrl from "@/assets/3d/logo-rmi-color.glb";
import { RmiLogo } from "@/components/brand/RmiLogo";
import { usePublicTheme } from "@/providers/PublicThemeProvider";

function RmiLogoModel() {
  const { scene } = useGLTF(logoUrl);
  const model = useMemo(() => scene.clone(true), [scene]);

  return (
    <group rotation={[Math.PI / 2.1, 0, 0]}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(logoUrl);

class HeroCanvasBoundary extends Component<
  { children: ReactNode; fallback: ReactNode },
  { hasError: boolean }
> {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) return this.props.fallback;
    return this.props.children;
  }
}

interface HeroLogo3DProps {
  reduceMotion?: boolean;
}

export function HeroLogo3D({ reduceMotion = false }: HeroLogo3DProps) {
  const { theme } = usePublicTheme();
  const isDark = theme === "dark";

  return (
    <HeroCanvasBoundary
      fallback={
        <div className="flex h-full items-center justify-center">
          <RmiLogo size={160} priority />
        </div>
      }
    >
      <Canvas
        camera={{ position: [0, 0.45, 4.2], fov: 32 }}
        gl={{ antialias: true, alpha: true }}
        dpr={[1, 1.75]}
        frameloop={reduceMotion ? "demand" : "always"}
        className="h-full w-full touch-none"
      >
        <ambientLight intensity={isDark ? 0.7 : 1} />
        <directionalLight position={[4, 6, 5]} intensity={isDark ? 1.15 : 1.7} />
        <directionalLight position={[-4, 2, -2]} intensity={isDark ? 0.7 : 0.5} color="#d4af37" />
        <hemisphereLight args={[isDark ? "#d5e0c4" : "#ffffff", "#4e830a", isDark ? 0.28 : 0.4]} />

        <Suspense fallback={null}>
          <Bounds fit observe margin={1.25}>
            <RmiLogoModel />
          </Bounds>
        </Suspense>

        <OrbitControls
          makeDefault
          enableZoom={false}
          enablePan={false}
          enableRotate={!reduceMotion}
          autoRotate={!reduceMotion}
          autoRotateSpeed={4}
          target={[0, 0, 0]}
          minPolarAngle={Math.PI * 0.38}
          maxPolarAngle={Math.PI * 0.52}
        />
      </Canvas>
    </HeroCanvasBoundary>
  );
}
