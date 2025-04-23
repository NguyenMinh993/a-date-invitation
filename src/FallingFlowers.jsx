import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const FallingFlowers = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    // Create initial flowers
    const initialFlowers = Array.from({ length: 15 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 5,
      size: 20 + Math.random() * 20,
      emoji: ['🌸', '🌺', '🌹', '🌷', '💐', '🌻', '🌼'][Math.floor(Math.random() * 7)]
    }));
    setFlowers(initialFlowers);

    // Add new flowers periodically
    const interval = setInterval(() => {
      setFlowers(prevFlowers => {
        const newFlower = {
          id: Date.now(),
          left: Math.random() * 100,
          delay: 0,
          duration: 5 + Math.random() * 5,
          size: 20 + Math.random() * 20,
          emoji: ['🌸', '🌺', '🌹', '🌷', '💐', '🌻', '🌼'][Math.floor(Math.random() * 7)]
        };
        return [...prevFlowers, newFlower].slice(-20); // Keep max 20 flowers
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="falling-flowers">
      {flowers.map(flower => (
        <motion.div
          key={flower.id}
          className="flower"
          style={{
            left: `${flower.left}%`,
            fontSize: `${flower.size}px`,
          }}
          initial={{ y: -50, opacity: 0, rotate: 0 }}
          animate={{
            y: '100vh',
            opacity: [0, 1, 1, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: flower.duration,
            delay: flower.delay,
            repeat: Infinity,
            ease: "linear"
          }}
        >
          {flower.emoji}
        </motion.div>
      ))}
    </div>
  );
};

export default FallingFlowers; 