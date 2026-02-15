import { getNEOs } from '@/lib/nasa';
import { Activity, AlertTriangle, Crosshair } from 'lucide-react';

export default async function NEOTracker() {
    const neos = await getNEOs();

    return (
        <div className="rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm overflow-hidden h-full flex flex-col">
            <div className="p-6 border-b border-white/10">
                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                    <Activity className="w-5 h-5 text-green-500" />
                    Near-Earth Objects Today
                </h3>
                <p className="text-sm text-gray-400">Asteroids passing close to Earth in the next 24 hours</p>
            </div>

            <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-[400px]">
                {neos.length > 0 ? (
                    neos.map((neo) => (
                        <div
                            key={neo.id}
                            className="p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 transition-all flex items-center justify-between"
                        >
                            <div className="flex items-center gap-3">
                                <div className={`p-2 rounded-lg ${neo.is_potentially_hazardous_asteroid ? 'bg-red-500/20 text-red-500' : 'bg-blue-500/20 text-blue-500'}`}>
                                    {neo.is_potentially_hazardous_asteroid ? <AlertTriangle className="w-4 h-4" /> : <Crosshair className="w-4 h-4" />}
                                </div>
                                <div>
                                    <h4 className="font-bold text-sm text-white">{neo.name}</h4>
                                    <p className="text-[10px] text-gray-500 uppercase font-mono tracking-widest">
                                        {neo.estimated_diameter.kilometers.estimated_diameter_max.toFixed(2)} KM Ø
                                    </p>
                                </div>
                            </div>

                            <div className="text-right">
                                <p className="text-xs font-bold text-white">
                                    {parseInt(neo.close_approach_data[0].relative_velocity.kilometers_per_hour).toLocaleString()} km/h
                                </p>
                                <p className="text-[10px] text-gray-500">Velocity</p>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="h-full flex items-center justify-center text-gray-500 text-sm italic">
                        No dangerous objects tracked today.
                    </div>
                )}
            </div>

            <div className="p-4 bg-orange-500/5 mt-auto">
                <p className="text-[10px] text-orange-400/80 leading-tight">
                    * Potentially Hazardous Asteroids (PHAs) are currently defined based on parameters that measure the asteroid's potential to make threatening close approaches to the Earth.
                </p>
            </div>
        </div>
    );
}
