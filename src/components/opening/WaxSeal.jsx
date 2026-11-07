
import { motion, AnimatePresence } from "framer-motion";

export default function WaxSeal({ isOpening = false, onClick }) {
  const particles = Array.from({ length: 20 });

  return (
    <div className={`wax-seal-wrapper ${isOpening ? "seal-activated" : ""}`}>
      {!isOpening && (
        <>
          {/* Soft golden atmosphere */}
          <motion.div
            className="wax-seal-ambient-glow"
            animate={{
              scale: [0.85, 1.18, 0.85],
              opacity: [0.3, 0.75, 0.3],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Rotating ornamental rings */}
          <motion.div
            className="wax-seal-orbit orbit-one"
            animate={{ rotate: 360 }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span className="orbit-star">✦</span>
            <span className="orbit-star bottom">✧</span>
          </motion.div>

          <motion.div
            className="wax-seal-orbit orbit-two"
            animate={{ rotate: -360 }}
            transition={{
              duration: 32,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            <span className="orbit-dot" />
            <span className="orbit-dot opposite" />
          </motion.div>

          {/* Floating golden particles */}
          <div className="wax-seal-idle-particles">
            {particles.map((_, index) => {
              const angle = (index / particles.length) * Math.PI * 2;
              const radius = 42 + (index % 4) * 12;

              return (
                <motion.span
                  key={index}
                  className="idle-particle"
                  style={{
                    "--x": `${Math.cos(angle) * radius}px`,
                    "--y": `${Math.sin(angle) * radius}px`,
                  }}
                  animate={{
                    opacity: [0.15, 0.9, 0.15],
                    scale: [0.5, 1.35, 0.5],
                    y: [
                      Math.sin(angle) * radius,
                      Math.sin(angle) * radius - 8,
                      Math.sin(angle) * radius,
                    ],
                  }}
                  transition={{
                    duration: 2.4 + (index % 5) * 0.4,
                    delay: index * 0.08,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              );
            })}
          </div>

          {/* Delicate shimmer */}
          <motion.div
            className="wax-seal-shimmer-ring"
            animate={{
              opacity: [0, 0.8, 0],
              scale: [0.92, 1.12, 0.92],
            }}
            transition={{
              duration: 3.5,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        </>
      )}

      {/* Invisible clickable area over the original seal */}
      <AnimatePresence>
        {!isOpening && (
          <motion.button
            type="button"
            className="wax-seal-button"
            onClick={onClick}
            aria-label="Break the wax seal and open the wedding invitation"
            title="Open your invitation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 1.15 }}
            whileHover={{ scale: 1.06 }}
            whileTap={{ scale: 0.9 }}
            transition={{ duration: 0.25 }}
          >
            <span className="wax-seal-hover-light" />
            <span className="wax-seal-focus-ring" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Cinematic opening effect */}
      <AnimatePresence>
        {isOpening && (
          <motion.div
            className="wax-seal-magic"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Expanding golden shockwaves */}
            {[0, 1, 2, 3].map((item) => (
              <motion.span
                key={`ring-${item}`}
                className="wax-seal-burst-ring"
                initial={{ scale: 0.15, opacity: 0.95 }}
                animate={{
                  scale: [0.15, 1.8, 4.2],
                  opacity: [0.95, 0.6, 0],
                }}
                transition={{
                  duration: 1.5,
                  delay: item * 0.13,
                  ease: [0.16, 1, 0.3, 1],
                }}
              />
            ))}

            {/* Central golden bloom */}
            <motion.div
              className="wax-seal-burst-light"
              initial={{ scale: 0.1, opacity: 0 }}
              animate={{
                scale: [0.1, 1.4, 3.2],
                opacity: [0, 1, 0],
              }}
              transition={{ duration: 1.15, ease: "easeOut" }}
            />

            {/* Flying particles */}
            {particles.map((_, index) => {
              const angle = (index / particles.length) * Math.PI * 2;
              const distance = 85 + (index % 4) * 27;

              return (
                <motion.span
                  key={`burst-${index}`}
                  className="wax-seal-burst-particle"
                  initial={{
                    x: 0,
                    y: 0,
                    opacity: 0,
                    scale: 0,
                  }}
                  animate={{
                    x: Math.cos(angle) * distance,
                    y: Math.sin(angle) * distance,
                    opacity: [0, 1, 0],
                    scale: [0, 1.6, 0],
                  }}
                  transition={{
                    duration: 1.2,
                    delay: index * 0.025,
                    ease: "easeOut",
                  }}
                />
              );
            })}

            {/* Final white-gold flash */}
            <motion.div
              className="wax-seal-final-flash"
              initial={{ scale: 0, opacity: 0 }}
              animate={{
                scale: [0, 1.4, 2.8],
                opacity: [0, 1, 0],
              }}
              transition={{
                duration: 0.8,
                delay: 0.22,
                ease: "easeOut",
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .wax-seal-wrapper {
          position: absolute;
          width: 25%;
          aspect-ratio: 1;
          left: 50%;
          top: 53.8%;
          transform: translate(-50%, -50%);
          z-index: 30;
          pointer-events: none;
          isolation: isolate;
        }

        .wax-seal-ambient-glow {
          position: absolute;
          inset: -38%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 229, 174, 0.5),
            rgba(231, 180, 103, 0.2) 42%,
            transparent 72%
          );
          filter: blur(15px);
          pointer-events: none;
        }

        .wax-seal-orbit {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
        }

        .orbit-one {
          inset: -19%;
          border: 1px dashed rgba(209, 165, 99, 0.58);
        }

        .orbit-two {
          inset: -30%;
          border: 1px solid rgba(224, 184, 121, 0.23);
        }

        .orbit-star {
          position: absolute;
          top: -9px;
          left: 50%;
          transform: translateX(-50%);
          color: #e4bd7e;
          font-size: 15px;
          text-shadow: 0 0 12px #ffdc9c;
        }

        .orbit-star.bottom {
          top: auto;
          bottom: -9px;
        }

        .orbit-dot {
          position: absolute;
          width: 6px;
          height: 6px;
          top: 50%;
          left: -3px;
          border-radius: 50%;
          background: #f4d39b;
          box-shadow: 0 0 12px #e8bd79;
        }

        .orbit-dot.opposite {
          left: auto;
          right: -3px;
        }

        .wax-seal-idle-particles {
          position: absolute;
          inset: -40%;
          pointer-events: none;
        }

        .idle-particle {
          position: absolute;
          left: 50%;
          top: 50%;
          width: 4px;
          height: 4px;
          margin: -2px;
          border-radius: 50%;
          background: #fff0c9;
          box-shadow:
            0 0 7px #e9b963,
            0 0 15px rgba(255, 213, 133, 0.7);
        }

        .wax-seal-shimmer-ring {
          position: absolute;
          inset: -12%;
          border: 1px solid rgba(255, 228, 183, 0.7);
          border-radius: 50%;
          box-shadow: 0 0 18px rgba(237, 190, 113, 0.3);
          pointer-events: none;
        }

        .wax-seal-button {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          padding: 0;
          border: 0;
          border-radius: 50%;
          background: transparent;
          cursor: pointer;
          pointer-events: auto;
          overflow: visible;
          touch-action: manipulation;
          -webkit-tap-highlight-color: transparent;
        }

        .wax-seal-hover-light {
          position: absolute;
          inset: -22%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 238, 194, 0.5),
            transparent 70%
          );
          opacity: 0;
          transition: opacity 0.35s ease;
          pointer-events: none;
        }

        .wax-seal-button:hover .wax-seal-hover-light,
        .wax-seal-button:active .wax-seal-hover-light {
          opacity: 1;
        }

        .wax-seal-focus-ring {
          position: absolute;
          inset: -9%;
          border: 1px solid transparent;
          border-radius: 50%;
          pointer-events: none;
        }

        .wax-seal-button:focus-visible {
          outline: 2px solid #e7b85e;
          outline-offset: 7px;
        }

        .wax-seal-magic {
          position: absolute;
          inset: -40%;
          pointer-events: none;
        }

        .wax-seal-burst-ring {
          position: absolute;
          inset: 0;
          border: 1px solid rgba(255, 231, 181, 0.95);
          border-radius: 50%;
          box-shadow:
            0 0 12px rgba(255, 215, 145, 0.7),
            inset 0 0 12px rgba(255, 215, 145, 0.25);
        }

        .wax-seal-burst-light {
          position: absolute;
          inset: -12%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 239, 1),
            rgba(255, 220, 151, 0.7) 30%,
            rgba(232, 168, 76, 0.15) 65%,
            transparent 80%
          );
          filter: blur(9px);
        }

        .wax-seal-burst-particle {
          position: absolute;
          top: 50%;
          left: 50%;
          width: 5px;
          height: 5px;
          margin: -2.5px;
          border-radius: 50%;
          background: #fff2cf;
          box-shadow:
            0 0 9px #f4c66f,
            0 0 20px rgba(255, 203, 104, 0.9);
        }

        .wax-seal-final-flash {
          position: absolute;
          inset: -16%;
          border-radius: 50%;
          background: radial-gradient(
            circle,
            rgba(255, 255, 245, 1),
            rgba(255, 225, 170, 0.45) 48%,
            transparent 76%
          );
          filter: blur(6px);
        }

        @media (max-width: 600px) {
          .wax-seal-wrapper {
            width: 25%;
          }

          .wax-seal-orbit,
          .wax-seal-idle-particles {
            transform-origin: center;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wax-seal-ambient-glow,
          .wax-seal-orbit,
          .wax-seal-shimmer-ring {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
