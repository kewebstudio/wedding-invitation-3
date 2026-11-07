
export default function GoldenSparkles({ isActive = false }) {
  if (!isActive) return null;

  const sparkles = [
    ["✦", -105, -95, 0],
    ["✧", 85, -110, 35],
    ["✦", 125, -20, 70],
    ["✧", -125, 15, 90],
    ["✦", -65, 115, 110],
    ["✧", 75, 105, 130],
    ["✦", 15, -140, 150],
    ["✧", -15, 140, 170],
    ["✦", -155, -65, 190],
    ["✧", 155, 65, 210],
    ["✦", 115, 85, 230],
    ["✧", -115, 85, 250],
    ["✦", 45, -75, 270],
    ["✧", -45, -65, 290],
    ["✦", 95, -45, 310],
    ["✧", -90, 35, 330],
    ["✦", 35, 65, 350],
    ["✧", -35, -115, 370],
  ];

  return (
    <>
      <div className="golden-sparkles-layer" aria-hidden="true">
        {/* Central golden explosion */}
        <span className="sparkle-core" />

        {/* Expanding light rings */}
        <span className="sparkle-ring sparkle-ring-one" />
        <span className="sparkle-ring sparkle-ring-two" />
        <span className="sparkle-ring sparkle-ring-three" />

        {/* Main flying sparkles */}
        {sparkles.map(([symbol, x, y, delay], index) => (
          <span
            key={index}
            className={`sparkle sparkle-${index + 1}`}
            style={{
              "--sx": `${x}px`,
              "--sy": `${y}px`,
              "--delay": `${delay}ms`,
            }}
          >
            {symbol}
          </span>
        ))}

        {/* Fine golden dust */}
        {Array.from({ length: 24 }).map((_, index) => {
          const angle = (index / 24) * Math.PI * 2;
          const distance = 55 + (index % 5) * 23;

          return (
            <span
              key={`dust-${index}`}
              className="sparkle-dust"
              style={{
                "--dx": `${Math.cos(angle) * distance}px`,
                "--dy": `${Math.sin(angle) * distance}px`,
                "--dust-delay": `${index * 22}ms`,
              }}
            />
          );
        })}
      </div>

      <style>{`
        .golden-sparkles-layer {
          position: absolute;
          left: 50%;
          top: 53.8%;
          width: 1px;
          height: 1px;
          z-index: 31;
          pointer-events: none;
          overflow: visible;
        }

        /* CENTRAL LIGHT */

        .sparkle-core {
          position: absolute;
          width: 20px;
          height: 20px;
          left: 0;
          top: 0;
          border-radius: 50%;
          background: #fff9e9;
          box-shadow:
            0 0 12px 7px rgba(255, 239, 195, 0.9),
            0 0 35px 18px rgba(242, 190, 100, 0.55),
            0 0 70px 30px rgba(220, 157, 65, 0.25);
          transform: translate(-50%, -50%);
          animation: sparkleCore 1s ease-out forwards;
        }

        @keyframes sparkleCore {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.1);
          }
          25% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(3.8);
          }
        }

        /* GOLDEN SHOCKWAVES */

        .sparkle-ring {
          position: absolute;
          left: 0;
          top: 0;
          width: 25px;
          height: 25px;
          border: 1px solid rgba(255, 224, 165, 0.9);
          border-radius: 50%;
          transform: translate(-50%, -50%) scale(0.2);
          animation: sparkleRing 1.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        .sparkle-ring-one {
          animation-delay: 0ms;
        }

        .sparkle-ring-two {
          animation-delay: 130ms;
        }

        .sparkle-ring-three {
          animation-delay: 260ms;
        }

        @keyframes sparkleRing {
          0% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(0.2);
            box-shadow: 0 0 12px rgba(255, 218, 147, 0.7);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(12);
            box-shadow: 0 0 30px rgba(255, 218, 147, 0);
          }
        }

        /* MAIN SPARKLES */

        .sparkle {
          position: absolute;
          display: block;
          left: 0;
          top: 0;
          color: #ffe6a0;
          font-size: 19px;
          line-height: 1;
          opacity: 0;
          text-shadow:
            0 0 5px #fff1bd,
            0 0 12px #e8b94f,
            0 0 24px #d99b24;
          will-change: transform, opacity;
          animation: goldenSparkleBurst 1.35s cubic-bezier(0.16, 1, 0.3, 1) forwards;
          animation-delay: var(--delay);
        }

        .sparkle:nth-child(even) {
          font-size: 13px;
          color: #fff9e8;
        }

        .sparkle-3,
        .sparkle-7,
        .sparkle-11,
        .sparkle-15 {
          font-size: 23px;
        }

        @keyframes goldenSparkleBurst {
          0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.1) rotate(0deg);
          }

          15% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.5) rotate(45deg);
          }

          45% {
            opacity: 1;
            transform:
              translate(
                calc(-50% + var(--sx) * 0.55),
                calc(-50% + var(--sy) * 0.55)
              )
              scale(1.1)
              rotate(110deg);
          }

          100% {
            opacity: 0;
            transform:
              translate(
                calc(-50% + var(--sx)),
                calc(-50% + var(--sy))
              )
              scale(0.15)
              rotate(220deg);
          }
        }

        /* FINE GOLDEN DUST */

        .sparkle-dust {
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: #fff0c4;
          box-shadow:
            0 0 6px #f5d18c,
            0 0 12px rgba(255, 220, 155, 0.8);
          opacity: 0;
          animation: goldenDust 1.15s ease-out forwards;
          animation-delay: var(--dust-delay);
          will-change: transform, opacity;
        }

        @keyframes goldenDust {
          0% {
            opacity: 0;
            transform: translate(0, 0) scale(0);
          }
          25% {
            opacity: 1;
            transform: translate(
              calc(var(--dx) * 0.45),
              calc(var(--dy) * 0.45)
            ) scale(1.3);
          }
          100% {
            opacity: 0;
            transform: translate(var(--dx), var(--dy)) scale(0.2);
          }
        }

        @media (max-width: 600px) {
          .sparkle {
            font-size: 15px;
          }

          .sparkle:nth-child(even) {
            font-size: 11px;
          }

          .sparkle-3,
          .sparkle-7,
          .sparkle-11,
          .sparkle-15 {
            font-size: 19px;
          }

          .sparkle-ring {
            width: 20px;
            height: 20px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .sparkle,
          .sparkle-core,
          .sparkle-ring,
          .sparkle-dust {
            animation-duration: 0.5s;
          }
        }
      `}</style>
    </>
  );
}
