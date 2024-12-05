import Navbar from "@/components/navbar";
import { ChartBar, List, Sidebar, Sliders } from "lucide-react";
import React from "react";
import Layout from "./layout";
import "../index.css";
import { Component } from "@/components/Component";
import { Button } from "@/components/ui/button"
import Card from "../components/Card";
import Liste from "./liste";



const Home: React.FC = () => {
  return (
    <div className="flex-1 ">
           
        <Layout >
          
        <div className="grid grid-cols-3 gap-3 space-y-10">
             <div>
             <Button variant="outline" className="ml-8 mt-20 w-full h-[250px] md:w-[300px] md:h-[250px] bg-[#64748b] text-white hover:bg-[#94a3b8]">Create new board +</Button>
            </div > 
            <div  >
            <Card  />
              </div>
              <div className="">
              <Card />
              </div>
              <div className="col-start-1 col-end-7 ml-8 mr-8" >
              <Component />
              </div>
          </div>
      </Layout>
     
    </div>
  );
};

export default Home;
