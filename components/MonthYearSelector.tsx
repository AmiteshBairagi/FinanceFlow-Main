"use client"

import { useState } from "react"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select/Select"
import { Calendar } from "lucide-react"

interface MonthYearSelectorProps {
  onMonthYearChange?: (month: number, year: number) => void
}

export function MonthYearSelector({ onMonthYearChange }: MonthYearSelectorProps) {
  const currentDate = new Date()
  const currentMonth = currentDate.getMonth()
  const currentYear = currentDate.getFullYear()

  const [selectedMonth, setSelectedMonth] = useState(currentMonth)
  const [selectedYear, setSelectedYear] = useState(currentYear)

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

  // Generate years from 2020 to current year + 1
  const years = Array.from({ length: currentYear - 2019 }, (_, i) => 2020 + i)

  const handleMonthChange = (month: string) => {
    const monthIndex = Number.parseInt(month)
    setSelectedMonth(monthIndex)
    onMonthYearChange?.(monthIndex, selectedYear)
  }

  const handleYearChange = (year: string) => {
    const yearValue = Number.parseInt(year)
    setSelectedYear(yearValue)
    onMonthYearChange?.(selectedMonth, yearValue)
  }

  return (
    <div className="flex items-center gap-2">
      <Calendar className="h-4 w-4 text-muted-foreground" />
      <Select value={selectedMonth.toString()} onValueChange={handleMonthChange}>
        <SelectTrigger className="w-[130px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {months.map((month, index) => (
            <SelectItem key={index} value={index.toString()}>
              {month}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <Select value={selectedYear.toString()} onValueChange={handleYearChange}>
        <SelectTrigger className="w-[80px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          {years.map((year) => (
            <SelectItem key={year} value={year.toString()}>
              {year}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
