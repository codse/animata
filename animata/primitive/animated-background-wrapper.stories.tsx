import type { Meta, StoryObj } from "@storybook/react";
import AnimatedBackgroundWrapper from "@/animata/primitive/animated-background-wrapper";

const meta = {
  title: "Primitive/Animated Background Wrapper",
  component: AnimatedBackgroundWrapper,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {},
} satisfies Meta<typeof AnimatedBackgroundWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

// ─── Content blocks ───────────────────────────────────────────────────────────

const HeroContent = () => (
  <div className="flex min-h-[500px] w-[600px] max-w-full flex-col items-center justify-center gap-6 px-8 py-20 text-center">
    <span className="rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-muted-foreground backdrop-blur-sm">
      New — Animata v2
    </span>
    <h1 className="text-5xl font-bold tracking-tight text-foreground">
      Build interfaces
      <br />
      <span className="text-primary">that feel alive.</span>
    </h1>
    <p className="max-w-sm text-base text-muted-foreground">
      Copy-paste animated components for React. Zero config. Drop-in ready.
    </p>
    <div className="flex gap-3">
      <button className="rounded-full bg-foreground px-6 py-2.5 text-sm font-semibold text-background">
        Get Started
      </button>
      <button className="rounded-full border border-border px-6 py-2.5 text-sm font-semibold text-foreground">
        View Docs
      </button>
    </div>
  </div>
);

const CTAContent = () => (
  <div className="flex min-h-[500px] w-[600px] max-w-full flex-col items-center justify-center gap-5 px-8 py-20 text-center">
    <div className="rounded-full bg-primary/10 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-primary">
      Limited beta access
    </div>
    <h2 className="text-4xl font-bold tracking-tight text-foreground">
      Ship faster.
      <br />
      Look better.
    </h2>
    <p className="max-w-xs text-sm text-muted-foreground">
      The animation library that makes your product impossible to ignore.
    </p>
    <button className="rounded-full bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground shadow-lg">
      Request Access →
    </button>
  </div>
);

const FeatureContent = () => (
  <div className="flex min-h-[500px] w-[480px] max-w-full flex-col items-start justify-center gap-8 px-8 py-16">
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg">
        ⚡
      </div>
      <div>
        <h3 className="mb-1 font-semibold text-foreground">Zero runtime</h3>
        <p className="text-sm text-muted-foreground">
          Pure CSS animations. No JS loops. Silky smooth on any device.
        </p>
      </div>
    </div>
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg">
        🎨
      </div>
      <div>
        <h3 className="mb-1 font-semibold text-foreground">Design-token aware</h3>
        <p className="text-sm text-muted-foreground">
          Respects your Tailwind theme. Dark mode and brand colors — automatic.
        </p>
      </div>
    </div>
    <div className="flex gap-4">
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-lg">
        ♿
      </div>
      <div>
        <h3 className="mb-1 font-semibold text-foreground">Accessible</h3>
        <p className="text-sm text-muted-foreground">
          Fully respects prefers-reduced-motion. Beautiful for everyone.
        </p>
      </div>
    </div>
  </div>
);

const ParticleContent = () => (
  <div className="flex min-h-[500px] w-[600px] max-w-full flex-col items-center justify-center gap-4 px-8 py-20 text-center">
    <p className="text-xs font-semibold uppercase tracking-[0.2em] text-muted-foreground">
      Magic in the details
    </p>
    <h2 className="text-5xl font-bold tracking-tight text-foreground">
      Every pixel,
      <br />
      intentional.
    </h2>
    <p className="max-w-xs text-base text-muted-foreground">
      Forty lines. Infinite possibilities. Just drop it in.
    </p>
  </div>
);

// ─── Stories ──────────────────────────────────────────────────────────────────

export const Primary: Story = {
  args: {
    variant: "aurora",
    intensity: "medium",
  },
  render: (args) => (
    <div className="dark rounded-2xl bg-black">
      <AnimatedBackgroundWrapper {...args}>
        <HeroContent />
      </AnimatedBackgroundWrapper>
    </div>
  ),
};

export const Aurora: Story = {
  args: {
    variant: "aurora",
    intensity: "medium",
  },
  render: (args) => (
    <div className="dark rounded-2xl bg-black">
      <AnimatedBackgroundWrapper {...args}>
        <HeroContent />
      </AnimatedBackgroundWrapper>
    </div>
  ),
};

export const Beam: Story = {
  args: {
    variant: "beam",
    intensity: "medium",
  },
  render: (args) => (
    <AnimatedBackgroundWrapper {...args} className="rounded-2xl border border-border bg-background">
      <CTAContent />
    </AnimatedBackgroundWrapper>
  ),
};

export const Grid: Story = {
  args: {
    variant: "grid",
    intensity: "medium",
  },
  render: (args) => (
    <AnimatedBackgroundWrapper {...args} className="rounded-2xl border border-border bg-background">
      <FeatureContent />
    </AnimatedBackgroundWrapper>
  ),
};

export const Particles: Story = {
  args: {
    variant: "particles",
    intensity: "medium",
  },
  render: (args) => (
    <AnimatedBackgroundWrapper {...args} className="rounded-2xl border border-border bg-background">
      <ParticleContent />
    </AnimatedBackgroundWrapper>
  ),
};

export const IntensityShowcase: Story = {
  args: {},
  render: () => (
    <div className="dark flex gap-4 rounded-2xl bg-black p-4">
      {(["subtle", "medium", "strong"] as const).map((intensity) => (
        <div key={intensity} className="flex-1">
          <AnimatedBackgroundWrapper variant="aurora" intensity={intensity} className="rounded-xl">
            <div className="flex min-h-[300px] flex-col items-center justify-center gap-2 px-4 text-center">
              <span className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
                {intensity}
              </span>
              <span className="text-2xl font-bold capitalize text-foreground">{intensity}</span>
            </div>
          </AnimatedBackgroundWrapper>
        </div>
      ))}
    </div>
  ),
};
