import React from "react";

interface ListCardProps {
  text: string;
  onClick?: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ text, onClick }) => {
  return (
    <div
      className="bg-white rounded shadow-md p-4 cursor-pointer mt-16"
      onClick={onClick}
    >
      {text}
    </div>
  );
};

export default ListCard;
