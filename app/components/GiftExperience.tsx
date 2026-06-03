"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { type Scene, hasBirthdayArrived, PHOTOS } from "./gift/config";
import { track } from "../lib/analytics";
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
import { CountdownScene } from "./gift/scenes/CountdownScene";
import { CitaScene } from "./gift/scenes/CitaScene";
import { BirthdayArrivalScene } from "./gift/scenes/BirthdayArrivalScene";
import { BirthdayTapScene } from "./gift/scenes/BirthdayTapScene";
import { ChestIntroScene } from "./gift/scenes/ChestIntroScene";
import { ChestPuzzleScene } from "./gift/scenes/ChestPuzzleScene";

export default function GiftExperience() {
  const [scene, setScene] = useState<Scene>(() => {
    if (typeof window !== "undefined") {
      if (localStorage.getItem("regalo_completed")) return "return";
      if (localStorage.getItem("regalo_unlocked")) return hasBirthdayArrived() ? "birthdayTap" : "countdown";
    }
    return "password";
  });
  const audioRef = useRef<HTMLAudioElement>(null);
  const audio2Ref = useRef<HTMLAudioElement>(null);
  const mananitasRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    const isReturn = !!localStorage.getItem("regalo_completed");
    const visits = parseInt(localStorage.getItem("regalo_visits") ?? "0") + 1;
    localStorage.setItem("regalo_visits", String(visits));
    track("gift_opened", { is_return_visitor: isReturn, visit_number: visits });

    PHOTOS.forEach((src) => {
      const img = new window.Image();
      img.src = src;
    });
  }, []);

  const [citaDirectEdit, setCitaDirectEdit] = useState(false);

  const goTo = useCallback((next: Scene) => {
    if (next === "finale") track("gift_completed");
    if (next === "surprise") track("surprise_visited");
    setScene(next);
  }, []);

  const startMusic = useCallback(() => {
    const mananitas = mananitasRef.current;
    if (mananitas && !mananitas.paused) {
      mananitas.pause();
      mananitas.currentTime = 0;
      mananitas.volume = 0.75;
    }
    if (audioRef.current) {
      audioRef.current.volume = 0.55;
      audioRef.current.play().catch(() => {});
      track("music_started");
    }
  }, []);

  const startMananitas = useCallback(() => {
    const audio = mananitasRef.current;
    if (!audio || !audio.paused) return;
    audio.volume = 0.75;
    audio.play().catch(() => {});
  }, []);

  useEffect(() => {
    const audio = mananitasRef.current;
    if (!audio) return;
    if (scene === "volume") {
      // fadeout over 2s
      const step = () => {
        if (!audio.paused && audio.volume > 0.04) {
          audio.volume = Math.max(0, audio.volume - 0.04);
          setTimeout(step, 100);
        } else {
          audio.pause();
          audio.currentTime = 0;
          audio.volume = 0.75;
        }
      };
      step();
    }
  }, [scene, startMananitas]);

  const handleSongEnded = useCallback(() => {
    if (audio2Ref.current) {
      audio2Ref.current.volume = audioRef.current?.volume ?? 0.55;
      audio2Ref.current.loop = true;
      audio2Ref.current.play().catch(() => {});
    }
  }, []);

  return (
    <div className="fixed inset-0 select-none" style={{ background: "#0a0608" }}>
      <audio ref={audioRef} src="/audio/song.mp3" preload="auto" onEnded={handleSongEnded} />
      <audio ref={audio2Ref} src="/audio/song2.mp3" preload="auto" style={{ display: "none" }} />
      <audio ref={mananitasRef} src="/audio/mananitas.mp3" preload="auto" style={{ display: "none" }} />
      <AmbientParticles />

      <AnimatePresence mode="wait">
        {scene === "countdown" && (
          <CountdownScene key="countdown" />
        )}
        {scene === "password" && (
          <PasswordScene key="password" onUnlock={() => goTo("dateSuccess")} />
        )}
        {scene === "dateSuccess" && (
          <DateSuccessScene key="dateSuccess" onNext={() => { localStorage.setItem("regalo_unlocked", "1"); goTo(hasBirthdayArrived() ? "birthdayTap" : "countdown"); }} />
        )}
        {scene === "volume" && (
          <VolumeScene key="volume" onContinue={() => { startMusic(); goTo("intro"); }} />
        )}
        {scene === "birthdayTap" && (
          <BirthdayTapScene key="birthdayTap" onTap={() => { startMananitas(); goTo("birthdayArrival"); }} />
        )}
        {scene === "birthdayArrival" && (
          <BirthdayArrivalScene key="birthdayArrival" onNext={() => goTo("chestIntro")} onStartMusic={startMananitas} />
        )}
        {scene === "chestIntro" && (
          <ChestIntroScene key="chestIntro" onNext={() => goTo("chestPuzzle")} />
        )}
        {scene === "chestPuzzle" && (
          <ChestPuzzleScene key="chestPuzzle" onNext={() => goTo("volume")} />
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
          <ReturnScene key="return" onReplay={() => { startMusic(); goTo("intro"); }} onSurprise={() => goTo("surprise")} onCita={() => { setCitaDirectEdit(true); goTo("cita"); }} />
        )}
        {scene === "surprise" && (
          <SurpriseScene key="surprise" onBack={() => goTo("return")} onSpecialStar={() => { setCitaDirectEdit(false); goTo("cita"); }} />
        )}
        {scene === "cita" && (
          <CitaScene key="cita" onBack={() => goTo("surprise")} directEdit={citaDirectEdit} />
        )}
      </AnimatePresence>
    </div>
  );
}
