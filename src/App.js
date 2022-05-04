import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Detail from "./routes/Detail";
import { createTheme, ThemeProvider } from "@mui/material";
import "./App.css";

const theme = createTheme({
  palette: {
    primary: {
      main: "#B92146",
    },
    secondary: {
      main: "#CC3333",
    },
    text: {
      title: "hsl(210,8%,15%)",
      primary: "hsl(210,8%,15%)",
      secondary: "hsl(210,8%,45%)",
    },
  },
  typography: {
    fontFamily: "'NanumBarunGothic', sans-serif",
  },
});

function App({ auth }) {
  return (
    <ThemeProvider theme={theme}>
      <Routes>
        <Route path="/login" element={<Login auth={auth} />} />
        <Route path="/" element={<Home auth={auth} />} />
        <Route path="/restaurant/:id" element={<Detail />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
