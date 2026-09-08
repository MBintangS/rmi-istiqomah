"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import { Bounds, OrbitControls, useGLTF } from "@react-three/drei";
import logoUrl from "@/assets/3d/logo-rmi-color.glb";

function RmiLogoModel() {
  const { scene } = useGLTF(logoUrl);
  const model = useMemo(() => scene.clone(true), [scene]);

  return (
    <group rotation={[Math.PI / 2, 0, 0]}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(logoUrl);

interface HeroLogo3DProps {
  reduceMotion?: boolean;
}

export function HeroLogo3D({ reduceMotion = false }: HeroLogo3DProps) {
  return (
    <Canvas
      camera={{ position: [0, 0.45, 4.2], fov: 32 }}
      gl={{ antialias: true, alpha: true }}
      dpr={[1, 1.75]}
      frameloop={reduceMotion ? "demand" : "always"}
      className="h-full w-full touch-none"
    >
      <ambientLight intensity={1} />
      <directionalLight position={[4, 6, 5]} intensity={1.7} />
      <directionalLight position={[-4, 2, -2]} intensity={0.5} color="#d4af37" />
      <hemisphereLight args={["#ffffff", "#4e830a", 0.4]} />

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
        autoRotateSpeed={0.85}
        target={[0, 0, 0]}
        minPolarAngle={Math.PI * 0.38}
        maxPolarAngle={Math.PI * 0.52}
      />
    </Canvas>
  );
}
