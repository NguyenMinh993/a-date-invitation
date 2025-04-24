import React, { useState, useEffect } from 'react';
import './App.css';
import Clam from './clam.png';
import emailjs from '@emailjs/browser';
import PhotoTime from './photTime.jpg';
import PhotoObject from './photoObject.jpg';
import NamLong from './cvNamLong.jpg'; // Sử dụng hình 9.jpg cho công viên Nam Long
import { motion, AnimatePresence } from 'framer-motion';
import audioFile from './Shiki - 1000 Ánh Mắt ft. Obito (Official Music Video).mp3';

// Import all images
import Image1 from './1.jpg';
import Image2 from './2.jpg';
import Image3 from './3.jpg';
import Image4 from './4.jpg';
import Image5 from './5.jpg';
import Image6 from './6.jpg';
import Image7 from './7.jpg';
import Image8 from './8.jpg';
import Image9 from './9.jpg';

function InvitationPage() {
  const [isPlanInteracted, setIsPlanInteracted] = useState(false); // Track if all items are expanded
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if email is sent
  const [isPlaying, setIsPlaying] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [expandedItems, setExpandedItems] = useState({
    item1: false, // For 18:00 - 19:00 (Clam Izakaya Sushi)
    item2: false, // For 19:30 - 20:00 (Photo Booth)
    item3: false, // For 20:30 - 21:30 (Nam Long Park)
  });

  const images = [Image1, Image2, Image3, Image4, Image5, Image6, Image7, Image8, Image9];
  const audioRef = React.useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(audioFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5; // Set volume to 50%

    // Try to autoplay when the page loads
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
        console.error('Error playing audio:', error);
        // If autoplay fails, show a button to play manually
        setIsPlaying(false);
      }
    };

    playAudio();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  // Add carousel auto-rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, 3000); // Change image every 3 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => {
          console.log('Audio started playing successfully');
          setIsPlaying(true);
        })
        .catch(error => {
          console.error('Error playing audio:', error);
          console.log('Audio file path:', audioFile);
          console.log('Audio element:', audioRef.current);
          alert('Không thể phát nhạc. Vui lòng kiểm tra lại file nhạc. Chi tiết lỗi: ' + error.message);
        });
    }
  };

  const createConfetti = () => {
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: Date.now() + i,
      left: Math.random() * 100,
      delay: Math.random() * 2,
      color: `hsl(${Math.random() * 60 + 330}, 100%, 50%)`,
    }));
    setConfetti(newConfetti);
  };

  emailjs.init('pScm0k2yToKA-hQnu');

  const handleAccept = (e) => {
    e.preventDefault();
    createConfetti();

    const templateParams = {
      to_email: 'nguyenminh090903@gmail.com',
      message: 'Võ Ngọc Hoa (Pé Pôngiuoi) đã đồng ý đi hẹn hò với Nguyễn Minh vào thứ Sáu, ngày 25/4/2025!',
    };

    emailjs
      .send('service_dz00foo', 'template_f2fz7oe', templateParams)
      .then((response) => {
        console.log('Email đã gửi thành công:', response);
        setIsSubmitted(true);
      })
      .catch((error) => {
        console.error('Gửi email thất bại:', error);
        alert('Có lỗi xảy ra khi gửi email. Vui lòng thử lại! Chi tiết: ' + error.text);
      });
  };

  // Updated animation variants
  const pageTransition = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.8,
        ease: [0.6, -0.05, 0.01, 0.99]
      }
    },
  };

  const titleAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      }
    },
    hover: {
      scale: 1.05,
      rotate: [0, -2, 2, 0],
      transition: {
        duration: 0.3
      }
    }
  };

  const imageAnimation = {
    hidden: { scale: 0, rotate: -180 },
    visible: {
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        stiffness: 260,
        damping: 20
      }
    },
    hover: {
      scale: 1.05,
      rotate: 5,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    }
  };

  const textAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const cardAnimation = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0px 5px 15px rgba(0,0,0,0.1)",
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.98
    }
  };

  const expandAnimation = {
    hidden: { 
      height: 0,
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut"
      }
    },
    visible: { 
      height: "auto",
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const buttonAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 500,
        damping: 25
      }
    },
    hover: {
      scale: 1.1,
      rotate: [0, -3, 3, 0],
      transition: {
        duration: 0.3
      }
    },
    tap: {
      scale: 0.9
    }
  };

  // Toggle function for itinerary items, checking if all items are expanded
  const toggleItem = (item) => {
    setExpandedItems((prev) => {
      const newExpandedItems = { ...prev, [item]: !prev[item] };
      // Check if all items are now expanded
      const allExpanded = Object.values(newExpandedItems).every((expanded) => expanded === true);
      setIsPlanInteracted(allExpanded); // Show "Đồng ý" only when all items are expanded
      return newExpandedItems;
    });
  };

  return (
    <motion.div 
      className="App"
      initial="hidden"
      animate="visible"
      variants={pageTransition}
    >
      {/* Confetti animation */}
      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            className="confetti"
            style={{
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
            }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ 
              y: ["0vh", "100vh"],
              opacity: [0, 1, 1, 0],
              rotate: [0, 360, 720]
            }}
            exit={{ opacity: 0 }}
            transition={{ 
              duration: 3,
              ease: "easeOut",
              times: [0, 0.2, 0.8, 1]
            }}
          />
        ))}
      </AnimatePresence>

      {/* Enhanced music player */}
      <div className="music-player">
        <button onClick={toggleMusic} className="music-button">
          {isPlaying ? '🔊' : '🔈'}
        </button>
        <span className="music-label">Nhạc nền</span>
        <div className="volume-control">
          <input
            type="range"
            min="0"
            max="1"
            step="0.1"
            defaultValue="0.5"
            onChange={(e) => {
              if (audioRef.current) {
                audioRef.current.volume = e.target.value;
              }
            }}
          />
        </div>
      </div>

      <header className="App-header">
        <motion.h1
          className="title"
          variants={titleAnimation}
          whileHover="hover"
        >
          <span className="main-title">Thư mời</span><br />
          <span className="quote">"gặp gỡ yêu thương"</span> ✨
        </motion.h1>

        <motion.div
          className="image-carousel"
          variants={imageAnimation}
          whileHover="hover"
        >
          <AnimatePresence mode="wait">
            <motion.img
              key={currentImageIndex}
              src={images[currentImageIndex]}
              alt="Cặp đôi"
              className="date-image"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.2 }}
              transition={{ duration: 0.5 }}
            />
          </AnimatePresence>
          <div className="carousel-controls">
            <button 
              onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
              className="carousel-button"
            >
              ❮
            </button>
            <button 
              onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
              className="carousel-button"
            >
              ❯
            </button>
          </div>
          <div className="carousel-dots">
            {images.map((_, index) => (
              <button
                key={index}
                className={`carousel-dot ${index === currentImageIndex ? 'active' : ''}`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        </motion.div>

        <motion.div variants={textAnimation}>
          <p className="greeting">
            Thân gửi Võ Ngọc Hoa<br />
            <span className="nickname">(Pé Pôngiuoi)🌸</span> 
          </p>
          <p className="invitation">
            Anh rất mong em có thể dành thời gian gặp anh vào <span className="date-line"><span className="highlight-date">thứ Sáu, ngày 25/4/2025</span></span>. Sau một khoảng thời gian được làm quen và tìm hiểu em, mỗi ngày anh càng thêm nhận ra em là cô gái đặc biệt đối với anh. Nụ cười tươi tắn và tính cách vui vẻ của em đã khiến anh quan tâm nhiều nhiều. 💝 Anh đã chuẩn bị một buổi tối thật ý nghĩa để tụi mình cùng tạo những khoảnh khắc đáng nhớ nha! Hẹn em tối mai nhé! 💕
          </p>
        </motion.div>

        <motion.div className="itinerary-wrapper">
          {Object.entries(expandedItems).map(([key, isExpanded], index) => (
            <motion.div
              key={key}
              className="itinerary-item"
              variants={cardAnimation}
              whileHover="hover"
              whileTap="tap"
              onClick={() => toggleItem(key)}
            >
              <div className="itinerary-time">
                {index === 0 ? "18:00 - 19:00" : 
                 index === 1 ? "19:30 - 20:00" : 
                 "20:30 - 21:30"} {isExpanded ? "▼" : "►"}
              </div>
              <AnimatePresence>
                {isExpanded && (
                  <motion.div
                    className="itinerary-content"
                    variants={expandAnimation}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                  >
                    {index === 0 ? (
                      <>
                        <h3>Bữa tối tại Clam Izakaya Sushi</h3>
                        <p>Thưởng thức món Nhật cùng nhau tại Clam Izakaya Sushi mà em hay kể, anh rất muốn thử với em! 🍣</p>
                        <motion.img
                          src={Clam}
                          alt="Clam Izakaya Sushi"
                          className="location-image"
                          whileHover={{ scale: 1.05, rotate: 2 }}
                        />
                      </>
                    ) : index === 1 ? (
                      <>
                        <h3>Chụp ảnh tại Photo Booth</h3>
                        <p>Chúng mình có thể chọn một trong hai địa điểm để chụp ảnh kỷ niệm nha! 📸</p>
                        <div className="photo-booth-options">
                          <div className="photo-booth-option">
                            <h4>Photo Time</h4>
                            <a href="https://www.facebook.com/phototimevn" target="_blank" rel="noopener noreferrer">
                              <motion.img
                                src={PhotoTime}
                                alt="Photo Time"
                                className="location-image"
                                whileHover={{ scale: 1.05, rotate: 2 }}
                              />
                            </a>
                          </div>
                          <div className="photo-booth-option">
                            <h4>Photo Object</h4>
                            <a href="https://www.facebook.com/photoobjetvietnam" target="_blank" rel="noopener noreferrer">
                              <motion.img
                                src={PhotoObject}
                                alt="Photo Object"
                                className="location-image"
                                whileHover={{ scale: 1.05, rotate: 2 }}
                              />
                            </a>
                          </div>
                        </div>
                      </>
                    ) : (
                      <>
                        <h3>Dạo bước tại Công viên Nam Long</h3>
                        <p>Cùng nhau tản bộ, ngắm cảnh và trò chuyện dưới ánh đèn lung linh của công viên Nam Long 🌟</p>
                        <motion.img
                          src={NamLong}
                          alt="Công viên Nam Long"
                          className="location-image"
                          whileHover={{ scale: 1.05, rotate: 2 }}
                        />
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        {!isSubmitted && isPlanInteracted && (
          <motion.button
            className="accept-button"
            onClick={handleAccept}
            variants={buttonAnimation}
            whileHover="hover"
            whileTap="tap"
          >
            Đồng ý 🌷
          </motion.button>
        )}

        {isSubmitted && (
          <motion.div
            className="confirmation-wrapper"
            variants={cardAnimation}
            initial="hidden"
            animate="visible"
          >
            <motion.p className="signature" variants={textAnimation}>
              Trân trọng, <br /> Nguyễn Minh 💌
            </motion.p>
            <motion.p className="confirmation" variants={textAnimation}>
              Cảm ơn Pé iu đã đồng ý! Anh chờ tới ngày đó nha! 💕
            </motion.p>
          </motion.div>
        )}
      </header>
    </motion.div>
  );
}

export default InvitationPage;