import { indigo } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: indigo.A200,
    },
    secondary: {
      main: indigo[500],
    },
  },
});
