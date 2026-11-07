import { motion } from "framer-motion";

export default function Envelope3D({
  isOpening = false,
  onOpened,
  children,
}) {
  return (
    <div className="envelope3d-scene">
      {/* Ambient golden light */}
      <div className="envelope3d-glow" />

      {/* Floating particles */}
      <div className="envelope3d-particles" aria-hidden="true">
        {Array.from({ length: 26 }, (_, index) => (
          <span
            key={index}
            className="envelope3d-particle"
            style={{
              "--left": `${(index * 37) % 100}%`,
              "--top": `${(index * 53) % 100}%`,
              "--delay": `${(index % 8) * -0.4}s`,
            }}
          />
        ))}
      </div>

      {/* Full-screen card stage */}
      <div className="envelope3d-stage">
        <motion.div
          className="envelope3d-card"
          initial={false}
          animate={
            isOpening
              ? {
                  rotateY: 180,
                  scale: [1, 1.025, 1.045, 1.08],
                  y: [0, -5, -9, -15],
                  opacity: [1, 1, 1, 0],
                }
              : {
                  rotateY: 0,
                  scale: 1,
                  y: 0,
                  opacity: 1,
                }
          }
          transition={
            isOpening
              ? {
                  duration: 3,
                  times: [0, 0.35, 0.75, 1],
                  ease: [0.45, 0, 0.2, 1],
                }
              : {
                  duration: 0.3,
                }
          }
          onAnimationComplete={() => {
            if (isOpening) {
              onOpened?.();
            }
          }}
        >
          {children}
        </motion.div>
      </div>

      {/* Cinematic light sweep */}
      <motion.div
        className="envelope3d-light-sweep"
        animate={
          isOpening
            ? {
                opacity: [0, 0.65, 0],
                x: ["-120%", "120%"],
              }
            : {
                opacity: 0,
                x: "-120%",
              }
        }
        transition={{
          duration: 2.2,
          delay: 0.3,
          ease: "easeInOut",
        }}
      />

      {/* Final golden flash */}
      <motion.div
        className="envelope3d-flash"
        animate={
          isOpening
            ? {
                opacity: [0, 0, 0.65, 0],
              }
            : {
                opacity: 0,
              }
        }
        transition={{
          duration: 3,
          times: [0, 0.7, 0.86, 1],
          ease: "easeInOut",
        }}
      />
    </div>
  );
}

/* =====================================
   CINEMATIC 3D CARD STYLES
===================================== */

const styles = `
.envelope3d-scene {
  position: relative;
  width: 100%;
  min-height: 100vh;
  min-height: 100svh;
  height: 100vh;
  height: 100svh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  isolation: isolate;
  perspective: 1500px;
  background:
    radial-gradient(
      ellipse at center,
      #fffaf3 0%,
      #f8eee5 60%,
      #ead8cc 100%
    );
}

/* Golden ambient glow */

.envelope3d-glow {
  position: absolute;
  width: min(100vw, 700px);
  aspect-ratio: 1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  background: radial-gradient(
    circle,
    rgba(255, 221, 174, 0.4),
    rgba(255, 221, 174, 0.12) 48%,
    transparent 72%
  );
  filter: blur(25px);
  pointer-events: none;
}

/* Full-screen stage: no small fixed card box */

.envelope3d-stage {
  position: absolute;
  inset: 0;
  z-index: 2;
  width: 100%;
  height: 100%;
  perspective: 1500px;
  perspective-origin: center center;
}

/* Original card artwork */

.envelope3d-card {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  transform-origin: center center;
  transform-style: preserve-3d;
  -webkit-transform-style: preserve-3d;
  backface-visibility: visible;
  -webkit-backface-visibility: visible;
  will-change: transform, opacity;
}

/* Preserve the original component artwork */

.envelope3d-card > * {
  width: 100%;
  height: 100%;
}

/* If the artwork is an image, fit it without cropping */

.envelope3d-card img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
}

/* Floating particles */

.envelope3d-particles {
  position: absolute;
  inset: 0;
  z-index: 1;
  overflow: hidden;
  pointer-events: none;
}

.envelope3d-particle {
  position: absolute;
  left: var(--left);
  top: var(--top);
  width: 3px;
  height: 3px;
  border-radius: 50%;
  background: #d7ad70;
  box-shadow: 0 0 9px rgba(218, 171, 99, 0.8);
  animation: envelopeParticle 3.5s ease-in-out infinite;
  animation-delay: var(--delay);
}

@keyframes envelopeParticle {
  0%, 100% {
    opacity: 0.15;
    transform: translate3d(0, 8px, 0) scale(0.7);
  }

  50% {
    opacity: 0.9;
    transform: translate3d(0, -16px, 0) scale(1.3);
  }
}

/* Light sweep */

.envelope3d-light-sweep {
  position: absolute;
  z-index: 4;
  top: -30%;
  left: 0;
  width: 35%;
  height: 160%;
  transform: rotate(18deg);
  background: linear-gradient(
    90deg,
    transparent,
    rgba(255, 255, 255, 0.8),
    transparent
  );
  pointer-events: none;
}

/* Reveal flash */

.envelope3d-flash {
  position: absolute;
  z-index: 5;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(
    circle at center,
    rgba(255, 255, 255, 0.9),
    rgba(255, 239, 210, 0.3) 38%,
    transparent 72%
  );
}

/* Mobile */

@media (max-width: 600px) {
  .envelope3d-scene {
    min-height: 100svh;
    height: 100svh;
  }

  .envelope3d-stage {
    inset: 0;
    width: 100%;
    height: 100%;
  }

  .envelope3d-card {
    width: 100%;
    height: 100%;
  }
}

/* Very small mobile screens */

@media (max-width: 360px) {
  .envelope3d-scene {
    width: 100%;
    min-height: 100svh;
    height: 100svh;
  }
}

/* Short mobile screens */

@media (max-height: 650px) {
  .envelope3d-scene {
    min-height: 100svh;
    height: 100svh;
  }
}

@media (prefers-reduced-motion: reduce) {
  .envelope3d-particle {
    animation: none;
  }
}
`;

if (
  typeof document !== "undefined" &&
  !document.getElementById("envelope3d-styles")
) {
  const styleElement = document.createElement("style");
  styleElement.id = "envelope3d-styles";
  styleElement.textContent = styles;
  document.head.appendChild(styleElement);
}