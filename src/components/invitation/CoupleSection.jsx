
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Heart, Sparkles } from "lucide-react";

const petals = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 9) % 100}%`,
  delay: (i % 7) * 0.7,
  duration: 9 + (i % 5),
}));

const sparkles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 31 + 7) % 100}%`,
  top: `${(i * 43 + 11) % 100}%`,
  delay: (i % 9) * 0.25,
}));

const floatingHearts = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  left: `${(i * 29 + 5) % 100}%`,
  delay: (i % 6) * 0.18,
  duration: 3.5 + (i % 4) * 0.5,
  size: 13 + (i % 4) * 5,
}));

export default function CoupleSection() {
  const sectionRef = useRef(null);
  const [showPhoto, setShowPhoto] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const element = sectionRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!showPhoto) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") setShowPhoto(false);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [showPhoto]);

  return (
    <section
      ref={sectionRef}
      className="couple-story-section"
    >
      {/* SAME WEDDING TEMPLATE */}
      <div className="couple-story-bg" />
      <div className="couple-story-overlay" />

      {/* FALLING PINK PETALS */}
      <div className="couple-petal-layer">
        {petals.map((petal) => (
          <motion.span
            key={petal.id}
            className="couple-floating-petal"
            style={{ left: petal.left }}
            animate={{
              y: ["-8vh", "108vh"],
              x: [0, 24, -18, 12],
              rotate: [0, 140, 280, 420],
              opacity: [0, 0.8, 0.65, 0],
            }}
            transition={{
              duration: petal.duration,
              delay: petal.delay,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* GOLDEN SPARKLES */}
      <div className="couple-sparkle-layer">
        {sparkles.map((sparkle) => (
          <motion.span
            key={sparkle.id}
            className="couple-sparkle"
            style={{
              left: sparkle.left,
              top: sparkle.top,
            }}
            animate={{
              opacity: [0.15, 1, 0.2],
              scale: [0.4, 1.7, 0.4],
              rotate: [0, 90, 180],
            }}
            transition={{
              duration: 2.8,
              delay: sparkle.delay,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      {/* COUPLE CONTENT */}
      <div className="couple-story-content">
        <motion.div
          className="couple-story-flourish"
          initial={{ opacity: 0, scale: 0, rotate: -40 }}
          animate={isVisible ? {
            opacity: 1,
            scale: 1,
            rotate: 0,
          } : {}}
          transition={{ duration: 1.1, ease: "backOut" }}
        >
          ❦
        </motion.div>

        <motion.p
          className="couple-story-eyebrow"
          initial={{ opacity: 0, y: 18 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.25, duration: 0.8 }}
        >
          TWO SOULS, ONE JOURNEY
        </motion.p>

        <motion.h2
          className="couple-story-heading"
          initial={{ opacity: 0, y: 25 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.9 }}
        >
          The beginning of forever
        </motion.h2>

        <motion.p
          className="couple-story-intro"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 1 }}
        >
          Every love story has a beautiful beginning...
        </motion.p>

        {/* TAP TO REVEAL */}
        <motion.button
          type="button"
          className="couple-reveal-card"
          onClick={() => setShowPhoto(true)}
          initial={{ opacity: 0, scale: 0.8, y: 35 }}
          animate={isVisible ? {
            opacity: 1,
            scale: 1,
            y: 0,
          } : {}}
          transition={{
            delay: 1,
            duration: 1,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ scale: 1.045, y: -5 }}
          whileTap={{ scale: 0.96 }}
        >
          <span className="reveal-card-inner">
            <span className="reveal-card-icon">
              <Heart size={25} fill="currentColor" />
            </span>

            <span className="reveal-card-title">
              A glimpse of us
            </span>

            <span className="reveal-card-subtitle">
              A little moment, a lifetime of love
            </span>

            <span className="reveal-card-action">
              <span className="reveal-pulse" />
              TAP TO REVEAL
            </span>
          </span>

          <span className="reveal-card-corner corner-one">❧</span>
          <span className="reveal-card-corner corner-two">❧</span>
          <span className="reveal-card-corner corner-three">❧</span>
          <span className="reveal-card-corner corner-four">❧</span>
        </motion.button>

        <motion.div
          className="couple-story-names"
          initial={{ opacity: 0, y: 15 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1.3, duration: 0.8 }}
        >
          Vihaan <span>&</span> Meera
        </motion.div>

        <motion.p
          className="couple-story-message"
          initial={{ opacity: 0 }}
          animate={isVisible ? { opacity: 1 } : {}}
          transition={{ delay: 1.5, duration: 1 }}
        >
          Two hearts found their way to each other.
          Now begins their forever.
        </motion.p>

        <motion.div
          className="couple-story-ending"
          initial={{ opacity: 0, scale: 0.7 }}
          animate={isVisible ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 1.8, duration: 0.8 }}
        >
          ✧ A LIFETIME OF LOVE AWAITS ✧
        </motion.div>
      </div>

      {/* PHOTO POPUP */}
      <AnimatePresence>
        {showPhoto && (
          <motion.div
            className="couple-photo-modal"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.45 }}
            onClick={() => setShowPhoto(false)}
          >
            <div className="popup-heart-layer">
              {floatingHearts.map((heart) => (
                <motion.div
                  key={heart.id}
                  className="popup-floating-heart"
                  style={{
                    left: heart.left,
                    fontSize: heart.size,
                  }}
                  initial={{ opacity: 0, y: 80, scale: 0.3 }}
                  animate={{
                    opacity: [0, 1, 0.8, 0],
                    y: [-20, -180, -390],
                    x: [0, 25, -20, 15],
                    scale: [0.4, 1.2, 0.8],
                    rotate: [0, 18, -18],
                  }}
                  transition={{
                    duration: heart.duration,
                    delay: heart.delay,
                    repeat: Infinity,
                    ease: "easeOut",
                  }}
                >
                  ♥
                </motion.div>
              ))}
            </div>

            <motion.div
              className="popup-golden-burst"
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{
                opacity: [0, 1, 0],
                scale: [0.1, 2.5, 4],
              }}
              transition={{ duration: 1.2 }}
            />

            <motion.button
              type="button"
              className="couple-modal-close"
              aria-label="Close photo"
              onClick={() => setShowPhoto(false)}
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              exit={{ opacity: 0, rotate: -90 }}
            >
              <X size={21} />
            </motion.button>

            <motion.div
              className="couple-modal-content"
              onClick={(event) => event.stopPropagation()}
              initial={{
                opacity: 0,
                y: 80,
                scale: 0.65,
                rotate: -5,
                filter: "blur(12px)",
              }}
              animate={{
                opacity: 1,
                y: 0,
                scale: 1,
                rotate: 0,
                filter: "blur(0px)",
              }}
              exit={{
                opacity: 0,
                y: 50,
                scale: 0.75,
                filter: "blur(8px)",
              }}
              transition={{
                type: "spring",
                stiffness: 115,
                damping: 16,
              }}
            >
              <motion.div
                className="modal-top-flourish"
                initial={{ scale: 0, rotate: -90 }}
                animate={{ scale: 1, rotate: 0 }}
                transition={{ delay: 0.35, duration: 0.8 }}
              >
                ❦
              </motion.div>

              <motion.p
                className="modal-eyebrow"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
              >
                A MOMENT TO CHERISH
              </motion.p>

              <div className="modal-photo-frame">
                <motion.div
                  className="modal-photo-glow"
                  animate={{
                    opacity: [0.35, 0.85, 0.35],
                    scale: [0.98, 1.04, 0.98],
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                />

                <motion.img
                  src="/images/couple.jpg"
                  alt="The couple together"
                  initial={{
                    opacity: 0,
                    scale: 1.15,
                    filter: "blur(12px)",
                  }}
                  animate={{
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  transition={{
                    delay: 0.45,
                    duration: 1.1,
                    ease: "easeOut",
                  }}
                />

                <span className="modal-photo-border" />
              </div>

              <motion.h3
                className="modal-couple-names"
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.75 }}
              >
                Vihaan <span>&</span> Meera
              </motion.h3>

              <motion.p
                className="modal-love-message"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                One beautiful love. One beautiful forever.
              </motion.p>

              <motion.div
                className="modal-heart-divider"
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ delay: 1.1, duration: 0.8 }}
              >
                <span>♥</span>
              </motion.div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .couple-story-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 55px 18px;
          background: #f8ecdf;
        }

        /* SAME TEMPLATE IMAGE USED IN THE OTHER SECTIONS */
        .couple-story-bg {
          position: absolute;
          inset: 0;
          z-index: -3;
          background-image: url("/images/template.jpg");
          background-size: 100% 100%;
          background-position: center;
          background-repeat: no-repeat;
        }

        .couple-story-overlay {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            rgba(255,250,241,.06),
            rgba(255,246,231,.15)
          );
        }

        .couple-petal-layer,
        .couple-sparkle-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .couple-petal-layer { z-index: 1; }
        .couple-sparkle-layer { z-index: 2; }

        .couple-floating-petal {
          position: absolute;
          top: -25px;
          width: 10px;
          height: 16px;
          border-radius: 100% 0 100% 0;
          background: linear-gradient(135deg,#d88c91,#fff0dc);
          box-shadow: 0 2px 9px rgba(151,95,74,.2);
        }

        .couple-sparkle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #d5a34c;
          box-shadow: 0 0 10px 3px rgba(212,163,79,.5);
        }

        .couple-story-content {
          position: relative;
          z-index: 4;
          width: min(100%,390px);
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
        }

        .couple-story-flourish {
          color: #bd9255;
          font-size: 37px;
          line-height: 1;
          margin-bottom: 10px;
        }

        .couple-story-eyebrow,
        .modal-eyebrow {
          margin: 0 0 10px;
          color: #986b39;
          font: 600 9px "DM Sans",sans-serif;
          letter-spacing: 3px;
        }

        .couple-story-heading {
          margin: 0 0 8px;
          color: #793e49;
          font: italic 31px "Cormorant Garamond",Georgia,serif;
        }

        .couple-story-intro {
          margin: 0 0 20px;
          color: #906d60;
          font: italic 16px/1.5 "Cormorant Garamond",Georgia,serif;
        }

        .couple-reveal-card {
          position: relative;
          width: min(82%,275px);
          min-height: 185px;
          padding: 9px;
          border: 1px solid rgba(182,135,67,.9);
          background: linear-gradient(
            140deg,
            rgba(255,249,237,.95),
            rgba(239,215,177,.88),
            rgba(255,251,242,.96)
          );
          box-shadow:
            0 12px 35px rgba(106,68,37,.18),
            inset 0 0 0 3px rgba(255,255,255,.65);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
        }

        .reveal-card-inner {
          min-height: 165px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 18px 12px;
          border: 1px solid rgba(177,132,71,.45);
          background: rgba(255,250,239,.7);
        }

        .reveal-card-icon {
          color: #a94d60;
          margin-bottom: 10px;
          animation: revealHeartBeat 1.7s ease-in-out infinite;
        }

        @keyframes revealHeartBeat {
          0%,100% { transform: scale(1); }
          15% { transform: scale(1.2); }
          30% { transform: scale(1); }
          45% { transform: scale(1.12); }
        }

        .reveal-card-title {
          color: #793e49;
          font: italic 25px "Cormorant Garamond",Georgia,serif;
        }

        .reveal-card-subtitle {
          margin-top: 5px;
          color: #98755d;
          font: italic 14px "Cormorant Garamond",Georgia,serif;
        }

        .reveal-card-action {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-top: 18px;
          color: #986b39;
          font: 700 8px "DM Sans",sans-serif;
          letter-spacing: 2px;
        }

        .reveal-pulse {
          width: 6px;
          height: 6px;
          border-radius: 50%;
          background: #b77a36;
          animation: revealPulse 1.6s infinite;
        }

        @keyframes revealPulse {
          70% { box-shadow: 0 0 0 8px rgba(183,122,54,0); }
          100% { box-shadow: 0 0 0 0 rgba(183,122,54,0); }
        }

        .reveal-card-corner {
          position: absolute;
          color: #b88b4e;
          font-size: 22px;
        }

        .corner-one { top:5px; left:8px; }
        .corner-two { top:5px; right:8px; transform:scaleX(-1); }
        .corner-three { bottom:5px; left:8px; transform:scaleY(-1); }
        .corner-four { bottom:5px; right:8px; transform:scale(-1); }

        .couple-story-names {
          margin-top: 19px;
          color: #793e49;
          font: 400 34px "Great Vibes",cursive;
        }

        .couple-story-names span,
        .modal-couple-names span {
          color: #bd9255;
          font-family: "Cormorant Garamond",serif;
          font-style: italic;
        }

        .couple-story-message {
          max-width: 300px;
          margin: 8px 0 0;
          color: #906d60;
          font: italic 15px/1.5 "Cormorant Garamond",Georgia,serif;
        }

        .couple-story-ending {
          margin-top: 14px;
          color: #986b39;
          font: 600 8px "DM Sans",sans-serif;
          letter-spacing: 2px;
        }

        /* PHOTO POPUP */
        .couple-photo-modal {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 24px 18px;
          background: radial-gradient(
            ellipse at center,
            rgba(103,49,62,.78),
            rgba(42,22,29,.94)
          );
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

        .popup-heart-layer {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .popup-floating-heart {
          position: absolute;
          bottom: -40px;
          color: #f0a6b5;
          text-shadow: 0 0 15px rgba(255,191,205,.8);
        }

        .popup-golden-burst {
          position: absolute;
          width: 170px;
          height: 170px;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255,223,157,.8),
            rgba(255,190,113,.2) 40%,
            transparent 70%
          );
          pointer-events: none;
        }

        .couple-modal-close {
          position: absolute;
          z-index: 5;
          top: max(22px,env(safe-area-inset-top));
          right: 20px;
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          border: 1px solid rgba(255,255,255,.5);
          border-radius: 50%;
          color: #fff8eb;
          background: rgba(255,255,255,.12);
          cursor: pointer;
        }

        .couple-modal-content {
          position: relative;
          z-index: 3;
          width: min(100%,370px);
          padding: 25px 20px 24px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          border: 1px solid #d9b77c;
          background: linear-gradient(145deg,#fff9ed,#f5e5d1 55%,#fff8ee);
          box-shadow:
            0 25px 80px rgba(0,0,0,.4),
            0 0 35px rgba(255,218,160,.25);
        }

        .couple-modal-content::before {
          content: "";
          position: absolute;
          inset: 7px;
          border: 1px solid rgba(181,135,68,.5);
          pointer-events: none;
        }

        .modal-top-flourish {
          color: #b88b4e;
          font-size: 33px;
          margin-bottom: 5px;
        }

        .modal-eyebrow {
          font-size: 8px;
          margin-bottom: 17px;
        }

        .modal-photo-frame {
          position: relative;
          width: min(100%,270px);
          aspect-ratio: 4 / 5;
          padding: 8px;
          border: 1px solid #c49a5d;
          background: linear-gradient(135deg,#c49a5d,#fff1d2,#bd9152);
          box-shadow: 0 12px 35px rgba(91,56,35,.25);
        }

        .modal-photo-frame img {
          position: relative;
          z-index: 1;
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          object-position: center;
        }

        .modal-photo-glow {
          position: absolute;
          inset: -10px;
          border-radius: 5px;
          background: rgba(255,214,139,.45);
          filter: blur(18px);
        }

        .modal-photo-border {
          position: absolute;
          z-index: 2;
          inset: 13px;
          border: 1px solid rgba(255,255,255,.8);
          pointer-events: none;
        }

        .modal-couple-names {
          margin: 19px 0 0;
          color: #793e49;
          font: 400 37px "Great Vibes",cursive;
        }

        .modal-love-message {
          margin: 7px 0 0;
          color: #906d60;
          font: italic 15px "Cormorant Garamond",Georgia,serif;
        }

        .modal-heart-divider {
          width: 95px;
          height: 1px;
          position: relative;
          margin-top: 20px;
          background: #c29a60;
        }

        .modal-heart-divider span {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%,-50%);
          padding: 0 9px;
          color: #a84e61;
          background: #f8eddf;
          font-size: 14px;
        }

        @media (max-width: 380px) {
          .couple-story-section {
            padding: 40px 15px;
          }

          .couple-story-heading {
            font-size: 27px;
          }

          .couple-reveal-card {
            width: 78%;
            min-height: 170px;
          }

          .reveal-card-inner {
            min-height: 150px;
          }

          .couple-modal-content {
            padding: 20px 15px;
          }

          .modal-photo-frame {
            width: min(100%,245px);
          }
        }

        @media (max-height: 700px) {
          .couple-story-section {
            padding-top: 32px;
            padding-bottom: 32px;
          }

          .couple-story-flourish {
            font-size: 29px;
          }

          .couple-story-heading {
            margin-bottom: 5px;
            font-size: 27px;
          }

          .couple-story-intro {
            margin-bottom: 13px;
          }

          .couple-reveal-card {
            min-height: 150px;
          }

          .reveal-card-inner {
            min-height: 130px;
          }

          .couple-story-names {
            margin-top: 13px;
          }

          .couple-story-ending {
            margin-top: 9px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .couple-floating-petal,
          .couple-sparkle,
          .popup-floating-heart,
          .reveal-card-icon {
            animation: none !important;
          }
        }
      `}</style>
    </section>
  );
}
