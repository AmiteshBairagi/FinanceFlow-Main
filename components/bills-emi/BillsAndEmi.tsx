"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/Card"
import { Button } from "@/components/ui/button/Button"
import { Badge } from "@/components/ui/badge/Badge"
import { Plus, Calendar, AlertTriangle, CheckCircle, Clock } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog/Dialog"
import { Input } from "@/components/ui/input/Input"
import { Label } from "@/components/ui/label/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/Select"
import { Switch } from "@/components/ui/switch/Switch"

const BillsAndEmi = () => {
  const [isAddBillOpen, setIsAddBillOpen] = useState(false)

  const bills = [
    {
      name: "Credit Card Payment",
      amount: 1250.75,
      dueDate: "2024-01-18",
      status: "due",
      category: "Credit Card",
      recurring: true,
    },
    {
      name: "Rent",
      amount: 1500.0,
      dueDate: "2024-02-01",
      status: "upcoming",
      category: "Housing",
      recurring: true,
    },
    {
      name: "Electric Bill",
      amount: 85.5,
      dueDate: "2024-01-25",
      status: "upcoming",
      category: "Utilities",
      recurring: true,
    },
    {
      name: "Internet",
      amount: 79.99,
      dueDate: "2024-01-15",
      status: "paid",
      category: "Utilities",
      recurring: true,
    },
    {
      name: "Car Insurance",
      amount: 125.0,
      dueDate: "2024-01-20",
      status: "upcoming",
      category: "Insurance",
      recurring: true,
    },
  ]

  const categories = ["Housing", "Utilities", "Insurance", "Subscriptions", "Credit Card", "Loans", "Other"]

  const handleAddBill = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically handle the form submission
    console.log("Adding new bill...")
    setIsAddBillOpen(false)
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "due":
        return <AlertTriangle className="h-4 w-4 text-red-600" />
      case "upcoming":
        return <Clock className="h-4 w-4 text-yellow-600" />
      case "paid":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      default:
        return <Clock className="h-4 w-4" />
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "due":
        return <Badge variant="destructive">Due Now</Badge>
      case "upcoming":
        return <Badge variant="secondary">Upcoming</Badge>
      case "paid":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Paid
          </Badge>
        )
      default:
        return <Badge variant="secondary">{status}</Badge>
    }
  }

  const totalDue = bills
    .filter((bill) => bill.status === "due" || bill.status === "upcoming")
    .reduce((sum, bill) => sum + bill.amount, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Bills & EMI</h2>
          <p className="text-muted-foreground">Track your upcoming payments and EMIs</p>
        </div>
        <Dialog open={isAddBillOpen} onOpenChange={setIsAddBillOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add Bill
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] max-h-[90vh] overflow-y-auto bg-card border shadow-lg">
            <DialogHeader>
              <DialogTitle>Add New Bill</DialogTitle>
              <DialogDescription>Add a new recurring bill to track your payments.</DialogDescription>
            </DialogHeader>
            <form onSubmit={handleAddBill}>
              <div className="grid gap-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="bill-name">Name *</Label>
                  <Input id="bill-name" placeholder="Bill name" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bill-amount">Amount *</Label>
                  <Input id="bill-amount" type="number" step="0.01" placeholder="0.00" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bill-category">Category *</Label>
                  <Select required>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bill-due-date">Due Date *</Label>
                  <Input id="bill-due-date" type="date" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="frequency">Frequency</Label>
                  <Select defaultValue="monthly">
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="quarterly">Quarterly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="bill-notes">Notes</Label>
                  <Input id="bill-notes" placeholder="Optional notes" />
                </div>
                <div className="flex items-center space-x-2 pt-2">
                  <Switch id="autopay" />
                  <Label htmlFor="autopay">Enable Autopay</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <Switch id="recurring" defaultChecked />
                  <Label htmlFor="recurring">Recurring Bill</Label>
                </div>
              </div>
              <DialogFooter>
                <Button type="button" variant="outline" onClick={() => setIsAddBillOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">Add Bill</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Total Due</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-red-600">
              ${totalDue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Due This Week</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">2</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Paid This Month</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">1</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Upcoming Bills</CardTitle>
          <CardDescription>Your scheduled payments and EMIs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {bills.map((bill, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-4">
                  {getStatusIcon(bill.status)}
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">{bill.name}</p>
                      {bill.recurring && (
                        <Badge variant="outline" className="text-xs">
                          Recurring
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{bill.dueDate}</span>
                      <span>•</span>
                      <span>{bill.category}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <div className="font-semibold">${bill.amount.toFixed(2)}</div>
                    {getStatusBadge(bill.status)}
                  </div>
                  <Button size="sm" variant="outline">
                    {bill.status === "paid" ? "View" : "Pay"}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default BillsAndEmi
