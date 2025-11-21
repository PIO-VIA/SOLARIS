'use client';

import Navbar from '@/components/ui/Navbar';
import { motion } from 'framer-motion';

export default function AboutPage() {
    return (
        <main className="min-h-screen w-full bg-black text-white">
            <Navbar />

            <div className="max-w-4xl mx-auto px-6 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                        About SolarIS
                    </h1>

                    <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                        <p>
                            SolarIS is an interactive educational platform designed to bring the wonders of our solar system to life.
                            Built with modern web technologies, it offers a unique way to explore celestial bodies right from your browser.
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Technology Stack</h2>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {[
                                "Next.js 14 (App Router)",
                                "React Three Fiber",
                                "Three.js",
                                "Tailwind CSS",
                                "Framer Motion",
                                "Zustand State Management",
                                "Lucide Icons",
                                "TypeScript"
                            ].map((tech) => (
                                <li key={tech} className="flex items-center gap-3 p-4 rounded-xl bg-white/5 border border-white/10">
                                    <div className="w-2 h-2 rounded-full bg-orange-500" />
                                    {tech}
                                </li>
                            ))}
                        </ul>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">Educational Goal</h2>
                        <p>
                            Our mission is to make astronomy accessible and engaging for everyone. By combining accurate data with
                            immersive 3D visualizations, we hope to inspire the next generation of space explorers and scientists.
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
