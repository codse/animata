import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface ContentScannerProps {
  content: string;
  highlightWords: string[];
  scanDuration?: number;
  reverseDuration?: number;
}

const ContentScanner: React.FC<ContentScannerProps> = ({
  content,
  highlightWords,
  scanDuration = 3,
  reverseDuration = 1,
}) => {
  const [scanning, setScanning] = useState(false);
  const [aiProbability, setAiProbability] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const scannerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const scannerAnimation = useAnimation();
  const [highlightedWords, setHighlightedWords] = useState<string[]>([]);
  const [animationPhase, setAnimationPhase] = useState<"idle" | "forward" | "paused" | "reverse">(
    "idle",
  );

  const startScanning = async () => {
    if (scanning || !containerRef.current) return;

    setScanning(true);
    setAiProbability(0);
    setHighlightedWords([]);
    setAnimationPhase("forward");

    const containerWidth = containerRef.current.offsetWidth - 110;

    // Forward scan
    await scannerAnimation.start({
      x: containerWidth,
      transition: { duration: scanDuration, ease: "linear" },
    });

    setAnimationPhase("paused");

    // Pause
    await new Promise((resolve) => setTimeout(resolve, 200));

    setAnimationPhase("reverse");

    // Backward scan
    await scannerAnimation.start({
      x: "-87%",
      transition: { duration: reverseDuration, ease: "linear" },
    });

    setScanning(false);
    setHighlightedWords([]);
    setAnimationPhase("idle");
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    let pauseTimeout: NodeJS.Timeout;

    if (animationPhase === "forward") {
      interval = setInterval(
        () => {
          setAiProbability((prev) =>
            Math.min(prev + 1, Math.floor(content.length / highlightWords.length)),
          );
        },
        (scanDuration * 1000) / 55,
      );
    } else if (animationPhase === "paused") {
      //delay before starting reverse
      pauseTimeout = setTimeout(() => {
        setAnimationPhase("reverse");
      }, 200);
    } else if (animationPhase === "reverse") {
      interval = setInterval(
        () => {
          setAiProbability((prev) => Math.max(prev - 1, 0));
        },
        (reverseDuration * 1000) / 40,
      );
    }

    return () => {
      clearInterval(interval);
      clearTimeout(pauseTimeout);
    };
  }, [animationPhase, scanDuration, reverseDuration, content.length, highlightWords.length]);

  useEffect(() => {
    if (scanning && scannerRef.current && contentRef.current) {
      const updateHighlightedWords = () => {
        const scannerRect = scannerRef.current!.getBoundingClientRect();
        const contentRect = contentRef.current!.getBoundingClientRect();
        const scannerRightEdge = scannerRect.right - contentRect.left;

        const newHighlightedWords = highlightWords.filter((phrase) => {
          const phraseElements = contentRef.current!.querySelectorAll(`[data-phrase="${phrase}"]`);
          return Array.from(phraseElements).some((element) => {
            const elementRect = element.getBoundingClientRect();
            const elementRightEdge = elementRect.right - contentRect.left;
            return elementRightEdge <= scannerRightEdge;
          });
        });

        setHighlightedWords(newHighlightedWords);
      };

      const animationFrame = requestAnimationFrame(function animate() {
        updateHighlightedWords();
        if (scanning) {
          requestAnimationFrame(animate);
        }
      });

      return () => cancelAnimationFrame(animationFrame);
    }
  }, [scanning, highlightWords]);

  const highlightText = (text: string) => {
    let result = text;
    highlightWords.forEach((phrase) => {
      const regex = new RegExp(`(${phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")})`, "gi");
      result = result.replace(
        regex,
        (match) =>
          `<span class="highlight ${highlightedWords.includes(phrase) ? "active" : ""}" data-phrase="${phrase}">${match}</span>`,
      );
    });
    return result;
  };

  const renderAiProbability = (probability: number) => {
    const digits = probability.toString().padStart(2, "0").split("").map(Number);

    const digitVariants = {
      initial: { y: 0 },
      animate: {
        y: [0, -30, 0],
        transition: {
          repeat: Infinity,
          repeatType: "loop" as const,
          duration: 1.5,
          ease: "easeInOut",
        },
      },
    };

    return (
      <>
        <div className="inline-flex items-center">
          <div className="inline-flex h-8 overflow-hidden">
            {digits.map((digit, index) => (
              <motion.div
                key={`${index}-${digit}`}
                variants={digitVariants}
                initial="initial"
                animate="animate"
                className="inline-flex h-8 w-6 flex-col items-center justify-center"
              >
                {[digit, (digit + 1) % 10, (digit + 2) % 10].map((n, i) => (
                  <span key={i} className="font-bold leading-8 text-purple-900">
                    {n}
                  </span>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </>
    );
  };

  return (
    <div className="relative mx-auto w-full max-w-2xl rounded-lg bg-white p-14 shadow-md">
      <div className="pb-5 text-center">
        <p className="p-5 text-2xl font-bold">Free AI Content Detector</p>
        <p className="pb-8">Brand new content in seconds. Remove any form of plagiarism</p>
      </div>

      <motion.div
        ref={containerRef}
        className="relative overflow-hidden rounded bg-white p-4 shadow-lg"
        style={{ minHeight: "120px" }}
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      >
        <div
          ref={contentRef}
          className="relative"
          dangerouslySetInnerHTML={{ __html: highlightText(content) }}
          style={{ color: "#666" }}
        />
        <motion.div
          ref={scannerRef}
          className="pointer-events-none absolute -top-5 left-0 h-[calc(100%+40px)]"
          initial={{ x: "-87%" }}
          animate={scannerAnimation}
        >
          <div className="flex h-full flex-row-reverse">
            <div className="h-full w-1.5 bg-[#887FF2]" />
            <div className="h-full w-24 bg-custom-gradient" />
          </div>
        </motion.div>
      </motion.div>

      <div className="rounded">
        <div className="flex justify-center">
          <button
            onClick={startScanning}
            className="mt-4 rounded bg-[#887FF2] px-4 py-2 text-white"
            disabled={scanning}
          >
            {scanning ? "Scanning..." : "Start Scan"}
          </button>
        </div>
        <div className="relative mt-2 overflow-hidden text-center text-sm text-black">
          <div className="flex items-center justify-center">
            {aiProbability > 0 && renderAiProbability(Math.floor(aiProbability))}
            <span className="ml-1 font-bold text-purple-900">%</span>
            <span className="ml-1">AI Content Probability</span>
          </div>
        </div>
      </div>

      <style>{`
        .highlight {
          transition: background-color 0.3s ease;
          box-decoration-break: clone;
          -webkit-box-decoration-break: clone;
        }
        .highlight.active {
          background-color: #DAD9FE;
        }
        .scanned-text {
          color: #4B0082;
        }
      `}</style>
    </div>
  );
};

export default ContentScanner;
