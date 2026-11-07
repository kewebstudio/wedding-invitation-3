
import { motion } from "framer-motion";
import {
  Download,
  Heart,
  Sparkles,
  RotateCcw,
} from "lucide-react";

export default function ThankYou() {
  return (
    <section className="thankyou-section">
      <div className="thankyou-template" />
      <div className="thankyou-overlay" />

      <div className="thankyou-sparkles">
        {Array.from({ length: 18 }, (_, i) => (
          <motion.span
            key={i}
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 9) % 100}%`,
            }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.5, 1.4, 0.5],
              y: [0, -12, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              delay: i * 0.15,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <motion.div
        className="thankyou-content"
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="thankyou-heart"
          animate={{ scale: [1, 1.13, 1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        >
          <Heart size={23} fill="currentColor" />
        </motion.div>

        <p className="thankyou-eyebrow">
          WITH HEARTFELT GRATITUDE
        </p>

        <h2>Thank You</h2>

        <div className="thankyou-divider">
          <span />
          <Sparkles size={15} />
          <span />
        </div>

        <p className="thankyou-message">
          Thank you for your love, blessings and for
          being part of our special celebration.
          Your presence made it truly memorable.
        </p>

        <p className="thankyou-signoff">
          With love and gratitude.
        </p>

        <motion.div
          className="thankyou-download-area"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          <p className="download-caption">
            KEEP A MEMORY OF THIS SPECIAL DAY
          </p>

          <motion.a
            href="/images/wedding-card.jpg"
            download="Wedding-Invitation.jpg"
            className="thankyou-download-button"
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
          >
            <Download size={17} />
            DOWNLOAD WEDDING CARD
          </motion.a>
        </motion.div>

        {/* Watch again */}
        <motion.a
          href="/"
          className="thankyou-replay-button"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <RotateCcw size={14} />
          WATCH AGAIN
        </motion.a>
      </motion.div>

      <style>{`
        .thankyou-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 35px 18px;
          background: #fbf0e5;
        }

        .thankyou-template {
          position: absolute;
          inset: 0;
          z-index: 0;
          background-image: url("/images/template.jpg");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
          pointer-events: none;
        }

        .thankyou-overlay {
          position: absolute;
          inset: 0;
          z-index: 1;
          background: rgba(255, 248, 239, 0.08);
          pointer-events: none;
        }

        .thankyou-sparkles {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
          overflow: hidden;
        }

        .thankyou-sparkles span {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #d6a64e;
          box-shadow: 0 0 12px 3px rgba(214,166,78,.45);
        }

        .thankyou-content {
          position: relative;
          z-index: 3;
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 18px 14px;
        }

        .thankyou-heart {
          color: #9b4655;
          margin-bottom: 12px;
        }

        .thankyou-eyebrow {
          margin: 0;
          color: #a17b51;
          font: 600 8px "DM Sans", sans-serif;
          letter-spacing: 2px;
        }

        .thankyou-content h2 {
          margin: 9px 0;
          color: #743d42;
          font: 400 clamp(48px, 12vw, 65px) "Great Vibes", cursive;
          line-height: 1.15;
        }

        .thankyou-divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 5px 0 15px;
          color: #bd965a;
        }

        .thankyou-divider span {
          width: 38px;
          height: 1px;
          background: #bd965a;
        }

        .thankyou-message {
          max-width: 290px;
          margin: 0;
          color: #806052;
          font: italic 17px/1.5 "Cormorant Garamond", serif;
        }

        .thankyou-signoff {
          margin: 15px 0 22px;
          color: #98734f;
          font: 25px "Great Vibes", cursive;
        }

        .thankyou-download-area {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 10px;
        }

        .download-caption {
          margin: 0;
          color: #a17b51;
          font: 600 7px "DM Sans", sans-serif;
          letter-spacing: 1.5px;
        }

        .thankyou-download-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 44px;
          padding: 0 20px;
          color: #fff8ee;
          background: linear-gradient(120deg, #743d42, #96535a);
          border: 1px solid rgba(255,255,255,.5);
          box-shadow: 0 7px 20px rgba(116,61,66,.22);
          text-decoration: none;
          font: 600 8px "DM Sans", sans-serif;
          letter-spacing: 1.2px;
          transition: box-shadow .3s ease;
        }

        .thankyou-download-button:hover {
          box-shadow: 0 12px 25px rgba(116,61,66,.3);
        }

        .thankyou-replay-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          margin-top: 25px;
          padding: 10px 18px;
          color: #875b48;
          border: 1px solid rgba(157, 113, 76, .45);
          background: rgba(255, 250, 243, .45);
          text-decoration: none;
          font: 600 8px "DM Sans", sans-serif;
          letter-spacing: 2px;
          transition: background .3s ease, border-color .3s ease;
        }

        .thankyou-replay-button:hover {
          background: rgba(255, 250, 243, .9);
          border-color: #a17b51;
        }

        @media (max-width: 380px) {
          .thankyou-content {
            padding: 12px 8px;
          }

          .thankyou-message {
            max-width: 260px;
            font-size: 15px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .thankyou-sparkles {
            display: none;
          }
        }
      `}</style>
    </section>
  );
}
