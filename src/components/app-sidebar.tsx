import React from "react";
import { Calendar, ChartArea, ChartAreaIcon, ChartBar, ChartBarBig, ChartBarDecreasing, ChartBarStackedIcon, ChartNoAxesColumnDecreasing, ChartScatter, Home, Inbox, Search, Settings, Users } from "lucide-react"
import '../index.css'; 
//import "tailwindcss/tailwind.css"; 
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

// Menu items icons.
const items = [
  {
    title: "Boards",
    url: "#",
    icon:ChartNoAxesColumnDecreasing,
  },
  {
    title: "Members",
    url: "#",
    icon: Users,
  },
 /* {
    title: "Calendar",
    url: "#",
    icon: Calendar,
  },*/
  {
    title: "Search",
    url: "#",
    icon: Search,
  },
  {
    title: "Settings",
    url: "#",
    icon: Settings,
  },
  {
    title: "Tasks", // Modifie ce titre pour ta page Liste
    url: "http://localhost:5173/tasks", // Ajoute l'URL de ta page Liste ici
    icon: Calendar, // Choisis l'icône appropriée
  },
]

export function AppSidebar() {
  return (
    <Sidebar >
      <SidebarContent >
        <SidebarGroup >
          <SidebarGroupLabel className="max-w-lg text-3xl font-semibold leading-normal text-gray-900 dark:text-white">Application</SidebarGroupLabel>
          <SidebarGroupContent >
            <SidebarMenu  >
              {items.map((item) => (
                <SidebarMenuItem key={item.title} style={{top:"2rem"}}>
                  <SidebarMenuButton asChild >
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton >
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  )
}
