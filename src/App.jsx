
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

import SealedCard from "./components/opening/SealedCard";
import InvitationReveal from "./components/opening/InvitationReveal";

import InvitationCover from "./components/invitation/InvitationCover";
import CoupleSection from "./components/invitation/CoupleSection";
import VenueSection from "./components/invitation/VenueSection";
import ThankYou from "./components/invitation/ThankYou";

import MusicToggle from "./components/common/MusicToggle";

const sectionAnimation = {
  initial: {
    opacity: 0,
    y: 35,
  },
  whileInView: {
    opacity: 1,
    y: 0,
  },
  viewport: {
    once: true,
    amount: 0.12,
  },
  transition: {
    duration: 0.9,
    ease: [0.22, 1, 0.36, 1],
  },
};

export default function App() {
  const [isInvitationVisible, setIsInvitationVisible] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isInvitationVisible ? "" : "hidden";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isInvitationVisible]);

  const handleInvitationOpened = () => {
    setIsInvitationVisible(true);
  };

  return (
    <main className="wedding-app">
      {!isInvitationVisible && (
        <section className="opening-screen">
          <SealedCard onOpened={handleInvitationOpened} />
        </section>
      )}

      <InvitationReveal isVisible={isInvitationVisible}>
        <div className="invitation-content wedding-story">

          <motion.div
            className="wedding-story-section"
            {...sectionAnimation}
          >
            <InvitationCover />
          </motion.div>

          <motion.div
            className="wedding-story-section"
            {...sectionAnimation}
          >
            <CoupleSection />
          </motion.div>

          <motion.div
            className="wedding-story-section"
            {...sectionAnimation}
          >
            <VenueSection />
          </motion.div>

          <motion.div
            className="wedding-story-section"
            {...sectionAnimation}
          >
            <ThankYou />
          </motion.div>

        </div>
      </InvitationReveal>

      {isInvitationVisible && <MusicToggle />}
    </main>
  );
}
