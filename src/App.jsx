import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Dashboard from "./Pages/Dashboard";
import EntriesList from "./Pages/EntriesList";
import AddEntry from "./Pages/AddEntry";
// import Analytics from "./Pages/Analytics";

function App() {
  return (
    <Router>
      {/* <Navbar /> */}
      <Routes>
        {/* <Route path="/" element={<Dashboard/>} /> */}
        <Route path="/" element={<EntriesList/>} />
        <Route path="/add" element={<AddEntry/>} />
        {/* <Route path="/analytics" element={<Analytics/>} /> */}
      </Routes>
    </Router>
  );
}

export default App;
