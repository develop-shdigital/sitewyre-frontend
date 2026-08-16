import type { Metadata } from "next";
import { RevealText } from "@/components/ui/RevealText";
import { WorkIndex } from "@/components/work/WorkIndex";
import { getProjects } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Selected Work",
  description: "A complete portfolio of SITEWYRE's web design, WordPress, e-commerce, and custom development work.",
};

export default async function WorkPage() {
  const projects = await getProjects();

  return (
    <div className="container-page py-32 md:py-40">
      <RevealText as="h1" className="max-w-3xl font-display text-display-2 font-medium text-fg">
        Selected work
      </RevealText>
      <div className="mt-16">
        <WorkIndex projects={projects} />
      </div>
    </div>
  );
}
