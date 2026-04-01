'use client';

import { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

/* ──────────────────────────────────────────────────────────────────
   Floating particles — subtle ambient dust
   ────────────────────────────────────────────────────────────────── */
function FloatingParticles() {
  const ref = useRef<THREE.Points>(null);
  const count = 500;

  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      arr[i * 3]     = (Math.random() - 0.5) * 18;
      arr[i * 3 + 1] = (Math.random() - 0.5) * 14;
      arr[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    return arr;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;
    ref.current.rotation.y = clock.getElapsedTime() * 0.006;
    ref.current.position.y = Math.sin(clock.getElapsedTime() * 0.12) * 0.12;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color="#335566" size={0.02} transparent opacity={0.4} />
    </points>
  );
}

/* ──────────────────────────────────────────────────────────────────
   Neural Core — centered brain-like node+line structure
   Positioned slightly ABOVE center so it sits behind the heading
   ────────────────────────────────────────────────────────────────── */
function NeuralCore() {
  const groupRef = useRef<THREE.Group>(null);
  const nodeCount = 260;

  const { nodePositions, lineVerts } = useMemo(() => {
    const nodes: THREE.Vector3[] = [];

    for (let i = 0; i < nodeCount; i++) {
      const theta = Math.random() * Math.PI * 2;
      const phi   = Math.acos(2 * Math.random() - 1);
      const r     = 1.6 + Math.random() * 0.6;
      nodes.push(
        new THREE.Vector3(
          r * Math.sin(phi) * Math.cos(theta),
          r * Math.sin(phi) * Math.sin(theta) * 0.75,
          r * Math.cos(phi) * 0.8
        )
      );
    }

    const verts: number[] = [];
    const maxDist = 0.95;
    for (let i = 0; i < nodes.length; i++) {
      let c = 0;
      for (let j = i + 1; j < nodes.length && c < 3; j++) {
        if (nodes[i].distanceTo(nodes[j]) < maxDist) {
          verts.push(nodes[i].x, nodes[i].y, nodes[i].z);
          verts.push(nodes[j].x, nodes[j].y, nodes[j].z);
          c++;
        }
      }
    }

    const nodeArr = new Float32Array(nodes.length * 3);
    nodes.forEach((n, i) => {
      nodeArr[i * 3]     = n.x;
      nodeArr[i * 3 + 1] = n.y;
      nodeArr[i * 3 + 2] = n.z;
    });

    return { nodePositions: nodeArr, lineVerts: new Float32Array(verts) };
  }, []);

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const t = clock.getElapsedTime();
    groupRef.current.rotation.y = t * 0.055;
    const s = 1 + Math.sin(t * 0.7) * 0.025;
    groupRef.current.scale.setScalar(s);
  });

  return (
    <group ref={groupRef} position={[0, 0.8, 0]}>
      {/* Nodes */}
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[nodePositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#00F2FF" size={0.055} transparent opacity={0.85} />
      </points>

      {/* Connections */}
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[lineVerts, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#00F2FF" transparent opacity={0.12} />
      </lineSegments>
    </group>
  );
}

/* ──────────────────────────────────────────────────────────────────
   BrainVisual — full-screen centered canvas
   ────────────────────────────────────────────────────────────────── */
export default function BrainVisual() {
  return (
    <div className="brain-canvas">
      <div className="brain-glow" />
      <Canvas
        dpr={[1, 2]}
        gl={{ antialias: true, alpha: true }}
        camera={{ fov: 45, near: 0.1, far: 100, position: [0, 0, 7] }}
        style={{ background: 'transparent' }}
      >
        <FloatingParticles />
        <NeuralCore />
      </Canvas>
    </div>
  );
}
