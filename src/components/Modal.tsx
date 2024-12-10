// src/components/Modal.tsx

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal = ({ isOpen, onClose, children }: ModalProps) => {
  if (!isOpen) return null; // Ne rien afficher si le modal n'est pas ouvert

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-96 p-6 rounded-lg shadow-lg">
        {children}
        <button
          className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md hover:bg-red-600"
          onClick={onClose}
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default Modal;
