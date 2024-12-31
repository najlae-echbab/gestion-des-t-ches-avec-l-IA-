import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate
import "../index.css";

const New_Board: React.FC = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  const handleCancel = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const confirmCancel = () => {
    setTitle("");
    setDescription("");
    setMembers("");
    setStartDate("");
    setIsModalOpen(false);
    navigate("/");
  };

  return (
    <div className="new-board-container">
      <h1>Create New Board</h1>
      <form>
        <label>
          Title:
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>
        <label>
          Description:
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>
        <label>
          Members:
          <input
            type="text"
            value={members}
            onChange={(e) => setMembers(e.target.value)}
          />
        </label>
        <label>
          Start Date:
          <input
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </label>
        <button type="button" onClick={confirmCancel}>
          Submit
        </button>
        <button type="button" onClick={handleCancel}>
          Cancel
        </button>
      </form>

      {isModalOpen && (
        <div className="modal">
          <p>Are you sure you want to cancel?</p>
          <button onClick={closeModal}>Close</button>
          <button onClick={confirmCancel}>Confirm</button>
        </div>
      )}
    </div>
  );
};

export default New_Board;
