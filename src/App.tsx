import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/navbar';
import { Sidebar } from './components/ui/sidebar'; // Assure-toi que le chemin est correct
import { Home } from 'lucide-react';
import AppRouter from "@/AppRouter"; // Assure-toi que le chemin est correct
import "./index.css";
import Connexion from './pages/Connexion';
import SignUp from './pages/SingUp';


// Fichier principal de l'application
const App: React.FC = () => {
  return (
    <Router>
      {/* Sidebar et Navbar communs à toutes les pages */}
      <Sidebar />
      <Navbar />
      {/* Contenu principal */}
      
      <main>
        <Routes>
          {/* Définition des routes ici */}
          <Route path="/" element={<AppRouter />} />
          {/* Ajoute d'autres routes si nécessaire */}
           {/* Route pour la page de connexion */}
           <Route path="/connexion" element={<Connexion />} />
           <Route path="/signup" element={<SignUp />} />
           
        </Routes>

      </main>
    </Router>
    
  );
};

export default App;
