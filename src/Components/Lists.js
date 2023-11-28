import * as React from 'react';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  height: 60,
  lineHeight: '60px',
}));

const lightTheme = createTheme({ palette: { mode: 'light' } });

export default function Lists() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <ThemeProvider theme={lightTheme}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              bgcolor: 'background.default',
              display: 'grid',
              gridTemplateColumns: { md: '250px' },
              gap: 2,
            }}
          >
            {[0, 1, 2, 3, 4, 6, 8, 12, 16, 24].map((elevation) => (
              <Item key={elevation} elevation={elevation}>
                {`Task: ${elevation}`}
              </Item>
            ))}
          </Box>
        </ThemeProvider>
      </Grid>
    </Grid>
  );
}
