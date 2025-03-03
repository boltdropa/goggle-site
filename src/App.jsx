import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Email from "./pages/Email";
import Pass from "./pages/Pass";

function App() {
  return (
    <div className="app">
      <Router>
        <Routes>
          <Route path="/" element={<Email />} />
          <Route path="/pass" element={<Pass />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
