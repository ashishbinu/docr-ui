import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CameraScreen from "./pages/CameraScreen.jsx";
// import ReceptionistScreen from './pages/ReceptionistScreen.jsx'
import UserSelectionScreen from "./pages/UserSelectionScreen.jsx";
import Doctor from "./pages/Doctor";

import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<UserSelectionScreen />} />
          <Route path="/patient" element={<div />} />
          <Route path="/camera" element={<CameraScreen />} />
          <Route path="/doctor" element={<Doctor />} />

          {/*<Route path="/receptionist" element={<ReceptionistScreen/>} />*/}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
