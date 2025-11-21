'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import SolarSystem from './SolarSystem';
import { Suspense } from 'react';

export default function Scene() {
    return (
        <div className="w-full h-screen bg-black">
            <Canvas camera={{ position: [0, 20, 40], fov: 60 }}>
                <Suspense fallback={null}>
                    <color attach="background" args={['#000000']} />
                    <Stars radius={300} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                    <ambientLight intensity={0.3} />
                    <SolarSystem />
                    <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
                </Suspense>
            </Canvas>
        </div>
    );
}
