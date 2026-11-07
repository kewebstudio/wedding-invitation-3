
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

import Envelope3D from "./Envelope3D";
import WaxSeal from "./WaxSeal";
import GoldenSparkles from "./GoldenSparkles";

const particles = Array.from({ length: 24 }, (_, index) => ({
  id: index,
  left: `${(index * 37 + 8) % 96}%`,
  top: `${(index * 53 + 7) % 92}%`,
}));

export default function SealedCard({ onOpened }) {
  const [isOpening, setIsOpening] = useState(false);

  const handleSealClick = () => {
    if (isOpening) return;
    setIsOpening(true);
  };

  const handleAnimationComplete = () => {
    if (isOpening) onOpened?.();
  };

  return (
    <section
      className={`sealed-card-section ${isOpening ? "is-opening" : ""}`}
    >
      <Envelope3D
        isOpening={isOpening}
        onOpened={handleAnimationComplete}
      >
        <div className="sealed-card-container">
          <img
            src="/images/sealed-card.jpg"
            alt="Sealed wedding invitation"
            className="sealed-card-image"
            draggable="false"
          />

          {/* Warm golden atmosphere */}
          <motion.div
            className="sealed-card-atmosphere"
            animate={
              isOpening
                ? { opacity: 0 }
                : { opacity: [0.35, 0.8, 0.35] }
            }
            transition={{
              duration: 4,
              repeat: isOpening ? 0 : Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Floating golden dust */}
          <div className="golden-dust-layer">
            {particles.map((particle, index) => (
              <motion.span
                key={particle.id}
                className="golden-dust"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
                animate={{
                  y: [0, -25 - (index % 4) * 12, 0],
                  x: [0, index % 2 === 0 ? 10 : -10, 0],
                  opacity: [0.1, 0.85, 0.1],
                  scale: [0.6, 1.3, 0.6],
                }}
                transition={{
                  duration: 3 + (index % 4),
                  delay: index * 0.12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Interactive wax seal */}
          <WaxSeal
            isOpening={isOpening}
            onClick={handleSealClick}
          />

          <GoldenSparkles isActive={isOpening} />

          {/* Light emerging from the seal */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                className="seal-opening-light"
                initial={{ opacity: 0, scale: 0.1 }}
                animate={{
                  opacity: [0, 1, 0.65, 0],
                  scale: [0.1, 1.2, 2.8, 4],
                }}
                transition={{
                  duration: 1.6,
                  times: [0, 0.25, 0.65, 1],
                  ease: "easeOut",
                }}
              />
            )}
          </AnimatePresence>

          {/* Golden particle explosion */}
          <AnimatePresence>
            {isOpening &&
              particles.map((particle, index) => {
                const angle =
                  (index / particles.length) * Math.PI * 2;
                const distance = 100 + (index % 4) * 30;

                return (
                  <motion.span
                    key={`burst-${particle.id}`}
                    className="opening-particle"
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
                      scale: [0, 1.5, 0],
                    }}
                    transition={{
                      duration: 1.4,
                      delay: index * 0.025,
                      ease: "easeOut",
                    }}
                    style={{
                      left: "50%",
                      top: "53.8%",
                    }}
                  />
                );
              })}
          </AnimatePresence>

          {/* Cinematic light sweep */}
          <AnimatePresence>
            {isOpening && (
              <motion.div
                className="sealed-card-light-sweep"
                initial={{ x: "-120%", opacity: 0 }}
                animate={{
                  x: "120%",
                  opacity: [0, 0.85, 0],
                }}
                transition={{
                  duration: 1.3,
                  delay: 0.2,
                  ease: "easeInOut",
                }}
              />
            )}
          </AnimatePresence>
        </div>
      </Envelope3D>

      {/* BOTTOM-CENTRED INSTRUCTION */}
      <AnimatePresence>
        {!isOpening && (
          <motion.div
            className="sealed-card-hint"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ delay: 0.8, duration: 0.8 }}
          >
            <motion.span
              className="hint-ornament"
              animate={{
                opacity: [0.45, 1, 0.45],
                scale: [0.85, 1.15, 0.85],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              ✦
            </motion.span>

            <span className="hint-text">
              TOUCH THE SEAL TO BEGIN
            </span>

            <motion.span
              className="hint-ornament"
              animate={{
                opacity: [0.45, 1, 0.45],
                scale: [0.85, 1.15, 0.85],
              }}
              transition={{
                duration: 2,
                delay: 0.4,
                repeat: Infinity,
              }}
            >
              ✦
            </motion.span>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .sealed-card-section {
          position: relative;
          width: 100%;
          height: 100vh;
          height: 100svh;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          isolation: isolate;
          background: #f8eee7;
        }

        .sealed-card-section .envelope3d-scene {
          width: 100%;
          height: 100%;
          min-height: 100%;
        }

        .sealed-card-container {
          position: relative;
          width: 100%;
          height: 100%;
          overflow: hidden;
          isolation: isolate;
          background: #f8eee7;
        }

        .sealed-card-image {
          position: absolute;
          inset: 0;
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center;
          user-select: none;
          -webkit-user-drag: none;
          pointer-events: none;
        }

        .sealed-card-atmosphere {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          background:
            radial-gradient(
              circle at 50% 53.8%,
              rgba(255, 230, 178, 0.3),
              transparent 38%
            ),
            linear-gradient(
              180deg,
              rgba(255, 248, 235, 0.08),
              transparent 45%,
              rgba(190, 131, 76, 0.08)
            );
        }

        .golden-dust-layer {
          position: absolute;
          inset: 0;
          z-index: 8;
          overflow: hidden;
          pointer-events: none;
          transition: opacity 0.5s ease;
        }

        .golden-dust {
          position: absolute;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #f8dca6;
          box-shadow:
            0 0 7px rgba(255, 218, 151, 0.95),
            0 0 16px rgba(222, 163, 84, 0.55);
        }

        .seal-opening-light {
          position: absolute;
          z-index: 19;
          top: 53.8%;
          left: 50%;
          width: 42%;
          aspect-ratio: 1;
          border-radius: 50%;
          transform: translate(-50%, -50%);
          pointer-events: none;
          background: radial-gradient(
            circle,
            rgba(255, 255, 245, 0.98),
            rgba(255, 224, 164, 0.65) 28%,
            rgba(255, 190, 94, 0.2) 58%,
            transparent 75%
          );
          filter: blur(9px);
          mix-blend-mode: screen;
        }

        .opening-particle {
          position: absolute;
          z-index: 25;
          width: 5px;
          height: 5px;
          border-radius: 50%;
          background: #fff3d2;
          box-shadow:
            0 0 9px #ffe2a4,
            0 0 20px rgba(255, 194, 94, 0.9);
          pointer-events: none;
        }

        .sealed-card-light-sweep {
          position: absolute;
          inset: -20% -40%;
          z-index: 27;
          pointer-events: none;
          background: linear-gradient(
            110deg,
            transparent 32%,
            rgba(255, 255, 255, 0.12) 42%,
            rgba(255, 246, 224, 0.9) 50%,
            rgba(255, 218, 153, 0.2) 56%,
            transparent 68%
          );
          mix-blend-mode: screen;
        }

        /* TRUE BOTTOM-CENTRE ALIGNMENT */
        .sealed-card-hint {
          position: absolute;
          z-index: 50;
          left: 0;
          right: 0;
          bottom: max(18px, env(safe-area-inset-bottom));

          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;

          box-sizing: border-box;
          padding: 9px 12px;

          color: #80513f;
          text-align: center;
          pointer-events: none;
        }

        .hint-text {
          font-family: "DM Sans", sans-serif;
          font-size: 9px;
          font-weight: 700;
          letter-spacing: 2.4px;
          white-space: nowrap;
          text-shadow: 0 1px 8px rgba(255, 255, 255, 0.9);
        }

        .hint-ornament {
          color: #bd965a;
          font-size: 12px;
          line-height: 1;
          flex-shrink: 0;
        }

        .is-opening .golden-dust-layer {
          opacity: 0;
        }

        @media (max-width: 600px) {
          .sealed-card-hint {
            bottom: max(18px, env(safe-area-inset-bottom));
            gap: 8px;
          }

          .hint-text {
            font-size: 8px;
            letter-spacing: 1.8px;
          }

          .hint-ornament {
            font-size: 10px;
          }
        }

        @media (max-width: 360px) {
          .sealed-card-hint {
            bottom: max(14px, env(safe-area-inset-bottom));
            gap: 6px;
            padding-left: 8px;
            padding-right: 8px;
          }

          .hint-text {
            font-size: 7px;
            letter-spacing: 1.5px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .golden-dust-layer {
            transition: none;
          }
        }
      `}</style>
    </section>
  );
}
