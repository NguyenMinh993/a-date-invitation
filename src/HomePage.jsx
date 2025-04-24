import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css'; // Dùng chung CSS với App

function HomePage() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    // Create floating hearts
    const createHeart = () => {
      const heart = {
        id: Date.now(),
        left: Math.random() * 100,
        delay: Math.random() * 5,
        size: Math.random() * 20 + 10,
        rotation: Math.random() * 360,
      };
      setHearts((prev) => [...prev, heart]);
    };

    // Create hearts periodically
    const interval = setInterval(createHeart, 2000);

    // Cleanup
    return () => clearInterval(interval);
  }, []);

  const messageAnimation = {
    initial: { scale: 0.8, opacity: 0, y: 20 },
    animate: { scale: 1, opacity: 1, y: 0 },
    hover: { scale: 1.02 }
  };

  return (
    <div className="App">
      {/* Floating hearts */}
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          className="floating-heart"
          style={{
            left: `${heart.left}%`,
            fontSize: `${heart.size}px`,
            animationDelay: `${heart.delay}s`,
            transform: `rotate(${heart.rotation}deg)`,
          }}
          initial={{ opacity: 0, y: '100vh' }}
          animate={{ opacity: 0.6, y: '-100vh' }}
          transition={{ duration: 8, ease: 'linear' }}
        >
          ❤️
        </motion.div>
      ))}

      <div className="center-content">
        <div className="message-container">
          <motion.div 
            className="message-header"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Thư mời 💌
          </motion.div>
          
          <Link to="/invitation" className="message-link">
            <motion.div
              className="message-bubble"
              initial="initial"
              animate="animate"
              whileHover="hover"
              variants={messageAnimation}
              transition={{ duration: 0.3 }}
            >
              <div className="message-content">
                <p>Pé Pôngiuoi ơi,</p>
                <p>Có thư mời cho em nè!</p>
              </div>
              <div className="message-heart">❤️</div>
              <div className="tap-hint">Nhấn để mở thư</div>
            </motion.div>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default HomePage;