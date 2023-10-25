import { createTheme } from "@mui/material";

const myTheme = createTheme({
  palette: {
    //color
    primary: {
      main: "#F1B503",
    },
    secondary: {
      main: "#42BCFB",
    },
    tertiary: {
      main: "#F3D9DA",
    },
    dark: {
      main: "#0E0e2C",
    },
    success: {
      main: "#45FFCA",
    },
    text: {
      main: "#4A4A6B",
    },
    subtle: {
      main: "#8C8CA1",
    },
    accent: {
      main: "#ECF1F4",
    },
    light: {
      main: "#FAFCFE",
    },
  },
  typography: {
    //variant
    //p tag
    p: {
      fontFamily: "Work Sans",
      fontWeight: "bold",
      fontSize: "10px",
    },
    h1: {
      fontFamily: "Work Sans",
      fontWeight: "bold",
      fontSize: "64px",
      letterSpacing: "-2%",
    },
    mh1: {
      fontFamily: "Work Sans",
      fontWeight: "bold",
      fontSize: "32px",
      letterSpacing: "-2%",
    },
    h2: {
      fontFamily: "Work Sans",
      fontWeight: "bold",
      fontSize: "40px",
      letterSpacing: "-2%",
    },
    h3: {
      fontFamily: "Work Sans",
      fontWeight: "bold",
      fontSize: "24px",
      letterSpacing: "-2%",
    },
    h4: {
      fontFamily: "Work Sans",
      fontWeight: "bold",
      fontSize: "20px",
      letterSpacing: "-2%",
    },
    subtitle1: {
      fontFamily: "Work Sans",
      fontWeight: "medium",
      fontSize: "24px",
    },
    body1: {
      fontFamily: "Work Sans",
      fontWeight: "medium",
      fontSize: "16px",
      lineHeight: "140%",
    },
    body2: {
      fontFamily: "Work Sans",
      fontWeight: "bold",
      fontSize: "16px",
      lineHeight: "140%",
    },
    //applied in each btn automatically
    button: {
      fontFamily: "Work Sans",
      fontWeight: "bold",
      fontSize: "10px",
      letterSpacing: "3%",
    },
    linkText: {
      fontFamily: "Work Sans",
      fontWeight: "bold",
      fontSize: "16px",
      textDecoration: "underline",
    },
    smallText: {
      fontFamily: "Work Sans",
      fontWeight: "medium",
      fontSize: "14px",
    },
  },
});
export default myTheme;
