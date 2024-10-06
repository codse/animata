import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface Comment {
  id: number;
  user: string;
  text: string[];
  time: string;
  avatarColor: string;
}

export default function Component() {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      user: "Mike",
      text: ["Is it just me, or is the font size on this page designed for ants?"],
      time: "13 hours ago",
      avatarColor: "#e8824b",
    },
  ]);
  const [newComment, setNewComment] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleAddComment = () => {
    if (newComment.trim() === "") return;
    setIsAnimating(true);
    const newCommentData: Comment = {
      id: comments.length + 1,
      user: "Emily",
      text: [newComment],
      time: "now",
      avatarColor: "#e84b9d",
    };
    setComments([...comments, newCommentData]);
    setNewComment("");
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div className="no-scrollbar mx-auto w-full max-w-md">
      <motion.div
        className="overflow-hidden rounded-lg bg-[#202020] p-2 shadow-md"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: "easeInOut" }}
        style={{ maxHeight: "80vh", overflowY: "hidden" }}
        ref={containerRef}
        layout
      >
        <div className="mb-4 flex items-center justify-between rounded-3xl bg-[#3d3d40] px-4 py-1 shadow-2xl">
          <div className="flex items-center space-x-2">
            <CommentIcon />
            <span className="text-lg font-semibold text-white">Comment</span>
          </div>
          <div className="flex space-x-2">
            <button className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white">
              <Check size={20} />
            </button>
            <button className="rounded-full p-1 text-gray-400 hover:bg-gray-700 hover:text-white">
              <X size={20} />
            </button>
          </div>
        </div>
        <AnimatePresence initial={false}>
          {comments.map((comment) => (
            <motion.div
              key={comment.id}
              className="mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "linear" }}
              layout
            >
              <div className="flex items-center">
                <motion.div
                  className="mr-3 h-8 w-8 overflow-hidden rounded-full"
                  style={{ backgroundColor: comment.avatarColor }}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 0.5, ease: "linear" }}
                >
                  <svg
                    className="h-full w-full text-white opacity-70"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </motion.div>
                <div>
                  <span className="font-semibold text-white">{comment.user}</span>
                  <span className="ml-2 text-sm text-gray-400">{comment.time}</span>
                </div>
              </div>
              <div className="mt-1 pl-11 text-white">
                {comment.text.map((text, textIndex) => (
                  <motion.p
                    key={`${comment.id}-${textIndex}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, ease: "linear" }}
                  >
                    {text}
                  </motion.p>
                ))}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Input Box */}
      <AnimatePresence>
        {!isAnimating && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4, ease: "linear" }}
            className="mt-4"
          >
            <div className="relative flex items-center rounded-3xl bg-[#3d3d40] p-1">
              <div className="mr-3 h-8 w-8 overflow-hidden rounded-full bg-[#e84b9d]">
                <svg
                  className="h-full w-full text-white opacity-70"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
                placeholder="Reply"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
              />
              <button
                onClick={handleAddComment}
                className="ml-2 rounded-3xl bg-yellow-400 px-4 py-1 font-semibold text-black transition hover:bg-yellow-500"
              >
                Send
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

const CommentIcon: React.FC = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-6 w-6 text-white"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
      />
    </svg>
  );
};
