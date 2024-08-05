import { motion } from "framer-motion";

const splitText = (text: string, word = false) => {
  if (word) {
    return String(text).split(/(?:\b)/u);
  }
  return String(text).split(/(?:)/u);
};

export default function JumpingTextInstagram({
  text = "This is a jumping text effect",
  mode = "word",
  className,
}: {
  text: string;
  className?: string;
  mode?: "word" | "character";
}) {
  const isWordMode = mode === "word";
  const nodes = splitText(text, isWordMode);
  return (
    <div className={className} key={text}>
      {nodes.map((node, index) => (
        <motion.span
          key={index}
          initial={{
            translateY: 30,
            rotate: -30,
            opacity: 0,
          }}
          animate={{
            opacity: [0, 0.5, 1],
            translateY: [30, -30, 0],
            rotate: [-30, 30, 0],
            transition: {
              type: "spring",
              damping: 10,
              mass: 2,
              delay: (isWordMode ? 0.05 : 0.01) * index,
              duration: nodes.length * 0.05,
            },
          }}
          className="inline-block origin-center"
        >
          {node === " " ? "\u00A0" : node}
        </motion.span>
      ))}
      <span className="sr-only">{text}</span>
    </div>
  );
}
