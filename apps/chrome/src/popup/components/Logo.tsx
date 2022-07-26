import Box from '@mui/material/Box';

export const Logo: React.FunctionComponent = () => (
  <Box>
    <svg
      width="42"
      height="41"
      viewBox="0 0 42 41"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M42 15.7097C42 24.3823 34.9925 31.4156 26.3481 31.4156L10.928 13.0313L0 0H26.3481C34.9925 0 42 7.03333 42 15.7097Z"
        fill="#2196F3"
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M26.4051 31.4156H0V0L26.4051 31.4156Z"
        fill="#42A5F5"
      />
      <mask
        id="mask0_8_5"
        style={{ maskType: 'alpha' }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="12"
        height="41"
      >
        <path d="M0 0.0203056H11.4914V41H0V0.0203056Z" fill="white" />
      </mask>
      <g mask="url(#mask0_8_5)">
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M0 0.0203056L0.00943577 41L11.4914 31.371L0 0.0203056Z"
          fill="#90CAF9"
        />
      </g>
    </svg>
  </Box>
);
