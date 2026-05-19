import { useEffect } from "react";
import { Hero } from "../sections/Hero";
import { Thesis } from "../sections/Thesis";
import { OperatingModel } from "../sections/OperatingModel";
import { Principles } from "../sections/Principles";
import { Marquee } from "../sections/Marquee";
import { Dispatches } from "../sections/Dispatches";
import { Cta } from "../sections/Cta";
import { ScrollTrigger } from "../lib/gsap";

export function Home() {
  // Refresh ScrollTrigger after fonts load so positions are accurate
  useEffect(() => {
    const t = setTimeout(() => ScrollTrigger.refresh(), 300);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => clearTimeout(t);
  }, []);

  return (
    <>
      <Hero />
      <Thesis />
      <OperatingModel />
      <Principles />
      <Marquee />
      <Dispatches />
      <Cta />
    </>
  );
}
