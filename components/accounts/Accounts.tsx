"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/Card"
import { Button } from "@/components/ui/button/Button"
import { Badge } from "@/components/ui/badge/Badge"
import { Plus, CreditCard, Wallet, Building, ArrowRightLeft } from "lucide-react"

const Accounts = () =>  {
  const accounts = [
    {
      name: "Primary Checking",
      type: "Checking",
      balance: 5420.5,
      bank: "Chase Bank",
      icon: Building,
      color: "bg-blue-500",
    },
    {
      name: "Savings Account",
      type: "Savings",
      balance: 12500.0,
      bank: "Chase Bank",
      icon: Building,
      color: "bg-green-500",
    },
    {
      name: "Credit Card",
      type: "Credit",
      balance: -1250.75,
      bank: "American Express",
      icon: CreditCard,
      color: "bg-red-500",
    },
    {
      name: "Cash Wallet",
      type: "Cash",
      balance: 150.0,
      bank: "Physical Cash",
      icon: Wallet,
      color: "bg-yellow-500",
    },
  ]

  const totalBalance = accounts.reduce((sum, account) => sum + account.balance, 0)

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Accounts</h2>
          <p className="text-muted-foreground">Manage your financial accounts</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <ArrowRightLeft className="h-4 w-4 mr-2" />
            Transfer
          </Button>
          <Button>
            <Plus className="h-4 w-4 mr-2" />
            Add Account
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Total Net Worth</CardTitle>
          <CardDescription>Combined balance across all accounts</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="text-3xl font-bold">
            ${totalBalance.toLocaleString("en-US", { minimumFractionDigits: 2 })}
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {accounts.map((account, index) => {
          const Icon = account.icon
          const isNegative = account.balance < 0

          return (
            <Card key={index}>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`h-10 w-10 rounded-full ${account.color} flex items-center justify-center`}>
                      <Icon className="h-5 w-5 text-white" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{account.name}</CardTitle>
                      <CardDescription>{account.bank}</CardDescription>
                    </div>
                  </div>
                  <Badge variant="secondary">{account.type}</Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className={`text-2xl font-bold ${isNegative ? "text-red-600" : "text-green-600"}`}>
                  {isNegative ? "-" : ""}$
                  {Math.abs(account.balance).toLocaleString("en-US", { minimumFractionDigits: 2 })}
                </div>
                <div className="flex gap-2 mt-4">
                  <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                    View Details
                  </Button>
                  <Button size="sm" variant="outline">
                    Edit
                  </Button>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}

export default Accounts