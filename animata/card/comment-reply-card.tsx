"use client";

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

const containerVariants = {
  hidden: { height: "auto" },
  visible: { height: "auto", transition: { duration: 0.5, ease: "easeInOut" } },
};

const commentVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function CommentReplyCard({ initialComments }: { initialComments: Comment[] }) {
  const [comments, setComments] = useState<Comment[]>([...initialComments]);
  const [newComment, setNewComment] = useState<string>("");
  const [isAnimating, setIsAnimating] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

    setTimeout(() => {
      setComments((prevComments) => [...prevComments, newCommentData]);
      setNewComment("");
      setTimeout(() => {
        setIsAnimating(false);
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 300);
    }, 300);
  };

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [comments]);

  return (
    <div className="mx-auto max-h-full min-h-96 w-full max-w-md">
      <div
        className="relative overflow-hidden rounded-lg bg-[#202020] shadow-md"
        style={{ paddingBottom: "10px" }}
      >
        <div className="m-2 flex items-center justify-between rounded-3xl bg-[#3d3d40] px-4 py-1 shadow-2xl">
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

        {/* Comment Section */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          style={{ maxHeight: "60vh" }}
          className="relative overflow-hidden"
        >
          <motion.div
            ref={containerRef}
            className="no-scrollbar max-h-60 overflow-y-auto p-2"
            initial={{ y: 0 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            <AnimatePresence initial={false}>
              {comments.map((comment) => (
                <motion.div
                  key={comment.id}
                  variants={commentVariants}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="mb-4"
                  layout
                >
                  <div className="flex items-center">
                    <div
                      className="mr-3 h-8 w-8 overflow-hidden rounded-full"
                      style={{ backgroundColor: comment.avatarColor }}
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
                    </div>
                    <div>
                      <span className="font-semibold text-white">{comment.user}</span>
                      <span className="ml-2 text-sm text-gray-400">{comment.time}</span>
                    </div>
                  </div>
                  <div className="mt-1 pl-11 text-white">
                    {comment.text.map((text, textIndex) => (
                      <motion.p
                        key={`${comment.id}-${textIndex}`}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.3, delay: 0.1 }}
                      >
                        {text}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </div>

      {/* Input Box */}
      <AnimatePresence>
        {!isAnimating && (
          <motion.div
            className="absolute bottom-[-10] left-0 right-0 mx-auto mt-8 w-full max-w-[470px] rounded-lg p-2"
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -60 }}
            transition={{ duration: 0.3 }}
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
                ref={inputRef}
                type="text"
                className="flex-grow bg-transparent text-white placeholder-gray-400 focus:outline-none"
                placeholder="Reply"
                value={newComment}
                onChange={(e) => setNewComment(e.target.value)}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleAddComment();
                  }
                }}
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
