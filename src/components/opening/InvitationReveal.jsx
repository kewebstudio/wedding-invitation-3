
import { motion } from "framer-motion";

const particles = Array.from({ length: 28 }, (_, i) => ({
  id: i,
  left: `${(i * 37 + 9) % 100}%`,
  top: `${(i * 47 + 5) % 100}%`,
  delay: (i % 9) * 0.3,
  duration: 2 + (i % 4),
}));

const petals = Array.from({ length: 12 }, (_, i) => ({
  id: i,
  left: `${(i * 43 + 7) % 100}%`,
  delay: (i % 7) * 0.7,
  duration: 8 + (i % 4),
}));

export default function InvitationReveal({
  children,
  isVisible = false,
}) {
  if (!isVisible) return null;

  // Activate immediately when the invitation mounts.
  const active = true;

  return (
    <motion.div
      className="wedding-reveal-experience"
      initial={{ opacity: 1 }}
      animate={{ opacity: 1 }}
    >
      <section className="reveal-invitation-stage">
        <div className="reveal-floral-background" />
        <div className="reveal-light-orb" />

        {/* GOLD SPARKLES */}
        <div className="reveal-particle-field">
          {particles.map((p) => (
            <motion.span
              key={p.id}
              className="reveal-gold-particle"
              style={{
                left: p.left,
                top: p.top,
              }}
              animate={
                active
                  ? {
                      opacity: [0.1, 1, 0.15],
                      scale: [0.5, 1.5, 0.5],
                    }
                  : { opacity: 0 }
              }
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
              }}
            />
          ))}
        </div>

        {/* FALLING PETALS */}
        <div className="reveal-petal-field">
          {petals.map((p) => (
            <motion.span
              key={p.id}
              className="reveal-floating-petal"
              style={{ left: p.left }}
              animate={{
                y: ["-10vh", "110vh"],
                x: [0, 25, -20, 15],
                rotate: [0, 150, 300, 500],
                opacity: [0, 0.7, 0.6, 0],
              }}
              transition={{
                duration: p.duration,
                delay: p.delay,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* INVITATION CONTENT */}
        <div className="reveal-invitation-content">

          <motion.div
            className="reveal-monogram"
            initial={{ opacity: 0, scale: 0.5, rotate: -20 }}
            animate={{ opacity: 1, scale: 1, rotate: 0 }}
            transition={{ duration: 0.8, ease: "backOut" }}
          >
            V <span>&</span> M
          </motion.div>

          <motion.div
            className="reveal-family-text"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.6 }}
          >
            TOGETHER WITH THEIR FAMILIES
          </motion.div>

          <motion.div
            className="reveal-ornament"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.25, duration: 0.6 }}
          >
            <span />
            ✧
            <span />
          </motion.div>

          <motion.p
            className="reveal-invitation-words"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.35, duration: 0.6 }}
          >
            Joyfully invite you to celebrate
            <br />
            the wedding of
          </motion.p>

          <div className="reveal-couple-names">
            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(7px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.5, duration: 0.8 }}
            >
              Vihaan
            </motion.h1>

            <motion.div
              className="reveal-name-ampersand"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.7, duration: 0.6 }}
            >
              <span />
              &
              <span />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20, filter: "blur(7px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ delay: 0.85, duration: 0.8 }}
            >
              Meera
            </motion.h1>
          </div>

          <motion.div
            className="reveal-occasion"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.1, duration: 0.7 }}
          >
            <span className="occasion-flourish">❦</span>

            <p>
              Two hearts brought together,
              <br />
              one beautiful wedding celebration.
            </p>

            <span className="occasion-flourish">❦</span>
          </motion.div>

          <motion.div
            className="reveal-scroll-hint"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.4, duration: 0.6 }}
          >
            <span>SCROLL TO DISCOVER THE SPECIAL DAY</span>

            <motion.div
              animate={{ y: [0, 6, 0] }}
              transition={{
                duration: 1.4,
                repeat: Infinity,
              }}
            >
              <svg
                viewBox="0 0 24 24"
                width="18"
                height="18"
                fill="none"
              >
                <path
                  d="M5 9L12 16L19 9"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* FOLLOWING SECTIONS */}
      <div className="invitation-content">
        {children}
      </div>

      <style>{`
        .wedding-reveal-experience {
          width: 100%;
          overflow: hidden;
          background: #fbf4ed;
        }

        .reveal-invitation-stage {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #fbf4ed;
        }

        .reveal-floral-background {
          position: absolute;
          inset: 0;
          z-index: -4;
          background-color: #fbf4ed;
          background-image: url("/images/template.jpg");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        .reveal-light-orb {
          position: absolute;
          inset: -15%;
          z-index: -2;
          pointer-events: none;
          background: radial-gradient(
            ellipse at 50% 45%,
            rgba(255,255,255,.35),
            transparent 65%
          );
          animation: revealLight 7s ease-in-out infinite alternate;
        }

        @keyframes revealLight {
          from {
            transform: scale(.92);
            opacity: .35;
          }
          to {
            transform: scale(1.08);
            opacity: .75;
          }
        }

        .reveal-particle-field,
        .reveal-petal-field {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
        }

        .reveal-particle-field {
          z-index: 2;
        }

        .reveal-petal-field {
          z-index: 3;
        }

        .reveal-gold-particle {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #d5a654;
          box-shadow: 0 0 10px 3px rgba(213,166,84,.45);
        }

        .reveal-floating-petal {
          position: absolute;
          top: -25px;
          width: 9px;
          height: 15px;
          border-radius: 100% 0 100% 0;
          background: linear-gradient(135deg, #e2a99e, #fff1e5);
          box-shadow: 0 2px 8px rgba(151,95,74,.15);
        }

        .reveal-invitation-content {
          position: relative;
          z-index: 4;
          width: min(100%, 460px);
          min-height: 100vh;
          min-height: 100svh;
          box-sizing: border-box;
          padding: 34px 25px 28px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: clamp(9px, 1.7svh, 15px);
          text-align: center;
          color: #793e49;
        }

        .reveal-monogram {
          width: 52px;
          height: 52px;
          flex-shrink: 0;
          border: 1px solid #bd985d;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: rgba(255,250,242,.55);
          font: 25px "Cormorant Garamond", Georgia, serif;
          box-shadow: 0 0 22px rgba(189,152,93,.2);
        }

        .reveal-monogram span {
          color: #bd9255;
          font-family: "Great Vibes", cursive;
        }

        .reveal-family-text,
        .reveal-scroll-hint {
          font: 600 8px "DM Sans", sans-serif;
          letter-spacing: 2.5px;
          color: #a47a49;
        }

        .reveal-ornament {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #bd9255;
          font-size: 18px;
          line-height: 1;
        }

        .reveal-ornament span {
          width: 34px;
          height: 1px;
          background: #bd9255;
        }

        .reveal-invitation-words {
          margin: 0;
          color: #906d60;
          font: italic 17px/1.35 "Cormorant Garamond", Georgia, serif;
        }

        .reveal-couple-names {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0;
        }

        .reveal-couple-names h1 {
          margin: 0;
          color: #793e49;
          font: 400 clamp(48px, 13vw, 64px)/1.02 "Great Vibes", cursive;
          text-shadow: 0 2px 12px rgba(255,255,255,.6);
        }

        .reveal-name-ampersand {
          display: flex;
          align-items: center;
          gap: 12px;
          color: #bd9255;
          font: italic 26px "Cormorant Garamond", Georgia, serif;
          line-height: 1;
          margin: 2px 0;
        }

        .reveal-name-ampersand span {
          width: 32px;
          height: 1px;
          background: #bd9255;
        }

        .reveal-occasion {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 3px;
        }

        .reveal-occasion p {
          margin: 0;
          color: #906d60;
          font: italic 16px/1.35 "Cormorant Garamond", Georgia, serif;
        }

        .occasion-flourish {
          color: #bd9255;
          font-size: 17px;
          line-height: 1;
        }

        .reveal-scroll-hint {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 5px;
          margin-top: 2px;
          font-size: 7px;
          letter-spacing: 1.8px;
        }

        .invitation-content {
          width: 100%;
        }

        @media (max-width: 380px) {
          .reveal-invitation-content {
            padding: 25px 20px 22px;
            gap: 9px;
          }

          .reveal-monogram {
            width: 46px;
            height: 46px;
            font-size: 22px;
          }

          .reveal-invitation-words {
            font-size: 15px;
          }

          .reveal-couple-names h1 {
            font-size: 53px;
          }

          .reveal-occasion p {
            font-size: 14px;
          }
        }

        @media (max-height: 650px) {
          .reveal-invitation-content {
            padding-top: 14px;
            padding-bottom: 14px;
            gap: 7px;
          }

          .reveal-monogram {
            width: 40px;
            height: 40px;
            font-size: 20px;
          }

          .reveal-couple-names h1 {
            font-size: 46px;
          }

          .reveal-invitation-words {
            font-size: 14px;
          }

          .reveal-occasion p {
            font-size: 14px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .reveal-light-orb {
            animation: none;
          }
        }
      `}</style>
    </motion.div>
  );
}
