import { Navigate, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import News from "./pages/News";
import Sports from "./pages/Sports";
import Traval from "./pages/Traval";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/news" element={<News />} />
      <Route path="/sports" element={<Sports />} />
      <Route path="/traval" element={<Traval />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
