'use client';

import Navbar from '@/components/ui/Navbar';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';

export default function AboutPage() {
    const params = useParams();
    const lang = params.lang as string;
    const { t } = useTranslation(lang, 'translation');

    return (
        <main className="min-h-screen w-full bg-black text-white">
            <Navbar lng={lang} />

            <div className="max-w-4xl mx-auto px-6 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <h1 className="text-5xl font-bold mb-8 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-600">
                        {t('about.title')}
                    </h1>

                    <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
                        <p>
                            {t('about.intro')}
                        </p>

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t('about.techStack')}</h2>
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

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t('about.goalTitle')}</h2>
                        <p>
                            {t('about.goalText')}
                        </p>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
