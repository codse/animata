"use client";
import { useCallback, useRef } from "react";

interface RippleButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function RippleButton({ children, ...props }: RippleButtonProps) {
  const buttonRef = useRef<HTMLButtonElement>(null);

  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = buttonRef.current;
    if (!button) return;

    const ripple = document.createElement("span") as HTMLElement;
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height) * 2;
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = `${size}px`;
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;
    ripple.classList.add("ripple", "ripple-enter");

    button.appendChild(ripple);
  }, []);

  const removeRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
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

      ripple.addEventListener("animationend", () => {
        ripple.remove();
      });
    }
  }, []);

  return (
    <button
      ref={buttonRef}
      className="button homepage"
      onMouseEnter={createRipple}
      onMouseLeave={removeRipple}
      {...props}
    >
      <span>{children}</span>
      <style>{`
        .button {
          position: relative;
          overflow: hidden;
          color: #fff;
          font-family: 'Jost', sans-serif;
          font-style: normal;
          font-weight: 500;
          -webkit-font-smoothing: antialiased;
          padding: 0.6rem 1rem;
          font-size: 1.2rem;
          outline: 0;
          border: 0;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .button.homepage {
          background-color: #cbfe7e;
          border-radius: 50px;
          color: #0e352e;
          padding: 1.3rem;
        }
        .button.homepage:hover {
          color: #ffffff;
          transition-duration: 600ms;
        }
        .ripple {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          background-color: #000000;
          z-index: 1;
        }
        span{
          position:relative;
          z-index: 2;
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
