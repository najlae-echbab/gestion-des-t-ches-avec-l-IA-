import React, { useState } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // Importation de axios pour effectuer des requêtes HTTP
import "../index.css";

const AddMember = () => {
  const [username, setUsername] = useState("");
  const [roles, setRoles] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState(""); // Nouveau champ pour confirmer le mot de passe
  const [isModalOpen, setIsModalOpen] = useState(false); // État pour la popup de confirmation
  const [errorMessage, setErrorMessage] = useState(""); // État pour les messages d'erreur
  const [isLoading, setIsLoading] = useState(false); // État pour le chargement
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
    setUsername("");
    setRoles("");
    setPassword("");
    setConfirmPassword(""); // Réinitialiser confirmPassword
    setIsModalOpen(false); // Ferme la modal après confirmation
    navigate("/members"); // Redirige vers la page des membres
  };

  // Fonction de soumission du formulaire
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation des champs
    if (!username || !roles || !password || !confirmPassword) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    if (password !== confirmPassword) {
      setErrorMessage("Passwords do not match.");
      return;
    }

    const newMember = {
      username,
      roles,
      password,
    };

    // Début de l'envoi des données (chargement)
    setIsLoading(true);

    try {
      // Appel API pour ajouter un membre
      const response = await axios.post("http://localhost:8081/api/members", newMember);

      console.log("New Member Added:", response.data);
      navigate("/members"); // Redirige vers la page des membres après l'ajout réussi
    } catch (error) {
      console.error("There was an error adding the member:", error);
      setErrorMessage("An error occurred while adding the member. Please try again.");
    } finally {
      // Fin de l'envoi des données (chargement terminé)
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <form onSubmit={handleSubmit} className="w-5/6 mx-auto px-8 pt-6 pb-8 mb-4 mt-10">
        <h2 className="text-3xl font-extrabold mb-8 text-center text-black">Add New Member</h2>

        {errorMessage && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {errorMessage}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="username" className="block text-black text-sm font-semibold mb-2">
            Username
          </label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter member's username"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="roles" className="block text-black text-sm font-semibold mb-2">
            Roles
          </label>
          <input
            type="text"
            id="roles"
            value={roles}
            onChange={(e) => setRoles(e.target.value)}
            placeholder="Enter roles, separated by commas"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-black text-sm font-semibold mb-2">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter password"
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
            required
          />
        </div>

        <div className="mb-6">
          <label htmlFor="confirmPassword" className="block text-black text-sm font-semibold mb-2">
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Confirm password"
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
            disabled={isLoading} // Désactive le bouton pendant le chargement
            className="bg-primary/90 hover:bg-primary text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
          >
            {isLoading ? "Adding..." : "Add Member"}
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
  );
};

export default AddMember;
