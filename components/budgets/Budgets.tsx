"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/Card"
import { Button } from "@/components/ui/button/Button"
import { Progress } from "@/components/ui/progress/Progress"
import { Badge } from "@/components/ui/badge/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs/Tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/Select"
import { Plus, AlertTriangle, CheckCircle, Edit } from "lucide-react"
import { CreateBudgetModal } from "@/components/modal/budget/CreateBudgetModal"
import { EditBudgetModal } from "@/components/modal/budget/EditBudgetModal"
import { useState } from "react"

const Budgets = () =>  {
  const [isCreateBudgetModalOpen, setIsCreateBudgetModalOpen] = useState(false)
  const [isEditBudgetModalOpen, setIsEditBudgetModalOpen] = useState(false)
  const [selectedBudget, setSelectedBudget] = useState<any>(null)
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth())
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [selectedYearlyYear, setSelectedYearlyYear] = useState(new Date().getFullYear())

  const monthlyBudgets = [
    { id: 1, category: "Food & Dining", spent: 450, budget: 600, color: "bg-blue-500", period: "monthly" },
    { id: 2, category: "Transportation", spent: 280, budget: 400, color: "bg-green-500", period: "monthly" },
    { id: 3, category: "Entertainment", spent: 180, budget: 200, color: "bg-yellow-500", period: "monthly" },
    { id: 4, category: "Shopping", spent: 320, budget: 300, color: "bg-red-500", period: "monthly" },
    { id: 5, category: "Bills & Utilities", spent: 520, budget: 600, color: "bg-purple-500", period: "monthly" },
  ]

  const yearlyBudgets = [
    { id: 6, category: "Travel & Vacation", spent: 3200, budget: 5000, color: "bg-indigo-500", period: "yearly" },
    { id: 7, category: "Home Improvement", spent: 1800, budget: 3000, color: "bg-pink-500", period: "yearly" },
    { id: 8, category: "Education", spent: 2400, budget: 2500, color: "bg-cyan-500", period: "yearly" },
    { id: 9, category: "Healthcare", spent: 1200, budget: 2000, color: "bg-orange-500", period: "yearly" },
    { id: 10, category: "Emergency Fund", spent: 4500, budget: 6000, color: "bg-teal-500", period: "yearly" },
  ]

  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ]

  const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 5 + i)

  const handleEditBudget = (budget: any) => {
    setSelectedBudget(budget)
    setIsEditBudgetModalOpen(true)
  }

  const renderBudgetCards = (budgets: typeof monthlyBudgets) => (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {budgets.map((budget, index) => {
        const percentage = (budget.spent / budget.budget) * 100
        const isOverBudget = percentage > 100
        const isNearLimit = percentage > 80 && percentage <= 100

        return (
          <Card key={index}>
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base">{budget.category}</CardTitle>
                <div className="flex items-center gap-2">
                  {isOverBudget ? (
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Over Budget
                    </Badge>
                  ) : isNearLimit ? (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <AlertTriangle className="h-3 w-3" />
                      Near Limit
                    </Badge>
                  ) : (
                    <Badge variant="secondary" className="flex items-center gap-1">
                      <CheckCircle className="h-3 w-3" />
                      On Track
                    </Badge>
                  )}
                  <Button variant="ghost" size="sm" onClick={() => handleEditBudget(budget)} className="h-8 w-8 p-0">
                    <Edit className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Spent</span>
                <span className="font-medium">
                  ${budget.spent.toLocaleString()} / ${budget.budget.toLocaleString()}
                </span>
              </div>
              <Progress value={Math.min(percentage, 100)} className="h-2" />
              <div className="flex items-center justify-between text-xs text-muted-foreground">
                <span>{percentage.toFixed(1)}% used</span>
                <span>${(budget.budget - budget.spent).toLocaleString()} remaining</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )

  const renderBudgetSummary = (budgets: typeof monthlyBudgets, period: string) => {
    const onTrack = budgets.filter((b) => (b.spent / b.budget) * 100 <= 80).length
    const nearLimit = budgets.filter((b) => {
      const percentage = (b.spent / b.budget) * 100
      return percentage > 80 && percentage <= 100
    }).length
    const overBudget = budgets.filter((b) => (b.spent / b.budget) * 100 > 100).length

    return (
      <Card>
        <CardHeader>
          <CardTitle>Budget Summary</CardTitle>
          <CardDescription>Overall budget performance this {period}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{onTrack}</div>
              <p className="text-sm text-muted-foreground">Budgets on track</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">{nearLimit}</div>
              <p className="text-sm text-muted-foreground">Near budget limit</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-red-600">{overBudget}</div>
              <p className="text-sm text-muted-foreground">Over budget</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Budgets</h2>
          <p className="text-muted-foreground">Track and manage your spending limits</p>
        </div>
        <Button onClick={() => setIsCreateBudgetModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Budget
        </Button>
      </div>

      <Tabs defaultValue="monthly" className="space-y-6">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="monthly">Monthly Budgets</TabsTrigger>
          <TabsTrigger value="yearly">Yearly Budgets</TabsTrigger>
        </TabsList>

        <TabsContent value="monthly" className="space-y-6">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Month:</label>
              <Select
                value={selectedMonth.toString()}
                onValueChange={(value) => setSelectedMonth(Number.parseInt(value))}
              >
                <SelectTrigger className="w-[140px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {months.map((month, index) => (
                    <SelectItem key={index} value={index.toString()}>
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm font-medium">Year:</label>
              <Select
                value={selectedYear.toString()}
                onValueChange={(value) => setSelectedYear(Number.parseInt(value))}
              >
                <SelectTrigger className="w-[100px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {years.map((year) => (
                    <SelectItem key={year} value={year.toString()}>
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {renderBudgetCards(monthlyBudgets)}
          {renderBudgetSummary(monthlyBudgets, "month")}
        </TabsContent>

        <TabsContent value="yearly" className="space-y-6">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Year:</label>
            <Select
              value={selectedYearlyYear.toString()}
              onValueChange={(value) => setSelectedYearlyYear(Number.parseInt(value))}
            >
              <SelectTrigger className="w-[100px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {years.map((year) => (
                  <SelectItem key={year} value={year.toString()}>
                    {year}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {renderBudgetCards(yearlyBudgets)}
          {renderBudgetSummary(yearlyBudgets, "year")}
        </TabsContent>
      </Tabs>

      <CreateBudgetModal isOpen={isCreateBudgetModalOpen} onClose={() => setIsCreateBudgetModalOpen(false)} />
      <EditBudgetModal
        isOpen={isEditBudgetModalOpen}
        onClose={() => setIsEditBudgetModalOpen(false)}
        budget={selectedBudget}
      />
    </div>
  )
}

export default Budgets

