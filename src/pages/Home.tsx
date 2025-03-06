import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import du hook pour la navigation
import Navbar from "@/components/navbar";
import { CalendarDemo } from "@/components/Calendaar";
import { Component } from "@/components/Component";
import Layout from "./layout";
import Card from "../components/Card";
import { Button } from "@/components/ui/button";
import react ,{useState} from "react";
import axios from "axios";


import "../index.css";
import { fromJSON } from "@@/postcss/lib/postcss";


const Home: React.FC = () => {
  
    const [users ,setUsers] = useState([]);
    useEffect(()=> {
       lodUsers();},[]
    );
    const lodUsers = async () => {
      const result = await axios.get("http://localhost:8081/api/users");
      console.log(result.data);
    };
  
  const navigate = useNavigate(); // Initialisation du hook de navigation

  const handleNewBoardClick = () => {
    navigate("/new_board"); // Redirection vers la route `/new_board`
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
              onClick={handleNewBoardClick} // Appel de la fonction pour rediriger
            >
              Create new Projet +
            </Button>
          </div>
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
          <div>
            <Card />
          </div>
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
