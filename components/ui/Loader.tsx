'use client';

import { Html, useProgress } from '@react-three/drei';

export default function Loader() {
    const { progress } = useProgress();

    return (
        <Html center>
            <div className="flex flex-col items-center justify-center gap-4">
                <div className="w-16 h-16 border-4 border-orange-500 border-t-transparent rounded-full animate-spin" />
                <p className="text-white font-mono text-sm">{progress.toFixed(0)}% Loaded</p>
            </div>
        </Html>
    );
}
