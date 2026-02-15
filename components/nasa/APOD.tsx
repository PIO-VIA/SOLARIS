import { getAPOD } from '@/lib/nasa';
import Image from 'next/image';

export default async function APOD() {
    const data = await getAPOD();

    if (!data) {
        return (
            <div className="p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm">
                <p className="text-gray-400">Failed to load Astronomy Picture of the Day.</p>
            </div>
        );
    }

    return (
        <div className="group relative overflow-hidden rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm transition-all hover:bg-white/10">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 lg:p-10">
                <div className="relative aspect-video rounded-xl overflow-hidden shadow-2xl">
                    {data.media_type === 'image' ? (
                        <Image
                            src={data.url}
                            alt={data.title}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, 50vw"
                        />
                    ) : (
                        <iframe
                            src={data.url}
                            title={data.title}
                            className="absolute inset-0 w-full h-full border-0"
                            allowFullScreen
                        />
                    )}
                </div>

                <div className="flex flex-col justify-center">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-500/10 text-orange-400 border border-orange-500/20 text-xs font-semibold mb-4 w-fit">
                        <span>NASA APOD</span>
                        <span className="w-1 h-1 rounded-full bg-orange-400" />
                        <span>{data.date}</span>
                    </div>

                    <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 group-hover:text-orange-400 transition-colors">
                        {data.title}
                    </h2>

                    <p className="text-gray-400 leading-relaxed text-sm md:text-base line-clamp-6 group-hover:line-clamp-none transition-all duration-500">
                        {data.explanation}
                    </p>

                    <div className="mt-6 flex items-center gap-4">
                        <a
                            href={data.hdurl || data.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="px-6 py-2 rounded-lg bg-orange-500 hover:bg-orange-600 text-white font-medium transition-all shadow-lg shadow-orange-500/20 active:scale-95"
                        >
                            View HD
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
