import type { SVGProps } from "react";

export function CardStackMaskDefs(props: SVGProps<SVGSVGElement>) {
  return (
    <svg aria-hidden width={0} height={0} xmlns="http://www.w3.org/2000/svg" {...props}>
      <defs>
        <mask
          id="cardstack_mask_ellipse-1"
          width="200"
          height="200"
          x="0"
          y="0"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path
            d="M0 100C0 44.772 44.772 0 100 0s100 44.772 100 100-44.772 100-100 100S0 155.228 0 100z"
            fill="#fff"
            fillRule="evenodd"
          />
        </mask>

        <mask
          id="cardstack_mask_flower-14"
          width="200"
          height="194"
          x="0"
          y="3"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path
            d="M60.87 29.427c14.184-35.236 64.076-35.236 78.26 0a25.028 25.028 0 0021.519 15.608c37.828 2.56 53.333 49.971 24.205 74.248a24.967 24.967 0 00-8.222 25.283c9.275 36.775-31.175 65.993-63.313 45.867a25.138 25.138 0 00-26.638 0c-32.138 20.126-72.587-9.092-63.313-45.867a24.967 24.967 0 00-8.221-25.283C-13.983 95.006 1.522 47.594 39.35 45.035A25.028 25.028 0 0060.87 29.427z"
            fill="#fff"
          />
        </mask>

        <mask
          id="cardstack_mask_flower-1"
          width="200"
          height="186"
          x="0"
          y="7"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path
            d="M150.005 128.863c66.681 38.481-49.997 105.828-49.997 28.861 0 76.967-116.658 9.62-49.997-28.861-66.681 38.481-66.681-96.207 0-57.727-66.681-38.48 49.997-105.827 49.997-28.86 0-76.967 116.657-9.62 49.997 28.86 66.66-38.48 66.66 96.208 0 57.727z"
            fill="#fff"
          />
        </mask>

        <mask
          id="cardstack_mask_misc-5"
          width="200"
          height="185"
          x="0"
          y="8"
          maskUnits="userSpaceOnUse"
          style={{ maskType: "alpha" }}
        >
          <path
            d="M145 8c30.376 0 55 25 55 60 0 70-75 110-100 125C75 178 0 138 0 68 0 33 25 8 55 8c18.6 0 35 10 45 20 10-10 26.4-20 45-20z"
            fill="#fff"
          />
        </mask>
      </defs>
    </svg>
  );
}
