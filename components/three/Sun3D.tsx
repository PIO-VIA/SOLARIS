'use client';

import { useRef } from 'react';
import { useFrame, useLoader } from '@react-three/fiber';
import * as THREE from 'three';

export default function Sun3D() {
    const meshRef = useRef<THREE.Mesh>(null);
    const texture = useLoader(THREE.TextureLoader, '/sun.jpg');

    useFrame((state, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.y += delta * 0.1;
        }
    });

    return (
        <mesh ref={meshRef}>
            <sphereGeometry args={[5, 32, 32]} />
            <meshBasicMaterial map={texture} />
            <pointLight intensity={2} distance={100} decay={2} color="#FDB813" />
        </mesh>
    );
}
