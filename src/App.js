import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import LegalTerms from "./LegalTerms";
import Map from "./Map";
import ResetPassword from "./ResetPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Map />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/legal-terms" element={<LegalTerms />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
