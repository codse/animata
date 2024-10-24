import type { Config } from "tailwindcss";

const config = {
  darkMode: ["class"],
  content: ["./animata/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      backgroundImage: {
        striped:
          "repeating-linear-gradient(45deg, #3B3A3D 0px, #3B3A3D 5px, transparent 5px, transparent 20px)",
        "custom-gradient": "linear-gradient(to left, rgba(136,127,242,0.7) 0%, transparent 100%)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        glow: "0 0 20px rgba(255, 204, 112, 0.7), 0 0 40px rgba(200, 80, 192, 0.5), 0 0 60px rgba(65, 88, 208, 0.3)",
        glow2:
          "0 0 20px rgba(50, 255, 50, 0.7), 0 0 40px rgba(20, 200, 20, 0.5), 0 0 60px rgba(5, 150, 5, 0.3)",
      },
      filter: {
        "blur-20": "blur(20px)",
        "blur-25": "blur(25px)",
      },
      brightness: {
        150: "1.5",
      },
      keyframes: {
        fill: {
          "0%": { height: "0%" },
          "100%": { height: "var(--progress-height)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "reveal-up": {
          "0%": { opacity: "0", transform: "translateY(80%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "reveal-down": {
          "0%": { opacity: "0", transform: "translateY(-80%)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "marquee-x": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(calc(-100% - var(--gap)))" },
        },
        "marquee-y": {
          from: { transform: "translateY(0)" },
          to: { transform: "translateY(calc(-100% - var(--gap)))" },
        },
        "bg-position": {
          "0%": { backgroundPosition: "0% 50%" },
          "100%": { backgroundPosition: "100% 50%" },
        },
        "shape-shift": {
          "0%": {
            width: "40px",
            height: "20px",
          },
          "20%": { width: "240px", height: "128px" },
          "40%": { width: "80px", height: "80px" },
          "80%": { width: "128px", height: "240px" },
          "100%": { width: "80px", height: "80px" },
        },
        swing: {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(-30deg)" },
        },
        "content-blur": {
          "0%": { filter: "blur(0.3rem)" },
          "100%": { filter: "blur(0)" },
        },
        "pop-blob": {
          "0%": { transform: "scale(1)" },
          "33%": { transform: "scale(1.2)" },
          "66%": { transform: "scale(0.8)" },
          "100%": { transform: "scale(1)" },
        },
        "flip-words": {
          "10%": { transform: "translateY(-112%)" },
          "25%": { transform: "translateY(-100%)" },
          "35%": { transform: "translateY(-212%)" },
          "50%": { transform: "translateY(-200%)" },
          "60%": { transform: "translateY(-312%)" },
          "75%": { transform: "translateY(-300%)" },
          "85%": { transform: "translateY(-412%)" },
          "100%": { transform: "translateY(-400%)" },
        },
        fadeIn: {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "blink-red": {
          "0%, 100%": {
            backgroundColor: "rgba(239, 68, 68, 0.7)",
            boxShadow: "0 0 30px 10px rgba(239, 68, 68, 0.5)",
          },
          "50%": {
            backgroundColor: "rgba(239, 68, 68, 0.5)",
            boxShadow: "0 0 30px 10px rgba(239, 68, 68, 1)",
          },
        },
        "rotate-full": {
          "0%": { transform: "rotate(0deg)" },
          "100%": { transform: "rotate(360deg)" },
        },
        sparkle: {
          "0%, 100%": { opacity: "0.75", scale: "0.9" },
          "50%": { opacity: "1", scale: "1" },
        },
        meteor: {
          "0%": { transform: "translateY(-20%) translateX(-50%)" },
          "100%": { transform: "translateY(300%) translateX(-50%)" },
        },
        trail: {
          "0%": { "--angle": "0deg" },
          "100%": { "--angle": "360deg" },
        },
        led: {
          "0%": { fill: "currentColor", brightness: "1" },
          "50%": { fill: "#a855f7", brightness: "500%" },
          "100%": { fill: "currentColor", brightness: "1" },
        },
        glitch: {
          "0%": {
            color: "#fff",
            textShadow: "2px 2px 0px #00ffff, -2px -2px 0px #ff00ff",
          },
          "25%": {
            color: "#00ffff",
            textShadow: "-2px -2px 0px #fff, 2px 2px 0px #ff00ff",
          },
          "50%": {
            color: "#ff00ff",
            textShadow: "2px -2px 0px #00ffff, -2px 2px 0px #fff",
          },
          "75%": {
            color: "#eee",
            textShadow: "-2px 2px 0px #ff00ff, 2px -2px 0px #00ffff",
          },
          "100%": {
            color: "#fff",
            textShadow: "2px 2px 0px #00ffff, -2px -2px 0px #ff00ff",
          },
        },
        twinkle: {
          "0%": { opacity: "0" },
          "50%": { opacity: "1" },
          "100%": { opacity: "0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-40px)" },
        },
      },
      animation: {
        fill: "fill 1s forwards",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "marquee-horizontal": "marquee-x var(--duration) infinite linear",
        "marquee-vertical": "marquee-y var(--duration) linear infinite",
        "bg-position": "bg-position 3s infinite alternate",
        "pop-blob": "pop-blob 4s infinite",
        "flip-words": "flip-words 8s infinite",
        fadeIn: "fadeIn 0.5s ease-in",
        "blink-red": "blink-red 2s infinite linear",
        sparkle: "sparkle 2s ease-in-out infinite",
        meteor: "meteor var(--duration) var(--delay) ease-in-out infinite",
        trail: "trail var(--duration) linear infinite",
        led: "led 100ms ease-in-out",
        float: "float 3s ease-in-out infinite",
      },
      transitionTimingFunction: {
        slow: "cubic-bezier(.405, 0, .025, 1)",
        "minor-spring": "cubic-bezier(0.76,0.34,0.38,1.64)",
      },
      transitionDuration: {
        mid: "3s",
        long: "10s",
      },
      cursor: {
        sword: "url('/cursor.png'), default",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;

export default config;
