import * as React from "react";
import type { SVGProps } from "react";
const SvgStop = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#fff"
      d="M6 16V8q0-.824.588-1.412A1.93 1.93 0 0 1 8 6h8q.825 0 1.413.588T18 8v8q0 .825-.587 1.413A1.92 1.92 0 0 1 16 18H8q-.824 0-1.412-.587A1.93 1.93 0 0 1 6 16"
    />
  </svg>
);
export default SvgStop;
