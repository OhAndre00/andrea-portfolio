export type ExperimentStatus = "Live" | "Building" | "Archived";

export interface ExperimentItem {
  title: string;
  summary: string;
  stack: string[];
  status: ExperimentStatus;
  href?: string;
}

export const experiments: ExperimentItem[] = [
  {
    title: "Neural Gradient Playground",
    summary:
      "Visual tool to generate layered gradient systems and export token presets for real UI themes.",
    stack: ["Next.js", "Canvas", "Tailwind"],
    status: "Live",
    href: "/lab/neural-gradient-playground",
  },
];
