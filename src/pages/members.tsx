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
import { fetchMembers } from "../api/memberService";
import "../index.css";
import { fromJSON } from "@@/postcss/lib/postcss";
import MemberList from "../components/MemberList";
import { User } from "../types/user";


const members: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const result = await fetchMembers();
        setUsers(result);
      } catch (error: any) {
        setError("Erreur lors de la récupération des utilisateurs.");
        console.error(error);
      }
    };

    loadUsers();
  }, []);
    const lodUsers = async () => {
      const result = await axios.get("http://localhost:8081/api/users");
      console.log(result.data);
    };
  
  const navigate = useNavigate(); 

  const handleNewBoardClick = () => {
    navigate("/new_board"); 
  };

  return (
    <div className="flex-1">
      <Layout>
      <Navbar />
      <MemberList /> 
      </Layout>
    </div>
  );
};

export default members;
