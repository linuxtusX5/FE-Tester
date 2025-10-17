import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
function App() {
  return (
    <Routes>
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}

export default App;
