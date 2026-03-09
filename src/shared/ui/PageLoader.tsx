import { Box, CircularProgress } from '@mui/material';

export function PageLoader() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <CircularProgress />
    </Box>
  );
}

