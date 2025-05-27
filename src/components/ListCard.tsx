import React, { useState } from "react";
import { Button } from "./ui/button";
import { Pencil, Trash2 } from "lucide-react";

interface ListCardProps {
  text: string;
  onEdit?: (newText: string) => void;
  onDelete?: () => void;
  onClick?: () => void;
}

const ListCard: React.FC<ListCardProps> = ({ text, onEdit, onDelete, onClick }) => {
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [editedText, setEditedText] = useState(text);

  const handleEditSubmit = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onEdit && editedText.trim()) {
      console.log("Appel de onEdit avec :", editedText);
      onEdit(editedText);
    }
    setShowEditModal(false);
  };

  const handleDeleteConfirm = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onDelete) {
      console.log("Appel de onDelete");
      onDelete();
    }
    setShowDeleteModal(false);
  };

  return (
    <>
      <div
        className="bg-white rounded-xl shadow-md p-5 flex items-center justify-between hover:shadow-indigo-300 transition-transform duration-300 ease-in-out cursor-pointer"
        onClick={onClick}
      >
        <span>{text}</span>
        <div className="flex gap-3 ml-4">
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Clic sur Modifier");
              setShowEditModal(true);
            }}
            className="text-gray-500 hover:text-indigo-600"
            aria-label="Modifier"
            title="Modifier"
          >
            <Pencil className="w-5 h-5" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              console.log("Clic sur Supprimer");
              setShowDeleteModal(true);
            }}
            className="text-gray-500 hover:text-red-600"
            aria-label="Supprimer"
            title="Supprimer"
          >
            <Trash2 className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* 🛠️ MODALE D'ÉDITION */}
      {showEditModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/40 z-[9999]"
          onClick={() => setShowEditModal(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-[90%] max-w-md"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Modifier la tâche</h2>
            <input
              type="text"
              value={editedText}
              onChange={(e) => setEditedText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleEditSubmit(e as any);
                if (e.key === "Escape") setShowEditModal(false);
              }}
              className="w-full border px-3 py-2 rounded mb-4"
              autoFocus
            />
            <div className="flex justify-end gap-3">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowEditModal(false);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Annuler
              </Button>
              <Button
                onClick={handleEditSubmit}
                className="bg-primary hover:bg-primary/90 text-white"
              >
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* 🗑️ MODALE DE SUPPRESSION */}
      {showDeleteModal && (
        <div
          className="fixed inset-0 flex justify-center items-center bg-black/40 z-[9999]"
          onClick={() => setShowDeleteModal(false)}
        >
          <div
            className="bg-white p-6 rounded shadow-lg w-[90%] max-w-sm"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-xl font-bold mb-4">Confirmer la suppression</h2>
            <div className="flex justify-end gap-3">
              <Button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowDeleteModal(false);
                }}
                className="bg-gray-500 hover:bg-gray-600 text-white"
              >
                Annuler
              </Button>
              <Button
                onClick={handleDeleteConfirm}
                className="bg-red-600 hover:bg-red-700 text-white"
              >
                Supprimer
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ListCard;