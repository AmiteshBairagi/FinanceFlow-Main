"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/Card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart/Chart"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/Select"
import { CalendarIcon } from "lucide-react"
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  LineChart,
  Line,
  ResponsiveContainer,
} from "recharts"

const rainbowColors = [
  "#6366f1", // Indigo
  "#8b5cf6", // Violet
  "#ec4899", // Pink
  "#f97316", // Orange
  "#eab308", // Yellow
  "#22c55e", // Green
  "#06b6d4", // Cyan
  "#3b82f6", // Blue
  "#a855f7", // Purple
  "#ef4444", // Red
]

const expenseData = [
  { name: "Food & Dining", value: 450, color: "#8884d8" },
  { name: "Transportation", value: 280, color: "#82ca9d" },
  { name: "Entertainment", value: 180, color: "#ffc658" },
  { name: "Shopping", value: 320, color: "#ff7300" },
  { name: "Bills", value: 520, color: "#00ff00" },
]

const rainbowExpenseData = [
  { name: "Food & Dining", value: 450, color: "#6366f1" },
  { name: "Transportation", value: 280, color: "#8b5cf6" },
  { name: "Entertainment", value: 180, color: "#ec4899" },
  { name: "Shopping", value: 320, color: "#f97316" },
  { name: "Bills", value: 520, color: "#22c55e" },
]

const monthlyData = [
  { month: "Jan", income: 5420, expenses: 3280 },
  { month: "Feb", income: 5200, expenses: 3450 },
  { month: "Mar", income: 5800, expenses: 3100 },
  { month: "Apr", income: 5420, expenses: 3680 },
  { month: "May", income: 5600, expenses: 3200 },
  { month: "Jun", income: 5420, expenses: 3280 },
]

const yearlyData = [
  { year: "2020", income: 62000, expenses: 38000 },
  { year: "2021", income: 68000, expenses: 42000 },
  { year: "2022", income: 72000, expenses: 45000 },
  { year: "2023", income: 78000, expenses: 48000 },
  { year: "2024", income: 82000, expenses: 52000 },
]

const netWorthData = [
  { month: "Jan", netWorth: 10000 },
  { month: "Feb", netWorth: 10750 },
  { month: "Mar", netWorth: 11500 },
  { month: "Apr", netWorth: 12240 },
  { month: "May", netWorth: 13000 },
  { month: "Jun", netWorth: 12345 },
]

// Sample comparison data
const monthlyComparisonData = [
  { category: "Food & Dining", month1: 450, month2: 380 },
  { category: "Transportation", month1: 280, month2: 320 },
  { category: "Entertainment", month1: 180, month2: 220 },
  { category: "Shopping", month1: 320, month2: 280 },
  { category: "Bills", month1: 520, month2: 540 },
]

const yearlyComparisonData = [
  { category: "Food & Dining", year1: 5400, year2: 4800 },
  { category: "Transportation", year1: 3360, year2: 3840 },
  { category: "Entertainment", year1: 2160, year2: 2640 },
  { category: "Shopping", year1: 3840, year2: 3360 },
  { category: "Bills", year1: 6240, year2: 6480 },
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

const years = ["2020", "2021", "2022", "2023", "2024"]

const Analytics = () => {
  const [incomeExpenseView, setIncomeExpenseView] = useState<"monthly" | "yearly">("monthly")

  // Monthly comparison states
  const [monthlyComparisonMonth1, setMonthlyComparisonMonth1] = useState("January")
  const [monthlyComparisonYear1, setMonthlyComparisonYear1] = useState("2024")
  const [monthlyComparisonMonth2, setMonthlyComparisonMonth2] = useState("February")
  const [monthlyComparisonYear2, setMonthlyComparisonYear2] = useState("2024")

  // Yearly comparison states
  const [yearlyComparisonYear1, setYearlyComparisonYear1] = useState("2023")
  const [yearlyComparisonYear2, setYearlyComparisonYear2] = useState("2024")

  const isRainbowTheme = document.documentElement.classList.contains("rainbow")
  const currentExpenseData = isRainbowTheme ? rainbowExpenseData : expenseData

  return (
    <div className="max-w-full overflow-hidden">
      <div className="space-y-6 p-4 sm:p-6 max-w-full">
        <div>
          <h2 className="text-2xl font-bold">Analytics</h2>
          <p className="text-muted-foreground">Insights into your financial patterns</p>
        </div>

        <div className="grid gap-6 grid-cols-1 xl:grid-cols-2">
          <Card className="min-w-0">
            <CardHeader>
              <CardTitle>Expense Distribution</CardTitle>
              <CardDescription>Breakdown by category this month</CardDescription>
            </CardHeader>
            <CardContent className="min-w-0">
              <ChartContainer
                config={{
                  value: {
                    label: "Amount",
                    color: "hsl(var(--chart-1))",
                  },
                }}
                className="h-[250px] sm:h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={currentExpenseData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                    >
                      {currentExpenseData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          <Card className="min-w-0">
            <CardHeader className="flex flex-col space-y-2 sm:flex-row sm:items-center sm:justify-between sm:space-y-0 pb-2">
              <div className="min-w-0">
                <CardTitle>Income vs Expenses</CardTitle>
                <CardDescription>
                  {incomeExpenseView === "monthly" ? "Monthly" : "Yearly"} comparison over time
                </CardDescription>
              </div>
              <Select
                value={incomeExpenseView}
                onValueChange={(value: "monthly" | "yearly") => setIncomeExpenseView(value)}
              >
                <SelectTrigger className="w-full sm:w-[120px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="monthly">Monthly</SelectItem>
                  <SelectItem value="yearly">Yearly</SelectItem>
                </SelectContent>
              </Select>
            </CardHeader>
            <CardContent className="min-w-0">
              <ChartContainer
                config={{
                  income: {
                    label: "Income",
                    color: isRainbowTheme ? "#22c55e" : "hsl(var(--chart-1))",
                  },
                  expenses: {
                    label: "Expenses",
                    color: isRainbowTheme ? "#ec4899" : "hsl(var(--chart-2))",
                  },
                }}
                className="h-[250px] sm:h-[300px] w-full"
              >
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={incomeExpenseView === "monthly" ? monthlyData : yearlyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey={incomeExpenseView === "monthly" ? "month" : "year"} />
                    <YAxis />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey="income" fill="var(--color-income)" />
                    <Bar dataKey="expenses" fill="var(--color-expenses)" />
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Monthly Expense Comparison</CardTitle>
            <CardDescription>Compare expenses between any two months</CardDescription>
            <div className="flex flex-col gap-4 pt-4">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-center">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <CalendarIcon className="h-4 w-4" />
                  <div className="flex gap-2">
                    <Select value={monthlyComparisonMonth1} onValueChange={setMonthlyComparisonMonth1}>
                      <SelectTrigger className="w-full min-w-0 sm:w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={monthlyComparisonYear1} onValueChange={setMonthlyComparisonYear1}>
                      <SelectTrigger className="w-20 min-w-0 sm:w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                <div className="text-center text-muted-foreground">vs</div>
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                  <CalendarIcon className="h-4 w-4" />
                  <div className="flex gap-2">
                    <Select value={monthlyComparisonMonth2} onValueChange={setMonthlyComparisonMonth2}>
                      <SelectTrigger className="w-full min-w-0 sm:w-[130px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {months.map((month) => (
                          <SelectItem key={month} value={month}>
                            {month}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Select value={monthlyComparisonYear2} onValueChange={setMonthlyComparisonYear2}>
                      <SelectTrigger className="w-20 min-w-0 sm:w-[80px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {years.map((year) => (
                          <SelectItem key={year} value={year}>
                            {year}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </div>
            </div>
          </CardHeader>
          <CardContent className="min-w-0">
            <ChartContainer
              config={{
                month1: {
                  label: `${monthlyComparisonMonth1} ${monthlyComparisonYear1}`,
                  color: isRainbowTheme ? "#6366f1" : "hsl(var(--chart-1))",
                },
                month2: {
                  label: `${monthlyComparisonMonth2} ${monthlyComparisonYear2}`,
                  color: isRainbowTheme ? "#f97316" : "hsl(var(--chart-2))",
                },
              }}
              className="h-[250px] sm:h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={monthlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} interval={0} fontSize={12} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="month1" fill="var(--color-month1)" />
                  <Bar dataKey="month2" fill="var(--color-month2)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Yearly Expense Comparison</CardTitle>
            <CardDescription>Compare expenses between any two years</CardDescription>
            <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-center">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <Select value={yearlyComparisonYear1} onValueChange={setYearlyComparisonYear1}>
                  <SelectTrigger className="w-20 min-w-0 sm:w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="text-center text-muted-foreground">vs</div>
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4" />
                <Select value={yearlyComparisonYear2} onValueChange={setYearlyComparisonYear2}>
                  <SelectTrigger className="w-20 min-w-0 sm:w-[80px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardHeader>
          <CardContent className="min-w-0">
            <ChartContainer
              config={{
                year1: {
                  label: yearlyComparisonYear1,
                  color: isRainbowTheme ? "#8b5cf6" : "hsl(var(--chart-3))",
                },
                year2: {
                  label: yearlyComparisonYear2,
                  color: isRainbowTheme ? "#06b6d4" : "hsl(var(--chart-4))",
                },
              }}
              className="h-[250px] sm:h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={yearlyComparisonData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="category" angle={-45} textAnchor="end" height={80} interval={0} fontSize={12} />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Bar dataKey="year1" fill="var(--color-year1)" />
                  <Bar dataKey="year2" fill="var(--color-year2)" />
                </BarChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <Card className="min-w-0">
          <CardHeader>
            <CardTitle>Net Worth Growth</CardTitle>
            <CardDescription>Track your financial progress over time</CardDescription>
          </CardHeader>
          <CardContent className="min-w-0">
            <ChartContainer
              config={{
                netWorth: {
                  label: "Net Worth",
                  color: isRainbowTheme ? "#10b981" : "hsl(var(--chart-3))",
                },
              }}
              className="h-[250px] sm:h-[300px] w-full"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={netWorthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="netWorth" stroke="var(--color-netWorth)" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default Analytics