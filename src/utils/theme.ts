import { createTheme } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // 0px (база)
    mobile: true; // 425px
    tablet: true; // 768px
    desktop: true; // 1440px
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}

export const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      mobile: 425,
      tablet: 768,
      desktop: 1440,
    },
  },

  palette: {
    primary: {
      main: "#2c3e50",
    },
    secondary: {
      main: "#ffeb3b",
    },
  },
});
