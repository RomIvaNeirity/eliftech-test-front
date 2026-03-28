import { createTheme } from "@mui/material/styles";

// 1. Додаємо типізацію для TypeScript, щоб він "бачив" нову точку min375
declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true; // 0px (база)
    mobile: true; // 425px
    tablet: true; // 768px
    desktop: true; // 1440px
    // Вимикаємо стандартні, якщо вони тобі заважають
    sm: false;
    md: false;
    lg: false;
    xl: false;
  }
}

// 2. Створюємо саму тему
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
      main: "#2c3e50", // Твій темно-синій колір хедера
    },
    secondary: {
      main: "#ffeb3b", // Твій жовтий акцент
    },
  },
});
