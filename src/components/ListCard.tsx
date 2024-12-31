import React from "react";

interface ListCardProps {
  text: string;
  onClick?: () => void; // Ajout de la prop onClick
}

const ListCard: React.FC<ListCardProps> = ({ text, onClick }) => {
  return (
    <div
      className="bg-white rounded shadow-md p-4 cursor-pointer"
      onClick={onClick} // Attache l'événement onClick
    >
      {text}
    </div>
  );
};

export default ListCard;