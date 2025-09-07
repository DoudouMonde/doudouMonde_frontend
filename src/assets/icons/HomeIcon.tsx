import * as React from "react";
import type { SVGProps } from "react";
const SvgHomeIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <g fill="currentColor" clipPath="url(#home_icon_svg__a)">
      <path d="M12 14.992a3 3 0 0 0-3 3v6h6v-6a3 3 0 0 0-3-3" />
      <path d="M17 17.992v6h4a3 3 0 0 0 3-3v-9.12a2 2 0 0 0-.563-1.393l-8.498-9.187a4 4 0 0 0-5.875 0L.581 10.476A2 2 0 0 0 0 11.886v9.106a3 3 0 0 0 3 3h4v-6c.019-2.727 2.22-4.953 4.878-5.017 2.748-.067 5.101 2.198 5.122 5.017" />
      <path d="M12 14.992a3 3 0 0 0-3 3v6h6v-6a3 3 0 0 0-3-3" />
    </g>
    <defs>
      <clipPath id="home_icon_svg__a">
        <path fill="#fff" d="M0 0h24v24H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgHomeIcon;
