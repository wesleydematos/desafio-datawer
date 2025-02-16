"use client";

import { ThemeProvider } from "@mui/material/styles";
import theme from "@/styles/theme";
import CssBaseline from "@mui/material/CssBaseline";
import { GlobalStyles } from "@mui/system";

export default function ThemeRegistry({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GlobalStyles
        styles={{
          "::-webkit-scrollbar": {
            width: 8,
          },
          "::-webkit-scrollbar-track": {
            backgroundColor: "#f0f0f0",
            borderRadius: 4,
          },
          "::-webkit-scrollbar-thumb": {
            backgroundColor: "#48c1d0",
            borderRadius: 4,
            "&:hover": {
              backgroundColor: "#02a5bc",
            },
          },
        }}
      />
      {children}
    </ThemeProvider>
  );
}
