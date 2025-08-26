"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card/Card"
import { Button } from "@/components/ui/button/Button"
import { Progress } from "@/components/ui/progress/Progress"
import { Badge } from "@/components/ui/badge/Badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs/Tabs"
import { Plus, Target, Calendar, DollarSign, CheckCircle, Trophy } from "lucide-react"
import { EditGoalModal } from "../modal/goals/EditGoalModal"
import { CreateSimilarGoalModal } from "../modal/goals/CreateSimilarGoalModal"
import { useState } from "react"
import { CreateGoalModal } from "../modal/goals/CreateGoalModal"

const Goals = () => {
  const [isCreateGoalModalOpen, setIsCreateGoalModalOpen] = useState(false)
  const [isEditGoalModalOpen, setIsEditGoalModalOpen] = useState(false)
  const [isCreateSimilarModalOpen, setIsCreateSimilarModalOpen] = useState(false) // Added state for create similar goal modal
  const [selectedGoal, setSelectedGoal] = useState(null)

  const handleEditGoal = (goal) => {
    setSelectedGoal(goal)
    setIsEditGoalModalOpen(true)
  }

  const handleCreateSimilarGoal = (goal) => {
    // Added handler for create similar goal
    setSelectedGoal(goal)
    setIsCreateSimilarModalOpen(true)
  }

  const calculateTimeTaken = (completedDate, startDate = null) => {
    const completed = new Date(completedDate)
    // If no start date provided, estimate based on typical goal duration
    const start = startDate
      ? new Date(startDate)
      : new Date(completed.getTime() - (Math.random() * 365 + 180) * 24 * 60 * 60 * 1000)

    const diffTime = Math.abs(completed - start)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)
    const days = diffDays % 30

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`
    } else if (months > 0) {
      return `${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`
    } else {
      return `${days} day${days !== 1 ? "s" : ""}`
    }
  }

  const calculateTimeElapsed = (startDate) => {
    const start = new Date(startDate)
    const now = new Date()

    const diffTime = Math.abs(now - start)
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24))

    const years = Math.floor(diffDays / 365)
    const months = Math.floor((diffDays % 365) / 30)
    const days = diffDays % 30

    if (years > 0) {
      return `${years} year${years > 1 ? "s" : ""}, ${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`
    } else if (months > 0) {
      return `${months} month${months !== 1 ? "s" : ""}, ${days} day${days !== 1 ? "s" : ""}`
    } else {
      return `${days} day${days !== 1 ? "s" : ""}`
    }
  }

  const activeGoals = [
    {
      name: "Emergency Fund",
      target: 10000,
      current: 7500,
      deadline: "2024-12-31",
      startDate: "2023-08-15", // Added start dates for active goals
      category: "Emergency",
      color: "bg-red-500",
    },
    {
      name: "New Laptop",
      target: 2500,
      current: 1800,
      deadline: "2024-06-30",
      startDate: "2023-12-01",
      category: "Technology",
      color: "bg-blue-500",
    },
    {
      name: "Vacation Fund",
      target: 5000,
      current: 2200,
      deadline: "2024-08-15",
      startDate: "2024-01-10",
      category: "Travel",
      color: "bg-green-500",
    },
    {
      name: "Car Down Payment",
      target: 15000,
      current: 8500,
      deadline: "2025-03-01",
      startDate: "2023-06-20",
      category: "Transportation",
      color: "bg-purple-500",
    },
  ]

  const achievedGoals = [
    {
      name: "iPhone 15 Pro",
      target: 1200,
      current: 1200,
      completedDate: "2024-01-15",
      startDate: "2023-05-10", // Added start dates for accurate calculation
      category: "Technology",
      color: "bg-blue-500",
    },
    {
      name: "Home Gym Equipment",
      target: 3500,
      current: 3500,
      completedDate: "2023-11-20",
      startDate: "2022-11-15",
      category: "Health",
      color: "bg-orange-500",
    },
    {
      name: "Wedding Ring",
      target: 2800,
      current: 2800,
      completedDate: "2023-09-10",
      startDate: "2023-03-05",
      category: "Personal",
      color: "bg-pink-500",
    },
    {
      name: "Gaming Setup",
      target: 4200,
      current: 4200,
      completedDate: "2023-07-05",
      startDate: "2022-09-01",
      category: "Entertainment",
      color: "bg-indigo-500",
    },
  ]

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Financial Goals</h2>
          <p className="text-muted-foreground">Track your savings goals and progress</p>
        </div>
        <Button onClick={() => setIsCreateGoalModalOpen(true)}>
          <Plus className="h-4 w-4 mr-2" />
          Create Goal
        </Button>
      </div>
      <Tabs defaultValue="active" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="active" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Active Goals ({activeGoals.length})
          </TabsTrigger>
          <TabsTrigger value="achieved" className="flex items-center gap-2">
            <Trophy className="h-4 w-4" />
            Achieved Goals ({achievedGoals.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {activeGoals.map((goal, index) => {
              const percentage = (goal.current / goal.target) * 100
              const remaining = goal.target - goal.current

              return (
                <Card key={index}>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-muted-foreground" />
                        <CardTitle className="text-lg">{goal.name}</CardTitle>
                      </div>
                      <Badge variant="secondary">{goal.category}</Badge>
                    </div>
                    <CardDescription className="flex items-center gap-4">
                      <span className="flex items-center gap-1">
                        <Calendar className="h-4 w-4" />
                        {goal.deadline}
                      </span>
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Progress</span>
                      <span className="text-sm font-medium">
                        ${goal.current.toLocaleString()} / ${goal.target.toLocaleString()}
                      </span>
                    </div>
                    <Progress value={percentage} className="h-3" />
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">{percentage.toFixed(1)}% complete</span>
                      <span className="font-medium text-primary">${remaining.toLocaleString()} remaining</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Time elapsed:</span>
                      <span className="font-medium text-blue-600">{calculateTimeElapsed(goal.startDate)}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button size="sm" variant="outline" className="flex-1 bg-transparent">
                        <DollarSign className="h-4 w-4 mr-1" />
                        Add Money
                      </Button>
                      <Button size="sm" variant="outline" onClick={() => handleEditGoal(goal)}>
                        Edit
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>
        </TabsContent>

        <TabsContent value="achieved" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            {achievedGoals.map((goal, index) => (
              <Card key={index} className="border-green-200 bg-green-50/50 dark:border-green-800 dark:bg-green-950/20">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <CardTitle className="text-lg">{goal.name}</CardTitle>
                    </div>
                    <Badge
                      variant="secondary"
                      className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                    >
                      {goal.category}
                    </Badge>
                  </div>
                  <CardDescription className="flex items-center gap-4">
                    <span className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      Completed: {goal.completedDate}
                    </span>
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Goal Amount</span>
                    <span className="text-sm font-medium text-green-600">${goal.target.toLocaleString()}</span>
                  </div>
                  <Progress value={100} className="h-3" />
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-green-600 font-medium">✓ Goal Achieved!</span>
                    <span className="text-muted-foreground">
                      Time taken: {calculateTimeTaken(goal.completedDate, goal.startDate)}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="flex-1 bg-transparent"
                      onClick={() => handleCreateSimilarGoal(goal)}
                    >
                      <Target className="h-4 w-4 mr-1" />
                      Create Similar Goal
                    </Button>
                    <Button size="sm" variant="outline">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
      <Card>
        <CardHeader>
          <CardTitle>Goals Summary</CardTitle>
          <CardDescription>Your overall savings progress and achievements</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-5">
            <div className="text-center">
              <div className="text-2xl font-bold">{activeGoals.length}</div>
              <p className="text-sm text-muted-foreground">Active Goals</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">{achievedGoals.length}</div>
              <p className="text-sm text-muted-foreground">Achieved Goals</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">$20,000</div>
              <p className="text-sm text-muted-foreground">Currently Saved</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">$11,700</div>
              <p className="text-sm text-muted-foreground">Total Achieved</p>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-orange-600">61.5%</div>
              <p className="text-sm text-muted-foreground">Average Progress</p>
            </div>
          </div>
        </CardContent>
      </Card>
      <CreateGoalModal open={isCreateGoalModalOpen} onOpenChange={setIsCreateGoalModalOpen} />
      <EditGoalModal open={isEditGoalModalOpen} onOpenChange={setIsEditGoalModalOpen} goal={selectedGoal} />
      <CreateSimilarGoalModal
        open={isCreateSimilarModalOpen}
        onOpenChange={setIsCreateSimilarModalOpen}
        goal={selectedGoal}
      />{" "}
      {/* Added create similar goal modal */}
    </div>
  )
}


export default Goals
