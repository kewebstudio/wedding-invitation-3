
import { motion } from "framer-motion";

export default function FloralDecor({
  position = "corners",
  intensity = "normal",
}) {
  const showLeft = position === "corners" || position === "left";
  const showRight = position === "corners" || position === "right";

  return (
    <div
      className={`floral-decor floral-${position} floral-${intensity}`}
      aria-hidden="true"
    >
      {showLeft && (
        <motion.img
          src="/images/floral-left.jpg"
          alt=""
          className="floral-image floral-left"
          initial={{ opacity: 0, x: -35, rotate: -8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: "easeOut" }}
          draggable="false"
        />
      )}

      {showRight && (
        <motion.img
          src="/images/floral-right.jpg"
          alt=""
          className="floral-image floral-right"
          initial={{ opacity: 0, x: 35, rotate: 8 }}
          whileInView={{ opacity: 1, x: 0, rotate: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.15, ease: "easeOut" }}
          draggable="false"
        />
      )}

      <style>{`
        .floral-decor {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          pointer-events: none;
          z-index: 1;
        }

        .floral-image {
          position: absolute;
          display: block;
          width: clamp(130px, 25vw, 300px);
          height: auto;
          object-fit: contain;
          pointer-events: none;
          user-select: none;
          -webkit-user-drag: none;
          filter: drop-shadow(
            0 8px 18px rgba(99, 65, 43, 0.09)
          );
          animation: floralFloat 7s ease-in-out infinite;
        }

        .floral-left {
          top: 0;
          left: 0;
          transform-origin: top left;
        }

        .floral-right {
          top: 0;
          right: 0;
          transform-origin: top right;
          animation-delay: -3.5s;
        }

        .floral-corners .floral-left {
          width: clamp(145px, 28vw, 320px);
        }

        .floral-corners .floral-right {
          width: clamp(145px, 28vw, 320px);
        }

        .floral-left .floral-left {
          left: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        .floral-right .floral-right {
          right: 0;
          top: 50%;
          transform: translateY(-50%);
        }

        .floral-subtle .floral-image {
          opacity: 0.65;
          width: clamp(100px, 19vw, 230px);
        }

        .floral-subtle .floral-left {
          width: clamp(115px, 22vw, 250px);
        }

        .floral-subtle .floral-right {
          width: clamp(115px, 22vw, 250px);
        }

        @keyframes floralFloat {
          0%, 100% {
            margin-top: 0;
          }

          50% {
            margin-top: 9px;
          }
        }

        @media (max-width: 600px) {
          .floral-corners .floral-image {
            width: clamp(105px, 30vw, 170px);
          }

          .floral-subtle .floral-image {
            width: clamp(85px, 23vw, 135px);
          }

          .floral-left .floral-left {
            width: 100px;
          }

          .floral-right .floral-right {
            width: 100px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .floral-image {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
