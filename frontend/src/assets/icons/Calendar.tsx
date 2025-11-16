import * as React from "react";
import type { SVGProps } from "react";
const SvgCalendar = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 13 13"
    {...props}
  >
    <g fill="#000" clipPath="url(#calendar_svg__a)">
      <path d="M0 10.292A2.71 2.71 0 0 0 2.708 13h7.584A2.71 2.71 0 0 0 13 10.292V5.417H0zm9.208-2.438a.812.812 0 1 1 0 1.625.812.812 0 0 1 0-1.625m-2.708 0a.812.812 0 1 1 0 1.625.812.812 0 0 1 0-1.625m-2.708 0a.813.813 0 1 1 0 1.625.813.813 0 0 1 0-1.625M10.292 1.083H9.75V.542a.542.542 0 0 0-1.083 0v.541H4.333V.542a.542.542 0 1 0-1.083 0v.541h-.542A2.71 2.71 0 0 0 0 3.792v.541h13v-.541a2.71 2.71 0 0 0-2.708-2.709" />
    </g>
    <defs>
      <clipPath id="calendar_svg__a">
        <path fill="#fff" d="M0 0h13v13H0z" />
      </clipPath>
    </defs>
  </svg>
);
export default SvgCalendar;
