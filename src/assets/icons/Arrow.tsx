import * as React from "react";
import type { SVGProps } from "react";
const SvgArrow = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#045a03"
      d="M6.079 22.495a1.5 1.5 0 0 1 .44-1.06l7.672-7.672a2.5 2.5 0 0 0 0-3.536L6.53 2.565A1.5 1.5 0 0 1 8.65.444L16.312 8.1a5.506 5.506 0 0 1 0 7.779L8.64 23.556a1.5 1.5 0 0 1-2.561-1.061"
    />
  </svg>
);
export default SvgArrow;
