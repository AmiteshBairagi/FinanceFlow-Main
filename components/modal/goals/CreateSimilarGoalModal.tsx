"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog/Dialog"
import { Button } from "@/components/ui/button/Button"
import { Input } from "@/components/ui/input/Input"
import { Label } from "@/components/ui/label/Label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/Select"
import { Textarea } from "@/components/ui/textarea/Textarea"
import { CalendarIcon, Target } from "lucide-react"
import { Calendar } from "@/components/ui/calendar/Calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover/Popover"
import { format } from "date-fns"
import { cn } from "@/lib/utils"

interface CreateSimilarGoalModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  goal: any
}

export function CreateSimilarGoalModal({ open, onOpenChange, goal }: CreateSimilarGoalModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    targetAmount: "",
    currentAmount: "0",
    category: "",
    deadline: null,
    description: "",
  })

  // Pre-populate form with similar goal data when modal opens
  useEffect(() => {
    if (goal && open) {
      setFormData({
        name: `${goal.name} (Copy)`,
        targetAmount: goal.target.toString(),
        currentAmount: "0",
        category: goal.category,
        deadline: null, // Reset deadline for new goal
        description: `Similar to ${goal.name}`,
      })
    }
  }, [goal, open])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically save the new goal
    console.log("Creating similar goal:", formData)

    // Reset form and close modal
    setFormData({
      name: "",
      targetAmount: "",
      currentAmount: "0",
      category: "",
      deadline: null,
      description: "",
    })
    onOpenChange(false)
  }

  const categories = [
    "Emergency",
    "Technology",
    "Travel",
    "Transportation",
    "Health",
    "Personal",
    "Entertainment",
    "Education",
    "Investment",
    "Other",
  ]

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto bg-card border shadow-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Target className="h-5 w-5" />
            Create Similar Goal
          </DialogTitle>
          <DialogDescription>
            Create a new goal based on "{goal?.name}". Modify the details as needed.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Goal Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              placeholder="Enter goal name"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="targetAmount">Target Amount *</Label>
              <Input
                id="targetAmount"
                type="number"
                value={formData.targetAmount}
                onChange={(e) => setFormData({ ...formData, targetAmount: e.target.value })}
                placeholder="0"
                min="1"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="currentAmount">Current Amount</Label>
              <Input
                id="currentAmount"
                type="number"
                value={formData.currentAmount}
                onChange={(e) => setFormData({ ...formData, currentAmount: e.target.value })}
                placeholder="0"
                min="0"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
              required
            >
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
            <Label>Target Deadline *</Label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !formData.deadline && "text-muted-foreground",
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {formData.deadline ? format(formData.deadline, "PPP") : "Pick a date"}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={formData.deadline}
                  onSelect={(date) => setFormData({ ...formData, deadline: date })}
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
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Add any notes about this goal..."
              rows={3}
            />
          </div>

          <div className="flex gap-3 pt-4">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Add Goal
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
