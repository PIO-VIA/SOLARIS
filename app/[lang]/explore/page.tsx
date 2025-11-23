'use client';

import Scene from '@/components/three/Scene';
import Navbar from '@/components/ui/Navbar';
import { planets } from '@/lib/data';
import { useStore } from '@/lib/store';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';

export default function ExplorePage() {
    const params = useParams();
    const lang = params.lang as string;
    const { t } = useTranslation(lang, 'translation');
    const hoveredPlanetId = useStore((state) => state.hoveredPlanet);
    const hoveredPlanet = planets.find(p => p.id === hoveredPlanetId);

    return (
        <main className="relative w-full h-screen overflow-hidden bg-black">
            <Navbar lng={lang} />

            <div className="absolute inset-0 z-0">
                <Scene />
            </div>

            {/* Overlay UI */}
            <div className="absolute bottom-10 left-0 right-0 z-10 px-6 pointer-events-none">
                <div className="max-w-7xl mx-auto flex justify-between items-end">
                    <div className="text-white/50 text-sm font-mono pointer-events-auto">
                        <p className="mb-2">{t('home.subtitle')}</p>
                        <div className="flex items-center gap-4 bg-black/40 backdrop-blur-md p-3 rounded-xl border border-white/10">
                            <span className="text-xs uppercase font-bold text-orange-400">Speed</span>
                            <input
                                type="range"
                                min="0"
                                max="5"
                                step="0.1"
                                defaultValue="1"
                                onChange={(e) => useStore.getState().setOrbitSpeed(parseFloat(e.target.value))}
                                className="w-32 accent-orange-500 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer"
                            />
                        </div>
                    </div>

                    <AnimatePresence>
                        {hoveredPlanet && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: 20 }}
                                className="bg-black/60 backdrop-blur-md border border-white/10 p-6 rounded-2xl max-w-md pointer-events-auto"
                            >
                                <h2 className="text-2xl font-bold text-white mb-2">{t(`planets.${hoveredPlanet.id}`)}</h2>
                                <p className="text-gray-300 text-sm mb-4 line-clamp-2">
                                    {t(`planetsData.${hoveredPlanet.id}.description`)}
                                </p>
                                <Link
                                    href={`/${lang}/planet/${hoveredPlanet.id}`}
                                    className="text-orange-400 text-sm font-bold flex items-center gap-2 hover:gap-3 transition-all"
                                >
                                    {t('home.learnMore')} <ArrowRight className="w-4 h-4" />
                                </Link>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </main>
    );
}
