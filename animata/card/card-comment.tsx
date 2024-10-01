import React from "react";

interface CardCommentProps {
  commenter: string;
  replier: string;
}

const CardComment = ({ commenter, replier }: CardCommentProps) => {
  return (
    <div className="mx-auto w-full max-w-md p-4">
      <div className="group relative overflow-hidden rounded-md bg-gray-100 p-4 text-black shadow-sm shadow-gray-400 transition-all duration-500 ease-in-out">
        <h3 className="text-lg font-semibold">{commenter} commented</h3>
        <div className="line my-2 h-2 w-full rounded-md bg-gray-400"></div>
        <div className="line2 my-2 h-2 w-2/5 rounded-md bg-gray-400"></div>

        <div className="replier-container mt-4 hidden group-hover:block">
          <div className="w-full rounded-md bg-green-500 p-4 transition-opacity duration-300">
            <h3 className="text-lg font-semibold text-white">{replier} replied</h3>
            <div className="line my-2 h-2 w-full rounded-md bg-gray-300"></div>
            <div className="line my-2 h-2 w-full rounded-md bg-gray-300"></div>
            <div className="line2 my-2 h-2 w-2/5 rounded-md bg-gray-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardComment;
