import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import AppRouter from "./AppRouter";
import "tailwindcss/tailwind.css";
import "./index.css";

// Création du client React Query
const queryClient = new QueryClient();//ne fetch pas dans 5 min 

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
        <AppRouter />
    </QueryClientProvider>
  </StrictMode>
);
