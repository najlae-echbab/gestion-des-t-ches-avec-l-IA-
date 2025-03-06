import React, { useState } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate
import "../index.css";
import backgroundImage from "../assets/new_board.jpg";

const New_Board = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [members, setMembers] = useState("");
  const [startDate, setStartDate] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour la popup de confirmation
  const navigate = useNavigate(); // Initialisation de navigate

  // Fonction pour ouvrir la popup de confirmation
  const handleCancel = () => {
    setIsModalOpen(true); // Ouvre la modal
  };

  // Fonction pour fermer la popup
  const closeModal = () => {
    setIsModalOpen(false); // Ferme la modal
  };

  // Fonction pour annuler et vider le formulaire
  const confirmCancel = () => {
    setTitle("");
    setDescription("");
    setMembers("");
    setStartDate("");
    setIsModalOpen(false); // Ferme la modal après confirmation
    navigate("/home"); // Redirige vers la page d'accueil ("/")
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const projectData = {
      title,
      description,
      members: members.split(",").map((member) => member.trim()),
      startDate,
    };
    console.log("Project Data:", projectData);
    
    // Redirection vers la page d'accueil après soumission
    navigate("/tasks"); // Redirige vers la page d'accueil ("/")
    
  };
  


  return (
//<div className="flex-1" style={{ backgroundImage: `url(${backgroundImage})`, backgroundSize: "cover", backgroundPosition: "center" }}>
<Layout>
        {/* Formulaire */}
        <form
          onSubmit={handleSubmit}
          className="w-5/6 mx-auto px-8 pt-6 pb-8 mb-4 mt-10"
        >
          <h2 className="text-3xl font-extrabold mb-8 text-center text-black">
            Create New Project
          </h2>

          <div className="mb-6">
            <label
              htmlFor="title"
              className="block text-black text-sm font-semibold mb-2"
            >
              Project Title
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter project title"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="members"
              className="block text-black text-sm font-semibold mb-2"
            >
              Project Members
            </label>
            <input
              type="text"
              id="members"
              value={members}
              onChange={(e) => setMembers(e.target.value)}
              placeholder="Enter members, separated by commas"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="startDate"
              className="block text-black text-sm font-semibold mb-2"
            >
            Start Date
            </label>
            <input
              type="date"
              id="startDate"
              value={startDate}
              onChange={(e) => setStartDate(e.target.value)}
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="mb-6">
            <label
              htmlFor="description"
              className="block text-black text-sm font-semibold mb-2"
            >
              Project Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter project description"
              className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
              required
            />
          </div>
         
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleCancel}
              className="bg-secondary text-primary-foreground hover:bg-primary/90 font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
            >
             Cancel
            </button>
            <button
              type="submit"
              
              className="bg-primary/90 hover:bg-primary text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
            >
               Create
            </button>
          </div>
        </form>

        {/* Pop-up Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
              <h3 className="text-xl font-semibold mb-4">Are you sure?</h3>
              <p>Are you sure you want to cancel? This will clear the form.</p>
              <div className="flex justify-between mt-4">
                <button
                  onClick={confirmCancel}
                  className="bg-secondary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded "
                >
                  Yes, Cancel
                </button>
                <button
                  onClick={closeModal}
                  className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded "
                >
                  No, Keep Editing
                </button>
              </div>
            </div>
          </div>
        )}
      </Layout>
    //</div>
  );
};

export default New_Board;
