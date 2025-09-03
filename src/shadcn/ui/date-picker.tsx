"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/shadcn/lib/utils"
import { Button } from "@/shadcn/ui/button"
import { Calendar } from "@/shadcn/ui/calendar"
import { Label } from "@/shadcn/ui/label"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/shadcn/ui/popover"

interface DatePickerProps {
    className?: string
    value?: string
    label?: string
    onChange?: (date: Date | null) => void;
    isModal?: boolean;
}

export function DatePicker({ className, onChange, label, value, isModal = true }: DatePickerProps) {
    const [date, setDate] = React.useState<Date>()

    return (
        <div className="flex flex-col space-y-1">
            {label && (<Label>{label}</Label>)}
            <Popover modal={isModal}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-[240px] justify-start text-left font-normal",
                            !date && "text-muted-foreground",
                            className
                        )}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {value ? value : "Pick a date"}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="center">
                    <Calendar
                        mode="single"
                        selected={date}
                        onSelect={(date) => {
                            setDate(date)
                            if (date) {
                                const formatted = format(date, "yyyy-MM-dd HH:mm:ss")
                                onChange?.(formatted)
                            } else {
                                onChange?.(null)
                            }
                        }}
                        initialFocus
                    />
                </PopoverContent>
            </Popover>
        </div>
    )
}
