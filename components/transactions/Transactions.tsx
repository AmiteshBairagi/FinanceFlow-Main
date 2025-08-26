"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/Card"
import { Button } from "@/components/ui/button/Button"
import { Input } from "@/components/ui/input/Input"
import { Badge } from "@/components/ui/badge/Badge"
import { Checkbox } from "@/components/ui/checkbox/Checkbox"
import { Slider } from "@/components/ui/slider/Slider"
import { Label } from "@/components/ui/label/Label"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu/DropdownMenu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/Select"
import { Search, Filter, Plus, ArrowUpIcon, ArrowDownIcon, X } from "lucide-react"
import { MonthYearSelector } from "@/components/MonthYearSelector"
import  AddExpenseModal  from "@/components/modal/expense/AddExpenseModal"

interface FilterState {
  types: string[]
  categories: string[]
  accounts: string[]
  amountRange: [number, number]
}

const Transactions = () => {
  const [filters, setFilters] = useState<FilterState>({
    types: [],
    categories: [],
    accounts: [],
    amountRange: [0, 3000],
  })

  const [searchTerm, setSearchTerm] = useState("")
  const [isExpenseModalOpen, setIsExpenseModalOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("all")

  const transactionTypes = ["income", "expense"]
  const categories = [
    "Food & Dining",
    "Transportation",
    "Entertainment",
    "Salary",
    "Freelance",
    "Shopping",
    "Bills",
    "Healthcare",
  ]
  const accounts = ["Checking", "Credit Card", "Savings", "Cash", "Investment"]

  const handleFilterChange = (filterType: keyof FilterState, value: string) => {
    setFilters((prev) => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? (prev[filterType] as string[]).filter((item) => item !== value)
        : [...(prev[filterType] as string[]), value],
    }))
  }

  const handleAmountRangeChange = (value: number[]) => {
    setFilters((prev) => ({
      ...prev,
      amountRange: [value[0], value[1]],
    }))
  }

  const clearAllFilters = () => {
    setFilters({
      types: [],
      categories: [],
      accounts: [],
      amountRange: [0, 3000],
    })
  }

  const hasActiveFilters =
    filters.types.length > 0 ||
    filters.categories.length > 0 ||
    filters.accounts.length > 0 ||
    filters.amountRange[0] > 0 ||
    filters.amountRange[1] < 3000

  const handleMonthYearChange = (month: number, year: number) => {
    console.log(`Selected: ${month + 1}/${year}`)
    // Here you would typically fetch transaction data for the selected month/year
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value)
    // Here you would filter transactions based on selected category
  }

  const allTransactions = [
    {
      id: 1,
      name: "Grocery Store",
      amount: -85.5,
      category: "Food & Dining",
      date: "2024-01-15",
      account: "Checking",
      type: "expense",
    },
    {
      id: 2,
      name: "Salary Deposit",
      amount: 2500.0,
      category: "Salary",
      date: "2024-01-14",
      account: "Checking",
      type: "income",
    },
    {
      id: 3,
      name: "Gas Station",
      amount: -45.2,
      category: "Transportation",
      date: "2024-01-13",
      account: "Credit Card",
      type: "expense",
    },
    {
      id: 4,
      name: "Netflix Subscription",
      amount: -15.99,
      category: "Entertainment",
      date: "2024-01-12",
      account: "Credit Card",
      type: "expense",
    },
    {
      id: 5,
      name: "Freelance Payment",
      amount: 750.0,
      category: "Freelance",
      date: "2024-01-11",
      account: "Checking",
      type: "income",
    },
  ]

  const filteredTransactions =
    selectedCategory === "all"
      ? allTransactions
      : allTransactions.filter((transaction) => transaction.category === selectedCategory)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Transactions</h2>
          <p className="text-muted-foreground">Manage your income and expenses</p>
        </div>
        <div className="flex items-center gap-4">
          <MonthYearSelector onMonthYearChange={handleMonthYearChange} />
          <Button onClick={() => setIsExpenseModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Transaction
          </Button>
        </div>
      </div>

      <div className="flex gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search transactions..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="relative bg-transparent">
              <Filter className="h-4 w-4 mr-2" />
              Filter
              {hasActiveFilters && (
                <Badge
                  variant="destructive"
                  className="ml-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
                >
                  {filters.types.length +
                    filters.categories.length +
                    filters.accounts.length +
                    (filters.amountRange[0] > 0 || filters.amountRange[1] < 3000 ? 1 : 0)}
                </Badge>
              )}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-80 p-4" align="end">
            <div className="flex items-center justify-between mb-4">
              <DropdownMenuLabel className="p-0">Filter Transactions</DropdownMenuLabel>
              {hasActiveFilters && (
                <Button variant="ghost" size="sm" onClick={clearAllFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            {/* Transaction Types */}
            <div className="space-y-3 mb-6">
              <Label className="text-sm font-medium">Transaction Type</Label>
              <div className="space-y-2">
                {transactionTypes.map((type) => (
                  <div key={type} className="flex items-center space-x-2">
                    <Checkbox
                      id={`type-${type}`}
                      checked={filters.types.includes(type)}
                      onCheckedChange={() => handleFilterChange("types", type)}
                    />
                    <Label htmlFor={`type-${type}`} className="text-sm capitalize">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Categories */}
            <div className="space-y-3 mb-6">
              <Label className="text-sm font-medium">Categories</Label>
              <div className="space-y-2 max-h-32 overflow-y-auto">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => handleFilterChange("categories", category)}
                    />
                    <Label htmlFor={`category-${category}`} className="text-sm">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <DropdownMenuSeparator />

            {/* Accounts */}
            <div className="space-y-3 mb-6">
              <Label className="text-sm font-medium">Accounts</Label>
              <div className="space-y-2">
                {accounts.map((account) => (
                  <div key={account} className="flex items-center space-x-2">
                    <Checkbox
                      id={`account-${account}`}
                      checked={filters.accounts.includes(account)}
                      onCheckedChange={() => handleFilterChange("accounts", account)}
                    />
                    <Label htmlFor={`account-${account}`} className="text-sm">
                      {account}
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <DropdownMenuSeparator />

            <div className="space-y-4">
              <Label className="text-sm font-medium">Amount Range</Label>
              <div className="px-2">
                <Slider
                  value={filters.amountRange}
                  onValueChange={handleAmountRangeChange}
                  max={3000}
                  min={0}
                  step={10}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-muted-foreground mt-2">
                  <span>${filters.amountRange[0]}</span>
                  <span>${filters.amountRange[1]}</span>
                </div>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span>Min: ${filters.amountRange[0]}</span>
                <span>Max: ${filters.amountRange[1]}</span>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap gap-2">
          {filters.types.map((type) => (
            <Badge key={type} variant="secondary" className="capitalize">
              {type}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => handleFilterChange("types", type)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.categories.map((category) => (
            <Badge key={category} variant="secondary">
              {category}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => handleFilterChange("categories", category)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {filters.accounts.map((account) => (
            <Badge key={account} variant="secondary">
              {account}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => handleFilterChange("accounts", account)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
          {(filters.amountRange[0] > 0 || filters.amountRange[1] < 3000) && (
            <Badge variant="secondary">
              ${filters.amountRange[0]} - ${filters.amountRange[1]}
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 ml-1 hover:bg-transparent"
                onClick={() => handleAmountRangeChange([0, 3000])}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          )}
        </div>
      )}

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>All Transactions</CardTitle>
              <CardDescription>Complete list of your financial transactions</CardDescription>
            </div>
            <Select value={selectedCategory} onValueChange={handleCategoryChange}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredTransactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  <div
                    className={`h-10 w-10 rounded-full flex items-center justify-center ${
                      transaction.type === "income" ? "bg-green-100 dark:bg-green-900" : "bg-red-100 dark:bg-red-900"
                    }`}
                  >
                    {transaction.type === "income" ? (
                      <ArrowUpIcon className="h-5 w-5 text-green-600" />
                    ) : (
                      <ArrowDownIcon className="h-5 w-5 text-red-600" />
                    )}
                  </div>
                  <div>
                    <p className="font-medium">{transaction.name}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Badge variant="secondary">{transaction.category}</Badge>
                      <span>•</span>
                      <span>{transaction.account}</span>
                      <span>•</span>
                      <span>{transaction.date}</span>
                    </div>
                  </div>
                </div>
                <div
                  className={`text-lg font-semibold ${
                    transaction.type === "income" ? "text-green-600" : "text-red-600"
                  }`}
                >
                  {transaction.type === "income" ? "+" : ""}${Math.abs(transaction.amount).toFixed(2)}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <AddExpenseModal isOpen={isExpenseModalOpen} onClose={() => setIsExpenseModalOpen(false)} />
    </div>
  )
}

export default Transactions