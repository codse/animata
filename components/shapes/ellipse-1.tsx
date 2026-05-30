import type { SVGProps } from "react";

export function Ellipse1(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      className="coolshapes ellipse-1"
      height="400"
      width="400"
      fill="none"
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <g clipPath="url(#cs_clip_1_ellipse-1)">
        <mask
          height="200"
          id="cs_mask_1_ellipse-1"
          style={{ maskType: "alpha" }}
          width="200"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
        >
          <path
            d="M0 100C0 44.772 44.772 0 100 0s100 44.772 100 100-44.772 100-100 100S0 155.228 0 100z"
            fill="#fff"
            fillRule="evenodd"
          />
        </mask>
        <g mask="url(#cs_mask_1_ellipse-1)">
          <path d="M200 0H0v200h200V0z" fill="#fff" />
          <path d="M200 0H0v200h200V0z" fill="url(#paint0_linear_748_4808)" />
          <g filter="url(#filter0_f_748_4808)">
            <path d="M130 0H69v113h61V0z" fill="#FF58E4" />
            <path d="M196 91H82v102h114V91z" fill="#0CE548" fillOpacity="0.35" />
            <path d="M113 80H28v120h85V80z" fill="#FFE500" fillOpacity="0.74" />
          </g>
        </g>
      </g>
      <defs>
        <filter
          height="310"
          id="filter0_f_748_4808"
          width="278"
          x="-27"
          y="-55"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood result="BackgroundImageFix" floodOpacity="0" />
          <feBlend result="shape" in="SourceGraphic" in2="BackgroundImageFix" />
          <feGaussianBlur result="effect1_foregroundBlur_748_4808" stdDeviation="27.5" />
        </filter>
        <linearGradient
          id="paint0_linear_748_4808"
          gradientUnits="userSpaceOnUse"
          x1="186.5"
          x2="37"
          y1="37"
          y2="186.5"
        >
          <stop stopColor="#0E6FFF" stopOpacity="0.51" />
          <stop offset="1" stopColor="#00F0FF" stopOpacity="0.59" />
        </linearGradient>
        <clipPath id="cs_clip_1_ellipse-1">
          <path d="M0 0H200V200H0z" fill="#fff" />
        </clipPath>
      </defs>
    </svg>
  );
}
