import { SVGProps } from 'react';

export function CashInIcon(props: SVGProps<SVGSVGElement>) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="none"
      viewBox="0 0 24 24"
      {...props}
    >
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M5.684 2.812h-3.41C1.018 2.812 0 3.83 0 5.086V15.32c0 1.257 1.018 2.275 2.274 2.275H19.33c1.256 0 2.274-1.018 2.274-2.275V5.086c0-1.256-1.018-2.274-2.274-2.274h-3.413v1.137h3.413c.628 0 1.137.51 1.137 1.137V15.32c0 .628-.51 1.138-1.137 1.138H2.274c-.628 0-1.137-.51-1.137-1.138V5.086c0-.628.51-1.137 1.137-1.137h3.41V2.812z"
        clipRule="evenodd"
      />
      <path
        stroke="currentColor"
        strokeLinecap="round"
        d="M11.085 1v6.822m0 0l3.411-2.924m-3.411 2.924L7.674 4.898"
      />
      <path
        stroke="currentColor"
        d="M17.055 8.322h4.049v3.549h-4.049c-.98 0-1.774-.795-1.774-1.775 0-.98.795-1.774 1.774-1.774z"
      />
    </svg>
  );
}
