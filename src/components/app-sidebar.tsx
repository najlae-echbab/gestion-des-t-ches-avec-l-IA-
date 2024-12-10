import React from "react";
import { useLocation } from "react-router-dom"; // Import de useLocation pour accéder à la route actuelle
import { Calendar, ChartNoAxesColumnDecreasing, Users, Search, Settings } from "lucide-react";
import '../index.css';
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
    url: "/Home", // Modifie l'URL pour correspondre à la route de ton application
    icon: ChartNoAxesColumnDecreasing,
  },
  {
    title: "Members",
    url: "/members",
    icon: Users,
  },
  {
    title: "Search",
    url: "/search",
    icon: Search,
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
  const location = useLocation(); // Accède à l'URL actuelle

  return (
    <Sidebar collapsible="icon">
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white">
            Application
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title} style={{ top: "2rem" }}>
                  <SidebarMenuButton asChild>
                    <a
                      href={item.url}
                      className={`flex items-center p-2 ${
                        location.pathname === item.url ? "bg-primary text-primary-foreground" : "text-gray-800 hover:bg-gray-200"
                      }`}
                    >
                      <item.icon className="mr-2" />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
