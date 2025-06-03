'use client';

import { Box, Button, useMediaQuery, useTheme } from '@mui/material';
import Link from 'next/link';
import { green500 } from '../../utils/colors';

export function ButtonsNoAuthorization() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <Box
      display="flex"
      flexDirection={isMobile ? 'column' : 'row'}
      gap={1}
      alignItems={isMobile ? 'stretch' : 'center'}
      width={isMobile ? '100%' : 'auto'}
    >
      <Button
        color="inherit"
        variant="outlined"
        component={Link}
        href="/login"
        fullWidth={isMobile}
        sx={{
          borderColor: "#e2e2e2",
          color: green500,
        }}
      >
        Login
      </Button>
      <Button
        variant="contained"
        component={Link}
        href="/register"
        fullWidth={isMobile}
        sx={{
          backgroundColor: green500,
          color: "white",
        }}
      >
        Registrar
      </Button>
    </Box>
  );
}
