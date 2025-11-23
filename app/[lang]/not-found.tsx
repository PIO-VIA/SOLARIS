'use client';

import { Canvas } from '@react-three/fiber';
import { Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { Home, Rocket } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { Suspense } from 'react';

function Astronaut() {
    return (
        <Float speed={2} rotationIntensity={0.3} floatIntensity={0.8}>
            <mesh>
                <sphereGeometry args={[0.5, 32, 32]} />
                <meshStandardMaterial color="#ffffff" metalness={0.8} roughness={0.2} />
            </mesh>
        </Float>
    );
}

function SpaceScene() {
    return (
        <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
            <Suspense fallback={null}>
                <ambientLight intensity={0.3} />
                <pointLight position={[10, 10, 10]} intensity={1} />
                <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
                <Astronaut />
            </Suspense>
        </Canvas>
    );
}

export default function NotFound() {
    const params = useParams();
    const lang = (params?.lang as string) || 'en';
    const { t } = useTranslation(lang, 'translation');

    return (
        <main className="relative w-full h-screen overflow-hidden bg-black">
            {/* 3D Background */}
            <div className="absolute inset-0 z-0">
                <SpaceScene />
            </div>

            {/* Gradient Overlays */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-600 rounded-full blur-[128px] opacity-20" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-600 rounded-full blur-[128px] opacity-20" />
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="mb-8"
                >
                    <h1 className="text-9xl md:text-[12rem] font-bold text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-red-500 to-purple-600 mb-4 leading-none">
                        404
                    </h1>
                    <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                        {t('notFound.title')}
                    </h2>
                    <p className="text-lg md:text-xl text-gray-400 mb-2">
                        {t('notFound.subtitle')}
                    </p>
                </motion.div>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.3 }}
                    className="text-gray-300 max-w-md mb-12 text-base md:text-lg"
                >
                    {t('notFound.message')}
                </motion.p>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-wrap gap-4 justify-center"
                >
                    <Link
                        href={`/${lang}`}
                        className="group px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-full font-bold text-lg flex items-center gap-3 hover:from-orange-600 hover:to-red-700 transition-all duration-300 shadow-[0_0_30px_rgba(251,146,60,0.5)] hover:shadow-[0_0_40px_rgba(251,146,60,0.8)]"
                    >
                        <Home className="w-5 h-5" />
                        {t('notFound.backHome')}
                    </Link>

                    <Link
                        href={`/${lang}/explore`}
                        className="px-8 py-4 bg-white/10 backdrop-blur-md border border-white/20 text-white rounded-full font-bold text-lg flex items-center gap-3 hover:bg-white/20 transition-all duration-300"
                    >
                        <Rocket className="w-5 h-5" />
                        {t('notFound.explore')}
                    </Link>
                </motion.div>

                {/* Floating particles effect */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden">
                    {[...Array(20)].map((_, i) => (
                        <motion.div
                            key={i}
                            className="absolute w-2 h-2 bg-white rounded-full opacity-30"
                            initial={{
                                x: Math.random() * window.innerWidth,
                                y: Math.random() * window.innerHeight,
                            }}
                            animate={{
                                y: [null, -100],
                                opacity: [0.3, 0],
                            }}
                            transition={{
                                duration: Math.random() * 3 + 2,
                                repeat: Infinity,
                                delay: Math.random() * 2,
                            }}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}
