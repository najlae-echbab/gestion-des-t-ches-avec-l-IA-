import axios from "axios";

const apiClient = axios.create({
    baseURL: "http://localhost:8081",
    headers: {
        "Content-Type": "application/json",
    },
});

// Ajoute le token JWT automatiquement
apiClient.interceptors.request.use((config) => {
    const token = localStorage.getItem("jwt");
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export default apiClient;
