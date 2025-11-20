import * as React from "react";
import type { SVGProps } from "react";
const SvgReveiwAddIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 66 66"
    {...props}
  >
    <circle cx={33} cy={33} r={33} fill="#3DCCA3" />
    <g clipPath="url(#reveiw_add_icon_svg__a)">
      <path
        fill="#fff"
        d="m34.47 31.5.001-13.349a1.5 1.5 0 1 0-3 0v13.35L18.122 31.5a1.5 1.5 0 1 0 0 3h13.35l-.002 13.349a1.5 1.5 0 1 0 3.001 0v-13.35l13.349.001a1.5 1.5 0 1 0 0-3z"
      />
    </g>
    <defs>
      <clipPath id="reveiw_add_icon_svg__a">
        <path fill="#fff" d="m16 33 16.97-16.97L49.942 33l-16.97 16.97z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgReveiwAddIcon;
