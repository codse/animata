import React from "react";

interface CardCommentProps {
  commenter: string;
  replier: string;
}

export const CardComment = ({ commenter, replier }: CardCommentProps) => {
  return (
    <div className="h-60 w-full max-w-md bg-white p-4 shadow-sm shadow-gray-400">
      <div className="group relative h-40 overflow-hidden rounded-md bg-gray-100 text-black shadow-sm shadow-gray-400 transition-all duration-700 ease-in-out">
        <div className="p-4 transition-transform duration-700 ease-in-out group-hover:-translate-y-full">
          <h3 className="text-lg font-semibold">{commenter} commented</h3>
          <div className="line my-2 h-2 w-full animate-pulse rounded-md bg-[#DBDBDB]"></div>
          <div className="line2 my-2 h-2 w-2/5 animate-pulse rounded-md bg-[#DBDBDB]"></div>
        </div>

        <div className="replier-container absolute top-full w-full transition-transform duration-700 ease-in-out group-hover:-translate-y-full">
          <div className="h-40 w-full rounded-md bg-green-500 p-4 transition-opacity duration-700">
            <h3 className="text-lg font-semibold text-white">{replier} replied</h3>
            <div className="line my-2 h-2 w-full animate-pulse rounded-md bg-[#DBDBDB]"></div>
            <div className="line my-2 h-2 w-full animate-pulse rounded-md bg-[#DBDBDB]"></div>
            <div className="line2 my-2 h-2 w-2/5 animate-pulse rounded-md bg-[#DBDBDB]"></div>
          </div>
        </div>
      </div>
    </div>
  );
};
