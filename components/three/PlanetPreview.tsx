'use client';

import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
import { useRef, Suspense } from 'react';

function PlanetMesh({ texturePath, color }: { texturePath?: string, color: string }) {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = texturePath ? useLoader(THREE.TextureLoader, texturePath) : null;

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[2.5, 32, 32]} />
            <meshStandardMaterial
                map={texture}
                color={texture ? '#ffffff' : color}
            />
        </mesh>
    );
}

export default function PlanetPreview({ texture, color }: { texture?: string, color: string }) {
    return (
        <div className="w-full h-full">
            <Canvas camera={{ position: [0, 0, 6], fov: 45 }}>
                <Suspense fallback={null}>
                    <ambientLight intensity={0.5} />
                    <pointLight position={[10, 10, 10]} intensity={1} />
                    <PlanetMesh texturePath={texture} color={color} />
                    <OrbitControls enableZoom={false} enablePan={false} />
                </Suspense>
            </Canvas>
        </div>
    );
}
