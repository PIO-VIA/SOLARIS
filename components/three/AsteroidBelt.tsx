'use client';

import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function AsteroidBelt() {
    const beltRef = useRef<THREE.InstancedMesh>(null);

    // Create asteroid positions
    const asteroids = useMemo(() => {
        const count = 800; // Number of asteroids
        const innerRadius = 28; // Between Mars (25) and Jupiter (35)
        const outerRadius = 32;
        const positions: THREE.Vector3[] = [];
        const rotations: THREE.Euler[] = [];
        const scales: number[] = [];

        for (let i = 0; i < count; i++) {
            // Random position in belt
            const angle = Math.random() * Math.PI * 2;
            const radius = innerRadius + Math.random() * (outerRadius - innerRadius);
            const x = Math.cos(angle) * radius;
            const z = Math.sin(angle) * radius;
            const y = (Math.random() - 0.5) * 0.5; // Slight vertical variation

            positions.push(new THREE.Vector3(x, y, z));
            rotations.push(new THREE.Euler(
                Math.random() * Math.PI,
                Math.random() * Math.PI,
                Math.random() * Math.PI
            ));
            scales.push(0.05 + Math.random() * 0.1); // Random sizes
        }

        return { positions, rotations, scales, count };
    }, []);

    // Set initial positions and rotations
    useMemo(() => {
        if (!beltRef.current) return;

        const matrix = new THREE.Matrix4();
        for (let i = 0; i < asteroids.count; i++) {
            matrix.compose(
                asteroids.positions[i],
                new THREE.Quaternion().setFromEuler(asteroids.rotations[i]),
                new THREE.Vector3(asteroids.scales[i], asteroids.scales[i], asteroids.scales[i])
            );
            beltRef.current.setMatrixAt(i, matrix);
        }
        beltRef.current.instanceMatrix.needsUpdate = true;
    }, [asteroids]);

    // Rotate the entire belt slowly
    useFrame((state, delta) => {
        if (beltRef.current) {
            beltRef.current.rotation.y += delta * 0.02;
        }
    });

    return (
        <instancedMesh ref={beltRef} args={[undefined, undefined, asteroids.count]}>
            <dodecahedronGeometry args={[0.1, 0]} />
            <meshStandardMaterial color="#8B7355" roughness={0.9} metalness={0.1} />
        </instancedMesh>
    );
}
