import React, { useState, useEffect } from "react";
import Layout from "./layout";
import { useNavigate } from "react-router-dom";
import axios from "axios"; 
import "../index.css";
import { creerProjet, getUsers } from "@/api/APIServices";

const New_Board = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [startDate, setStartDate] = useState("");
  const [userId, setUserId] = useState("");
  const [users, setUsers] = useState([]); // Liste des utilisateurs récupérés
  const [message, setMessage] = useState(""); // Pour afficher un message d'erreur ou succès
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await getUsers();
        setUsers(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des utilisateurs :", error);
      }
    };
    fetchUsers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const projectData = {
      titre: title,
      description,
      dateLimite: startDate,
    };

    try {
      const response = await creerProjet(projectData, userId);
      console.log("Projet créé avec succès :", response);
      setMessage("Projet créé avec succès !");
      navigate("/tasks");
    } catch (error) {
      console.error("Erreur lors de la création du projet :", error);
      setMessage("Une erreur est survenue lors de la création du projet.");
    }
  };

  return (
    <Layout>
      <form
        onSubmit={handleSubmit}
        className="w-5/6 mx-auto px-8 pt-6 pb-8 mb-4 mt-10"
      >
        <h2 className="text-3xl font-extrabold mb-8 text-center text-black">
          Create New Project
        </h2>

        {message && (
          <div className="mb-4 text-red-500 text-sm font-semibold text-center">
            {message}
          </div>
        )}

        <div className="mb-6">
          <label htmlFor="title" className="block text-black text-sm font-semibold mb-2">
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
          <label htmlFor="description" className="block text-black text-sm font-semibold mb-2">
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

        <div className="mb-6">
          <label htmlFor="startDate" className="block text-black text-sm font-semibold mb-2">
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
          <label htmlFor="userId" className="block text-black text-sm font-semibold mb-2">
            Select Project Leader
          </label>
          <select
            id="userId"
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className="shadow appearance-none border rounded w-full py-3 px-4 text-gray-700 leading-tight focus:outline-none focus:shadow-outline focus:ring-2 focus:ring-indigo-400"
            required
          >
            <option value="">Select a Leader</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.username}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-primary/90 hover:bg-primary text-white font-bold py-2 px-6 rounded focus:outline-none focus:shadow-outline transition-transform transform hover:scale-105"
          >
            Create
          </button>
        </div>
      </form>
    </Layout> 
  );
};

export default New_Board;
