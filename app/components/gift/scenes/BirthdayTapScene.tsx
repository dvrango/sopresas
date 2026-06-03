"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import Lottie, { type LottieRefCurrentProps } from "lottie-react";
import playButtonData from "../../../../public/play-button.json";
import { lavender } from "../config";

export function BirthdayTapScene({ onTap }: { onTap: () => void }) {
  const lottieRef = useRef<LottieRefCurrentProps>(null);

  function handleTap() {
    lottieRef.current?.goToAndPlay(0, true);
    onTap();
  }

  return (
    <motion.div
      key="birthdayTap"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2 }}
      className="fixed inset-0 flex flex-col items-center justify-center"
      style={{ background: "#07040a", cursor: "pointer" }}
      onClick={handleTap}
    >
      <div
        className="absolute rounded-full pointer-events-none"
        style={{
          width: "80vw", height: "80vw", maxWidth: 500, maxHeight: 500,
          background: `radial-gradient(circle, ${lavender(0.06)} 0%, transparent 70%)`,
          top: "50%", left: "50%", transform: "translate(-50%,-50%)",
          animation: "breathe 5s ease-in-out infinite",
        }}
      />

      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.4, duration: 1, ease: "easeOut" }}
        style={{ width: 160, height: 160 }}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={playButtonData}
          loop
          autoplay
          style={{ width: "100%", height: "100%" }}
        />
      </motion.div>

    </motion.div>
  );
}
