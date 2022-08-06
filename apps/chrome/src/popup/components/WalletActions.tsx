import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';

interface Props {
  goToTransferScreen: () => void;
}

export const WalletActions: React.FunctionComponent<Props> = ({
  goToTransferScreen,
}) => (
  <Paper sx={{ borderRadius: 2 }}>
    <Box sx={{ display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
      <ButtonBase
        sx={{ paddingY: 2, display: 'flex', flexDirection: 'column' }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            fill="#FEFEFE"
            fillRule="evenodd"
            d="M5.684 2.812h-3.41C1.018 2.812 0 3.83 0 5.086V15.32c0 1.257 1.018 2.275 2.274 2.275H19.33c1.256 0 2.274-1.018 2.274-2.275V5.086c0-1.256-1.018-2.274-2.274-2.274h-3.413v1.137h3.413c.628 0 1.137.51 1.137 1.137V15.32c0 .628-.51 1.138-1.137 1.138H2.274c-.628 0-1.137-.51-1.137-1.138V5.086c0-.628.51-1.137 1.137-1.137h3.41V2.812z"
            clipRule="evenodd"
          />
          <path
            stroke="#FEFEFE"
            strokeLinecap="round"
            d="M11.085 1v6.822m0 0l3.411-2.924m-3.411 2.924L7.674 4.898"
          />
          <path
            stroke="#FEFEFE"
            d="M17.055 8.322h4.049v3.549h-4.049c-.98 0-1.774-.795-1.774-1.775 0-.98.795-1.774 1.774-1.774z"
          />
        </svg>

        <Typography>Receive</Typography>
      </ButtonBase>
      <ButtonBase
        sx={{ paddingY: 2, display: 'flex', flexDirection: 'column' }}
        onClick={goToTransferScreen}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="none"
          viewBox="0 0 24 24"
        >
          <g clipPath="url(#clip0)">
            <path
              fill="#FEFEFE"
              fillRule="evenodd"
              d="M7.555 4.992H4.222C2.995 4.992 2 5.987 2 7.214v9.998c0 1.228.995 2.222 2.222 2.222h16.664c1.227 0 2.222-.994 2.222-2.222V7.214c0-1.227-.995-2.222-2.222-2.222h-3.333v1.111h3.333c.614 0 1.11.498 1.11 1.111v9.998c0 .614-.496 1.111-1.11 1.111H4.222c-.614 0-1.111-.497-1.111-1.11V7.213c0-.613.497-1.11 1.11-1.11h3.334V4.991z"
              clipRule="evenodd"
            />
            <path
              stroke="#FEFEFE"
              strokeLinecap="round"
              d="M12.833 7.666V1m0 0L9.5 3.857M12.833 1l3.333 2.857"
            />
            <path
              stroke="#FEFEFE"
              d="M18.663 10.387h3.944v3.444h-3.944c-.95 0-1.722-.77-1.722-1.722 0-.95.771-1.722 1.722-1.722z"
            />
          </g>
          <defs>
            <clipPath id="clip0">
              <path fill="#fff" d="M0 0H24V24H0z" />
            </clipPath>
          </defs>
        </svg>

        <Typography>Send</Typography>
      </ButtonBase>
    </Box>
  </Paper>
);
