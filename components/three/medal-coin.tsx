"use client";

import { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Text, RoundedBox } from "@react-three/drei";
import * as THREE from "three";

function Coin({
  platform,
  color,
  hovered,
}: {
  platform: string;
  color: string;
  hovered: boolean;
}) {
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    const speed = hovered ? 4 : 1;
    meshRef.current.rotation.y += 0.01 * speed;
    meshRef.current.position.y =
      Math.sin(state.clock.elapsedTime * 0.8) * 0.1;

    if (glowRef.current) {
      glowRef.current.rotation.y = meshRef.current.rotation.y;
      glowRef.current.position.y = meshRef.current.position.y;
    }
  });

  const shortName = platform.slice(0, 2).toUpperCase();

  return (
    <group>
      {/* Glow ring */}
      <mesh ref={glowRef}>
        <torusGeometry args={[1.1, 0.04, 16, 32]} />
        <meshBasicMaterial color={color} transparent opacity={hovered ? 0.6 : 0.2} />
      </mesh>

      {/* Main coin */}
      <mesh ref={meshRef}>
        <cylinderGeometry args={[1, 1, 0.15, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.8}
          roughness={0.2}
          emissive={color}
          emissiveIntensity={hovered ? 0.4 : 0.15}
        />
      </mesh>

      {/* Front text */}
      <Text
        position={[0, 0, 0.09]}
        fontSize={0.4}
        color="#0a0a0f"
        font="/fonts/Geist-Bold.ttf"
        anchorX="center"
        anchorY="middle"
      >
        {shortName}
      </Text>

      {/* Star decorations on faces */}
      <RoundedBox
        args={[0.3, 0.3, 0.02]}
        position={[0, 0.55, 0.08]}
        radius={0.05}
      >
        <meshStandardMaterial
          color="#0a0a0f"
          metalness={0.5}
          roughness={0.3}
        />
      </RoundedBox>
    </group>
  );
}

interface MedalCoinProps {
  platform: string;
  color: string;
}

export default function MedalCoin({ platform, color }: MedalCoinProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="h-full w-full"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <Canvas
        camera={{ position: [0, 0, 3.5], fov: 45 }}
        dpr={[1, 1.5]}
        style={{ background: "transparent" }}
        gl={{ alpha: true, antialias: true }}
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={0.8} color={color} />
        <pointLight position={[-3, -3, 2]} intensity={0.3} color="#ffffff" />
        <Coin platform={platform} color={color} hovered={hovered} />
      </Canvas>
    </div>
  );
}
