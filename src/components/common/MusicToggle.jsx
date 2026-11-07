
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { Music2, Volume2 } from "lucide-react";

export default function MusicToggle() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = 0.35;
      audio.loop = true;
    }

    return () => {
      if (audio) {
        audio.pause();
      }
    };
  }, []);

  const toggleMusic = async () => {
    const audio = audioRef.current;

    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Unable to play wedding music:", error);
        setIsPlaying(false);
      }
    }
  };

  return (
    <>
      <audio
        ref={audioRef}
        src="/audio/wedding-music.mp3"
        preload="auto"
        loop
      />

      <motion.button
        type="button"
        className={`music-toggle ${isPlaying ? "music-playing" : ""}`}
        onClick={toggleMusic}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label={isPlaying ? "Pause wedding music" : "Play wedding music"}
        title={isPlaying ? "Pause music" : "Play music"}
      >
        <span className="music-icon">
          {isPlaying ? <Volume2 size={21} /> : <Music2 size={21} />}
        </span>

        {isPlaying && (
          <span className="music-bars" aria-hidden="true">
            <i />
            <i />
            <i />
            <i />
          </span>
        )}
      </motion.button>

      <style>{`
        .music-toggle {
          position: fixed;
          right: 22px;
          bottom: 22px;
          z-index: 1000;
          width: 52px;
          height: 52px;
          border: 1px solid rgba(190, 151, 91, 0.65);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          color: #fffaf0;
          background: linear-gradient(145deg, #792d40, #4c1728);
          box-shadow:
            0 5px 20px rgba(67, 25, 36, 0.22),
            inset 0 1px 2px rgba(255,255,255,0.2);
          cursor: pointer;
          -webkit-tap-highlight-color: transparent;
          transition: background 0.3s ease, box-shadow 0.3s ease;
        }

        .music-toggle:hover {
          box-shadow:
            0 7px 24px rgba(67, 25, 36, 0.3),
            0 0 15px rgba(204, 164, 100, 0.2);
        }

        .music-icon {
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .music-playing .music-icon {
          animation: musicDiscRotate 5s linear infinite;
        }

        .music-bars {
          position: absolute;
          top: -9px;
          right: -5px;
          display: flex;
          align-items: flex-end;
          gap: 2px;
          height: 14px;
        }

        .music-bars i {
          display: block;
          width: 3px;
          height: 5px;
          border-radius: 3px;
          background: #c9a66b;
          animation: musicBar 0.7s ease-in-out infinite alternate;
        }

        .music-bars i:nth-child(2) {
          animation-delay: 0.2s;
        }

        .music-bars i:nth-child(3) {
          animation-delay: 0.4s;
        }

        .music-bars i:nth-child(4) {
          animation-delay: 0.1s;
        }

        @keyframes musicDiscRotate {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes musicBar {
          from {
            height: 4px;
          }
          to {
            height: 13px;
          }
        }

        @media (max-width: 600px) {
          .music-toggle {
            right: 16px;
            bottom: 16px;
            width: 46px;
            height: 46px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .music-playing .music-icon,
          .music-bars i {
            animation: none;
          }
        }
      `}</style>
    </>
  );
}
