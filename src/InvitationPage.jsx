import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import audioFile from './ok.mp3';
import Ty1 from './ty1.jpg';
import Ty2 from './ty2.jpg';
import Ty3 from './ty3.jpg';

const videos = [
  require('./ty11.mp4'),
  require('./ty12.mp4'),
  require('./ty13.mp4'),
];
const images = [Ty1, Ty2, Ty3];

function InvitationPage() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [confetti, setConfetti] = useState([]);
  const audioRef = React.useRef(null);

  useEffect(() => {
    audioRef.current = new Audio(audioFile);
    audioRef.current.loop = true;
    audioRef.current.volume = 0.5;
    const playAudio = async () => {
      try {
        await audioRef.current.play();
        setIsPlaying(true);
      } catch (error) {
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

  const toggleMusic = () => {
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play()
        .then(() => setIsPlaying(true))
        .catch(error => {
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

  const handleAccept = () => {
    createConfetti();
        setIsSubmitted(true);
  };

  // Animation variants
  const textAnimation = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };
  const buttonAnimation = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 25 } },
    hover: { scale: 1.1, rotate: [0, -3, 3, 0], transition: { duration: 0.3 } },
    tap: { scale: 0.9 }
  };

  // Animated gradient background
  const animatedBg = {
    background: 'linear-gradient(120deg, #f8e1f4 0%, #f6f7fa 50%, #b2e0f7 100%)',
    minHeight: '100vh',
    width: '100vw',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0,
    animation: 'gradientMove 12s ease-in-out infinite',
    backgroundSize: '200% 200%'
  };

  return (
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden', fontFamily: 'serif' }}>
      {/* Animated gradient background */}
      <style>{`
        @keyframes gradientMove {
          0% {background-position: 0% 50%;}
          50% {background-position: 100% 50%;}
          100% {background-position: 0% 50%;}
        }
        .shine-title {
          background: linear-gradient(90deg, #ffb6b9 20%, #fff 40%, #b2e0f7 60%, #ffb6b9 80%);
          background-size: 200% auto;
          color: #2c3e50;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: shine 2.5s linear infinite;
        }
        @keyframes shine {
          to {background-position: 200% center;}
        }
        .handdrawn-border {
          border: 4px solid transparent;
          border-image: url('data:image/svg+xml;utf8,<svg width="40" height="40" xmlns="http://www.w3.org/2000/svg"><path d="M5,20 Q10,5 20,5 Q30,5 35,20 Q30,35 20,35 Q10,35 5,20 Z" fill="none" stroke="%23ffb6b9" stroke-width="3"/></svg>') 10 round;
        }
      `}</style>
      <div style={animatedBg}></div>

      {/* Floating SVG hearts/flowers nghệ thuật */}
      <svg style={{position:'fixed',top:0,left:0,width:'100vw',height:'100vh',pointerEvents:'none',zIndex:10}}>
        {[...Array(6)].map((_,i)=>(
          <g key={i} style={{animation:`floatHeart${i} 12s linear infinite`,opacity:0.5+0.2*Math.random()}}>
            <path d="M12 2C10 2 8 4 8 6c0 2 2 4 4 6 2-2 4-4 4-6 0-2-2-4-4-4z" fill="#ffb6b9" transform={`translate(${30+Math.random()*60},${-20+Math.random()*20}) scale(${1+Math.random()*0.7})`}/>
          </g>
        ))}
        <style>{[...Array(6)].map((_,i)=>`@keyframes floatHeart${i}{0%{transform:translateY(0);}100%{transform:translateY(110vh);}}`).join('')}</style>
      </svg>

      <AnimatePresence>
        {confetti.map((piece) => (
          <motion.div
            key={piece.id}
            style={{
              position: 'fixed',
              width: 10,
              height: 10,
              borderRadius: '50%',
              left: `${piece.left}%`,
              backgroundColor: piece.color,
              animationDelay: `${piece.delay}s`,
              zIndex: 9999
            }}
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: ["0vh", "100vh"], opacity: [0, 1, 1, 0], rotate: [0, 360, 720] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 3, ease: "easeOut", times: [0, 0.2, 0.8, 1] }}
          />
        ))}
      </AnimatePresence>

      {/* Music player */}
      <div style={{ position: 'fixed', top: 20, right: 20, background: '#fff', borderRadius: 30, boxShadow: '0 2px 10px rgba(0,0,0,0.1)', padding: '10px 15px', display: 'flex', alignItems: 'center', gap: 10, zIndex: 100 }}>
        <button onClick={toggleMusic} style={{ background: 'none', border: 'none', fontSize: 24, cursor: 'pointer' }}>
          {isPlaying ? '🔊' : '🔈'}
        </button>
        <span style={{ fontSize: 14, color: '#2c3e50' }}>Nhạc nền</span>
        <div style={{ width: 100 }}>
          <input type="range" min="0" max="1" step="0.1" defaultValue="0.5" onChange={(e) => { if (audioRef.current) { audioRef.current.volume = e.target.value; } }} style={{ width: '100%' }} />
        </div>
      </div>

      {/* Thư tỏ tình nghệ thuật */}
      <div style={{
        maxWidth: 700,
        margin: '64px auto 40px auto',
        background: 'url("https://www.transparenttextures.com/patterns/old-mathematics.png"), #fffbe6',
        borderRadius: 28,
        boxShadow: '0 12px 40px 0 rgba(178,224,247,0.18), 0 2px 8px #e1705533',
        padding: '56px 36px 48px 36px',
        textAlign: 'center',
        fontFamily: '"Quicksand", "Dancing Script", cursive',
        position: 'relative',
        color: '#4d3c2a',
        border: '3px solid #ffe0e6',
        overflow: 'hidden',
        boxSizing: 'border-box',
      }}>
        {/* icon tem thư và hoa ở góc */}
        <span style={{position:'absolute',top:18,left:18,fontSize:24,opacity:0.7}}>🌺</span>
        <span style={{position:'absolute',top:18,right:18,fontSize:22,opacity:0.7}}>📮</span>
        {/* vết ố mờ nghệ thuật */}
        <svg width="120" height="60" style={{position:'absolute',bottom:10,left:30,opacity:0.18,zIndex:1}}><ellipse cx="60" cy="30" rx="55" ry="22" fill="#e1c699"/></svg>
        {/* tiêu đề gradient + underline */}
        <motion.h1 style={{ fontFamily: 'Dancing Script, cursive', fontSize: '2.5rem', marginBottom: 10, fontWeight: 700, letterSpacing:1, background:'linear-gradient(90deg,#e17055,#b2e0f7 60%,#ffb6b9)',WebkitBackgroundClip:'text',WebkitTextFillColor:'transparent',position:'relative',zIndex:2 }} initial={{opacity:0,y:-30}} animate={{opacity:1,y:0}} transition={{duration:0.8}}>
          Gửi Pé Pông iu dấu
          <span style={{display:'block',height:4,background:'linear-gradient(90deg,#ffb6b9,#b2e0f7 80%)',borderRadius:2,margin:'8px auto 0 auto',width:'60%'}}></span>
        </motion.h1>
        <div style={{ fontSize: '1.13rem', color: '#4d3c2a', textAlign: 'justify', lineHeight: 1.8, fontStyle:'italic', zIndex:3, position:'relative' }}>
          {["Anh không biết bắt đầu từ đâu, chỉ biết là mỗi lần nghĩ về em, lòng anh lại thấy vui vui, hồi hộp và mong chờ. Từ ngày mình quen nhau, mỗi khoảnh khắc bên em đều trở thành một kỷ niệm đáng nhớ. Anh thích cách em cười, thích nghe em kể chuyện, thích cả những lúc em giận dỗi dễ thương nữa.",
            "Có những lúc anh vụng về, chưa biết cách thể hiện tình cảm, nhưng anh luôn muốn dành cho em những điều tốt đẹp nhất. Anh trân trọng từng tin nhắn, từng lần gặp gỡ, từng cái nắm tay, từng ánh mắt em nhìn anh. Anh biết mình chưa hoàn hảo, nhưng anh thật lòng muốn cùng em đi qua những ngày vui, ngày buồn, cùng em trưởng thành và hạnh phúc.",
            "Nếu em đồng ý, cho anh cơ hội được ở bên cạnh, quan tâm, chăm sóc và yêu thương em nhiều hơn nữa nhé! Anh sẽ cố gắng để em cảm thấy an toàn và hạnh phúc khi ở bên anh.",
            "Cảm ơn em đã xuất hiện trong cuộc đời anh, làm cho mọi thứ trở nên ý nghĩa hơn. Anh mong rằng, từ hôm nay, vẫn câu nói cũ là mong được đồng hành cũng như gặp pé, Pé Pông nhé!"
          ].map((text, idx) => (
            <motion.p key={idx} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{duration:0.7,delay:0.5+idx*0.3}} style={{marginBottom:18}}>{text}</motion.p>
          ))}
        </div>
        {/* Chữ ký fade-in */}
        <motion.div style={{ textAlign: 'right', color: '#e17055', fontStyle: 'italic', fontSize: '1.3rem', marginTop: 32, fontFamily: 'Dancing Script, cursive', letterSpacing:1, zIndex:3, position:'relative' }} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} transition={{duration:1.2,delay:2.2}}>
          <div>Yêu em nhiều lắm,</div>
          <div>Công chúa của em <span style={{fontSize:22}}>💌</span></div>
        </motion.div>
        {/* Nút gửi trái tim em 💝 */}
        {!isSubmitted && (
          <motion.button
            onClick={handleAccept}
            variants={buttonAnimation}
            whileHover={{scale:1.12,boxShadow:'0 0 0 12px #ffe0e6',filter:'brightness(1.1)'}}
            whileTap={{scale:0.95}}
            style={{
              background: 'linear-gradient(45deg, #ffb6b9, #b2e0f7)',
              color: '#fff',
              border: 'none',
              padding: '15px 38px',
              fontSize: '1.2rem',
              borderRadius: 30,
              cursor: 'pointer',
              margin: '32px auto 0 auto',
              display: 'block',
              fontFamily: 'Dancing Script, cursive',
              fontWeight: 700,
              letterSpacing:1,
              boxShadow: '0 5px 15px rgba(255, 107, 107, 0.2)',
              transition: 'all 0.3s ease',
              zIndex: 2000,
              position: 'relative',
              overflow: 'hidden',
              outline: 'none',
              animation: 'pulseBtn 2s infinite',
            }}
          >
            <span style={{position:'absolute',left:18,top:10,fontSize:22,opacity:0.7}}>💖</span>
            Gửi trái tim em 💝
            <span style={{position:'absolute',right:18,bottom:10,fontSize:22,opacity:0.7}}>✨</span>
          </motion.button>
        )}
        {isSubmitted && (
          <motion.div
            style={{
              margin: '30px auto',
              padding: 20,
              background: 'rgba(255,255,255,0.95)',
              borderRadius: 15,
              boxShadow: '0 5px 15px rgba(0,0,0,0.1)',
              maxWidth: 500,
              textAlign: 'center',
              fontSize: '1.2rem',
              color: '#2c3e50',
              fontFamily: 'serif',
            }}
            variants={textAnimation}
            initial="hidden"
            animate="visible"
          >
            Cảm ơn em đã đọc lá thư của anh! Anh hy vọng em sẽ cho anh cơ hội được cùng em tạo thêm nhiều kỷ niệm đẹp. 💕
          </motion.div>
        )}
        <style>{`
          @keyframes pulseBtn {
            0% { box-shadow: 0 0 0 0 #ffe0e6; }
            70% { box-shadow: 0 0 0 12px #ffe0e600; }
            100% { box-shadow: 0 0 0 0 #ffe0e6; }
          }
        `}</style>
      </div>

      {/* Gallery */}
      <div style={{
        maxWidth: 900,
        margin: '0 auto 40px auto',
        background: 'rgba(255,255,255,0.98)',
        borderRadius: 22,
        boxShadow: '0 8px 32px rgba(178,224,247,0.18)',
        padding: '32px 16px',
        position: 'relative',
      }} className="handdrawn-border">
        {/* icon hoa ở góc */}
        <span style={{position:'absolute',top:10,right:18,fontSize:28,opacity:0.7}}>🌼</span>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 24,
        }}>
          {images.map((img, idx) => (
            <motion.div key={idx} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.7,delay:0.3+idx*0.2}} whileHover={{scale:1.08,boxShadow:'0 8px 32px rgba(255,182,193,0.18)'}} style={{ background: '#fff', borderRadius: 15, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', border:'2px dashed #ffe0e6' }}>
              <img src={img} alt="" style={{ width: '100%', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'block' }} />
                  </motion.div>
          ))}
          {videos.map((vid, idx) => (
            <motion.div key={idx + images.length} initial={{opacity:0,scale:0.9}} animate={{opacity:1,scale:1}} transition={{duration:0.7,delay:0.3+(idx+images.length)*0.2}} whileHover={{scale:1.08,boxShadow:'0 8px 32px rgba(178,224,247,0.18)'}} style={{ background: '#fff', borderRadius: 15, padding: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.04)', display: 'flex', alignItems: 'center', justifyContent: 'center', border:'2px dashed #b2e0f7' }}>
              <video autoPlay loop muted playsInline style={{ width: '100%', borderRadius: 12, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', display: 'block' }}>
                <source src={vid} type="video/mp4" />
                Trình duyệt của bạn không hỗ trợ video.
              </video>
            </motion.div>
          ))}
        </div>
        {/* icon máy ảnh ở góc */}
        <span style={{position:'absolute',bottom:10,left:18,fontSize:28,opacity:0.7}}>📷</span>
      </div>
    </div>
  );
}

export default InvitationPage;