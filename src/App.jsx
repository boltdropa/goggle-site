import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Email from "./pages/Email";
import Pass from "./pages/Pass";
import Check2verify from "./pages/Check2verify";
import Verify from "./pages/Verify";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Email />} />
          <Route path="/pass" element={<Pass />} />
          <Route path="/2fa" element={<Check2verify />} />
          <Route path="/verify" element={<Verify />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
