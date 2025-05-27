import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Calendar,
  ChartNoAxesColumnDecreasing,
  Users,
  Search,
  Settings,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import "../index.css";
import Modal from "@/components/Modal";
import Logo from "@/assets/logo.png";
import { fetchProjects } from "@/api/APIServices"; // Ton API
import { Project } from "@/types/project"; // Ton type

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const items = [
  {
    title: "Boards",
    url: "/Home",
    icon: ChartNoAxesColumnDecreasing,
  },
  {
    title: "Members",
    url: "/members",
    icon: Users,
  },
  {
    title: "Search",
    icon: Search,
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);
  const [isTaskDropdownOpen, setIsTaskDropdownOpen] = useState(false);
  const [projects, setProjects] = useState<Project[]>([]);

  const handleOpenSearchModal = () => setIsSearchModalOpen(true);
  const handleCloseSearchModal = () => setIsSearchModalOpen(false);

  useEffect(() => {
    const loadProjects = async () => {
      try {
        const data = await fetchProjects();
        setProjects(data);
      } catch (error) {
        console.error("Erreur lors du chargement des projets :", error);
      }
    };

    loadProjects();
  }, []);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="flex justify-center py-4">
              <img src={Logo} alt="Logo" className="h-20 mt-8 " />
            </SidebarGroupLabel>
            <SidebarGroupContent>
            <div className="mt-10">
              <SidebarMenu>
                {/* Menu classique */}
                {items.map((item) => (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton asChild>
                      {item.title === "Search" ? (
                        <button
                          onClick={handleOpenSearchModal}
                          className="flex items-center p-2 text-gray-800 hover:bg-gray-200 w-full "
                        >
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </button>
                      ) : (
                        <a
                          href={item.url}
                          className={`flex items-center p-2 w-full rounded ${
                            location.pathname === item.url
                              ? "bg-primary text-white"
                              : "text-gray-800 hover:bg-gray-200"
                          }`}
                        >
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </a>
                      )}
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {/* Dropdown Tasks stylé */}
                <SidebarMenuItem>
                  <div className="relative w-full">
                    <button
                      onClick={() => setIsTaskDropdownOpen(!isTaskDropdownOpen)}
                      className={`flex items-center w-full p-2 rounded transition-colors duration-200 ${
                        isTaskDropdownOpen || location.pathname.includes("/tasks")
                          ? "bg-primary text-white"
                          : "text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      <Calendar className="mr-2 h-4" />
                      <span className="flex-1 text-left">Tasks</span>
                      {isTaskDropdownOpen ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                    </button>

                    {isTaskDropdownOpen && (
                      <div className="absolute left-0 top-full mt-1 w-full bg-white shadow-md rounded-md z-10 overflow-hidden">
                        {projects.map((project) => (
                          <a
                            key={project.id}
                            href={`/tasks/${project.id}`}
                            className={`block px-4 py-2 text-sm transition-colors duration-200 ${
                              location.pathname === `/tasks/${project.id}`
                                ? "bg-primary text-white"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                          >
                            {project.titre}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </SidebarMenuItem>
              </SidebarMenu>
              </div>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Modal Search */}
      <Modal isOpen={isSearchModalOpen} onClose={handleCloseSearchModal}>
        <div className="p-4">
          <p className="text-lg text-gray-700"> Recherche en cours...</p>
        </div>
      </Modal>
    </>
  );
}
