'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { getMarsPhotos, MarsPhoto } from '@/lib/nasa';
import { ChevronLeft, ChevronRight, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function MarsRoverGallery() {
    const [photos, setPhotos] = useState<MarsPhoto[]>([]);
    const [index, setIndex] = useState(0);
    const [rover, setRover] = useState('curiosity');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchPhotos() {
            setLoading(true);
            const data = await getMarsPhotos(rover);
            setPhotos(data.slice(0, 20)); // Limit to 20 for performance
            setIndex(0);
            setLoading(false);
        }
        fetchPhotos();
    }, [rover]);

    const next = () => setIndex((i) => (i + 1) % photos.length);
    const prev = () => setIndex((i) => (i - 1 + photos.length) % photos.length);

    const currentPhoto = photos[index];

    return (
        <div className="rounded-2xl bg-white/5 border border-white/10 overflow-hidden backdrop-blur-sm">
            <div className="p-6 border-b border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h3 className="text-xl font-bold text-white flex items-center gap-2">
                        <Camera className="w-5 h-5 text-orange-500" />
                        Mars Rover Latest Gallery
                    </h3>
                    <p className="text-sm text-gray-400">Photos captured by NASA's explorers on the Red Planet</p>
                </div>

                <div className="flex gap-2">
                    {['curiosity', 'opportunity', 'spirit'].map((r) => (
                        <button
                            key={r}
                            onClick={() => setRover(r)}
                            className={`px-4 py-1.5 rounded-full text-xs font-semibold capitalize transition-all ${rover === r
                                    ? 'bg-orange-500 text-white shadow-lg shadow-orange-500/20'
                                    : 'bg-white/5 text-gray-400 hover:bg-white/10'
                                }`}
                        >
                            {r}
                        </button>
                    ))}
                </div>
            </div>

            <div className="relative aspect-video bg-black/40 flex items-center justify-center">
                {loading ? (
                    <div className="flex flex-col items-center gap-3">
                        <div className="w-10 h-10 border-2 border-orange-500 border-t-transparent rounded-full animate-spin" />
                        <p className="text-xs text-orange-400 font-mono">Exploring Mars...</p>
                    </div>
                ) : photos.length > 0 ? (
                    <>
                        <AnimatePresence mode="wait">
                            <motion.div
                                key={currentPhoto.id}
                                initial={{ opacity: 0, scale: 1.1 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                transition={{ duration: 0.5 }}
                                className="absolute inset-0"
                            >
                                <Image
                                    src={currentPhoto.img_src}
                                    alt={`Mars by ${currentPhoto.rover.name}`}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/80 to-transparent">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <p className="text-xs font-mono text-orange-400 mb-1">CAM: {currentPhoto.camera.full_name}</p>
                                            <h4 className="text-lg font-bold text-white">Sol {currentPhoto.sol} • {currentPhoto.earth_date}</h4>
                                        </div>
                                        <div className="flex gap-2">
                                            <button
                                                onClick={prev}
                                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={next}
                                                className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-md transition-all"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </>
                ) : (
                    <p className="text-gray-500">No photos found for this rover today.</p>
                )}
            </div>

            <div className="p-4 grid grid-cols-5 md:grid-cols-10 gap-2 overflow-x-auto">
                {photos.map((p, i) => (
                    <button
                        key={p.id}
                        onClick={() => setIndex(i)}
                        className={`relative aspect-square rounded-md overflow-hidden border-2 transition-all ${index === i ? 'border-orange-500' : 'border-transparent opacity-50 hover:opacity-100'
                            }`}
                    >
                        <Image src={p.img_src} alt="thumbnail" fill className="object-cover" />
                    </button>
                ))}
            </div>
        </div>
    );
}
