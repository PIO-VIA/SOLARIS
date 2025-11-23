'use client';

import { useParams, useRouter } from 'next/navigation';
import { planets } from '@/lib/data';
import Navbar from '@/components/ui/Navbar';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import { ArrowLeft, Thermometer, Ruler, Weight, ArrowLeftRight, Lightbulb } from 'lucide-react';
import { Suspense } from 'react';
import * as THREE from 'three';
import { useTranslation } from '@/app/i18n/client';

function SpaceBackground() {
    const texture = useLoader(THREE.TextureLoader, '/stars_milky_way.jpg');

    return (
        <mesh>
            <sphereGeometry args={[200, 60, 40]} />
            <meshBasicMaterial map={texture} side={THREE.BackSide} />
        </mesh>
    );
}

function SinglePlanetScene({ color, size, texture, planetId }: { color: string; size: number; texture?: string; planetId: string }) {
    const loadedTexture = texture ? useLoader(THREE.TextureLoader, texture) : null;
    const moonTexture = planetId === 'earth' ? useLoader(THREE.TextureLoader, '/moon.jpg') : null;

    return (
        <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <Suspense fallback={null}>
                <SpaceBackground />
                <ambientLight intensity={0.5} />
                <pointLight position={[10, 10, 10]} intensity={1} />

                <Float speed={2} rotationIntensity={0.5} floatIntensity={0.2}>
                    <group>
                        <mesh rotation={[0, 0, 0]}>
                            <sphereGeometry args={[2.5, 64, 64]} />
                            <meshStandardMaterial
                                map={loadedTexture}
                                color={loadedTexture ? '#ffffff' : color}
                                roughness={0.7}
                                metalness={0.2}
                            />
                        </mesh>

                        {/* Moon for Earth */}
                        {planetId === 'earth' && moonTexture && (
                            <mesh position={[4, 0, 0]}>
                                <sphereGeometry args={[0.6, 32, 32]} />
                                <meshStandardMaterial map={moonTexture} />
                            </mesh>
                        )}

                        {/* Saturn's Rings */}
                        {planetId === 'saturn' && (
                            <mesh rotation={[Math.PI / 2.3, 0, 0]}>
                                <ringGeometry args={[3, 5, 64]} />
                                <meshStandardMaterial
                                    color="#C9B18C"
                                    transparent
                                    opacity={0.8}
                                    side={THREE.DoubleSide}
                                />
                            </mesh>
                        )}
                    </group>
                </Float>

                <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={2} />
            </Suspense>
        </Canvas>
    );
}

export default function PlanetPage() {
    const params = useParams();
    const router = useRouter();
    const lang = params.lang as string;
    const { t } = useTranslation(lang, 'translation');
    const planet = planets.find((p) => p.id === params.id);

    if (!planet) {
        return (
            <div className="w-full h-screen flex items-center justify-center text-white">
                Planet not found
            </div>
        );
    }

    const planetData = t(`planetsData.${planet.id}`, { returnObjects: true }) as any;
    const planetName = t(`planets.${planet.id}`);

    return (
        <main className="relative w-full min-h-screen bg-black text-white overflow-x-hidden">
            <Navbar lng={lang} />

            <div className="grid grid-cols-1 lg:grid-cols-2 min-h-screen">
                {/* Left: 3D Model */}
                <div className="h-[50vh] lg:h-screen relative order-1 lg:order-1">
                    <div className="absolute inset-0 z-0">
                        <SinglePlanetScene color={planet.color} size={planet.size} texture={planet.texture} planetId={planet.id} />
                    </div>

                    <button
                        onClick={() => router.back()}
                        className="absolute top-24 left-6 z-10 p-3 rounded-full bg-white/10 backdrop-blur-md hover:bg-white/20 transition-colors"
                    >
                        <ArrowLeft className="w-6 h-6" />
                    </button>
                </div>

                {/* Right: Content */}
                <div className="relative z-10 p-8 lg:p-20 flex flex-col justify-center order-2 lg:order-2 bg-gradient-to-b from-transparent to-black lg:bg-none">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <h1 className="text-6xl md:text-8xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-500">
                            {planetName}
                        </h1>

                        <p className="text-lg text-gray-300 leading-relaxed mb-12">
                            {planetData.description}
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-orange-500/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2 text-orange-400">
                                    <Thermometer className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-wider">{t('planetPage.temperature')}</span>
                                </div>
                                <p className="text-2xl font-mono">{planetData.stats.temp}</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-blue-500/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2 text-blue-400">
                                    <Ruler className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-wider">{t('planetPage.radius')}</span>
                                </div>
                                <p className="text-2xl font-mono">{planetData.stats.radius}</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-purple-500/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2 text-purple-400">
                                    <Weight className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-wider">{t('planetPage.mass')}</span>
                                </div>
                                <p className="text-2xl font-mono">{planetData.stats.mass}</p>
                            </div>

                            <div className="p-6 rounded-2xl bg-white/5 border border-white/10 hover:border-green-500/50 transition-colors">
                                <div className="flex items-center gap-3 mb-2 text-green-400">
                                    <ArrowLeftRight className="w-5 h-5" />
                                    <span className="text-sm font-bold uppercase tracking-wider">{t('planetPage.distance')}</span>
                                </div>
                                <p className="text-2xl font-mono">{planetData.stats.distanceFromSun}</p>
                            </div>
                        </div>

                        {/* Fun Fact Section */}
                        <div className="p-6 rounded-2xl bg-gradient-to-br from-yellow-500/10 to-orange-500/10 border border-yellow-500/20">
                            <div className="flex items-center gap-3 mb-3 text-yellow-400">
                                <Lightbulb className="w-6 h-6" />
                                <span className="text-lg font-bold">{t('planetPage.funFact')}</span>
                            </div>
                            <p className="text-lg text-gray-200 italic">
                                "{planetData.funFact}"
                            </p>
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
