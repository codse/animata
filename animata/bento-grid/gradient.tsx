import { ReactNode } from "react";
import {
  ArrowRight,
  BarChart,
  BookPlus,
  GitBranch,
  HeartPulse,
  LineChart,
  Sun,
  TypeIcon,
} from "lucide-react";

import MovingGradient from "@/animata/background/moving-gradient";
import { cn } from "@/lib/utils";

function BentoCard({
  title,
  icon,
  description,
  children,
  gradient,
  className,
}: {
  children?: ReactNode;
  title: ReactNode;
  icon: ReactNode;
  gradient?: string;
  description: ReactNode;
  className?: string;
}) {
  return (
    <MovingGradient
      animated={false}
      className={cn("rounded-md", className)}
      gradientClassName={cn("opacity-10", gradient)}
    >
      <section className="flex h-full flex-col gap-2 p-4">
        <header>
          <div className="mb-2 flex items-center gap-2">
            {icon}
            <p className="text-md line-clamp-1 font-bold">{title}</p>
          </div>
        </header>
        <div className="flex-1 text-sm font-medium text-opacity-80">{description}</div>
        {children}
      </section>
    </MovingGradient>
  );
}

function GetGradient() {
  return (
    <BentoCard
      title="Gradient"
      icon={<BarChart size={24} />}
      description={<span>A gradient is a smooth transition from one color to another.</span>}
      className="sm:col-span-1 sm:row-span-2"
      gradient="from-cyan-900 via-60% via-sky-600 to-indigo-600"
    >
      <div className="group relative flex cursor-pointer flex-col justify-end rounded-md bg-zinc-950 p-2 text-2xl tracking-tight text-gray-100 md:text-4xl">
        <div className="font-light">Get</div>
        <div className="-mt-2 font-bold">Gradients</div>
        <div className="flex h-6 w-6 items-center justify-center rounded-full border bg-white transition-all duration-700 group-hover:rotate-[360deg] md:h-8 md:w-8">
          <ArrowRight size={16} className="text-blue-600" />
        </div>
        <div className="absolute right-2 top-2 h-2 w-2 rounded-full bg-white opacity-50 transition-all duration-700 group-hover:opacity-25" />
      </div>
    </BentoCard>
  );
}

function LinearGradient() {
  return (
    <BentoCard
      title="Linear Gradient"
      icon={<GitBranch size={24} />}
      description="A linear gradient is a gradient that goes in a straight line."
      gradient="from-red-300 via-60% via-rose-300 to-red-200"
      className="group sm:col-span-1"
    >
      <div className="h-4 w-full rounded-sm bg-gray-100 group-hover:animate-pulse group-hover:bg-gray-300" />
      <div className="h-4 w-1/2 rounded-sm bg-gray-100 group-hover:animate-pulse group-hover:bg-gray-300" />
    </BentoCard>
  );
}

function RadialGradient() {
  return (
    <BentoCard
      title="Radial Gradient"
      icon={<LineChart size={24} />}
      description="A radial gradient is a gradient that goes in a circular direction."
      gradient="from-lime-300 via-60% via-green-200 to-lime-200"
      className="group sm:col-span-1"
    >
      <div className="flex w-full flex-row justify-end gap-2 rounded border-yellow-200 bg-yellow-100 p-2">
        <HeartPulse
          size={16}
          className="delay-150 duration-75 group-hover:animate-in group-hover:slide-in-from-right-full"
        />
        <Sun
          size={16}
          className="delay-75 duration-75 group-hover:animate-in group-hover:slide-in-from-right-full"
        />
        <BookPlus
          size={16}
          className="duration-75 group-hover:animate-in group-hover:slide-in-from-right-full"
        />
      </div>
    </BentoCard>
  );
}

function ConicGradient() {
  return (
    <BentoCard
      title="Conic Gradient"
      icon={<TypeIcon size={24} />}
      description="A conic gradient is a gradient that goes in a circular direction."
      gradient="from-cyan-900 via-60% via-sky-600 to-indigo-600"
      className="sm:col-span-2"
    />
  );
}

export default function Gradient() {
  return (
    <div className="bg-zinc-950 p-4">
      <div className="grid grid-cols-1 gap-4 text-black sm:grid-cols-3 lg:grid-cols-3">
        <GetGradient />
        <LinearGradient />
        <RadialGradient />
        <ConicGradient />
      </div>
    </div>
  );
}
