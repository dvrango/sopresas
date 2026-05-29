"use client";

import { useState, useCallback } from "react";
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

export default function GiftExperience() {
  const [scene, setScene] = useState<Scene>("password");

  const goTo = useCallback((s: Scene) => setScene(s), []);

  return (
    <div className="fixed inset-0 select-none" style={{ background: "#0a0608" }}>
      <AmbientParticles />

      <AnimatePresence mode="wait">
        {scene === "password" && (
          <PasswordScene key="password" onUnlock={() => goTo("dateSuccess")} />
        )}
        {scene === "dateSuccess" && (
          <DateSuccessScene key="dateSuccess" onNext={() => goTo("intro")} />
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
          <FinaleScene key="finale" onRestart={() => goTo("intro")} />
        )}
      </AnimatePresence>
    </div>
  );
}
