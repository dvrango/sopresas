"use client";

import Particles, { ParticlesProvider } from "@tsparticles/react";
import { loadFireworksPreset } from "@tsparticles/preset-fireworks";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const initEngine = async (engine: any) => {
  await loadFireworksPreset(engine);
};

const OPTIONS = {
  preset: "fireworks",
  sounds: { enable: false },
};

export function Fireworks() {
  return (
    <ParticlesProvider init={initEngine}>
      <Particles
        id="fireworks-particles"
        options={OPTIONS}
        style={{
          position: "fixed",
          inset: 0,
          pointerEvents: "none",
          zIndex: 5,
          width: "100%",
          height: "100%",
        }}
      />
    </ParticlesProvider>
  );
}
