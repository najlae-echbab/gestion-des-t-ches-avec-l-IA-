import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "../index.css"
import Navbar from "@/components/navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
     
      <AppSidebar />
      
      <main>
        <SidebarTrigger />
        {children}
      </main>
      <Navbar/>
    </SidebarProvider>
  )
}
