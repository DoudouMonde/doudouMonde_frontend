import * as React from "react";
import type { SVGProps } from "react";
const SvgAddChild = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 75 75"
    {...props}
  >
    <circle cx={37.5} cy={37.5} r={37.5} fill="#8C8C8C" />
    <path fill="#fff" d="M45 38.998h-6v6h-2v-6h-6v-2h6v-6h2v6h6z" />
  </svg>
);
export default SvgAddChild;
