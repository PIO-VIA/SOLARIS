import { getSpaceWeather } from '@/lib/nasa';
import { Sun, Wind } from 'lucide-react';

export default async function SpaceWeather() {
    const events = await getSpaceWeather();
    const cme = events?.[0]; // Get the most recent CME

    return (
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm p-6 h-full flex flex-col justify-between">
            <div>
                <h3 className="text-xl font-bold text-white flex items-center gap-2 mb-2">
                    <Sun className="w-5 h-5 text-yellow-500" />
                    Solar Activity
                </h3>
                <p className="text-sm text-gray-400">Real-time Coronal Mass Ejection (CME) data</p>
            </div>

            <div className="my-6">
                {cme ? (
                    <div className="space-y-4">
                        <div className="flex items-center justify-between p-3 rounded-lg bg-yellow-500/5 border border-yellow-500/10">
                            <span className="text-xs text-gray-400 font-mono">ACTIVITY TYPE</span>
                            <span className="text-sm font-bold text-yellow-500">{cme.type || 'CME'}</span>
                        </div>
                        <div className="flex items-center justify-between p-3 rounded-lg bg-blue-500/5 border border-blue-500/10">
                            <span className="text-xs text-gray-400 font-mono">SPEED</span>
                            <span className="text-sm font-bold text-blue-400">{cme.speed || '---'} km/s</span>
                        </div>
                        <div className="p-3 rounded-lg bg-orange-500/5 border border-orange-500/10">
                            <span className="text-[10px] text-gray-500 font-mono block mb-1 uppercase tracking-tighter">Event Time</span>
                            <span className="text-sm font-bold text-white">{new Date(cme.startTime).toLocaleString()}</span>
                        </div>
                    </div>
                ) : (
                    <div className="py-8 text-center">
                        <Wind className="w-8 h-8 text-gray-600 mx-auto mb-2 opacity-50" />
                        <p className="text-sm text-gray-500 italic">The Sun is currently calm.</p>
                    </div>
                )}
            </div>

            <div className="pt-4 border-t border-white/5">
                <p className="text-[10px] text-gray-500 leading-tight">
                    CME data provided by NASA's Space Weather Database of Notifications, Knowledge and Information (DONKI).
                </p>
            </div>
        </div>
    );
}
