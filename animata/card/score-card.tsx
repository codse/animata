import React, { useState } from "react";
import { motion } from "framer-motion";

interface Team {
  name: string;
  logo: string;
}

interface ScoreProps {
  homeTeam: Team;
  awayTeam: Team;
  homeScore: number;
  awayScore: number;
  matchTime: string;
  scorer: string;
}

export default function LiveScoreWidget({
  homeTeam,
  awayTeam,
  homeScore,
  awayScore,
  matchTime,
  scorer,
}: ScoreProps) {
  const [scored, setScored] = useState(false);
  const [awScore, setAwScore] = useState(awayScore);
  const [popAnimation, setPopAnimation] = useState(false);

  return (
    <div className="p-10">
      <motion.div
        className={`rounded-3xl ${scored ? "bg-[#09374d]" : "bg-none"} p-1`}
        animate={{ height: scored ? 160 : 100 }}
        transition={{ type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className="mx-auto flex w-[440px] items-center justify-evenly rounded-3xl bg-black p-4 text-white">
          {/* Home Team */}
          <div className="flex flex-col">
            <img
              src={homeTeam.logo}
              alt={homeTeam.name}
              className="mb-2 h-[70px] w-[70px] object-contain"
            />
            {!scored && <span>{homeTeam.name}</span>}
          </div>

          {/* Score */}
          <div className="text-center">
            <motion.div
              className="text-4xl font-bold"
              animate={popAnimation ? { opacity: [1, 0, 1] } : { opacity: 1 }} // Popping animation
              transition={{ duration: 0.5 }} // Control animation speed
              onAnimationComplete={() => setPopAnimation(false)}
            >
              {homeScore}-{awScore}
            </motion.div>
            <div className="text-base">{matchTime}</div>
          </div>

          {/* Away Team */}
          <div className="flex flex-col">
            <img
              src={awayTeam.logo}
              alt={awayTeam.name}
              className="mb-2 h-[70px] w-[70px] object-contain"
            />
            {!scored && <span>{awayTeam.name}</span>}
          </div>
        </div>
        {scored && (
          <motion.div
            className="py-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 4 }}
          >
            <div className="flex items-center justify-between">
              <div className="ml-4 flex items-center text-lg text-white">
                <FootbalIcon />
                <span className="ml-2 text-white">{scorer} scores!</span>
              </div>
              <span className="mr-4 text-lg text-slate-500">now</span>
            </div>
          </motion.div>
        )}
      </motion.div>

      <button
        className="absolute bottom-4 right-4 rounded-full bg-white p-2"
        onClick={() => {
          setScored(true);
          setPopAnimation(true);
          setTimeout(() => {
            setAwScore(awScore + 1);
          }, 500);
          setTimeout(() => {
            setScored(false);
          }, 3000);
        }}
      >
        Score
      </button>
    </div>
  );
}

function FootbalIcon() {
  return (
    <svg
      fill="#ffffff"
      width="20px"
      height="20px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M19.071 4.929a9.936 9.936 0 0 0-7.07-2.938 9.943 9.943 0 0 0-7.072 2.938c-3.899 3.898-3.899 10.243 0 14.142a9.94 9.94 0 0 0 7.073 2.938 9.936 9.936 0 0 0 7.07-2.937c3.899-3.898 3.899-10.243-.001-14.143zM12.181 4h-.359c.061-.001.119-.009.18-.009s.118.008.179.009zm6.062 13H16l-1.258 2.516a7.956 7.956 0 0 1-2.741.493 7.96 7.96 0 0 1-2.746-.494L8 17.01H5.765a7.96 7.96 0 0 1-1.623-3.532L6 11 4.784 8.567a7.936 7.936 0 0 1 1.559-2.224 7.994 7.994 0 0 1 3.22-1.969L12 6l2.438-1.625a8.01 8.01 0 0 1 3.22 1.968 7.94 7.94 0 0 1 1.558 2.221L18 11l1.858 2.478A7.952 7.952 0 0 1 18.243 17z" />
      <path d="m8.5 11 1.5 4h4l1.5-4L12 8.5z" />
    </svg>
  );
}
