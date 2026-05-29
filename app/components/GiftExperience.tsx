"use client";

import { useState, useCallback, useRef } from "react";
import { AnimatePresence } from "framer-motion";
import { type Scene } from "./gift/config";
import { AmbientParticles } from "./gift/AmbientParticles";
import { PasswordScene } from "./gift/scenes/PasswordScene";
import { IntroScene } from "./gift/scenes/IntroScene";
import { NameScene } from "./gift/scenes/NameScene";
import { BirthdayScene } from "./gift/scenes/BirthdayScene";
import { PhotosScene } from "./gift/scenes/PhotosScene";
import { MomentsScene } from "./gift/scenes/MomentsScene";
import { LetterScene } from "./gift/scenes/LetterScene";
import { FinaleScene } from "./gift/scenes/FinaleScene";
import { DateSuccessScene } from "./gift/scenes/DateSuccessScene";
import { ReturnScene } from "./gift/scenes/ReturnScene";
import { SurpriseScene } from "./gift/scenes/SurpriseScene";
import { VolumeScene } from "./gift/scenes/VolumeScene";

export default function GiftExperience() {
  const [scene, setScene] = useState<Scene>(() => {
    if (typeof window !== "undefined" && localStorage.getItem("regalo_completed")) {
      return "return";
    }
    return "password";
  });
  const audioRef = useRef<HTMLAudioElement>(null);

  const goTo = useCallback((s: Scene) => setScene(s), []);

  const startMusic = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.volume = 0.55;
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 select-none" style={{ background: "#0a0608" }}>
      <audio ref={audioRef} src="/audio/song.mp3" loop preload="auto" />
      <AmbientParticles />

      <AnimatePresence mode="wait">
        {scene === "volume" && (
          <VolumeScene key="volume" onContinue={() => goTo("password")} />
        )}
        {scene === "password" && (
          <PasswordScene key="password" onUnlock={() => goTo("dateSuccess")} />
        )}
        {scene === "dateSuccess" && (
          <DateSuccessScene key="dateSuccess" onNext={() => goTo("volume")} onStart={startMusic} />
        )}
        {scene === "volume" && (
          <VolumeScene key="volume" onContinue={() => goTo("intro")} />
        )}
        {scene === "intro" && (
          <IntroScene key="intro" onNext={() => goTo("name")} />
        )}
        {scene === "name" && (
          <NameScene key="name" onNext={() => goTo("birthday")} />
        )}
        {scene === "birthday" && (
          <BirthdayScene key="birthday" onNext={() => goTo("photos")} />
        )}
        {scene === "photos" && (
          <PhotosScene key="photos" onNext={() => goTo("moments")} />
        )}
        {scene === "moments" && (
          <MomentsScene key="moments" onNext={() => goTo("letter")} />
        )}
        {scene === "letter" && (
          <LetterScene key="letter" onNext={() => goTo("finale")} />
        )}
        {scene === "finale" && (
          <FinaleScene key="finale" onRestart={() => goTo("return")} />
        )}
        {scene === "return" && (
          <ReturnScene key="return" onReplay={() => { startMusic(); goTo("intro"); }} onSurprise={() => goTo("surprise")} />
        )}
        {scene === "surprise" && (
          <SurpriseScene key="surprise" onBack={() => goTo("return")} />
        )}
      </AnimatePresence>
    </div>
  );
}
