'use client';

// import { Suspense } from 'react';
// import Spline from '@splinetool/react-spline'; // Uncomment when real asset is ready

export function TheArtifact() {
    // Generic placeholder for the 2.5D Artifact
    return (
        <div className="w-full h-[500px] flex items-center justify-center relative overflow-hidden">
            <div className="w-64 h-64 border border-black/10 flex items-center justify-center animate-spin-slow bg-white/50 backdrop-blur-sm rotate-45 shadow-2xl">
                <div className="w-48 h-48 border border-black/20 flex items-center justify-center -rotate-45">
                    <span className="text-xs uppercase tracking-[0.2em] opacity-50">Artifact</span>
                </div>
            </div>

            {/* Absolute overlay for grain if needed */}
            <div className="absolute inset-0 pointer-events-none bg-noise opacity-5"></div>
        </div>
    );
}
