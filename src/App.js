import { Routes, Route } from "react-router-dom";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Detail from "./routes/Detail";

function App({ auth }) {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login auth={auth} />} />
        <Route path="/home" element={<Home auth={auth} />} />
        <Route path="/restaurant/:id" element={<Detail />} />
      </Routes>
    </div>
  );
}

export default App;
