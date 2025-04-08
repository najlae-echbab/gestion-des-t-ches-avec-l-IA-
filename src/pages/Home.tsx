import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/navbar";
import { CalendarDemo } from "@/components/Calendaar";
import { Component } from "@/components/Component";
import Layout from "./layout";
import Card from "../components/Card";
import { Button } from "@/components/ui/button";
import { fetchProjects } from "@/api/APIServices"; // Importation de ta fonction d'API
import { Project } from "@/types/project";
import "../index.css";

const Home: React.FC = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const projectsData = await fetchProjects(); // Utilisation de ta fonction d'API déjà définie
        setProjects(projectsData);
      } catch (error) {
        setError("Erreur lors de la récupération des projets.");
      }
    };

    loadProjects();
  }, []);

  const handleNewBoardClick = () => {
    navigate("/new_board");
  };

  return (
    <div className="flex-1">
      <Layout>
        <Navbar />
        <div className="grid grid-cols-4 auto-rows-auto gap-4 px-4">
          <div className="mt-16 bg-[#e2e8f0] shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-200 ease-in-out">
            <p className="text-lg font-semibold mb-4 text-center">
              Commencez un nouveau projet et organisez votre travail.
            </p>
            <Button
              variant="outline"
              className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white shadow-xl rounded-lg transition-transform transform hover:scale-105"
              onClick={handleNewBoardClick}
            >
              Create new Projet +
            </Button>
          </div>

          {/* Affichage individuel des projets */}
          {projects.map((project) => (
            <div key={project.id} className="col-span-1 mt-16">
              <Card project={project} />
            </div>
          ))}

          <div className="col-start-1 col-span-3 h-auto py-4">
            <Component />
          </div>
          <div className="h-auto py-16">
            <CalendarDemo />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Home;
