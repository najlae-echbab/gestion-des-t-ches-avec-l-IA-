import React from "react";
import { Outlet, Navigate } from "react-router-dom";

const ProtectedRoutes: React.FC = () => {
  // Remplacez cette logique par votre gestion d'authentification réelle
  const isAuthenticated = () => {
    const token = localStorage.getItem("jwt"); // Vérifie si un token JWT est stocké
    return !!token; // Retourne `true` si un token existe, sinon `false`
  };

  return isAuthenticated() ? <Outlet /> : <Navigate to="/connexion" />;
};

export default ProtectedRoutes;
