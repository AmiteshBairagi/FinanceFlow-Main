"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/Card"
import { Button } from "@/components/ui/button/Button"
import { Progress } from "@/components/ui/progress/Progress"
import { ArrowDownIcon, ArrowUpIcon, CreditCard, PlusCircle, TrendingUp, Wallet } from "lucide-react"
import { MonthYearSelector } from "@/components/MonthYearSelector"
import { useState } from "react"
import  AddExpenseModal  from "@/components/modal/expense/AddExpenseModal"
import  AddIncomeModal  from "@/components/modal/income/AddIncomeModal"
import  AllBudgetsModal  from "@/components/modal/budget/AllBudgetsModal"
import { AllAlertsModal } from "@/components/modal/alerts/AllAlertsModal"

const Dashboard = () => {
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [isIncomeModalOpen, setIsIncomeModalOpen] = useState(false)
  const [isBudgetsModalOpen, setIsBudgetsModalOpen] = useState(false)
  const [isAlertsModalOpen, setIsAlertsModalOpen] = useState(false)

  const handleMonthYearChange = (month: number, year: number) => {
    console.log(`Selected: ${month + 1}/${year}`)
    // Here you would typically fetch data for the selected month/year
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Dashboard Overview</h2>
          <p className="text-muted-foreground">Your financial summary</p>
        </div>
        <MonthYearSelector onMonthYearChange={handleMonthYearChange} />
      </div>

      {/* Quick Actions */}
      <div className="flex gap-4">
        <Button className="flex items-center gap-2" onClick={() => setIsExpenseModalOpen(true)}>
          <PlusCircle className="h-4 w-4" />
          Add Expense
        </Button>
        <Button
          variant="outline"
          className="flex items-center gap-2 bg-transparent"
          onClick={() => setIsIncomeModalOpen(true)}
        >
          <ArrowUpIcon className="h-4 w-4" />
          Add Income
        </Button>
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <CreditCard className="h-4 w-4" />
          Transfer
        </Button>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Balance</CardTitle>
            <Wallet className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$12,345.67</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+2.5%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Income</CardTitle>
            <ArrowUpIcon className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">$5,420.00</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-green-600">+12%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Monthly Expenses</CardTitle>
            <ArrowDownIcon className="h-4 w-4 text-red-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">$3,280.50</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-red-600">+8%</span> from last month
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Savings</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">$2,139.50</div>
            <p className="text-xs text-muted-foreground">
              <span className="text-blue-600">+18%</span> from last month
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Budget Overview & Recent Activity */}
      <div className="grid gap-4">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Budget Overview</CardTitle>
                <CardDescription>Your spending this month</CardDescription>
              </div>
              <Button variant="ghost" size="sm" onClick={() => setIsBudgetsModalOpen(true)} className="text-xs">
                See All
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Food & Dining</span>
                <span className="text-sm text-muted-foreground">$450 / $600</span>
              </div>
              <Progress value={75} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Transportation</span>
                <span className="text-sm text-muted-foreground">$280 / $400</span>
              </div>
              <Progress value={70} className="h-2" />
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Entertainment</span>
                <span className="text-sm text-muted-foreground">$180 / $200</span>
              </div>
              <Progress value={90} className="h-2" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your latest financial activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { name: "Grocery Store", amount: -85.5, category: "Food", date: "Today", type: "expense" },
              { name: "Salary Deposit", amount: 2500.0, category: "Income", date: "Yesterday", type: "income" },
              { name: "Gas Station", amount: -45.2, category: "Transportation", date: "2 days ago", type: "expense" },
              {
                name: "Netflix Subscription",
                amount: -15.99,
                category: "Entertainment",
                date: "3 days ago",
                type: "expense",
              },
            ].map((transaction, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div
                    className={`h-8 w-8 rounded-full flex items-center justify-center ${
                      transaction.type === "income" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpIcon className="h-4 w-4 text-green-600" />
                    ) : (
                      <ArrowDownIcon className="h-4 w-4 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-medium">{transaction.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {transaction.category} • {transaction.date}
                    </p>
                  </div>
                </div>
                <div
                  className={`text-sm font-medium ${transaction.type === "income" ? "text-green-600" : "text-red-600"}`}
                >
                  {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Modal Components */}
      <AddExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
      <AddIncomeModal isOpen={isIncomeModalOpen} onClose={() => setIsIncomeModalOpen(false)} />
      <AllBudgetsModal isOpen={isBudgetsModalOpen} onClose={() => setIsBudgetsModalOpen(false)} />
      <AllAlertsModal isOpen={isAlertsModalOpen} onClose={() => setIsAlertsModalOpen(false)} />
    </div>
  )
}

export default Dashboard
