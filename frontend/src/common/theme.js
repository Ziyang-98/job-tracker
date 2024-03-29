import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  typography: {
    fontFamily: ["monospace"].join(","),
  },

  palette: {
    secondary: {
      main: "#bcaaa4",
      light: "#efebe9",
      dark: "#795548",
      contrastText: "#17272c",
    },
    primary: {
      main: "#679173",
      lessLight: "#a4bcaa",
      light: "#c3d5c8",
      dark: "#00541d",
      contrastText: "#f6fce3",
    },
    success: {
      main: "#c3d5c8",
      light: "#c3d5c8",
      dark: "#c3d5c8",
      contrastText: "#00541d",
    },
    warning: {
      main: "#e1132e",
      light: "#e86868",
    },

    planning: "#5F7F83",

    applied: "#887718",

    interview: "#007696",

    offered: "#00A955",

    rejected: "#795548",
  },
});
