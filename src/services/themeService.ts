import { ThemeOptions, createTheme } from '@mui/material';

export const myTheme : ThemeOptions = createTheme({
  palette: {
    mode: 'dark',
    error: {
      main: "#fc4c02"
    }
  },
});
