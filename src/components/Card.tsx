import React from "react";
import { useNavigate } from "react-router-dom";
import { Users } from "lucide-react";
import { Project } from "@/types/project";

interface CardProps {
  project: Project;
}

const Card: React.FC<CardProps> = ({ project }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/tasks/${project.id}`); // 🧭 Redirection vers la page des tâches du projet
  };

  return (
    <div
      key={project.id}
      className="bg-[#e2e8f0] shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-200 ease-in-out"
    >
      {/* Icône */}
      <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center mb-4">
        <Users className="text-gray-500" size={24} />
      </div>

      {/* Titre du projet */}
      <h3 className="text-lg font-semibold text-gray-800">{project.titre}</h3>

      {/* Bouton de redirection */}
      <button
        onClick={handleClick}
        className="mt-4 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90"
      >
        Détails
      </button>
    </div>
  );
};

export default Card;
