import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import "../index.css"
import Navbar from "@/components/navbar";
export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex flex-1 flex-col overflow-hidden">
        <div className="relative">
        <SidebarTrigger className="absolute left-4 top-0 z-[1000]" />
  </div>
  <div>
      
  </div>  
        <div>
        {children}
        </div>
      </main>
      
    </SidebarProvider>
  )
}
