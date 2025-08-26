"use client"

import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar/Sidebar"
import { Separator } from "@/components/ui/separator/Separator"
import { Button } from "@/components/ui/button/Button"
import { Bell } from "lucide-react"
import { useState } from "react"
import { AllAlertsModal } from "@/components/modal/alerts/AllAlertsModal"

interface DashboardContentProps {
  activeTab: string
}

export function Navbar({ activeTab }: DashboardContentProps) {
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false)


  return (
    <SidebarInset>
      <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
        <SidebarTrigger className="-ml-1" />
        <Separator orientation="vertical" className="mr-2 h-4" />
        <h1 className="text-lg font-semibold capitalize">{activeTab}</h1>
        <div className="ml-auto pr-2">
          <Button variant="ghost" size="sm" className="relative p-2" onClick={() => setIsAlertsModalOpen(true)}>
            <Bell className="h-5 w-5" />
            <span className="absolute -top-0.5 -right-0.5 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-medium">
              3
            </span>
          </Button>
        </div>
      </header>
      <AllAlertsModal isOpen={isAlertsModalOpen} onClose={() => setIsAlertsModalOpen(false)} />
    </SidebarInset>
  )
}
