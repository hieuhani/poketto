import { SVGProps } from 'react';

export function StampIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg width="1em" height="1em" viewBox="0 0 48 48" {...props}>
      <g
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="4"
      >
        <path d="M5 8.8L8.8 5l3.8 2.85L16.4 5l3.8 2.85L24 5l3.8 2.85L31.6 5l3.8 2.85L39.2 5L43 8.8l-2.85 3.8L43 16.4l-2.85 3.8L43 24l-2.85 3.8L43 31.6l-2.85 3.8L43 39.2L39.2 43l-3.8-2.85L31.6 43l-3.8-2.85L24 43l-3.8-2.85L16.4 43l-3.8-2.85L8.8 43L5 39.2l2.85-3.8L5 31.6l2.85-3.8L5 24l2.85-3.8L5 16.4l2.85-3.8L5 8.8Z"></path>
        <circle cx="24" cy="24" r="9"></circle>
      </g>
    </svg>
  );
}
