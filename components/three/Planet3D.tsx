'use client';

import { useRef, useState } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import { Text, Html } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '@/lib/data';
import { useStore } from '@/lib/store';
import { useRouter } from 'next/navigation';

interface Planet3DProps {
    planet: PlanetData;
}

export default function Planet3D({ planet }: Planet3DProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const orbitRef = useRef<THREE.Group>(null);
    const [hovered, setHovered] = useState(false);
    const setGlobalHovered = useStore((state) => state.setHoveredPlanet);
    const router = useRouter();

    // Load texture if available
    const texture = planet.texture ? useLoader(THREE.TextureLoader, planet.texture) : null;

    // Random starting position for orbit to make it look more natural
    const initialAngle = useRef(Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
        }
        if (orbitRef.current) {
            orbitRef.current.rotation.y += planet.speed * delta * 10; // Speed up for visualization
        }
    });

    const handlePointerOver = () => {
        setHovered(true);
        setGlobalHovered(planet.id);
        document.body.style.cursor = 'pointer';
    };

    const handlePointerOut = () => {
        setHovered(false);
        setGlobalHovered(null);
        document.body.style.cursor = 'auto';
    };

    const handleClick = () => {
        router.push(`/planet/${planet.id}`);
    };

    return (
        <group ref={orbitRef} rotation={[0, initialAngle.current, 0]}>
            <group position={[planet.distance, 0, 0]}>
                {/* Orbit Line (Visual Guide) - Optional, maybe too cluttered if for all */}
                {/* Planet Mesh */}
                <mesh
                    ref={meshRef}
                    onClick={handleClick}
                    onPointerOver={handlePointerOver}
                    onPointerOut={handlePointerOut}
                    scale={hovered ? 1.2 : 1}
                >
                    <sphereGeometry args={[planet.size, 32, 32]} />
                    <meshStandardMaterial
                        map={texture}
                        color={texture ? '#ffffff' : planet.color}
                    />
                </mesh>

                {/* Label */}
                <Html position={[0, planet.size + 1, 0]} center distanceFactor={15}>
                    <div
                        className={`px-2 py-1 rounded-md text-xs font-bold transition-opacity duration-300 ${hovered ? 'opacity-100 bg-black/80 text-white' : 'opacity-0'
                            }`}
                    >
                        {planet.name}
                    </div>
                </Html>
            </group>

            {/* Orbit Path Visual */}
            <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[planet.distance - 0.05, planet.distance + 0.05, 64]} />
                <meshBasicMaterial color="#ffffff" opacity={0.1} transparent side={THREE.DoubleSide} />
            </mesh>
        </group>
    );
}
