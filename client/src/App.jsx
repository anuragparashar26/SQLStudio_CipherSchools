import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import HomePage from "./pages/HomePage";
import AssignmentPage from "./pages/AssignmentPage";
import "./styles/main.scss";

export default function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/assignment/:id" element={<AssignmentPage />} />
      </Routes>
    </BrowserRouter>
  );
}
