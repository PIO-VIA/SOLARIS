'use client';

import { PlanetData } from '@/lib/data';
import { motion } from 'framer-motion';
import { ArrowRight, Thermometer, Ruler, Weight, ArrowLeftRight } from 'lucide-react';
import Link from 'next/link';

interface PlanetCardProps {
    planet: PlanetData;
}

export default function PlanetCard({ planet }: PlanetCardProps) {
    return (
        <motion.div
            whileHover={{ y: -10 }}
            className="group relative bg-black/40 backdrop-blur-md border border-white/10 rounded-3xl overflow-hidden hover:border-orange-500/50 transition-colors duration-500"
        >
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/80 z-0" />

            <div className="relative z-10 p-6 flex flex-col h-full">
                <div className="flex items-center justify-between mb-4">
                    <h3 className="text-2xl font-bold text-white group-hover:text-orange-400 transition-colors">
                        {planet.name}
                    </h3>
                    <div
                        className="w-4 h-4 rounded-full shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                        style={{ backgroundColor: planet.color }}
                    />
                </div>

                <p className="text-gray-400 text-sm line-clamp-3 mb-6 flex-grow">
                    {planet.description}
                </p>

                <div className="grid grid-cols-2 gap-3 mb-6">
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Thermometer className="w-3 h-3 text-orange-400" />
                        {planet.stats.temp}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-gray-300">
                        <Ruler className="w-3 h-3 text-blue-400" />
                        {planet.stats.radius}
                    </div>
                </div>

                <Link
                    href={`/planet/${planet.id}`}
                    className="w-full py-3 rounded-xl bg-white/5 hover:bg-orange-500 hover:text-white border border-white/10 hover:border-orange-500 transition-all duration-300 flex items-center justify-center gap-2 text-sm font-medium text-white"
                >
                    Explore <ArrowRight className="w-4 h-4" />
                </Link>
            </div>
        </motion.div>
    );
}
