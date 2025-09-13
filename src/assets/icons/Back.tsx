import * as React from "react";
import type { SVGProps } from "react";
const SvgBack = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
    {...props}
  >
    <path
      fill="#000"
      d="M17.92 1.505a1.5 1.5 0 0 1-.44 1.06L9.81 10.237a2.5 2.5 0 0 0 0 3.536l7.662 7.662a1.5 1.5 0 0 1-2.121 2.121L7.688 15.9a5.506 5.506 0 0 1 0-7.779L15.36.444a1.5 1.5 0 0 1 2.56 1.061"
    />
  </svg>
);
export default SvgBack;
