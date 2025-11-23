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
    const moonOrbitRef = useRef<THREE.Group>(null);
    const saturnRingsRef = useRef<THREE.Mesh>(null);
    const [hovered, setHovered] = useState(false);
    const setGlobalHovered = useStore((state) => state.setHoveredPlanet);
    const orbitSpeed = useStore((state) => state.orbitSpeed);
    const router = useRouter();

    // Load texture if available
    const texture = planet.texture ? useLoader(THREE.TextureLoader, planet.texture) : null;

    // Load moon texture for Earth
    const moonTexture = planet.id === 'earth' ? useLoader(THREE.TextureLoader, '/moon.jpg') : null;

    // Random starting position for orbit to make it look more natural
    const initialAngle = useRef(Math.random() * Math.PI * 2);

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.5;
        }
        if (orbitRef.current) {
            orbitRef.current.rotation.y += planet.speed * delta * 10 * orbitSpeed; // Speed up for visualization
        }
        // Moon orbit around Earth
        if (moonOrbitRef.current && planet.id === 'earth') {
            moonOrbitRef.current.rotation.y += delta * 2; // Moon orbits faster
        }
        // Rotate Saturn's rings slowly
        if (saturnRingsRef.current && planet.id === 'saturn') {
            saturnRingsRef.current.rotation.z += delta * 0.1;
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

                {/* Moon for Earth */}
                {planet.id === 'earth' && moonTexture && (
                    <group ref={moonOrbitRef}>
                        <mesh position={[planet.size + 1.5, 0, 0]}>
                            <sphereGeometry args={[0.27, 16, 16]} />
                            <meshStandardMaterial map={moonTexture} />
                        </mesh>
                    </group>
                )}

                {/* Saturn's Rings */}
                {planet.id === 'saturn' && (
                    <mesh ref={saturnRingsRef} rotation={[Math.PI / 2.3, 0, 0]}>
                        <ringGeometry args={[planet.size * 1.2, planet.size * 2, 64]} />
                        <meshStandardMaterial
                            color="#C9B18C"
                            transparent
                            opacity={0.8}
                            side={THREE.DoubleSide}
                        />
                    </mesh>
                )}

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
