'use client';

import { planets } from '@/lib/data';
import Planet3D from './Planet3D';
import Sun3D from './Sun3D';
import AsteroidBelt from './AsteroidBelt';

export default function SolarSystem() {
    return (
        <group>
            <Sun3D />
            {planets.map((planet) => (
                <Planet3D key={planet.id} planet={planet} />
            ))}
            <AsteroidBelt />
        </group>
    );
}
