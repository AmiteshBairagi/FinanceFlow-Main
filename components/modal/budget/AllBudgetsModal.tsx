"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog/Dialog"
import { Progress } from "@/components/ui/progress/Progress"
import { Badge } from "@/components/ui/badge/Badge"
import { Card, CardContent } from "@/components/ui/card/Card"
import { TrendingUp, TrendingDown, AlertTriangle } from "lucide-react"

interface AllBudgetsModalProps {
  isOpen: boolean
  onClose: () => void
}

const AllBudgetsModal = ({ isOpen, onClose }: AllBudgetsModalProps) =>  {
  const budgets = [
    { category: "Food & Dining", spent: 450, budget: 600, color: "bg-blue-500" },
    { category: "Transportation", spent: 280, budget: 400, color: "bg-green-500" },
    { category: "Entertainment", spent: 180, budget: 200, color: "bg-yellow-500" },
    { category: "Shopping", spent: 320, budget: 500, color: "bg-purple-500" },
    { category: "Healthcare", spent: 150, budget: 300, color: "bg-red-500" },
    { category: "Utilities", spent: 220, budget: 250, color: "bg-indigo-500" },
    { category: "Education", spent: 80, budget: 200, color: "bg-pink-500" },
    { category: "Travel", spent: 0, budget: 400, color: "bg-orange-500" },
  ]

  const getStatusIcon = (percentage: number) => {
    if (percentage >= 90) return <AlertTriangle className="h-4 w-4 text-red-500" />
    if (percentage >= 75) return <TrendingUp className="h-4 w-4 text-yellow-500" />
    return <TrendingDown className="h-4 w-4 text-green-500" />
  }

  const getStatusBadge = (percentage: number) => {
    if (percentage >= 90) return <Badge variant="destructive">Over Budget</Badge>
    if (percentage >= 75)
      return (
        <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
          Warning
        </Badge>
      )
    return (
      <Badge variant="secondary" className="bg-green-100 text-green-800">
        On Track
      </Badge>
    )
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border shadow-lg">
        <DialogHeader>
          <DialogTitle>All Budgets</DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {budgets.map((budget, index) => {
            const percentage = (budget.spent / budget.budget) * 100
            return (
              <Card key={index}>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-3 h-3 rounded-full ${budget.color}`} />
                      <h3 className="font-medium">{budget.category}</h3>
                      {getStatusIcon(percentage)}
                    </div>
                    {getStatusBadge(percentage)}
                  </div>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">
                        ${budget.spent} / ${budget.budget}
                      </span>
                      <span className="font-medium">{percentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={percentage} className="h-2" />
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Remaining: ${budget.budget - budget.spent}</span>
                      <span>
                        {percentage > 100 ? "Over by" : "Under by"} ${Math.abs(budget.budget - budget.spent)}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AllBudgetsModal
