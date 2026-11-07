
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const sparkles = Array.from({ length: 30 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 11) % 100}%`,
  top: `${(i * 53 + 7) % 100}%`,
  delay: (i % 7) * 0.3,
  duration: 2 + (i % 4) * 0.6,
}));

const particles = Array.from({ length: 42 }, (_, i) => {
  const angle = (i / 42) * Math.PI * 2;
  const distance = 75 + (i % 5) * 25;

  return {
    id: i,
    x: Math.cos(angle) * distance,
    y: Math.sin(angle) * distance,
    size: 3 + (i % 4) * 2,
  };
});

export default function InvitationCover() {
  const canvasRef = useRef(null);
  const scratchRef = useRef(null);
  const drawingRef = useRef(false);
  const lastPointRef = useRef(null);
  const revealedRef = useRef(false);

  const [revealed, setRevealed] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = scratchRef.current;

    if (!canvas || !container) return;

    const initializeCanvas = () => {
      if (revealedRef.current) return;

      const rect = container.getBoundingClientRect();
      if (!rect.width || !rect.height) return;

      const ratio = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = rect.width * ratio;
      canvas.height = rect.height * ratio;

      const ctx = canvas.getContext("2d");
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

      const gradient = ctx.createLinearGradient(
        0, 0, rect.width, rect.height
      );

      gradient.addColorStop(0, "#a96e21");
      gradient.addColorStop(0.3, "#f8e4b7");
      gradient.addColorStop(0.6, "#d5a34e");
      gradient.addColorStop(1, "#a66c22");

      ctx.globalCompositeOperation = "source-over";
      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, rect.width, rect.height);

      for (let i = 0; i < 180; i++) {
        const x = (i * 47) % rect.width;
        const y = (i * 29) % rect.height;

        ctx.beginPath();
        ctx.arc(x, y, 0.6 + (i % 3) * 0.4, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.22)";
        ctx.fill();
      }

      ctx.strokeStyle = "rgba(255,248,220,.95)";
      ctx.lineWidth = 1;
      ctx.strokeRect(7, 7, rect.width - 14, rect.height - 14);

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#70471d";
      ctx.font = "600 10px Arial";
      ctx.fillText(
        "✧  SCRATCH TO REVEAL THE DATE  ✧",
        rect.width / 2,
        rect.height / 2
      );
    };

    initializeCanvas();

    const observer = new ResizeObserver(initializeCanvas);
    observer.observe(container);

    return () => observer.disconnect();
  }, []);

  const revealDate = () => {
    if (revealedRef.current) return;

    revealedRef.current = true;
    drawingRef.current = false;
    lastPointRef.current = null;

    setRevealed(true);

    window.setTimeout(() => {
      setShowPopup(true);
    }, 650);
  };

  const scratch = (event) => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;

    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");

    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    ctx.globalCompositeOperation = "destination-out";
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.lineWidth = 43;

    ctx.beginPath();

    if (lastPointRef.current) {
      ctx.moveTo(lastPointRef.current.x, lastPointRef.current.y);
      ctx.lineTo(x, y);
    } else {
      ctx.moveTo(x, y);
      ctx.lineTo(x + 0.1, y + 0.1);
    }

    ctx.stroke();
    lastPointRef.current = { x, y };
  };

  const checkProgress = () => {
    const canvas = canvasRef.current;
    if (!canvas || revealedRef.current) return;

    const ctx = canvas.getContext("2d");
    const pixels = ctx.getImageData(
      0, 0, canvas.width, canvas.height
    ).data;

    let erased = 0;
    let total = 0;

    for (let i = 3; i < pixels.length; i += 4 * 35) {
      total++;
      if (pixels[i] < 100) erased++;
    }

    if (total && erased / total > 0.3) {
      revealDate();
    }
  };

  const handlePointerDown = (event) => {
    if (revealedRef.current) return;

    drawingRef.current = true;
    lastPointRef.current = null;
    event.currentTarget.setPointerCapture(event.pointerId);
    scratch(event);
  };

  const handlePointerMove = (event) => {
    if (drawingRef.current) scratch(event);
  };

  const handlePointerUp = () => {
    if (!drawingRef.current) return;

    drawingRef.current = false;
    lastPointRef.current = null;
    checkProgress();
  };

  return (
    <section className="date-template-section">
      {/* SAME TEMPLATE IMAGE */}
      <div className="date-template-background" />

      <div className="date-template-shade" />

      {/* Floating sparkles */}
      <div className="date-template-sparkles">
        {sparkles.map((item) => (
          <motion.span
            key={item.id}
            style={{
              left: item.left,
              top: item.top,
            }}
            animate={{
              opacity: [0.15, 1, 0.2],
              scale: [0.5, 1.6, 0.5],
              y: [0, -10, 0],
            }}
            transition={{
              duration: item.duration,
              delay: item.delay,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Text and scratch card */}
      <div className="date-template-content">
        <motion.div
          className="date-template-heading"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
        >
          <motion.div
            className="date-template-star"
            animate={{ rotate: 360, scale: [1, 1.2, 1] }}
            transition={{ duration: 8, repeat: Infinity }}
          >
            ✧
          </motion.div>

          <p>AND NOW, THE DAY WE CELEBRATE</p>

          <h2>A date to remember</h2>

          <span>
            A little surprise is waiting to be discovered.
          </span>
        </motion.div>

        {/* Scratch card */}
        <motion.div
          className="date-scratch-area"
          initial={{ opacity: 0, y: 25, scale: 0.94 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.9 }}
        >
          <div className="date-scratch-box" ref={scratchRef}>
            <div className="date-hidden-content">
              <small>OUR WEDDING DAY</small>
              <strong>18 · 02 · 2027</strong>
              <span>THURSDAY</span>
            </div>

            {!revealed && (
              <>
                <canvas
                  ref={canvasRef}
                  className="date-scratch-canvas"
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                />

                <motion.div
                  className="date-scratch-shine"
                  animate={{ x: ["-130%", "180%"] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    repeatDelay: 1.3,
                  }}
                />
              </>
            )}
          </div>
        </motion.div>

        <AnimatePresence>
          {revealed && (
            <motion.div
              className="date-revealed-message"
              initial={{ opacity: 0, scale: 0.5, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "backOut" }}
            >
              ✧ THE BEGINNING OF FOREVER ✧
            </motion.div>
          )}
        </AnimatePresence>

        <motion.p
          className="date-template-footer"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6 }}
        >
          WITH LOVE AND BLESSINGS
        </motion.p>
      </div>

      {/* Golden particle blast */}
      <AnimatePresence>
        {revealed && (
          <motion.div
            className="date-particle-blast"
            key="date-blast"
          >
            {particles.map((particle) => (
              <motion.span
                key={particle.id}
                style={{
                  width: particle.size,
                  height: particle.size,
                }}
                initial={{ x: 0, y: 0, opacity: 1, scale: 0.2 }}
                animate={{
                  x: particle.x,
                  y: particle.y,
                  opacity: 0,
                  scale: [0.2, 1.5, 0],
                }}
                transition={{ duration: 1.2, ease: "easeOut" }}
              />
            ))}

            <motion.div
              className="date-blast-flash"
              initial={{ opacity: 0, scale: 0.1 }}
              animate={{
                opacity: [0, 0.9, 0],
                scale: [0.1, 1.8, 2.8],
              }}
              transition={{ duration: 0.8 }}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Date popup */}
      <AnimatePresence>
        {showPopup && (
          <motion.div
            className="date-popup-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowPopup(false)}
          >
            <motion.div
              className="date-popup-card"
              role="dialog"
              aria-modal="true"
              aria-label="Wedding date revealed"
              initial={{ opacity: 0, y: 45, scale: 0.75 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 25, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 170, damping: 17 }}
              onClick={(event) => event.stopPropagation()}
            >
              <div className="date-popup-decoration">❦</div>

              <p>THE SPECIAL DAY IS REVEALED</p>

              <h2>Save the date</h2>

              <div className="date-popup-date">
                <strong>18</strong>
                <span>FEBRUARY</span>
                <strong>2027</strong>
              </div>

              <div className="date-popup-divider">✧</div>

              <small>THURSDAY</small>

              <p className="date-popup-message">
                A beautiful new chapter begins.
                <br />
                We cannot wait to celebrate with you!
              </p>

              <button onClick={() => setShowPopup(false)}>
                CONTINUE THE CELEBRATION ✧
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        .date-template-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f9ead7;
        }

        .date-template-background {
          position: absolute;
          inset: 0;
          z-index: -3;
          background-image: url("/images/template.jpg");
          background-repeat: no-repeat;
          background-position: center;
          background-size: 100% 100%;
        }

        .date-template-shade {
          position: absolute;
          inset: 0;
          z-index: -2;
          pointer-events: none;
          background: radial-gradient(
            ellipse at center,
            rgba(255,255,255,.12),
            transparent 72%
          );
        }

        .date-template-sparkles {
          position: absolute;
          inset: 0;
          pointer-events: none;
          z-index: 1;
        }

        .date-template-sparkles span {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #dba94f;
          box-shadow: 0 0 10px 3px rgba(219,169,79,.5);
        }

        .date-template-content {
          position: relative;
          z-index: 2;
          width: min(86%, 390px);
          min-height: 68vh;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: space-evenly;
          text-align: center;
          padding: 12px 0;
        }

        .date-template-heading {
          width: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .date-template-star {
          color: #b47c2e;
          font-size: 30px;
          margin-bottom: 10px;
        }

        .date-template-heading p {
          margin: 0 0 10px;
          color: #a16e28;
          font: 600 8px "DM Sans", sans-serif;
          letter-spacing: 2px;
        }

        .date-template-heading h2 {
          margin: 0;
          color: #793c45;
          font: italic 500 clamp(27px, 8vw, 37px)/1.1
            "Cormorant Garamond", Georgia, serif;
        }

        .date-template-heading > span {
          margin-top: 9px;
          color: #8a6553;
          font: italic 16px/1.35 "Cormorant Garamond", Georgia, serif;
        }

        .date-scratch-area {
          width: 100%;
          max-width: 330px;
        }

        .date-scratch-box {
          position: relative;
          width: 100%;
          height: clamp(105px, 17vh, 135px);
          padding: 7px;
          background: linear-gradient(
            135deg, #a96e21, #f5d68e, #d19e48, #a66c22
          );
          box-shadow: 0 8px 22px rgba(105,65,23,.2);
          overflow: hidden;
          touch-action: none;
        }

        .date-hidden-content {
          position: absolute;
          inset: 7px;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          gap: 6px;
          background: linear-gradient(135deg, #fffaf0, #f8ead4);
        }

        .date-hidden-content small,
        .date-hidden-content span {
          color: #a16e35;
          font: 600 8px "DM Sans", sans-serif;
          letter-spacing: 2.5px;
        }

        .date-hidden-content strong {
          color: #793c45;
          font: 500 clamp(27px, 8vw, 37px)
            "Cormorant Garamond", Georgia, serif;
          letter-spacing: 2px;
        }

        .date-scratch-canvas {
          position: absolute;
          inset: 0;
          z-index: 3;
          width: 100%;
          height: 100%;
          display: block;
          touch-action: none;
          cursor: crosshair;
        }

        .date-scratch-shine {
          position: absolute;
          z-index: 4;
          top: -20%;
          bottom: -20%;
          left: 0;
          width: 25%;
          transform: skewX(-22deg);
          background: linear-gradient(
            90deg, transparent, rgba(255,255,255,.55), transparent
          );
          pointer-events: none;
        }

        .date-revealed-message {
          color: #9e6e30;
          font: 600 8px "DM Sans", sans-serif;
          letter-spacing: 1.5px;
        }

        .date-template-footer {
          margin: 0;
          color: #a16e35;
          font: 600 7px "DM Sans", sans-serif;
          letter-spacing: 2.5px;
        }

        .date-particle-blast {
          position: absolute;
          z-index: 8;
          left: 50%;
          top: 50%;
          width: 1px;
          height: 1px;
          pointer-events: none;
        }

        .date-particle-blast > span {
          position: absolute;
          left: 0;
          top: 0;
          border-radius: 50%;
          background: #f1c66f;
          box-shadow: 0 0 10px 3px rgba(239,190,91,.7);
        }

        .date-blast-flash {
          position: absolute;
          left: -65px;
          top: -65px;
          width: 130px;
          height: 130px;
          border-radius: 50%;
          background: radial-gradient(
            circle, white, rgba(255,224,155,.55) 35%, transparent 72%
          );
        }

        .date-popup-backdrop {
          position: fixed;
          inset: 0;
          z-index: 100;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 22px;
          background: rgba(52,31,25,.58);
          backdrop-filter: blur(7px);
          -webkit-backdrop-filter: blur(7px);
        }

        .date-popup-card {
          position: relative;
          width: min(100%, 340px);
          padding: 28px 22px 25px;
          text-align: center;
          color: #793c45;
          border: 1px solid rgba(194,151,82,.8);
          outline: 5px solid rgba(255,248,231,.7);
          background: linear-gradient(145deg, #fff9ed, #f2dfc7);
          box-shadow: 0 24px 80px rgba(32,18,12,.35);
        }

        .date-popup-card::before {
          content: "";
          position: absolute;
          inset: 8px;
          border: 1px solid rgba(192,147,76,.55);
          pointer-events: none;
        }

        .date-popup-decoration {
          margin-bottom: 10px;
          color: #b88743;
          font-size: 34px;
        }

        .date-popup-card > p:first-of-type {
          color: #a16e35;
          font: 600 8px "DM Sans", sans-serif;
          letter-spacing: 2px;
        }

        .date-popup-card h2 {
          margin: 8px 0 15px;
          color: #793c45;
          font: italic 32px "Cormorant Garamond", Georgia, serif;
        }

        .date-popup-date {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 12px 0;
          border-top: 1px solid rgba(190,148,82,.5);
          border-bottom: 1px solid rgba(190,148,82,.5);
        }

        .date-popup-date strong:first-child {
          font: 500 54px/.95 "Cormorant Garamond", Georgia, serif;
        }

        .date-popup-date span {
          color: #a16e35;
          font: 600 9px "DM Sans", sans-serif;
          letter-spacing: 4px;
        }

        .date-popup-date strong:last-child {
          font: 500 28px "Cormorant Garamond", Georgia, serif;
        }

        .date-popup-divider {
          margin: 13px 0 8px;
          color: #bd9255;
        }

        .date-popup-card > small {
          color: #a16e35;
          font: 600 9px "DM Sans", sans-serif;
          letter-spacing: 3px;
        }

        .date-popup-message {
          margin: 14px 0 18px;
          color: #8a6553;
          font: italic 15px/1.5 "Cormorant Garamond", Georgia, serif;
        }

        .date-popup-card button {
          position: relative;
          z-index: 1;
          width: 100%;
          min-height: 43px;
          padding: 10px;
          border: 0;
          background: #793c45;
          color: #fff8ed;
          font: 600 8px "DM Sans", sans-serif;
          letter-spacing: 1.2px;
          cursor: pointer;
        }

        @media (max-width: 380px) {
          .date-template-content {
            width: 86%;
            min-height: 66vh;
          }

          .date-template-heading h2 {
            font-size: 29px;
          }

          .date-template-heading > span {
            font-size: 14px;
          }

          .date-scratch-box {
            height: 108px;
          }
        }

        @media (max-height: 700px) {
          .date-template-content {
            min-height: 72vh;
          }

          .date-scratch-box {
            height: 98px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .date-template-sparkles span {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
