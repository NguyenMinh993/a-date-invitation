import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import './App.css'; // Dùng chung CSS với App

function HomePage() {
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const bounce = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.6, type: 'spring', bounce: 0.5 } },
  };

  return (
    <div className="App">
      <div className="center-content">
        <header className="App-header">
          <motion.h1
            className="title"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            whileHover={{ scale: 1.05 }}
          >
            Thư mời 💌
          </motion.h1>
          <motion.p
            className="greeting"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
          >
            Pé Pôngiuoi ơi, có thư mời cho em nè! 🌸
          </motion.p>
          <motion.div
            initial="hidden"
            animate="visible"
            variants={bounce}
            whileHover={{ scale: 1.1, rotate: 5 }}
          >
            <Link to="/invitation" className="accept-button">
              Xem ngay 🌷
            </Link>
          </motion.div>
        </header>
      </div>
    </div>
  );
}

export default HomePage;