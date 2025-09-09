import * as React from "react";
import type { SVGProps } from "react";
const SvgRecordStart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 81 81"
    {...props}
  >
    <circle cx={40.5} cy={40.5} r={39.5} stroke="#D9D9D9" strokeWidth={2} />
    <circle cx={40.5} cy={40.5} r={23.5} fill="#FF6060" />
  </svg>
);
export default SvgRecordStart;
