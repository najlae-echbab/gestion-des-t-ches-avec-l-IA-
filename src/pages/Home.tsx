import Navbar from "@/components/navbar";
import { Calendar, ChartBar, List, Sidebar, Sliders } from "lucide-react";
import React from "react";
import Layout from "./layout";
import "../index.css";
import { Component } from "@/components/Component";
import { Button } from "@/components/ui/button"
import Card from "../components/Card";
import Liste from "./liste";
import * as calendar from "../components/ui/calendar";
import { CalendarDemo } from "@/components/Calendaar";

const Home: React.FC = () => {
  return (
    <div className="flex-1 ">
           
        <Layout >
        
        <div className="grid grid-cols-4 auto-rows-auto gap-4 px-4 ">
        <div className="mt-16 bg-[#e2e8f0] shadow-md rounded-lg p-6 flex flex-col items-center justify-center text-center hover:shadow-lg hover:-translate-y-2 transition-all duration-200 ease-in-out">
  <p className="text-lg font-semibold mb-4 text-center">
    Commencez un nouveau projet et organisez votre travail.
  </p>
  <Button
    variant="outline"
    className="bg-primary text-primary-foreground hover:bg-primary/90 hover:text-white shadow-xl rounded-lg transition-transform transform hover:scale-105"
  >
    Create new board +
  </Button>
</div>
            <div className="" >
            <Card  />
              </div>
              <div className="">
              <Card />
              </div>
              <div className="">
              <Card />
              </div>
               

              <div className="col-start-1 col-span-3 h-auto py-4" >
              <Component />
              </div>
              <div className=" h-auto py-16">
               <CalendarDemo/>
              </div>
              
          </div>
          
      </Layout>
     
    </div>
  );
};

export default Home;
