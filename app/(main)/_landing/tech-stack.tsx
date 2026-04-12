"use client";

const technologies = ["React", "Next.js", "Tailwind CSS", "Motion"];

export default function TechStack() {
  return (
    <div className="flex flex-col items-center gap-4 py-12">
      <p className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
        Built for modern React
      </p>
      <div className="flex flex-wrap items-center justify-center gap-6">
        {technologies.map((tech) => (
          <span key={tech} className="text-sm font-medium text-[hsl(var(--text-secondary))]">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}
