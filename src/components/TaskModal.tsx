import React from "react";

export interface Task {
  id: number;
  title: string;
  description?: string;
}

export default function TaskModal({
  task,
  onClose,
}: {
  task: Task;
  onClose: () => void;
}) {
  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50 animate-fadeIn"
      style={{ animationDuration: "0.3s" }}
    >
      <div
        className="bg-white p-6 rounded-xl shadow-lg w-96 relative
                   transform transition-transform duration-200 hover:scale-[1.03]"
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-600
                     transition-colors duration-300 font-bold text-xl"
          aria-label="Close modal"
        >
          ✕
        </button>
        <h2 className="text-2xl font-bold mb-5 text-indigo-700">Détail de la tâche</h2>
        <p className="mb-2"><strong>ID:</strong> {task.id}</p>
        <p className="mb-2"><strong>Titre:</strong> {task.title}</p>
        {task.description && (
          <p className="mb-2"><strong>Description:</strong> {task.description}</p>
        )}
      </div>
    </div>
  );
}
