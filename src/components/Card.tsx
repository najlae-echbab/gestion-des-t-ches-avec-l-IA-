import React from "react";
import { User, User2, Users } from "lucide-react"; // Icône d'utilisateur, tu peux la changer

const Card = ({ title, value }: { title: string; value?: string | number }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center">
      {/* Icône */}
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Users className="text-gray-500" size={24} />
      </div>
      {/* Titre */}
      <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      {/* Valeur (optionnelle) */}
      {value && <p className="text-2xl font-bold text-gray-700">{value}</p>}
      {/* Bouton */}
      <button className="mt-4 px-4 py-2 bg-[#64748b] text-white rounded-md hover:bg-[#94a3b8]">
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
