//tous les appels API sont gérés ici
import apiClient from "@/api/apiClient";
import { removeToken } from "../utils/localStorage";//elle supprime le token d'authentification de l'utilisateur du stockage local
export async function logoutUser(): Promise<void> {//Elle ne retourne rien (void), mais elle effectue une action (la suppression du token)
  return new Promise((resolve) => {//La fonction retourne une promesse qui exécute un setTimeout.
    setTimeout(() => {//Attend 500 ms pour simuler une requête API.
      removeToken();//Après 500 ms  elle appelle la fonction removeToken() pour supprimer le token d'authentification de l'utilisateur du stockage local.
      resolve();//est exécute pour indiquer que la promesse est terminée.
    }, 500); // Simule une requête API
  });
}
interface LoginRequest {
  username: string;
  password: string;
}
interface authResponse {
  token: string;
}
const authService  = {
  login :async (data: LoginRequest): Promise<authResponse> => {// envoie la requête et récupère le token.
    const response = await apiClient.post("/auth/authenticate", data);
    return response.data;
  },
  logout: () => {//supprime le token du localStorage.
    localStorage.removeItem("jwt");
},
};
export default authService;