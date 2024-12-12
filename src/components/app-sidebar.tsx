import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { Calendar, ChartNoAxesColumnDecreasing, Users, Search, Settings } from "lucide-react";
import "../index.css";
import Modal from "@/components/Modal"; // Import du modal
import Logo from '@/assets/logo.png';
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

// Menu items icons.
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
    icon: Search, // Pas besoin d'URL car on ouvre un modal
  },
  {
    title: "Settings",
    url: "/settings",
    icon: Settings,
  },
  {
    title: "Tasks",
    url: "/tasks",
    icon: Calendar,
  },
];

export function AppSidebar() {
  const location = useLocation();
  const [isSearchModalOpen, setIsSearchModalOpen] = useState(false);

  const handleOpenSearchModal = () => setIsSearchModalOpen(true);
  const handleCloseSearchModal = () => setIsSearchModalOpen(false);

  return (
    <>
      <Sidebar collapsible="icon">
        <SidebarContent>
          <SidebarGroup>
            <SidebarGroupLabel className="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white">
              <img src={Logo} alt="Logo" className="h-20 mt-8 " />
            </SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {items.map((item) => (
                  <SidebarMenuItem key={item.title} style={{ top: "3rem" }}>
                    <SidebarMenuButton asChild>
                      {item.title === "Search" ? (
                        <button
                          onClick={handleOpenSearchModal}
                          className="flex items-center p-2 text-gray-800 hover:bg-gray-200"
                        >
                          <item.icon className="mr-2" />
                          <span>{item.title}</span>
                        </button>
                      ) : (
                        <a
                          href={item.url}
                          className={`flex items-center p-2 ${
                            location.pathname === item.url
                              ? "bg-primary text-primary-foreground"
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
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </SidebarContent>
      </Sidebar>

      {/* Modal pour Search */}
      <Modal isOpen={isSearchModalOpen} onClose={handleCloseSearchModal}>
        <p></p>
        
      </Modal>
        

    </>
  );
}
