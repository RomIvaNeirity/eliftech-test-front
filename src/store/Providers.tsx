"use client";

import { Provider } from "react-redux";
import { store } from "./store";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const darkTheme = createTheme({
  palette: {
    mode: "light", // або 'dark'
  },
});

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ThemeProvider theme={darkTheme}>
        {/* CssBaseline скидає стандартні відступи браузера */}
        <CssBaseline />
        {children}
      </ThemeProvider>
    </Provider>
  );
}
