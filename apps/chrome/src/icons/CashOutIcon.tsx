import { SVGProps } from 'react';

export function CashOutIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <g clipPath="url(#clip0)">
        <path
          fill="currentColor"
          fillRule="evenodd"
          d="M7.555 4.992H4.222C2.995 4.992 2 5.987 2 7.214v9.998c0 1.228.995 2.222 2.222 2.222h16.664c1.227 0 2.222-.994 2.222-2.222V7.214c0-1.227-.995-2.222-2.222-2.222h-3.333v1.111h3.333c.614 0 1.11.498 1.11 1.111v9.998c0 .614-.496 1.111-1.11 1.111H4.222c-.614 0-1.111-.497-1.111-1.11V7.213c0-.613.497-1.11 1.11-1.11h3.334V4.991z"
          clipRule="evenodd"
        />
        <path
          stroke="currentColor"
          strokeLinecap="round"
          d="M12.833 7.666V1m0 0L9.5 3.857M12.833 1l3.333 2.857"
        />
        <path
          stroke="currentColor"
          d="M18.663 10.387h3.944v3.444h-3.944c-.95 0-1.722-.77-1.722-1.722 0-.95.771-1.722 1.722-1.722z"
        />
      </g>
      <defs>
        <clipPath id="clip0">
          <path fill="#fff" d="M0 0H24V24H0z" />
        </clipPath>
      </defs>
    </svg>
  );
}
