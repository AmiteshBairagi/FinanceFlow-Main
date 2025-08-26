"use client";
import { LayoutProvider, useLayout } from "@/contexts/LayoutContext/LayoutContext";
import React, { useState } from "react";
import AppSidebar from "./AppSidebar/AppSidebar";
import { SidebarProvider } from "@/components/ui/sidebar/Sidebar";
import { Navbar } from "./Navbar/Navbar";

const MainLayoutContent = ({ children }: { children: React.ReactNode }) => {
    const { isSidebarCollapsed } = useLayout();
    const [activeTab, setActiveTab] = useState("dashboard")

    return (
        <div className="min-h-screen bg-gray-50">
            <SidebarProvider>
                <AppSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

                <div
                    // className={`layout-transition ${isSidebarCollapsed
                    //     ? 'lg:ml-16 ml-0'
                    //     : 'lg:ml-64 ml-0'
                    //     }`}

                    className="flex-1 "
                >
                    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-2 border-b px-4 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"><Navbar activeTab={activeTab} /></div>
                    <main >
                        <div className="p-4 lg:p-6">
                            <div className="animate-fade-in">
                                {children}
                            </div>
                        </div>
                    </main>
                </div>
            </SidebarProvider>
        </div>
    );
};

const MainLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <LayoutProvider>
            <MainLayoutContent>{children}</MainLayoutContent>
        </LayoutProvider>
    );
};

export default MainLayout;