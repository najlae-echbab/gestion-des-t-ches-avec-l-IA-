import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8081/",
    headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
    },
});

apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log(" Token ajouté aux headers :", token);  // Affiche le token dans la console du navigateur
    } else {
        console.log("Aucun token trouvé dans le localStorage.");
    }
    return config;
});

export default apiClient;
