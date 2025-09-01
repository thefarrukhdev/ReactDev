"use client";

import GoToMainButton from "@/components/GoToMainButton";
import LightRays from "@/components/Background";

export default function HomePage() {
  return (
    <div className="relative min-h-screen max-w-full overflow-hidden">
      {/* Background (LightRays) */}
      <div className="fixed inset-0 z-0">
        <div className="w-full h-full">
          <LightRays
            raysOrigin="top-center"
            raysColor="#015E4F"
            raysSpeed={1.5}
            lightSpread={0.8}
            rayLength={1.2}
            followMouse={true}
            mouseInfluence={0.1}
            noiseAmount={0.1}
            distortion={0.05}
            className="custom-rays"
          />
        </div>
        <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />
      </div>

      {/* Content */}
      <main className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white">
        <GoToMainButton />
      </main>
    </div>
  );
}
