import type { SVGProps } from "react";

export function Flower14(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="coolshapes flower-14"
      height="400"
      width="400"
      fill="none"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#cs_clip_1_flower-14)">
        <mask
          height="194"
          id="cs_mask_1_flower-14"
          style={{ maskType: "alpha" }}
          width="200"
          x="0"
          y="3"
          maskUnits="userSpaceOnUse"
        >
          <path
            d="M60.87 29.427c14.184-35.236 64.076-35.236 78.26 0a25.028 25.028 0 0021.519 15.608c37.828 2.56 53.333 49.971 24.205 74.248a24.967 24.967 0 00-8.222 25.283c9.275 36.775-31.175 65.993-63.313 45.867a25.138 25.138 0 00-26.638 0c-32.138 20.126-72.587-9.092-63.313-45.867a24.967 24.967 0 00-8.221-25.283C-13.983 95.006 1.522 47.594 39.35 45.035A25.028 25.028 0 0060.87 29.427z"
            fill="#fff"
          />
        </mask>
        <g mask="url(#cs_mask_1_flower-14)">
          <path d="M200 0H0v200h200V0z" fill="#fff" />
          <path d="M200 0H0v200h200V0z" fill="#FFF500" fillOpacity="0.44" />
          <g filter="url(#filter0_f_748_4584)">
            <ellipse cx="106" cy="22.5" fill="#FF00D6" rx="88" ry="49.5" />
            <ellipse cx="55.5" cy="160" fill="#07FFE1" rx="64.5" ry="45" />
            <path d="M218 126H100v120h118V126z" fill="#FFC700" />
          </g>
        </g>
      </g>
      <defs>
        <filter
          height="433"
          id="filter0_f_748_4584"
          width="387"
          x="-89"
          y="-107"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feGaussianBlur result="effect1_foregroundBlur_748_4584" stdDeviation="40" />
        </filter>
        <clipPath id="cs_clip_1_flower-14">
          <path d="M0 0H200V200H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
