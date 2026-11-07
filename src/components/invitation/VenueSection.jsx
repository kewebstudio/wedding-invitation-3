
import { motion } from "framer-motion";
import {
  MapPin,
  Clock,
  CalendarDays,
  Navigation,
  Sparkles,
} from "lucide-react";

const mapUrl =
  "https://www.google.com/maps/search/?api=1&query=The+Grand+Palace+Convention+Centre+Hyderabad";

export default function VenueSection() {
  return (
    <section className="venue-section">
      <div className="venue-template-bg" />
      <div className="venue-overlay" />

      {/* Floating golden particles */}
      <div className="venue-particles">
        {Array.from({ length: 14 }, (_, i) => (
          <motion.span
            key={i}
            style={{
              left: `${(i * 37 + 11) % 100}%`,
              top: `${(i * 53 + 7) % 100}%`,
            }}
            animate={{
              opacity: [0.15, 0.9, 0.15],
              scale: [0.6, 1.4, 0.6],
              y: [0, -10, 0],
            }}
            transition={{
              duration: 3 + (i % 3),
              delay: i * 0.2,
              repeat: Infinity,
            }}
          />
        ))}
      </div>

      <motion.div
        className="venue-content"
        initial={{ opacity: 0, y: 35 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.15 }}
        transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
      >
        <motion.div
          className="venue-flourish"
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          ❦
        </motion.div>

        <p className="venue-eyebrow">THE WEDDING CELEBRATION</p>

        <h2 className="venue-heading">Where Forever Begins</h2>

        <div className="venue-divider">
          <span />
          ✧
          <span />
        </div>

        {/* Venue photograph */}
        <motion.div
          className="venue-photo-frame"
          initial={{ opacity: 0, scale: 0.92, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          <img
            src="/images/venue.jpg"
            alt="Wedding celebration venue"
            loading="lazy"
          />
          <div className="venue-photo-shine" />
        </motion.div>

        {/* Location */}
        <motion.div
          className="venue-details"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.35 }}
        >
          <MapPin className="venue-pin" size={19} />

          <h3>
            The Grand Palace
            <span>Convention Centre</span>
          </h3>

          <p>Hyderabad, Telangana</p>
        </motion.div>

        {/* Date and time */}
        <motion.div
          className="venue-information"
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.45 }}
        >
          <div className="venue-info-item">
            <CalendarDays size={17} />
            <div>
              <span>DATE</span>
              <strong>18 February 2027</strong>
            </div>
          </div>

          <div className="venue-info-item">
            <Clock size={17} />
            <div>
              <span>TIME</span>
              <strong>10:30 AM onwards</strong>
            </div>
          </div>
        </motion.div>

        {/* Directions */}
        <motion.a
          href={mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="venue-map-button"
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.96 }}
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.55 }}
        >
          <Navigation size={15} />
          VIEW LOCATION
          <Sparkles size={14} />
        </motion.a>

      </motion.div>

      <style>{`
        .venue-section {
          position: relative;
          isolation: isolate;
          width: 100%;
          min-height: 100vh;
          min-height: 100svh;
          display: flex;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          padding: 35px 16px;
          background: #f8eee7;
        }

        .venue-template-bg {
          position: absolute;
          inset: 0;
          z-index: -3;
          background-image: url("/images/template.jpg");
          background-position: center;
          background-size: 100% 100%;
          background-repeat: no-repeat;
        }

        .venue-overlay {
          position: absolute;
          inset: 0;
          z-index: -2;
          background: rgba(255, 248, 237, 0.10);
          pointer-events: none;
        }

        .venue-particles {
          position: absolute;
          inset: 0;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .venue-particles span {
          position: absolute;
          width: 4px;
          height: 4px;
          border-radius: 50%;
          background: #d6a64e;
          box-shadow: 0 0 10px 2px rgba(214,166,78,.5);
        }

        .venue-content {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 390px;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 8px 12px;
        }

        .venue-flourish {
          color: #b88b4e;
          font-size: 28px;
          line-height: 1;
          margin-bottom: 5px;
        }

        .venue-eyebrow {
          margin: 0 0 6px;
          color: #956a3a;
          font: 700 8px "DM Sans", sans-serif;
          letter-spacing: 2.5px;
        }

        .venue-heading {
          margin: 0;
          color: #743d42;
          font: 600 clamp(28px, 7vw, 36px) "Cormorant Garamond", serif;
          line-height: 1.1;
        }

        .venue-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin: 9px 0 14px;
          color: #bd965a;
          font-size: 15px;
        }

        .venue-divider span {
          width: 34px;
          height: 1px;
          background: #bd965a;
        }

        .venue-photo-frame {
          position: relative;
          width: 100%;
          max-width: 310px;
          aspect-ratio: 16 / 9;
          padding: 6px;
          margin-bottom: 14px;
          overflow: hidden;
          border: 1px solid #bd965a;
          background: linear-gradient(
            135deg,
            #c69a5d,
            #fff0d4,
            #c69a5d
          );
          box-shadow: 0 8px 22px rgba(94,55,43,.2);
        }

        .venue-photo-frame img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          border: 1px solid rgba(164,119,63,.5);
        }

        .venue-photo-shine {
          position: absolute;
          inset: 6px;
          pointer-events: none;
          background: linear-gradient(
            115deg,
            transparent 30%,
            rgba(255,255,255,.25) 48%,
            transparent 65%
          );
          transform: translateX(-120%);
          animation: venueShine 5s ease-in-out infinite;
        }

        @keyframes venueShine {
          0%, 55% { transform: translateX(-120%); }
          85%, 100% { transform: translateX(120%); }
        }

        .venue-details {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .venue-pin {
          color: #a17b51;
          margin-bottom: 5px;
        }

        .venue-details h3 {
          margin: 0;
          color: #743d42;
          font: 600 24px/1.05 "Cormorant Garamond", serif;
        }

        .venue-details h3 span {
          display: block;
          font-size: 21px;
        }

        .venue-details p {
          margin: 5px 0 0;
          color: #896c5d;
          font: italic 15px "Cormorant Garamond", serif;
        }

        .venue-information {
          width: 100%;
          max-width: 325px;
          display: flex;
          justify-content: center;
          gap: 18px;
          margin: 13px 0;
          padding: 10px 4px;
          border-top: 1px solid rgba(181,143,88,.45);
          border-bottom: 1px solid rgba(181,143,88,.45);
          background: rgba(255,250,241,.3);
        }

        .venue-info-item {
          display: flex;
          align-items: center;
          gap: 6px;
          color: #a17b51;
          text-align: left;
        }

        .venue-info-item span {
          display: block;
          margin-bottom: 3px;
          font: 700 7px "DM Sans", sans-serif;
          letter-spacing: 1.5px;
          color: #a17b51;
        }

        .venue-info-item strong {
          display: block;
          color: #743d42;
          font: 600 13px "Cormorant Garamond", serif;
          white-space: nowrap;
        }

        .venue-map-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          min-height: 40px;
          padding: 0 22px;
          color: #fffaf2;
          background: #743d42;
          text-decoration: none;
          font: 700 8px "DM Sans", sans-serif;
          letter-spacing: 1.8px;
          box-shadow: 0 6px 17px rgba(116,61,66,.22);
        }

        .venue-map-button svg:last-child {
          color: #efd49d;
        }

        @media (max-width: 380px) {
          .venue-section {
            padding: 26px 12px;
          }

          .venue-content {
            padding: 5px 7px;
          }

          .venue-photo-frame {
            max-width: 280px;
          }

          .venue-information {
            gap: 11px;
          }

          .venue-info-item {
            gap: 4px;
          }

          .venue-info-item svg {
            width: 14px;
            flex-shrink: 0;
          }

          .venue-info-item strong {
            font-size: 11px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .venue-photo-shine {
            animation: none;
          }
        }
      `}</style>
    </section>
  );
}
