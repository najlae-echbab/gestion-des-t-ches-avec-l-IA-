import React from "react";
import { Button } from "./ui/button";  // Ou n'importe quel composant de bouton que tu utilises

const DeleteConfirmation = ({ onClose, onConfirm }) => {
  return (
    <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded shadow-md max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Confirmation de suppression</h2>
        <p>Êtes-vous sûr de vouloir supprimer ce membre ?</p>
        <div className="mt-4 flex justify-between">
          <Button onClick={onClose} className="bg-gray-500 hover:bg-gray-600">
            Annuler
          </Button>
          <Button
            onClick={onConfirm}
            className="bg-red-500 hover:bg-red-600"
          >
            Supprimer
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
