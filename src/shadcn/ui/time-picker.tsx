"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/shadcn/lib/utils"
import { Button } from "@/shadcn/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover"
import { Label } from "@/shadcn/ui/label"

interface TimePickerProps {
  className?: string
  label?: string
  value?: string
  onChange?: (time: string | null) => void
}

export function TimePicker({ className, label, value, onChange }: TimePickerProps) {
  const [hour, setHour] = React.useState<string>("12")
  const [minute, setMinute] = React.useState<string>("00")
  const [ampm, setAmpm] = React.useState<string>("AM")

  const handleSelect = () => {
    const formatted = `${hour}:${minute} ${ampm}`
    onChange?.(formatted)
  }

  React.useEffect(() => {
    handleSelect()
  }, [hour, minute, ampm])

  return (
    <div className="flex flex-col space-y-1">
      {label && <Label>{label}</Label>}
      <Popover>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[240px] justify-start text-left font-normal",
              !value && "text-muted-foreground",
              className
            )}
          >
            <Clock className="mr-2 h-4 w-4" />
            {value ?? "Pick a time"}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[240px] p-4 space-y-2">
          <div className="flex justify-between gap-2">
            <select
              className="w-full border rounded p-1 bg-background"
              value={hour}
              onChange={(e) => setHour(e.target.value)}
            >
              {Array.from({ length: 12 }, (_, i) => {
                const h = String(i + 1).padStart(2, "0")
                return (
                  <option key={h} value={h}>
                    {h}
                  </option>
                )
              })}
            </select>
            <select
              className="w-full border rounded p-1 bg-background"
              value={minute}
              onChange={(e) => setMinute(e.target.value)}
            >
              {["00", "15", "30", "45"].map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
            <select
              className="w-full border rounded p-1 bg-background"
              value={ampm}
              onChange={(e) => setAmpm(e.target.value)}
            >
              <option value="AM">AM</option>
              <option value="PM">PM</option>
            </select>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
