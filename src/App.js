import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import {
  createTheme,
  ThemeProvider,
  StyledEngineProvider,
} from "@mui/material";
import "./App.css";

const theme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 820,
      lg: 1252,
      xl: 1920,
    },
  },
  palette: {
    primary: {
      main: "hsl(210,8%,15%)",
    },
    secondary: {
      main: "#ef5350",
      light: "#ef5350",
      dark: "#ef5350",
    },
    text: {
      logo: "#333333",
      primary: "hsl(210,8%,15%)",
      secondary: "hsl(210,8%,45%)",
    },
  },
  typography: {
    fontFamily: "'EliceDigitalBaeum', sans-serif",
    reviewTitle: {
      fontFamily: "'NanumBarunGothic', sans-serif",
      color: "rgb(55 65 81)",
      fontSize: "15px",
    },
    reviewTime: {
      fontFamily: "'NanumBarunGothic', sans-serif",
      color: "rgb(156 163 175)",
      fontSize: "15px",
    },
  },
});

function App({ auth }) {
  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={theme}>
        <Routes>
          <Route path="/login" element={<Login auth={auth} />} />
          <Route path="/" element={<Home auth={auth} />} />
          <Route path="/restaurant/:id" element={<Detail auth={auth} />} />
        </Routes>
      </ThemeProvider>
    </StyledEngineProvider>
  );
}

export default App;
