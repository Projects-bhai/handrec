"use client";

import { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Float, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

function FloatingGeometry({
  position,
  geometry,
  color,
  speed = 1,
  distort = 0.3,
}: {
  position: [number, number, number];
  geometry: "icosahedron" | "torusKnot" | "octahedron";
  color: string;
  speed?: number;
  distort?: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x += 0.003 * speed;
    meshRef.current.rotation.y += 0.005 * speed;
    meshRef.current.position.y =
      position[1] + Math.sin(state.clock.elapsedTime * 0.5 * speed) * 0.3;
  });

  const geo = useMemo(() => {
    switch (geometry) {
      case "icosahedron":
        return <icosahedronGeometry args={[1, 1]} />;
      case "torusKnot":
        return <torusKnotGeometry args={[0.8, 0.3, 100, 16]} />;
      case "octahedron":
        return <octahedronGeometry args={[0.9, 0]} />;
    }
  }, [geometry]);

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
      <mesh ref={meshRef} position={position}>
        {geo}
        <MeshDistortMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.15}
          wireframe
          distort={distort}
          speed={2}
          transparent
          opacity={0.6}
        />
      </mesh>
    </Float>
  );
}

function Particles() {
  const particlesRef = useRef<THREE.Points>(null);
  const count = 200;

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count * 3; i++) {
      pos[i] = (Math.random() - 0.5) * 20;
    }
    return pos;
  }, []);

  useFrame((state) => {
    if (!particlesRef.current) return;
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    particlesRef.current.rotation.x = state.clock.elapsedTime * 0.01;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
          count={count}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00f0ff"
        transparent
        opacity={0.6}
        sizeAttenuation
      />
    </points>
  );
}

function MouseFollower() {
  const groupRef = useRef<THREE.Group>(null);
  const { pointer } = useThree();

  useFrame(() => {
    if (!groupRef.current) return;
    groupRef.current.rotation.y = THREE.MathUtils.lerp(
      groupRef.current.rotation.y,
      pointer.x * 0.3,
      0.05
    );
    groupRef.current.rotation.x = THREE.MathUtils.lerp(
      groupRef.current.rotation.x,
      -pointer.y * 0.2,
      0.05
    );
  });

  return (
    <group ref={groupRef}>
      <FloatingGeometry
        position={[3, 0.5, -2]}
        geometry="icosahedron"
        color="#00f0ff"
        speed={1}
        distort={0.3}
      />
      <FloatingGeometry
        position={[-3.5, -1, -3]}
        geometry="torusKnot"
        color="#8b5cf6"
        speed={0.7}
        distort={0.2}
      />
      <FloatingGeometry
        position={[1, -2, -4]}
        geometry="octahedron"
        color="#06b6d4"
        speed={1.2}
        distort={0.4}
      />
      <FloatingGeometry
        position={[-1.5, 2, -5]}
        geometry="icosahedron"
        color="#8b5cf6"
        speed={0.5}
        distort={0.25}
      />
    </group>
  );
}

export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 60 }}
      dpr={[1, 1.5]}
      style={{ background: "transparent" }}
      gl={{ alpha: true, antialias: true }}
    >
      <ambientLight intensity={0.2} />
      <pointLight position={[10, 10, 10]} intensity={0.5} color="#00f0ff" />
      <pointLight position={[-10, -10, -5]} intensity={0.3} color="#8b5cf6" />
      <Particles />
      <MouseFollower />
    </Canvas>
  );
}
