import React from "react";
import ListCard from "../components/ListCard"; // Assure-toi que le chemin est correct
import { Button } from "@/components/ui/button"; // Assure-toi que le chemin est correct
import { List } from "lucide-react"; // Si tu as besoin de cette icône, sinon tu peux l'enlever
import Layout from "./layout";
import Navbar from "@/components/navbar";

interface Card {
  id: number;
  title: string;
  cards: string[];
}

const Liste: React.FC = () => {
  // Exemple de listes avec des tâches
  const lists: Card[] = [
    { id: 1, title: "To Do", cards: ["Task 1", "Task 2"] },
    { id: 2, title: "Doing", cards: ["Task 3"] },
    { id: 3, title: "Done", cards: ["Task 4", "Task 5"] },
  ];

  return (
    
     <Layout>
      <Navbar />
  
    <div className="flex flex-col h-full p-12 ">
      <div className="flex flex-grow gap-4 overflow-auto">
        {lists.map((list) => (
          <div
            key={list.id}
            className="flex flex-col w-1/3 bg-gray-100 rounded-lg shadow-md p-4"
          >
            <h2 className="text-lg font-semibold mb-4">{list.title}</h2>
            <div className="flex flex-col gap-2">
              {/* Affichage des cartes dans chaque liste */}
              {list.cards.map((card, index) => (
                <ListCard key={index} text={card} />
              ))}
              <Button className="mt-2">+ Add a card</Button> {/* Bouton pour ajouter une carte */}
            </div>
            
          </div>
    
        ))}
      </div>
      
    </div>
    </Layout>
    
  );
};

export default Liste;
