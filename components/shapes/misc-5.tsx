"use client";

import { type SVGProps, useId } from "react";

export function Misc5(props: SVGProps<SVGSVGElement>) {
  const uid = useId().replace(/:/g, "");
  const clipId = `${uid}-clip`;
  const maskId = `${uid}-mask`;
  const paint0Id = `${uid}-paint0`;
  const paint1Id = `${uid}-paint1`;

  return (
    <svg
      className="coolshapes misc-5"
      height="400"
      width="400"
      fill="none"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <mask
          height="185"
          id={maskId}
          style={{ maskType: "alpha" }}
          width="200"
          x="0"
          y="8"
          maskUnits="userSpaceOnUse"
        >
          <path
            d="M145 8c30.376 0 55 25 55 60 0 70-75 110-100 125C75 178 0 138 0 68 0 33 25 8 55 8c18.6 0 35 10 45 20 10-10 26.4-20 45-20z"
            fill="#fff"
          />
        </mask>
        <g mask={`url(#${maskId})`}>
          <path d="M200 0H0v200h200V0z" fill="#fff" />
          <path d="M200 0H0v200h200V0z" fill={`url(#${paint0Id})`} />
          <path d="M200 0H0v200h200V0z" fill={`url(#${paint1Id})`} />
        </g>
      </g>
      <defs>
        <radialGradient
          id={paint0Id}
          cx="0"
          cy="0"
          gradientTransform="rotate(116.694 71.023 87.946) scale(199.234)"
          gradientUnits="userSpaceOnUse"
          r="1"
        >
          <stop stopColor="#FFF500" />
          <stop offset="1" stopColor="#FF00D6" stopOpacity="0" />
        </radialGradient>
        <radialGradient
          id={paint1Id}
          cx="0"
          cy="0"
          gradientTransform="rotate(48.452 -12.085 35.502) scale(223.143)"
          gradientUnits="userSpaceOnUse"
          r="1"
        >
          <stop stopColor="#FF00D6" />
          <stop offset="0.461" stopColor="#FF7171" stopOpacity="0.84" />
          <stop offset="1" stopColor="#FFF500" stopOpacity="0" />
        </radialGradient>
        <clipPath id={clipId}>
          <path d="M0 0H200V200H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
