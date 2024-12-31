import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Liste from "./pages/liste";
import Connexion from "./pages/Connexion";
import SignUp from "./pages/SingUp";
import Search from "./pages/Search";
import NewBoard from "./pages/New_Board";
import ProtectedRoutes from "./components/ProtectedRoute"; // Import du composant

const AppRouter: React.FC = () => {
  return (
    <Router>
      <Routes>
        {/* Routes publiques */}
        <Route path="/connexion" element={<Connexion />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/" element={<Connexion />} />

        {/* Routes protégées */}
        <Route element={<ProtectedRoutes />}>
          <Route path="/home" element={<Home />} />
          <Route path="/tasks" element={<Liste />} />
          <Route path="/search" element={<Search />} />
          <Route path="/new_board" element={<NewBoard />} />
        </Route>
      </Routes>
    </Router>
  );
};

export default AppRouter;
