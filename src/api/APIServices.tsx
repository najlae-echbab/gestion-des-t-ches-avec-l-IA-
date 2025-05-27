import apiClient from "./apiClient";
import { User } from "../types/user";
import { Project } from "../types/project";
import { Task } from "@/types/task";

// 🔹 Récupérer tous les utilisateurs
export const getUsers = async (): Promise<User[]> => {
  try {
    const response = await apiClient.get<User[]>("/api/users");
    console.log("Réponse API utilisateurs : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des utilisateurs : ", error);
    throw error;
  }
};

// 🔹 Créer un projet
export const creerProjet = async (projetData: Project, userId: number): Promise<Project> => {
  try {
    const response = await apiClient.post<Project>(`/api/projets/create?userId=${userId}`, projetData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création du projet :", error);
    throw error;
  }
};

// 🔹 Récupérer tous les projets
export const fetchProjects = async (): Promise<Project[]> => {
  try {
    const response = await apiClient.get<Project[]>("/api/projets");
    console.log("Réponse API projets : ", response.data);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des projets : ", error);
    throw error;
  }
};

// 🔹 Récupérer les tâches d’un projet
export const fetchTachesByProject = async (projectId: number): Promise<Task[]> => {
  try {
    const response = await apiClient.get<Task[]>(`/api/projets/${projectId}/taches`);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des tâches :", error);
    throw error;
  }
};

// 🔹 Mettre à jour le statut d’une tâche
export const updateTacheStatus = async (id: number, newStatus: string): Promise<Task> => {
  try {
    const response = await apiClient.put<Task>(`/api/taches/${id}`, { statut: newStatus });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la mise à jour du statut :", error);
    throw error;
  }
};

// 🔹 Créer une tâche
export const createTache = async (tacheData: Task, projectId: number): Promise<Task> => {
  try {
    const response = await apiClient.post<Task>(`/api/taches?projectId=${projectId}`, tacheData);
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la création de la tâche :", error);
    throw error;
  }
};

// 🔹 Modifier le titre (⚠️ nécessite support côté backend)
export async function updateTacheTitre(id: number, titre: string): Promise<Task> {
  try {
    const response = await apiClient.put<Task>(`/api/taches/${id}`, { titre });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la modification du titre :", error);
    throw error;
  }
}


// 🔹 Supprimer une tâche
export const deleteTache = async (id: number): Promise<void> => {
  try {
    await apiClient.delete(`/api/taches/${id}`);
  } catch (error: any) {
    if (error.response?.status === 404) {
      console.warn("Tâche déjà supprimée.");
    } else {
      console.error("Erreur API suppression tâche :", error);
      throw new Error("Erreur lors de la suppression");
    }
  }
};
