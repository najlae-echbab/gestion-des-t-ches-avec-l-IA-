import axios from "axios";
    import apiClient from "./apiClient";
    import { User } from "../types/user";
    import { Project } from "../types/project";

    const API_URL = "http://localhost:8081/api/projets";

   //récupérer tous les projets
   export const getUsers = async (): Promise<User[]> => {
     try {
       const response = await apiClient.get<User[]>("/api/users");
       console.log("Réponse API : ", response.data);
       return response.data;
     } catch (error) {
       console.error(" Erreur lors de la récupération des utilisateurs : ", error);
       throw error;
     }
   };
    // Créer un projet
    export const creerProjet = async (projetData, userId) => {
        const token = localStorage.getItem("jwt");
    
        if (!token) {
            throw new Error("Aucun token JWT trouvé dans le localStorage.");
        }
    
        const response = await apiClient.post(`/api/projets/create?userId=${userId}`, projetData, { // Pas besoin de JSON.stringify ici
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json",
                "Accept": "application/json",
            },
        });
    
        return response.data;
    };

    // Fonction pour récupérer les projets
    export const fetchProjects = async (): Promise<Project[]> => {
        try {
          const token = localStorage.getItem("jwt");
    
          if (!token) {
            throw new Error("Aucun token JWT trouvé dans le localStorage.");
          }
    
          const response = await apiClient.get<Project[]>("/api/projets", { // Utiliser apiClient au lieu de axios
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          });
          console.log("Réponse API Projets :", response.data);
          return response.data;
        } catch (error) {
          console.error("Erreur lors de la récupération des projets : ", error);
          throw error;
        }
    };