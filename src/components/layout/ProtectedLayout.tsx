"use client"
import { ReactNode } from "react";
import { Sidebar } from "../sidebar/Sidebar";

interface ProtectedLayoutProps {
  children: ReactNode;
}

export const ProtectedLayout = ({ children }: ProtectedLayoutProps) => {

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto bg-background">
        {children}
      </main>
    </div>
  );
};
