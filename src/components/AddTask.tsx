import React, { useState } from "react";
import { Button } from "./ui/button";

interface AddTaskProps {
  onAdd: (title: string, description?: string, deadline?: string) => void;
}

const AddTask: React.FC<AddTaskProps> = ({ onAdd }) => {
  const [showModal, setShowModal] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");

  const handleAdd = () => {
    if (!title.trim()) return;
    onAdd(title, description, deadline);
    setTitle("");
    setDescription("");
    setDeadline("");
    setShowModal(false);
  };

  return (
    <>
      <Button
        onClick={() => setShowModal(true)}
        className="w-full bg-primary hover:bg-primary/90 text-white mt-4 px-6 py-2 rounded-md shadow transition"
      >
        Ajouter une tâche
      </Button>
      {showModal && (
        <div
          className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={() => setShowModal(false)}
        >
          <div
            className="bg-white w-full max-w-md p-6 rounded-xl shadow-xl space-y-6"
            onClick={(e) => e.stopPropagation()}
          >
            <h2 className="text-2xl font-bold text-center text-gray-800">Ajouter une tâche</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleAdd();
                  }}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Nom de la tâche"
                  autoFocus
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  className="w-full border rounded-lg px-4 py-2"
                  placeholder="Description de la tâche"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date limite</label>
                <input
                  type="date"
                  value={deadline}
                  onChange={(e) => setDeadline(e.target.value)}
                  className="w-full border rounded-lg px-4 py-2"
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 pt-4">
              <Button
                onClick={() => setShowModal(false)}
                className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded"
              >
                Annuler
              </Button>
              <Button
                onClick={handleAdd}
                className="bg-primary hover:bg-primary/90 text-white px-4 py-2 rounded"
              >
                Ajouter
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AddTask;