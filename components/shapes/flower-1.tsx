import type { SVGProps } from "react";

export function Flower1(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="coolshapes flower-1"
      height="400"
      width="400"
      fill="none"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#cs_clip_1_flower-1)">
        <mask
          height="186"
          id="cs_mask_1_flower-1"
          style={{ maskType: "alpha" }}
          width="200"
          x="0"
          y="7"
          maskUnits="userSpaceOnUse"
        >
          <path
            d="M150.005 128.863c66.681 38.481-49.997 105.828-49.997 28.861 0 76.967-116.658 9.62-49.997-28.861-66.681 38.481-66.681-96.207 0-57.727-66.681-38.48 49.997-105.827 49.997-28.86 0-76.967 116.657-9.62 49.997 28.86 66.66-38.48 66.66 96.208 0 57.727z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#cs_mask_1_flower-1)">
          <path d="M200 0H0v200h200V0z" fill="#fff" />
          <path d="M200 0H0v200h200V0z" fill="url(#paint0_linear_748_4711)" />
          <g filter="url(#filter0_f_748_4711)">
            <path d="M130 0H69v113h61V0z" fill="#FF58E4" />
            <path d="M196 91H82v102h114V91z" fill="#0CE548" fillOpacity="0.35" />
            <path d="M113 80H28v120h85V80z" fill="#FFE500" fillOpacity="0.74" />
          </g>
        </g>
      </g>
      <defs>
        <filter
          height="310"
          id="filter0_f_748_4711"
          width="278"
          x="-27"
          y="-55"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feGaussianBlur result="effect1_foregroundBlur_748_4711" stdDeviation="27.5" />
        </filter>
        <linearGradient
          id="paint0_linear_748_4711"
          gradientUnits="userSpaceOnUse"
          x1="186.5"
          x2="37"
          y1="37"
          y2="186.5"
        >
          <stop stopColor="#0E6FFF" stopOpacity="0.51" />
          <stop offset="1" stopColor="#00F0FF" stopOpacity="0.59" />
        </linearGradient>
        <clipPath id="cs_clip_1_flower-1">
          <path d="M0 0H200V200H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
