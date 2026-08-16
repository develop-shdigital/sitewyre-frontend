"use client";

import { useRef } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

interface SceneProps {
  /** 0 at hero top, 1 once fully scrolled past — read every frame, not via React state. */
  scrollProgress: React.MutableRefObject<number>;
}

function StructureGroup({ scrollProgress }: SceneProps) {
  const group = useRef<THREE.Group>(null);
  const outer = useRef<THREE.LineSegments>(null);
  const inner = useRef<THREE.LineSegments>(null);
  const pointer = useRef({ x: 0, y: 0 });
  const { size } = useThree();

  useFrame((state, delta) => {
    const p = scrollProgress.current;

    // Gentle pointer-follow: lerp toward normalized pointer position.
    pointer.current.x += (state.pointer.x - pointer.current.x) * 0.04;
    pointer.current.y += (state.pointer.y - pointer.current.y) * 0.04;

    if (group.current) {
      group.current.rotation.y += delta * 0.08;
      group.current.rotation.x = pointer.current.y * 0.2 + p * 0.3;
      group.current.rotation.y += pointer.current.x * 0.0008;
      group.current.position.z = -p * 3.5;
      const fade = 1 - Math.min(p / 0.85, 1);
      group.current.scale.setScalar(0.92 + fade * 0.08);
    }
    if (outer.current) {
      const mat = outer.current.material as THREE.LineBasicMaterial;
      mat.opacity = 1 - Math.min(p / 0.85, 1);
    }
    if (inner.current) {
      inner.current.rotation.y -= delta * 0.14;
      inner.current.position.y = p * 1.6;
      const mat = inner.current.material as THREE.LineBasicMaterial;
      mat.opacity = (1 - Math.min(p / 0.85, 1)) * 0.85;
    }
  });

  const outerGeo = new THREE.IcosahedronGeometry(1.9, 1);
  const innerGeo = new THREE.OctahedronGeometry(0.85, 0);

  const scale = Math.min(size.width / 1400, 1.15);

  return (
    <group ref={group} scale={scale}>
      <lineSegments ref={outer}>
        <edgesGeometry args={[outerGeo]} />
        <lineBasicMaterial color="#15141b" transparent opacity={0.45} />
      </lineSegments>
      <lineSegments ref={inner}>
        <edgesGeometry args={[innerGeo]} />
        <lineBasicMaterial color="#ff5a1f" transparent opacity={0.8} />
      </lineSegments>
    </group>
  );
}

export function WireframeScene({ scrollProgress }: SceneProps) {
  return (
    <Canvas
      camera={{ position: [0, 0, 5.2], fov: 42 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      style={{ position: "absolute", inset: 0 }}
    >
      <StructureGroup scrollProgress={scrollProgress} />
    </Canvas>
  );
}
