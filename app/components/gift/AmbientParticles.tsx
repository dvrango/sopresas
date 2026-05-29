"use client";

import { useState, useEffect } from "react";
import { rose, lavender } from "./config";

type Particle = {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  drift: number;
  opacity: number;
  isLavender: boolean;
};

export function AmbientParticles() {
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    setParticles(
      Array.from({ length: 32 }, (_, i) => ({
        id: i,
        x: Math.random() * 100,
        y: 20 + Math.random() * 70,
        size: Math.random() * 2.2 + 0.8,
        duration: Math.random() * 8 + 7,
        delay: -(Math.random() * 15),
        drift: (Math.random() - 0.5) * 50,
        opacity: Math.random() * 0.35 + 0.1,
        isLavender: Math.random() > 0.6,
      }))
    );
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background: p.isLavender ? lavender(p.opacity) : rose(p.opacity),
            animation: `floatUp ${p.duration}s ${p.delay}s infinite linear`,
            ["--drift" as string]: `${p.drift}px`,
          }}
        />
      ))}
    </div>
  );
}
