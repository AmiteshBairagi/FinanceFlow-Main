"use client"

import type React from "react"

import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog/Dialog"
import { Button } from "@/components/ui/button/Button"
import { Input } from "@/components/ui/input/Input"
import { Label } from "@/components/ui/label/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/Select"
import { Textarea } from "@/components/ui/textarea/Textarea"
import { Calendar } from "@/components/ui/calendar/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/Popover"
import { CalendarIcon, Target } from "lucide-react"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CreateGoalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CreateGoalModal({ open, onOpenChange }: CreateGoalModalProps) {
  const [goalName, setGoalName] = useState("")
  const [targetAmount, setTargetAmount] = useState("")
  const [category, setCategory] = useState("")
  const [deadline, setDeadline] = useState<Date>()
  const [description, setDescription] = useState("")
  const [currentAmount, setCurrentAmount] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Here you would typically save the goal data
    console.log({
      goalName,
      targetAmount: Number.parseFloat(targetAmount),
      category,
      deadline,
      description,
      currentAmount: Number.parseFloat(currentAmount) || 0,
    })

    // Reset form
    setGoalName("")
    setTargetAmount("")
    setCategory("")
    setDeadline(undefined)
    setDescription("")
    setCurrentAmount("")

    // Close modal
    onOpenChange(false)
  }

  const categories = [
    "Emergency",
    "Technology",
    "Travel",
    "Transportation",
    "Health",
    "Education",
    "Entertainment",
    "Personal",
    "Investment",
    "Home",
    "Other",
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Create New Goal
          </DialogTitle>
          <DialogDescription>Set up a new financial goal to track your savings progress.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4">
            <div className="space-y-2">
              <Label htmlFor="goalName">Goal Name *</Label>
              <Input
                id="goalName"
                placeholder="e.g., Emergency Fund, New Car, Vacation"
                value={goalName}
                onChange={(e) => setGoalName(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="targetAmount">Target Amount *</Label>
                <Input
                  id="targetAmount"
                  type="number"
                  placeholder="0.00"
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(e.target.value)}
                  required
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="currentAmount">Current Amount</Label>
                <Input
                  id="currentAmount"
                  type="number"
                  placeholder="0.00"
                  value={currentAmount}
                  onChange={(e) => setCurrentAmount(e.target.value)}
                  min="0"
                  step="0.01"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category">Category *</Label>
              <Select value={category} onValueChange={setCategory} required>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Target Deadline *</Label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className={cn("w-full justify-start text-left font-normal", !deadline && "text-muted-foreground")}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {deadline ? format(deadline, "PPP") : "Pick a date"}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={deadline}
                    onSelect={setDeadline}
                    disabled={(date) => date < new Date()}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Description (Optional)</Label>
              <Textarea
                id="description"
                placeholder="Add any notes or details about this goal..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={3}
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={!goalName || !targetAmount || !category || !deadline}>
              Create Goal
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
