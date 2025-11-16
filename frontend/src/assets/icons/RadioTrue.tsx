import * as React from "react";
import type { SVGProps } from "react";
const SvgRadioTrue = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 25 25"
    {...props}
  >
    <circle cx={12.5} cy={12.5} r={11} stroke="#3A9592" strokeWidth={3} />
    <circle cx={12.5} cy={12.5} r={6.107} fill="#3A9592" />
  </svg>
);
export default SvgRadioTrue;
