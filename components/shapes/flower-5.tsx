"use client";

import { type SVGProps, useId } from "react";

export function Flower5(props: SVGProps<SVGSVGElement>) {
  const uid = useId().replace(/:/g, "");
  const clipId = `${uid}-clip`;
  const maskId = `${uid}-mask`;
  const filterId = `${uid}-filter`;

  return (
    <svg
      className="coolshapes flower-5"
      height="400"
      width="400"
      fill="none"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath={`url(#${clipId})`}>
        <mask
          height="200"
          id={maskId}
          style={{ maskType: "alpha" }}
          width="200"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <path
            d="M140.395 59.605C175.502 64.644 200 77.28 200 100c0 22.72-24.498 35.356-59.605 40.395C135.356 175.502 122.72 200 100 200c-22.72 0-35.356-24.498-40.395-59.605C24.498 135.356 0 122.72 0 100c0-22.72 24.498-35.356 59.605-40.395C64.644 24.498 77.28 0 100 0c22.72 0 35.356 24.498 40.395 59.605z"
            fill="#fff"
          />
        </mask>
        <g mask={`url(#${maskId})`}>
          <path d="M200 0H0v200h200V0z" fill="#fff" />
          <path d="M200 0H0v200h200V0z" fill="#FF6C02" fillOpacity="0.19" />
          <g filter={`url(#${filterId})`}>
            <path d="M194 128H41v118h153V128z" fill="#FFC700" />
            <path d="M106 13H21v87h85V13z" fill="#FFE500" />
            <path d="M95 56H-23v87H95V56z" fill="#00C5DF" />
          </g>
        </g>
      </g>
      <defs>
        <filter
          height="358"
          id={filterId}
          width="342"
          x="-85.5"
          y="-49.5"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feGaussianBlur result="effect1_foregroundBlur_748_4670" stdDeviation="31.25" />
        </filter>
        <clipPath id={clipId}>
          <path d="M0 0H200V200H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
