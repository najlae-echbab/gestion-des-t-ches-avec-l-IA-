import axios from "axios";
import { User } from "../types/user";
import apiClient from "./apiClient";


// Fonction pour récupérer les membres depuis l'API
export const fetchMembers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get<User[]>("/api/users");
    console.log(" Réponse API : ", response.data);
    return response.data;
  } catch (error) {
    console.error(" Erreur lors de la récupération des utilisateurs : ", error);
    throw error;
  }
};


// Fonction pour ajouter un membre
export const addNewMember = async (newMember: { username: string; roles: string; password: string }) => {
  try {
      const response = await apiClient.post("/auth/register", newMember, {
          headers: {
              'Content-Type': 'application/json',
          }
      });
      console.log(" Utilisateur ajouté avec succès :", response.data);
      return response.data;
  } catch (error) {
      console.error(" Erreur lors de l'ajout de l'utilisateur :", error);
      throw error;
  }
};

  
  // Fonction pour supprimer un membre
  export const deleteMember = async (id: number) => {
    const response = await apiClient.delete(`/api/users/${id}`);
    return response.data;
  };