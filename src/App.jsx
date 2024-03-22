import { Route, Routes, BrowserRouter as Router } from "react-router-dom";

import "./App.css";
import Home from "./routes/Home";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="*" element={<Home />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
