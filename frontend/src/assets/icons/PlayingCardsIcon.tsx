import * as React from "react";
import type { SVGProps } from "react";
const SvgPlayingCardsIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 13 13"
    {...props}
  >
    <g clipPath="url(#playing_cards_icon_svg__a)">
      <path
        fill="currentColor"
        d="m12.892 4.418-1.849 5.633a2.68 2.68 0 0 1-1.599 1.733c.202-.471.307-.98.306-1.493V4.875a3.796 3.796 0 0 0-3.792-3.792h-.902A2.72 2.72 0 0 1 8.006.12l3.08.946a2.72 2.72 0 0 1 1.806 3.353m-4.225.457v5.416A2.71 2.71 0 0 1 5.958 13h-3.25A2.71 2.71 0 0 1 0 10.29V4.875a2.71 2.71 0 0 1 2.708-2.709h3.25a2.71 2.71 0 0 1 2.709 2.709M6.5 7.04a1.083 1.083 0 0 0-2.167 0 1.083 1.083 0 1 0-2.166 0c0 .786.836 1.837 1.47 2.372a1.08 1.08 0 0 0 1.393 0C5.664 8.878 6.5 7.827 6.5 7.04"
      />
    </g>
    <defs>
      <clipPath id="playing_cards_icon_svg__a">
        <path fill="#fff" d="M0 0h13v13H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgPlayingCardsIcon;
