
/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
*/

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';

// Fix for React Three Fiber intrinsic elements in TypeScript
declare global {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      group: any;
      points: any;
      boxGeometry: any;
      sphereGeometry: any;
      bufferGeometry: any;
      planeGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      pointsMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      fog: any;
    }
  }
}

declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      mesh: any;
      group: any;
      points: any;
      boxGeometry: any;
      sphereGeometry: any;
      bufferGeometry: any;
      planeGeometry: any;
      meshStandardMaterial: any;
      meshBasicMaterial: any;
      pointsMaterial: any;
      ambientLight: any;
      pointLight: any;
      spotLight: any;
      fog: any;
    }
  }
}

// Helper to convert Vector3 to array to avoid "read only property" errors with frozen props
const vec3ToArray = (v: THREE.Vector3): [number, number, number] => [v.x, v.y, v.z];

// --- HERO SCENE: Sonic DNA Helix with Medical Particles ---

const MedicalCross = ({ position }: { position: [number, number, number] }) => {
    const meshRef = useRef<THREE.Group>(null);
    
    useFrame((state) => {
        if(meshRef.current) {
            meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.5;
            meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
        }
    });

    return (
        <group position={position} ref={meshRef}>
             {/* Vertical bar */}
             <mesh>
                 <boxGeometry args={[0.08, 0.25, 0.05]} />
                 <meshStandardMaterial color="#00B5E2" emissive="#00B5E2" emissiveIntensity={0.8} />
             </mesh>
             {/* Horizontal bar */}
             <mesh>
                 <boxGeometry args={[0.25, 0.08, 0.05]} />
                 <meshStandardMaterial color="#00B5E2" emissive="#00B5E2" emissiveIntensity={0.8} />
             </mesh>
        </group>
    )
}

const MedicalDNA = () => {
    const groupRef = useRef<THREE.Group>(null);
    const count = 30; // Base pairs
    const radius = 1.0;
    const height = 6;

    // Create the DNA structure data
    const particles = useMemo(() => {
        const p = [];
        for(let i = 0; i < count; i++) {
            const t = i / count;
            const angle = t * Math.PI * 6; // 3 full turns for tighter spiral
            const y = (t - 0.5) * height;
            
            // Strand 1
            const x1 = Math.cos(angle) * radius;
            const z1 = Math.sin(angle) * radius;
            
            // Strand 2 (offset by PI)
            const x2 = Math.cos(angle + Math.PI) * radius;
            const z2 = Math.sin(angle + Math.PI) * radius;

            p.push({ 
                pos1: new THREE.Vector3(x1, y, z1), 
                pos2: new THREE.Vector3(x2, y, z2),
                id: i 
            });
        }
        return p;
    }, []);

    // Floating medical crosses
    const crosses = useMemo(() => {
        const c: [number, number, number][] = [];
        for(let i=0; i<8; i++) {
            c.push([
                (Math.random() - 0.5) * 4,
                (Math.random() - 0.5) * 6,
                (Math.random() - 0.5) * 2
            ]);
        }
        return c;
    }, []);

    useFrame((state) => {
        if(groupRef.current) {
            // Gentle rotation
            groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.15;
            groupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 0.3) * 0.1;
        }
    });

    return (
        <group ref={groupRef} position={[2.5, 0, 0]} rotation={[0, 0, Math.PI / 8]}>
            {particles.map((data, i) => (
                <group key={i}>
                    {/* DNA Strand Nodes */}
                    <mesh position={vec3ToArray(data.pos1)}>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshStandardMaterial color="#38bdf8" emissive="#38bdf8" emissiveIntensity={0.4} />
                    </mesh>
                    <mesh position={vec3ToArray(data.pos2)}>
                        <sphereGeometry args={[0.06, 16, 16]} />
                        <meshStandardMaterial color="#00629B" emissive="#00629B" emissiveIntensity={0.4} />
                    </mesh>

                    {/* Connecting Audio Bar (Base Pair) */}
                    <AudioBar start={data.pos1} end={data.pos2} index={i} />
                </group>
            ))}

            {/* Floating Medical Symbols */}
            {crosses.map((pos, i) => (
                <Float key={`cross-${i}`} speed={2} rotationIntensity={1} floatIntensity={1}>
                    <MedicalCross position={pos} />
                </Float>
            ))}
        </group>
    )
}

const AudioBar = ({ start, end, index }: { start: THREE.Vector3, end: THREE.Vector3, index: number }) => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    // Memoize calculations and convert to primitive array for position prop
    const { position, distance } = useMemo(() => {
        const dist = start.distanceTo(end);
        const center = new THREE.Vector3().addVectors(start, end).multiplyScalar(0.5);
        return { position: vec3ToArray(center), distance: dist };
    }, [start, end]);
    
    useFrame(({ clock }) => {
        if (meshRef.current) {
            // Pulse effect to look like an audio waveform visualization
            const t = clock.getElapsedTime();
            // Create a "wave" traveling up the DNA
            const wave = Math.sin(t * 3 + index * 0.5); 
            const scale = 0.1 + (wave * 0.5 + 0.5) * 0.9;
            meshRef.current.scale.set(1, scale, 1);
            
            // Color shift based on amplitude
            // Safe cast and check for material
            const material = meshRef.current.material;
            if (material && !Array.isArray(material) && (material as any).color) {
                 const m = material as THREE.MeshStandardMaterial;
                 if (wave > 0.5) {
                    m.color.set('#38bdf8');
                } else {
                    m.color.set('#94a3b8');
                }
            }
        }
    });

    return (
        <mesh ref={meshRef} position={position} rotation={[0, -Math.PI / 4 + (index * 0.1), 0]}>
             <boxGeometry args={[distance, 0.04, 0.04]} />
             <meshStandardMaterial color="#94a3b8" transparent opacity={0.6} />
        </mesh>
    );
}


export const HeroScene: React.FC = () => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full">
      <Canvas camera={{ position: [0, 0, 8], fov: 35 }}>
        <fog attach="fog" args={['#0F172A', 5, 25]} />
        <ambientLight intensity={0.4} />
        <pointLight position={[5, 5, 5]} intensity={1.5} color="#00B5E2" />
        <pointLight position={[-5, -5, -5]} intensity={0.5} color="#ffffff" />
        <spotLight position={[-10, 5, 5]} intensity={2} color="#ffffff" angle={0.5} penumbra={1} />
        
        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
           <MedicalDNA />
        </Float>

        <Environment preset="city" />
      </Canvas>
    </div>
  );
};

// --- SIMULATION SCENE: Spectrogram Surface ---

const SpectrogramMesh = () => {
    const meshRef = useRef<THREE.Mesh>(null);
    
    // Create geometry once
    const geometry = useMemo(() => {
        return new THREE.PlaneGeometry(12, 8, 64, 32);
    }, []);

    useFrame((state) => {
        const mesh = meshRef.current;
        // Robust null checking to avoid runtime errors
        if (mesh && mesh.geometry && mesh.geometry.attributes && mesh.geometry.attributes.position) {
            const t = state.clock.getElapsedTime();
            const positions = mesh.geometry.attributes.position;
            
            // Ensure we have a count and can access items
            if (positions.count > 0) {
                 for (let i = 0; i < positions.count; i++) {
                    const x = positions.getX(i);
                    const y = positions.getY(i);
                    // Create a rolling spectrogram effect
                    const z = Math.sin(x * 3 + t * 2) * 0.2 * Math.cos(y * 2) + Math.sin(y * 5 + t) * 0.1;
                    positions.setZ(i, z);
                }
                positions.needsUpdate = true;
            }
        }
    });

    return (
        <group rotation={[-Math.PI / 3, 0, 0]}>
            <mesh ref={meshRef} geometry={geometry}>
                <meshStandardMaterial 
                    color="#cbd5e1" 
                    wireframe 
                    transparent 
                    opacity={0.3} 
                    side={THREE.DoubleSide}
                />
            </mesh>
            <points>
                <bufferGeometry attach="geometry" {...geometry} />
                <pointsMaterial size={0.03} color="#00629B" transparent opacity={0.5} />
            </points>
        </group>
    );
}

export const SimulationScene: React.FC = () => {
  return (
    <div className="w-full h-full absolute inset-0">
      <Canvas camera={{ position: [0, 4, 6], fov: 50 }}>
        <ambientLight intensity={1} />
        <pointLight position={[0, 5, 0]} intensity={1} color="#00B5E2" />
        <SpectrogramMesh />
      </Canvas>
    </div>
  );
}
