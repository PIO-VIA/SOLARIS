'use client';

import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from './SolarSystem';
import { Suspense } from 'react';
import * as THREE from 'three';

function SpaceBackground() {
    const texture = useLoader(THREE.TextureLoader, '/stars_milky_way.jpg');

    return (
        <mesh>
            <sphereGeometry args={[500, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}

export default function Scene() {
    return (
        <div className="w-full h-screen bg-black">
            <Canvas camera={{ position: [0, 20, 40], fov: 60 }}>
                <Suspense fallback={null}>
                    <SpaceBackground />
                    <ambientLight intensity={0.3} />
                    <SolarSystem />
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                </Suspense>
            </Canvas>
        </div>
    );
}
