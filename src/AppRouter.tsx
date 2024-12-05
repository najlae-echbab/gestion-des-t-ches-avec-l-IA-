import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Sidebar } from "lucide-react";
import "./index.css";
import Liste from './pages/liste';
import "tailwindcss/tailwind.css"; 
const AppRouter: React.FC = () => {
  return ( 
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/tasks" element={<Liste />} />
      
      </Routes>
    </Router>
  );
};

export default AppRouter;
