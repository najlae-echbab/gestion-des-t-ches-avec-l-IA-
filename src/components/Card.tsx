import React from "react";
import { User, User2, Users } from "lucide-react"; // Icône d'utilisateur, tu peux la changer

const Card = ({ title, value }: { title: string; value?: string | number }) => {
  return (
    <div className="bg-[#e2e8f0] shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-200 ease-in-out">
      {/* Icône */}
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Users className="text-gray-500" size={24} />
      </div>
      {/* Titre */}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {/* Valeur (optionnelle) */}
      {value && <p className="text-2xl font-bold text-gray-700">{value}</p>}
      {/* Bouton */}
      <button className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90">
        Détails
      </button>
    </div>
  );
};

const App = () => {
  return (
    <div className="mt-16">
      {/* Carte 1 */}
      <Card title="Projet 1" />
      
    </div>
  );
};

export default App;
