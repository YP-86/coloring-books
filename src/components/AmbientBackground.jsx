import React, { useMemo } from 'react';
import { motion } from 'framer-motion';

/**
 * Loona-style ambient background with floating orbs, particles, and stars
 */
export default function AmbientBackground() {
  const particles = useMemo(() =>
    Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      size: 2 + Math.random() * 3,
      duration: 8 + Math.random() * 12,
      delay: Math.random() * 10,
      opacity: 0.15 + Math.random() * 0.3,
    })), []);

  const stars = useMemo(() =>
    Array.from({ length: 30 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: 1 + Math.random() * 2,
      duration: 2 + Math.random() * 4,
      delay: Math.random() * 5,
    })), []);

  return (
    <>
      <div className="ambient-bg">
        <div className="ambient-orb" />
        <div className="ambient-orb" />
        <div className="ambient-orb" />
      </div>
      <div className="particles">
        {particles.map((p) => (
          <motion.div
            key={p.id}
            className="particle"
            style={{
              left: p.left,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
            }}
            animate={{ y: [window.innerHeight, -50] }}
            transition={{
              duration: p.duration,
              delay: p.delay,
              repeat: Infinity,
              ease: 'linear',
            }}
          />
        ))}
        {stars.map((s) => (
          <div
            key={`star-${s.id}`}
            className="star"
            style={{
              left: s.left,
              top: s.top,
              width: s.size,
              height: s.size,
              animationDuration: `${s.duration}s`,
              animationDelay: `${s.delay}s`,
            }}
          />
        ))}
      </div>
    </>
  );
}
