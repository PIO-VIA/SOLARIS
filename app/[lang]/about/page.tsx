'use client';

import Navbar from '@/components/ui/Navbar';
import { motion } from 'framer-motion';
import { useParams } from 'next/navigation';
import { useTranslation } from '@/app/i18n/client';
import { useState } from 'react';

export default function AboutPage() {
    const params = useParams();
    const lang = params.lang as string;
    const { t } = useTranslation(lang, 'translation');
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setStatus('submitting');

        const formData = new FormData(e.currentTarget);

        try {
            const response = await fetch('https://formsubmit.co/ajax/sountsajean@gmail.com', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                setStatus('success');
                (e.target as HTMLFormElement).reset();
            }
        } catch (error) {
            console.error('Error sending email:', error);
            setStatus('idle');
        }
    };

    return (
        <main className="min-h-screen w-full bg-black text-white">
            <Navbar lng={lang} />

            <div className="max-w-4xl mx-auto px-6 py-32">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative"
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
                                "Next.js 16 (App Router)",
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

                        <h2 className="text-2xl font-bold text-white mt-12 mb-4">{t('about.contact.title')}</h2>

                        {status === 'success' ? (
                            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-400">
                                {t('about.contact.success')}
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="space-y-4 max-w-md">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium text-gray-400 mb-1">{t('about.contact.name')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        required
                                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-400 mb-1">{t('about.contact.email')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        required
                                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors text-white"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium text-gray-400 mb-1">{t('about.contact.message')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        required
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-lg bg-white/5 border border-white/10 focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none transition-colors text-white resize-none"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    disabled={status === 'submitting'}
                                    className="px-6 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg font-medium hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'submitting' ? '...' : t('about.contact.submit')}
                                </button>
                            </form>
                        )}
                    </div>

                    <div className="absolute bottom-4 right-4 opacity-10 select-none pointer-events-none">
                        <span className="text-6xl font-black text-white">PIO</span>
                    </div>
                </motion.div>
            </div>
        </main>
    );
}
