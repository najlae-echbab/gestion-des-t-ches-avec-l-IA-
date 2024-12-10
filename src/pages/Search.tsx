// src/pages/Search.tsx

import React, { useState } from "react";
import Modal from "@/components/Modal"; // Assure-toi que le chemin est correct

const Search: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => setIsModalOpen(true);
  const handleCloseModal = () => setIsModalOpen(false);

  return (
    <div>
      <h1>Page de Recherche</h1>
      <button onClick={handleOpenModal} className="btn-open-modal">
        Ouvrir le Modal
      </button>

      <Modal isOpen={isModalOpen} onClose={handleCloseModal}>
        <h2>Contenu du Modal</h2>
        <p>Voici un exemple de contenu pour la fenêtre modale.</p>
      </Modal>
    </div>
  );
};

export default Search;
