import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, MeshDistortMaterial, Html, Sparkles, Environment, Lightformer } from "@react-three/drei";
import * as THREE from "three";

function CodeCore() {
  const coreRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (coreRef.current) {
      coreRef.current.rotation.y += delta * 0.25;
      coreRef.current.rotation.x += delta * 0.08;
    }
    if (ringRef.current) {
      ringRef.current.rotation.z += delta * 0.15;
      ringRef.current.rotation.x += delta * 0.05;
    }
  });

  return (
    <group>
      {/* Low-poly faceted "gem" core - detail=1 keeps visible flat triangular facets
          instead of subdividing into a smooth, featureless sphere */}
      <mesh ref={coreRef}>
        <icosahedronGeometry args={[1.3, 1]} />
        <MeshDistortMaterial
          color="#A855F7"
          attach="material"
          distort={0.35}
          speed={1.8}
          roughness={0.2}
          metalness={0.3}
          emissive="#7C3AED"
          emissiveIntensity={0.12}
          flatShading
        />
      </mesh>

      {/* Wireframe orbit rings */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2.4, 0, 0]}>
          <torusGeometry args={[2.1, 0.015, 16, 100]} />
          <meshStandardMaterial color="#A855F7" emissive="#A855F7" emissiveIntensity={0.6} />
        </mesh>
        <mesh rotation={[Math.PI / 1.6, Math.PI / 4, 0]}>
          <torusGeometry args={[2.4, 0.01, 16, 100]} />
          <meshStandardMaterial color="#7C3AED" emissive="#7C3AED" emissiveIntensity={0.5} />
        </mesh>
      </group>
    </group>
  );
}

// Real DOM text rendered in 3D space via drei's <Html/> —
// uses the site's own JetBrains Mono font, no async font fetch, no Suspense risk.
function FloatingSymbol({
  text,
  position,
  color = "#A855F7",
  size = "text-2xl",
}: {
  text: string;
  position: [number, number, number];
  color?: string;
  size?: string;
}) {
  return (
    <Float speed={2} rotationIntensity={0.6} floatIntensity={1.4}>
      <Html position={position} center transform distanceFactor={8} occlude={false}>
        <span
          className={`font-mono font-bold ${size} select-none pointer-events-none whitespace-nowrap`}
          style={{ color, textShadow: `0 0 12px ${color}` }}
        >
          {text}
        </span>
      </Html>
    </Float>
  );
}

function Scene() {
  return (
    <>
      {/* Low ambient so the key/fill/rim lights create real shading contrast
          instead of flattening the surface into a single flat color */}
      <ambientLight intensity={0.25} />

      {/* Key light - main highlight, upper-front-right */}
      <pointLight position={[4, 4, 4]} intensity={2.2} color="#E9D5FF" />
      {/* Fill light - softer, opposite side, keeps shadows from going pure black */}
      <pointLight position={[-4, -2, -3]} intensity={0.9} color="#7C3AED" />
      {/* Rim light - from behind, separates the shape from the background */}
      <pointLight position={[0, -3, -5]} intensity={1.4} color="#C084FC" />

      {/* Procedural environment (no external HDR download) so the metallic
          material has something to reflect - gives real depth instead of
          looking flat. Built entirely from in-scene light panels. */}
      <Environment resolution={256}>
        <Lightformer intensity={4} color="#E9D5FF" position={[3, 3, 3]} scale={[4, 4, 1]} />
        <Lightformer intensity={2} color="#A855F7" position={[-3, -2, -2]} scale={[5, 5, 1]} />
        <Lightformer intensity={2.5} color="#C084FC" position={[0, -4, 2]} scale={[6, 3, 1]} />
      </Environment>

      <Float speed={1.4} rotationIntensity={0.3} floatIntensity={0.8}>
        <CodeCore />
      </Float>

      <FloatingSymbol text="</>" position={[-2.6, 1.4, 0.5]} />
      <FloatingSymbol text="{ }" position={[2.5, -1.2, 0.8]} color="#7C3AED" />
      <FloatingSymbol text="=>" position={[2.2, 1.6, -0.5]} color="#C084FC" size="text-xl" />
      <FloatingSymbol text="npm" position={[-2.4, -1.4, -0.3]} color="#C084FC" size="text-lg" />

      <Sparkles count={40} scale={6} size={2} speed={0.3} color="#A855F7" opacity={0.6} />
    </>
  );
}

export default function Hero3D() {
  return (
    <div className="w-full h-full min-h-[420px]">
      <Canvas
        camera={{ position: [0, 0, 6.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ alpha: true, antialias: true }}
        style={{ background: "transparent" }}
      >
        <Scene />
      </Canvas>
    </div>
  );
}