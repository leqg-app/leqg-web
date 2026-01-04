import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./styles/App.css";
import Map from "./pages/Map";
import LegalNotice from "./pages/LegalNotice";
import DataProtection from "./pages/DataProtection";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/legal-terms" element={<LegalNotice />} />
        <Route path="/privacy-policy" element={<DataProtection />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
