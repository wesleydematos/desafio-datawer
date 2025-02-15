import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#48c1d0",
      dark: "#02a5bc",
    },
    secondary: {
      main: "#E64980",
    },
    background: {
      default: "#F4F6F8",
      paper: "#FFFFFF",
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    error: {
      main: "#FF4C4C",
    },
    success: {
      main: "#38F892",
      dark: "#08490e",
      light: "#61FFAA",
    },
    warning: {
      main: "#FACD35",
    },
    grey: {
      100: "#C7C7C7",
      200: "#353149",
      300: "#221E34",
      400: "#100D1E",
      500: "#1D1A2C",
    },
    action: {
      disabled: "rgba(0, 0, 0, 0.54)",
    },
  },
});

export default theme;
