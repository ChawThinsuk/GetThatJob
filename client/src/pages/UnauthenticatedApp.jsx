import { Routes, Route } from "react-router-dom";
import LandingPage from "./landingPage";
import LoginPage from "./LoginPage";
import RegisterPage from "./RegisterPage";
import "../App.css";

function UnauthenticatedApp() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="*" element={<LoginPage />} />
      </Routes>
    </div>
  );
}

export default UnauthenticatedApp;
