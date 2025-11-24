import * as React from "react";
import type { SVGProps } from "react";
const SvgEditPen = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 27 27"
    {...props}
  >
    <circle cx={13.5} cy={13.5} r={13.5} fill="#3DCCA3" />
    <path
      fill="#fff"
      d="M21.527 9.719 18.099 6.29a1.23 1.23 0 0 0-1.735 0L6.905 15.75a1.22 1.22 0 0 0-.36.868v3.428a1.227 1.227 0 0 0 1.228 1.227H11.2a1.22 1.22 0 0 0 .867-.36l9.459-9.458a1.23 1.23 0 0 0 0-1.736m-13.5 6.645 6.496-6.496 1.28 1.28-6.496 6.495zm-.254 1.48 2.2 2.201h-2.2zm3.682 1.948-1.28-1.28 6.496-6.497 1.28 1.28zm7.363-7.364L15.39 9l1.841-1.84 3.428 3.426z"
    />
  </svg>
);
export default SvgEditPen;
