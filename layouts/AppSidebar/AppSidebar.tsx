"use-client"
import React from 'react'
import {
  BarChart3,
  CreditCard,
  DollarSign,
  Goal,
  Home,
  Receipt,
  Settings,
  Target,
  Wallet,
  Download,
  Calculator,
  FileText,
} from "lucide-react"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar/Sidebar"

import { ThemeToggle } from "@/components/theme-toggle/ThemeToggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar/Avatar"
import Link from 'next/link'

const menuItems = [
  {
    title: "Dashboard",
    icon: Home,
    id: "dashboard",
    route: "/dashboard"
  },
  {
    title: "Transactions",
    icon: Receipt,
    id: "transactions",
    route: "/transactions"
  },
  {
    title: "Analytics",
    icon: BarChart3,
    id: "analytics",
    route: "/analytics"
  },
  {
    title: "Budgets",
    icon: Target,
    id: "budgets",
    route: "/budgets"
  },
  {
    title: "Goals",
    icon: Goal,
    id: "goals",
    route: "/goals"
  },
  {
    title: "Accounts",
    icon: Wallet,
    id: "accounts",
    route: "/accounts"
  },
  {
    title: "Bills & EMI",
    icon: CreditCard,
    id: "bills",
    route: "/bills-emi"
  },
  {
    title: "Documents",
    icon: FileText,
    id: "documents",
    route: "/documents"
  },
  {
    title: "Calculations",
    icon: Calculator,
    id: "calculations",
    route: "/calculations"
  },
  {
    title: "Exports",
    icon: Download,
    id: "exports",
    route: "/exports"
  },

]


interface AppSidebarProps {
  activeTab: string
  setActiveTab: (tab: string) => void
}

const AppSidebar = ({ activeTab, setActiveTab }: AppSidebarProps) => {
  return (
    <Sidebar variant="inset">
      <SidebarHeader className="border-b border-sidebar-border">
        <div className="flex items-center gap-2 px-4 py-0.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <DollarSign className="h-4 w-4" />
          </div>
          <div className="grid flex-1 text-left text-sm leading-tight">
            <span className="truncate font-semibold">FinanceFlow</span>
            <span className="truncate text-xs text-sidebar-foreground/70">Personal Finance Manager</span>
          </div>
        </div>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navigation</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item) => (
                <SidebarMenuItem key={item.id}>
                  <Link href={item.route}>
                    <SidebarMenuButton isActive={activeTab === item.id} onClick={() => setActiveTab(item.id)}>
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm">{item.title}</span>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-sidebar-border">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage src="/placeholder.svg?height=32&width=32" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-semibold">John Doe</span>
              <span className="truncate text-xs text-sidebar-foreground/70">john@example.com</span>
            </div>
          </div>
          <ThemeToggle />
        </div>
        <Link href="/settings">
          <SidebarMenuButton onClick={() => setActiveTab("settings")}>
            <Settings className="h-4 w-4" />
            <span>Settings</span>
          </SidebarMenuButton>
        </Link>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}

export default AppSidebar


