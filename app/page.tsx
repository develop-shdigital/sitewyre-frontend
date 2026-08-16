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
import { getProjects } from "@/lib/projects";

export default async function HomePage() {
  const projects = await getProjects();

  return (
    <>
      <Hero />
      <Positioning />
      <Capabilities />
      <SelectedWork projects={projects} />
      <Proof />
      <Process />
      <Technology />
      <AboutTeaser />
      <Testimonials />
      <FinalCTA />
    </>
  );
}
