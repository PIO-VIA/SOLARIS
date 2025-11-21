'use client';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars, Float } from '@react-three/drei';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Sparkles } from 'lucide-react';
import Navbar from '@/components/ui/Navbar';
import Sun3D from '@/components/three/Sun3D';
import { Suspense } from 'react';

function HeroScene() {
  return (
    <Canvas camera={{ position: [0, 0, 15], fov: 45 }}>
      <Suspense fallback={null}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
          <group position={[4, 0, -5]}>
            <Sun3D />
          </group>
        </Float>

        <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.5} />
      </Suspense>
    </Canvas>
  );
}

export default function Home() {
  return (
    <main className="relative w-full min-h-screen overflow-hidden">
      <Navbar />

      {/* 3D Background */}
      <div className="absolute inset-0 z-0">
        <HeroScene />
      </div>

      {/* Content Overlay */}
      <div className="relative z-10 flex flex-col justify-center min-h-screen px-6 max-w-7xl mx-auto pointer-events-none">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="max-w-2xl pointer-events-auto"
        >
          <div className="flex items-center gap-2 mb-6">
            <span className="px-3 py-1 rounded-full bg-orange-500/20 border border-orange-500/50 text-orange-400 text-xs font-bold tracking-wider uppercase flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Interactive Experience
            </span>
          </div>

          <h1 className="text-6xl md:text-8xl font-bold leading-tight mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-gray-200 to-gray-500">
            Explore the <br />
            <span className="text-orange-500">Solar System</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 mb-10 max-w-lg leading-relaxed">
            Embark on a journey through space. Discover the secrets of our celestial neighborhood in an immersive 3D experience.
          </p>

          <div className="flex flex-wrap gap-4">
            <Link
              href="/explore"
              className="group px-8 py-4 bg-white text-black rounded-full font-bold text-lg flex items-center gap-2 hover:bg-orange-400 hover:text-white transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(251,146,60,0.6)]"
            >
              Start Journey
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Link>

            <Link
              href="/quiz"
              className="px-8 py-4 bg-white/5 backdrop-blur-md border border-white/10 text-white rounded-full font-bold text-lg hover:bg-white/10 transition-all duration-300"
            >
              Take Quiz
            </Link>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
