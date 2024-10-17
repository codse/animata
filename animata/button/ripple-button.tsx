"use client";
import { useCallback, useRef, useState } from "react";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function RippleButton({ children, ...props }: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (isHovered) return;
    setIsHovered(true);

    const button = buttonRef.current;
    if (!button) return;

    const existingRipple = button.querySelector(".ripple");
    if (existingRipple) {
      existingRipple.remove();
    }

    const ripple = document.createElement("span");
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple", "ripple-enter");

    button.appendChild(ripple);
  }, [isHovered]);

  const removeRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.target !== event.currentTarget) return;
    setIsHovered(false);

    const button = buttonRef.current;
    if (!button) return;

    const ripple = button.querySelector(".ripple") as HTMLElement | null;
    if (ripple) {
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
      ripple.classList.remove("ripple-enter");
      ripple.classList.add("ripple-leave");

      const handleAnimationEnd = () => {
        ripple.remove();
        ripple.removeEventListener("animationend", handleAnimationEnd);
      };
      ripple.addEventListener("animationend", handleAnimationEnd);
    }
  }, []);

  const handleMouseMove = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button || !isHovered) return;

    const ripple = button.querySelector(".ripple") as HTMLElement | null;
    if (ripple) {
      const rect = button.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height) * 2;
      const x = event.clientX - rect.left - size / 2;
      const y = event.clientY - rect.top - size / 2;

      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;
    }
  }, [isHovered]);

  return (
    <button
      ref={buttonRef}
      className="relative overflow-hidden text-[#0e352e] bg-[#cbfe7e] rounded-full p-[1.3rem] flex items-center justify-center font-jost font-medium text-[1.2rem] hover:text-white transition duration-[600ms]"
      onMouseEnter={(e) => {
        if (e.target === e.currentTarget) {
          createRipple(e);
        }
      }}
      onMouseLeave={(e) => {
        if (e.target === e.currentTarget) {
          removeRipple(e);
        }
      }}
      onMouseMove={handleMouseMove}
      {...props}
    >
      <span className="relative z-[2]">{children}</span>
      <style>{`
        .ripple {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background-color: #000000;
          z-index: 1;
          transition: transform 50ms linear;
        }
        .ripple-enter {
          animation: ripple-enter 600ms ease-out forwards;
        }
        .ripple-leave {
          animation: ripple-leave 600ms ease-out forwards;
        }
        @keyframes ripple-enter {
          from { transform: scale(0); opacity: 1; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes ripple-leave {
          from { transform: scale(1); opacity: 1; }
          to { transform: scale(0); opacity: 1; }
        }
      `}</style>
    </button>
  );
}
