import axios from "axios";
import { User } from "../types/user";
import apiClient from "./apiClient";


// Fonction pour récupérer les membres depuis l'API
export const fetchMembers = async (): Promise<User[]> => {
  const response = await apiClient.get<User[]>("/api/users"); // Remplace par le bon endpoint de ton API
  return response.data; // Retourne la liste des membres
};
// Fonction pour ajouter un membre
export const addNewMember = async (newMember: { username: string; roles: string; password:string }) => {
    const response = await apiClient.post("/api/users", newMember);
    return response.data;
  };
  
  // Fonction pour supprimer un membre
  export const deleteMember = async (id: number) => {
    const response = await apiClient.delete(`/api/users/${id}`);
    return response.data;
  };