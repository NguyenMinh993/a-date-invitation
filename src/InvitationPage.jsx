import React, { useState } from 'react';
import './App.css';
import Pong from './Pong.jpg';
import Clam from './clam.png';
import emailjs from '@emailjs/browser';
import NinhKieu from './NinhKieu.jpg';
import { motion, AnimatePresence } from 'framer-motion';

function InvitationPage() {
  const [isPlanInteracted, setIsPlanInteracted] = useState(false); // Track if all items are expanded
  const [isSubmitted, setIsSubmitted] = useState(false); // Track if email is sent
  const [expandedItems, setExpandedItems] = useState({
    item1: false, // For 18:00 - 19:00 (Clam Izakaya Sushi)
    item2: false, // For 19:30 - 20:00 (Ninh Kiều)
  });

  emailjs.init('pScm0k2yToKA-hQnu');

  const handleAccept = (e) => {
    e.preventDefault();
    const templateParams = {
      to_email: 'nguyenminh090903@gmail.com',
      message: 'Võ Ngọc Hoa (Pé Pôngiuoi) đã đồng ý đi hẹn hò với Nguyễn Minh vào thứ Ba, ngày 4/3/2025!',
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

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const slideIn = {
    hidden: { x: -100, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 0.8, ease: 'easeOut' } },
  };

  const bounce = {
    hidden: { scale: 0 },
    visible: { scale: 1, transition: { duration: 0.6, type: 'spring', bounce: 0.5 } },
  };

  const spin = {
    hidden: { rotate: 0, opacity: 0 },
    visible: { rotate: 360, opacity: 1, transition: { duration: 1, ease: 'easeOut' } },
  };

  const jump = {
    hidden: { y: 0 },
    visible: {
      y: [-10, 0, -10, 0],
      transition: { duration: 1.5, repeat: Infinity, ease: 'easeInOut' },
    },
  };

  // Animation for expanding/collapsing itinerary items
  const expand = {
    hidden: { height: 0, opacity: 0, margin: 0 },
    visible: { height: 'auto', opacity: 1, margin: '10px 0', transition: { duration: 0.5, ease: 'easeInOut' } },
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
    <div className="App">
      <header className="App-header">
        <motion.h1
          className="title"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          whileHover={{ scale: 1.05, rotate: 2 }}
        >
          Thư mời <br /> "gặp gỡ gắn kết yêu thương" ✨
        </motion.h1>
        <motion.div
          className="image-container"
          initial="hidden"
          animate="visible"
          variants={spin}
          whileHover={{ rotate: 360, scale: 1.1 }}
        >
          <img src={Pong} alt="Cặp đôi" className="date-image" />
        </motion.div>
        <motion.p
          className="greeting"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          whileHover={{ scale: 1.02, color: '#ff85a2' }}
        >
          Thân gửi Võ Ngọc Hoa (Pé Pôngiuoi) 🌸,
        </motion.p>
        <motion.p
          className="invitation"
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          Anh rất mong em có thể dành thời gian gặp anh vào <span className="highlight-day">thứ Ba</span>,{" "}
          <span className="highlight-date">ngày 4/3/2025</span>. Anh đã chuẩn bị một buổi tối thật ý nghĩa để tụi mình cùng tạo những khoảnh khắc đáng nhớ nha! 💕 Đây là lịch trình anh lên kế hoạch:
        </motion.p>

        {/* Always show the itinerary, collapsed by default */}
        <motion.div
          className="itinerary-wrapper"
          initial="hidden"
          animate="visible"
          variants={slideIn}
        >
          <motion.div className="itinerary" initial="hidden" animate="visible" variants={slideIn}>
            <motion.div
              className="itinerary-item"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              onClick={() => toggleItem('item1')}
            >
              <div className="itinerary-time">
                18:00 - 19:00 {expandedItems.item1 ? '▼' : '►'}
              </div>
              <AnimatePresence>
                {expandedItems.item1 && (
                  <motion.div
                    className="itinerary-content"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={expand}
                  >
                    <motion.h3 variants={fadeIn}>Bữa tối tại Clam Izakaya Sushi</motion.h3>
                    <motion.p variants={fadeIn}>
                      Thưởng thức món Nhật cùng nhau tại Clam Izakaya Sushi mà em hay kể, anh rất muốn thử với em! 🍣
                    </motion.p>
                    <motion.img
                      src={Clam}
                      alt="Clam Izakaya Sushi"
                      className="location-image"
                      initial="hidden"
                      animate="visible"
                      variants={bounce}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>

            <motion.div
              className="itinerary-item"
              initial="hidden"
              whileInView="visible"
              variants={fadeIn}
              onClick={() => toggleItem('item2')}
            >
              <div className="itinerary-time">
                19:30 - 20:00 {expandedItems.item2 ? '▼' : '►'}
              </div>
              <AnimatePresence>
                {expandedItems.item2 && (
                  <motion.div
                    className="itinerary-content"
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    variants={expand}
                  >
                    <motion.h3 variants={fadeIn}>Đi dạo phố đi bộ Ninh Kiều</motion.h3>
                    <motion.p variants={fadeIn}>
                      Đi dạo, trò chuyện và cười thật nhiều, để tụi mình có thêm thật nhiều kỷ niệm đẹp nha! 🌟
                    </motion.p>
                    <motion.img
                      src={NinhKieu}
                      alt="Bến Ninh Kiều"
                      className="location-image"
                      initial="hidden"
                      animate="visible"
                      variants={bounce}
                      whileHover={{ scale: 1.1, rotate: 2 }}
                    />
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Show "Đồng ý" button only after all items are expanded */}
        {!isSubmitted && isPlanInteracted && (
          <motion.button
            className="accept-button"
            onClick={handleAccept}
            initial="hidden"
            animate="visible"
            variants={jump}
            whileHover={{ scale: 1.2, rotate: 5, backgroundColor: '#ff6685' }}
            whileTap={{ scale: 0.9 }}
          >
            Đồng ý 🌷
          </motion.button>
        )}

        {/* Show confirmation after submission */}
        {isSubmitted && (
          <motion.div
            className="confirmation-wrapper"
            initial="hidden"
            animate="visible"
            variants={slideIn}
          >
            <motion.p
              className="signature"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              whileHover={{ scale: 1.05, color: '#ff85a2' }}
            >
              Trân trọng, <br /> Nguyễn Minh 💌
            </motion.p>
            <motion.p
              className="confirmation"
              initial="hidden"
              animate="visible"
              variants={fadeIn}
              whileHover={{ scale: 1.02, color: '#ff6685' }}
            >
              Cảm ơn Pé iu đã đồng ý! Anh chờ tới ngày đó nha! 💕
            </motion.p>
          </motion.div>
        )}
      </header>
    </div>
  );
}

export default InvitationPage;