'use client';

import Scene from '@/components/three/Scene';
import Navbar from '@/components/ui/Navbar';
import { planets } from '@/lib/data';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

export default function ExplorePage() {
    const hoveredPlanetId = useStore((state) => state.hoveredPlanet);
    const hoveredPlanet = planets.find(p => p.id === hoveredPlanetId);

    return (
        <main className="relative w-full h-screen overflow-hidden bg-black">
            <Navbar />

            <div className="absolute inset-0 z-0">
                <Scene />
            </div>

            {/* Overlay UI */}
            <div className="absolute bottom-10 left-0 right-0 z-10 px-6 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-between items-end">
                    <div className="text-white/50 text-sm font-mono">
                        <p>Drag to rotate • Scroll to zoom • Click to explore</p>
                    </div>

                    <AnimatePresence>
                        {hoveredPlanet && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-md pointer-events-auto"
                            >
                                <h2 className="text-2xl font-bold text-white mb-2">{hoveredPlanet.name}</h2>
                                <p className="text-gray-300 text-sm mb-4 line-clamp-2">{hoveredPlanet.description}</p>
                                <Link
                                    href={`/planet/${hoveredPlanet.id}`}
                                    className="text-orange-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
                                >
                                    View Details <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
