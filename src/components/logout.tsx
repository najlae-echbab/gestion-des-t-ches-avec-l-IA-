import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";

const Logout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Supprimer le token JWT du localStorage
    localStorage.removeItem("jwt");

    // Rediriger vers la page de connexion
    navigate("/connexion");
  };

  return (
    <Button onClick={handleLogout} className="">
      Déconnexion
    </Button>
  );
};

export default Logout;
