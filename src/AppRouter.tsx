import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import { Sidebar } from "lucide-react";
import "./index.css";
import Liste from './pages/liste';
import "tailwindcss/tailwind.css"; 
import Connexion from './pages/Connexion';
import SignUp from './pages/SingUp';
import Search from './pages/search';
import NewBoard from './pages/New_Board';
const AppRouter: React.FC = () => {
  return ( 
    <Router>
      <Routes>
        <Route path="/Home" element={<Home />} />
        <Route path="/tasks" element={<Liste />} />
<Route path="/connexion" element={<Connexion />} /> 
<Route path="/SignUp" element={<SignUp />} />
<Route path="/" element={<Home />} />
<Route path="/Search" element={<Search />} />
<Route path="/New_Board" element={<NewBoard />} />  
      </Routes>
    </Router>
  );
};

export default AppRouter;
