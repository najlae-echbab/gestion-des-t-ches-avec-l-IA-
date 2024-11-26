import React from "react";

interface ListCardProps {
  text: string;
}

const ListCard: React.FC<ListCardProps> = ({ text }) => {
  return (
    <div className="bg-white shadow p-3 rounded-md text-gray-800 hover:bg-gray-50">
      {text}
    </div>
  );
};

export default ListCard;
