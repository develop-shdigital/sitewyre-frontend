import { Hero } from "@/components/hero/Hero";
import { Positioning } from "@/components/sections/Positioning";
import { Capabilities } from "@/components/sections/Capabilities";
import { SelectedWork } from "@/components/sections/SelectedWork";
import { Proof } from "@/components/sections/Proof";
import { Process } from "@/components/sections/Process";
import { Technology } from "@/components/sections/Technology";
import { AboutTeaser } from "@/components/sections/AboutTeaser";
import { Testimonials } from "@/components/sections/Testimonials";
import { FinalCTA } from "@/components/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <Positioning />
      <Capabilities />
      <SelectedWork />
      <Proof />
      <Process />
      <Technology />
      <AboutTeaser />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
