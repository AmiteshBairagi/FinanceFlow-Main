"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog/Dialog"
import { Badge } from "@/components/ui/badge/Badge"
import { Card, CardContent } from "@/components/ui/card/Card"
import { AlertTriangle, CreditCard, TrendingUp, Calendar, Target, DollarSign, Bell, Clock } from "lucide-react"

interface AllAlertsModalProps {
  isOpen: boolean
  onClose: () => void
}

export function AllAlertsModal({ isOpen, onClose }: AllAlertsModalProps) {
  const alerts = [
    {
      id: 1,
      type: "budget",
      title: "Budget Alert",
      message: "Entertainment budget 90% used",
      icon: AlertTriangle,
      color: "text-yellow-600",
      bgColor: "bg-yellow-50 dark:bg-yellow-950",
      priority: "high",
      time: "2 hours ago",
    },
    {
      id: 2,
      type: "bill",
      title: "Bill Due",
      message: "Credit card payment due in 3 days",
      icon: CreditCard,
      color: "text-blue-600",
      bgColor: "bg-blue-50 dark:bg-blue-950",
      priority: "medium",
      time: "1 day ago",
    },
    {
      id: 3,
      type: "goal",
      title: "Goal Progress",
      message: "Emergency fund 75% complete",
      icon: TrendingUp,
      color: "text-green-600",
      bgColor: "bg-green-50 dark:bg-green-950",
      priority: "low",
      time: "3 days ago",
    },
    {
      id: 4,
      type: "budget",
      title: "Budget Exceeded",
      message: "Food & Dining budget exceeded by $50",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-50 dark:bg-red-950",
      priority: "high",
      time: "5 hours ago",
    },
    {
      id: 5,
      type: "bill",
      title: "Subscription Renewal",
      message: "Netflix subscription renews tomorrow",
      icon: Calendar,
      color: "text-purple-600",
      bgColor: "bg-purple-50 dark:bg-purple-950",
      priority: "low",
      time: "1 day ago",
    },
    {
      id: 6,
      type: "goal",
      title: "Savings Milestone",
      message: "Vacation fund reached $2,000 milestone",
      icon: Target,
      color: "text-indigo-600",
      bgColor: "bg-indigo-50 dark:bg-indigo-950",
      priority: "low",
      time: "1 week ago",
    },
    {
      id: 7,
      type: "transaction",
      title: "Large Transaction",
      message: "Unusual spending detected: $500 at electronics store",
      icon: DollarSign,
      color: "text-orange-600",
      bgColor: "bg-orange-50 dark:bg-orange-950",
      priority: "medium",
      time: "2 days ago",
    },
    {
      id: 8,
      type: "reminder",
      title: "Monthly Review",
      message: "Time for your monthly budget review",
      icon: Bell,
      color: "text-teal-600",
      bgColor: "bg-teal-50 dark:bg-teal-950",
      priority: "medium",
      time: "3 days ago",
    },
  ]

  const getPriorityBadge = (priority: string) => {
    switch (priority) {
      case "high":
        return <Badge variant="destructive">High</Badge>
      case "medium":
        return (
          <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
            Medium
          </Badge>
        )
      case "low":
        return (
          <Badge variant="secondary" className="bg-green-100 text-green-800">
            Low
          </Badge>
        )
      default:
        return <Badge variant="secondary">Normal</Badge>
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto bg-card border shadow-lg">
        <DialogHeader>
          <DialogTitle>All Alerts & Reminders</DialogTitle>
        </DialogHeader>
        <div className="space-y-3">
          {alerts.map((alert) => {
            const IconComponent = alert.icon
            return (
              <Card key={alert.id} className="hover:shadow-sm transition-shadow">
                <CardContent className="p-4">
                  <div className={`flex items-center gap-3 p-3 rounded-lg ${alert.bgColor}`}>
                    <IconComponent className={`h-5 w-5 ${alert.color} flex-shrink-0`} />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-1">
                        <p className="text-sm font-medium truncate">{alert.title}</p>
                        {getPriorityBadge(alert.priority)}
                      </div>
                      <p className="text-xs text-muted-foreground mb-2">{alert.message}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3 w-3" />
                        <span>{alert.time}</span>
                      </div>
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
