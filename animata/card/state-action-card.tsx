"use client";

import {
  Check,
  CheckCircle2,
  ClipboardList,
  Heart,
  Package,
  Share2,
  Sparkles,
  Users,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useMemo, useState } from "react";

import { cn } from "@/lib/utils";

type CardUseCase = "task" | "social" | "order";

type ActionType = "favorite" | "complete" | "share";

interface CardPreset {
  title: string;
  description: string;
  meta: string;
  badge: string;
  icon: typeof ClipboardList;
}

interface StateActionCardProps {
  readonly useCase?: CardUseCase;
  readonly className?: string;
}

const cardPresets: Record<CardUseCase, CardPreset> = {
  task: {
    title: "Finalize Sprint Notes",
    description: "Wrap up pending checklist items and post a summary for the team standup.",
    meta: "Due in 3 hours",
    badge: "Task Manager",
    icon: ClipboardList,
  },
  social: {
    title: "Design Community Spotlight",
    description: "A new behind-the-scenes post is trending. Save it or share it with your team.",
    meta: "2.4k interactions",
    badge: "Social Card",
    icon: Users,
  },
  order: {
    title: "Order #48291",
    description: "Wireless Keyboard and Mouse bundle is packed and ready for final dispatch.",
    meta: "Ships today",
    badge: "Dashboard Order",
    icon: Package,
  },
};

const confettiPieces = [
  { id: "c1", x: -48, y: -34, rotate: -35, color: "bg-emerald-400" },
  { id: "c2", x: -26, y: -50, rotate: -10, color: "bg-cyan-400" },
  { id: "c3", x: -6, y: -56, rotate: 6, color: "bg-yellow-400" },
  { id: "c4", x: 18, y: -50, rotate: 22, color: "bg-fuchsia-400" },
  { id: "c5", x: 42, y: -34, rotate: 38, color: "bg-orange-400" },
  { id: "c6", x: -36, y: -18, rotate: -24, color: "bg-lime-400" },
  { id: "c7", x: 32, y: -16, rotate: 30, color: "bg-sky-400" },
  { id: "c8", x: 0, y: -30, rotate: 0, color: "bg-violet-400" },
];

export default function StateActionCard({
  useCase = "task",
  className,
}: Readonly<StateActionCardProps>) {
  const preset = cardPresets[useCase];
  const CardIcon = preset.icon;

  const [isFavorite, setIsFavorite] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isShared, setIsShared] = useState(false);
  const [lastAction, setLastAction] = useState<ActionType | null>(null);
  const [showConfetti, setShowConfetti] = useState(false);

  const statuses = useMemo(() => {
    return [
      { label: preset.badge, className: "bg-zinc-900 text-white" },
      isCompleted
        ? { label: "Completed", className: "bg-emerald-100 text-emerald-700" }
        : { label: "In Progress", className: "bg-amber-100 text-amber-700" },
      isFavorite
        ? { label: "Favorited", className: "bg-rose-100 text-rose-700" }
        : { label: "Not Favorite", className: "bg-zinc-100 text-zinc-600" },
      isShared
        ? { label: "Shared", className: "bg-sky-100 text-sky-700" }
        : { label: "Private", className: "bg-zinc-100 text-zinc-600" },
    ];
  }, [isCompleted, isFavorite, isShared, preset.badge]);

  const triggerActionFeedback = (action: ActionType) => {
    setLastAction(action);
    window.setTimeout(() => {
      setLastAction((previous) => (previous === action ? null : previous));
    }, 800);
  };

  const onFavorite = () => {
    setIsFavorite((previous) => !previous);
    triggerActionFeedback("favorite");
  };

  const onComplete = () => {
    const nextValue = !isCompleted;
    setIsCompleted(nextValue);
    triggerActionFeedback("complete");

    if (nextValue) {
      setShowConfetti(true);
      window.setTimeout(() => {
        setShowConfetti(false);
      }, 1000);
    }
  };

  const onShare = () => {
    setIsShared((previous) => !previous);
    triggerActionFeedback("share");
  };

  return (
    <motion.article
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35 }}
      className={cn(
        "group relative w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_16px_45px_-24px_rgba(0,0,0,0.45)]",
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-linear-to-r from-cyan-500 via-emerald-500 to-fuchsia-500" />

      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="flex items-center gap-3">
          <span className="rounded-xl bg-zinc-100 p-2 text-zinc-700">
            <CardIcon className="size-4" />
          </span>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-zinc-500">
            Interactive Card
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2.5 py-1 text-xs font-medium text-emerald-700">
          <Sparkles className="size-3" />
          Live State
        </span>
      </div>

      <h3 className="text-xl font-semibold text-zinc-900">{preset.title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600">{preset.description}</p>

      <div className="mt-4 flex flex-wrap gap-2">
        {statuses.map((status) => (
          <span
            key={status.label}
            className={cn("rounded-full px-2.5 py-1 text-xs font-medium", status.className)}
          >
            {status.label}
          </span>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between">
        <p className="text-sm font-medium text-zinc-500">{preset.meta}</p>

        <AnimatePresence mode="wait" initial={false}>
          {lastAction && (
            <motion.div
              key={lastAction}
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -8, scale: 0.95 }}
              transition={{ duration: 0.18 }}
              className="inline-flex items-center gap-1 rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-semibold text-white"
            >
              <Check className="size-3.5" />
              Action saved
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="pointer-events-none mt-4 h-0.5 bg-linear-to-r from-transparent via-zinc-200 to-transparent" />

      <div
        className={cn(
          "mt-4 flex items-center gap-2 transition-all duration-300",
          "opacity-100 translate-y-0 sm:translate-y-3 sm:opacity-0 sm:group-hover:translate-y-0 sm:group-hover:opacity-100 sm:group-focus-within:translate-y-0 sm:group-focus-within:opacity-100",
        )}
      >
        <ActionButton
          icon={Heart}
          onClick={onFavorite}
          label={isFavorite ? "Favorited" : "Add to favorites"}
          active={isFavorite}
        />

        <ActionButton
          icon={CheckCircle2}
          onClick={onComplete}
          label={isCompleted ? "Completed" : "Mark complete"}
          active={isCompleted}
        />

        <ActionButton
          icon={Share2}
          onClick={onShare}
          label={isShared ? "Shared" : "Share"}
          active={isShared}
        />
      </div>

      <AnimatePresence>
        {showConfetti && (
          <motion.div
            className="pointer-events-none absolute left-1/2 top-[52%]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {confettiPieces.map((piece) => (
              <motion.span
                key={piece.id}
                className={cn("absolute h-2 w-1.5 rounded-sm", piece.color)}
                initial={{ x: 0, y: 0, rotate: 0, opacity: 1 }}
                animate={{
                  x: piece.x,
                  y: piece.y,
                  rotate: piece.rotate,
                  opacity: 0,
                }}
                transition={{ duration: 0.75, ease: "easeOut" }}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

interface ActionButtonProps {
  readonly icon: typeof Heart;
  readonly label: string;
  readonly active: boolean;
  readonly onClick: () => void;
}

function ActionButton({ icon: Icon, label, active, onClick }: Readonly<ActionButtonProps>) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-1.5 rounded-lg border px-3 py-2 text-xs font-medium transition",
        active
          ? "border-emerald-200 bg-emerald-50 text-emerald-700"
          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:bg-zinc-50",
      )}
    >
      <Icon className="size-3.5" />
      {label}
    </button>
  );
}
