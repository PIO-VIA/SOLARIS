'use client';

import { useState } from 'react';
import Navbar from '@/components/ui/Navbar';
import { planets } from '@/lib/data';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { ArrowLeftRight, Ruler, Thermometer, Weight } from 'lucide-react';
import PlanetPreview from '@/components/three/PlanetPreview';

export default function ComparePage() {
    const params = useParams();
    const lang = params.lang as string;
    const { t } = useTranslation(lang, 'translation');
    const [planet1Id, setPlanet1Id] = useState<string>(planets[0].id);
    const [planet2Id, setPlanet2Id] = useState<string>(planets[1].id);

    const planet1 = planets.find(p => p.id === planet1Id)!;
    const planet2 = planets.find(p => p.id === planet2Id)!;

    // Helper to get translated stats
    const getPlanetStats = (id: string) => {
        const data = t(`planetsData.${id}`, { returnObjects: true }) as any;
        return data?.stats || {};
    };

    const stats1 = getPlanetStats(planet1Id);
    const stats2 = getPlanetStats(planet2Id);

    return (
        <main className="min-h-screen w-full bg-black text-white flex flex-col">
            <Navbar lng={lang} />

            <div className="flex-grow flex flex-col items-center p-6 pt-24 max-w-7xl mx-auto w-full">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-400 to-red-600">
                        {t('compare.title')}
                    </h1>
                    <p className="text-gray-400 text-lg">{t('compare.subtitle')}</p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full relative">
                    {/* VS Badge */}
                    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-10 hidden md:flex items-center justify-center w-16 h-16 rounded-full bg-orange-600 font-bold text-xl shadow-lg border-4 border-black">
                        VS
                    </div>

                    {/* Planet 1 Selection */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
                        <div className="relative">
                            <select
                                value={planet1Id}
                                onChange={(e) => setPlanet1Id(e.target.value)}
                                className="w-full bg-gradient-to-br from-orange-500/10 to-red-500/10 border-2 border-orange-500/30 rounded-xl p-4 pr-10 text-white font-semibold focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/50 transition-all duration-300 hover:border-orange-500/50 hover:bg-orange-500/20 appearance-none cursor-pointer backdrop-blur-sm"
                                style={{
                                    backgroundImage: 'linear-gradient(135deg, rgba(251, 146, 60, 0.1) 0%, rgba(239, 68, 68, 0.1) 100%)'
                                }}
                            >
                                {planets.map(p => (
                                    <option key={p.id} value={p.id} className="bg-gray-900 text-white py-2">
                                        {t(`planets.${p.id}`)}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-orange-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-48 h-48 rounded-full mb-6 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                <PlanetPreview texture={planet1.texture} color={planet1.color} />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">{t(`planets.${planet1.id}`)}</h2>
                            <p className="text-center text-gray-400 text-sm line-clamp-3 mb-6">
                                {t(`planetsData.${planet1.id}.description`)}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <StatRow icon={<Thermometer />} label={t('planetPage.temperature')} value={stats1.temp} />
                            <StatRow icon={<Ruler />} label={t('planetPage.radius')} value={stats1.radius} />
                            <StatRow icon={<Weight />} label={t('planetPage.mass')} value={stats1.mass} />
                            <StatRow icon={<ArrowLeftRight />} label={t('planetPage.distance')} value={stats1.distanceFromSun} />
                        </div>
                    </div>

                    {/* Planet 2 Selection */}
                    <div className="bg-white/5 border border-white/10 rounded-3xl p-6 md:p-8 flex flex-col gap-6">
                        <div className="relative">
                            <select
                                value={planet2Id}
                                onChange={(e) => setPlanet2Id(e.target.value)}
                                className="w-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 border-2 border-purple-500/30 rounded-xl p-4 pr-10 text-white font-semibold focus:outline-none focus:border-purple-500 focus:ring-2 focus:ring-purple-500/50 transition-all duration-300 hover:border-purple-500/50 hover:bg-purple-500/20 appearance-none cursor-pointer backdrop-blur-sm"
                                style={{
                                    backgroundImage: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, rgba(59, 130, 246, 0.1) 100%)'
                                }}
                            >
                                {planets.map(p => (
                                    <option key={p.id} value={p.id} className="bg-gray-900 text-white py-2">
                                        {t(`planets.${p.id}`)}
                                    </option>
                                ))}
                            </select>
                            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
                                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                </svg>
                            </div>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="w-48 h-48 rounded-full mb-6 relative overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)]">
                                <PlanetPreview texture={planet2.texture} color={planet2.color} />
                            </div>
                            <h2 className="text-3xl font-bold mb-2">{t(`planets.${planet2.id}`)}</h2>
                            <p className="text-center text-gray-400 text-sm line-clamp-3 mb-6">
                                {t(`planetsData.${planet2.id}.description`)}
                            </p>
                        </div>

                        <div className="space-y-4">
                            <StatRow icon={<Thermometer />} label={t('planetPage.temperature')} value={stats2.temp} />
                            <StatRow icon={<Ruler />} label={t('planetPage.radius')} value={stats2.radius} />
                            <StatRow icon={<Weight />} label={t('planetPage.mass')} value={stats2.mass} />
                            <StatRow icon={<ArrowLeftRight />} label={t('planetPage.distance')} value={stats2.distanceFromSun} />
                        </div>
                    </div>
                </div>
            </div>
        </main>
    );
}

function StatRow({ icon, label, value }: { icon: any, label: string, value: string }) {
    return (
        <div className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
            <div className="flex items-center gap-3 text-gray-400">
                <div className="w-5 h-5">{icon}</div>
                <span className="text-sm font-medium">{label}</span>
            </div>
            <span className="font-mono font-bold">{value}</span>
        </div>
    );
}
