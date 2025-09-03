"use client"

import * as React from "react"
import { Clock } from "lucide-react"
import { cn } from "@/shadcn/lib/utils"
import { Button } from "@/shadcn/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/shadcn/ui/popover"
import { Label } from "@/shadcn/ui/label"
import { Input } from "./input"

interface DurationPickerProps {
    className?: string
    label?: string
    value?: string // HH:mm:ss format
    onChange?: (time: string) => void
    isModal?: boolean
}

export function DurationPicker({ className, label, value, onChange, isModal = true }: DurationPickerProps) {
    // Initialize state with value prop if provided
    const [time, setTime] = React.useState(() => {
        if (value) {
            const [h, m, s] = value.split(":").map(Number)
            return { hour: h || 0, minute: m || 0, second: s || 0 }
        }
        return { hour: 0, minute: 0, second: 0 }
    })
    const [isOpen, setIsOpen] = React.useState(false)

    const formatHHMMSS = ({ hour, minute, second }: { hour: number; minute: number; second: number }) =>
        `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:${String(second).padStart(2, "0")}`

    const displayLabel = () => {
        const { hour, minute } = time
        const h = hour > 0 ? `${hour}h` : ""
        const m = minute > 0 ? `${minute}m` : ""
        return h || m ? `${h} ${m}`.trim() : "Pick duration"
    }

    // Update state when value prop changes, avoiding unnecessary onChange
    React.useEffect(() => {
        if (value) {
            const [h, m, s] = value.split(":").map(Number)
            setTime((prev) => {
                const newTime = { hour: h || 0, minute: m || 0, second: s || 0 }
                return formatHHMMSS(newTime) !== formatHHMMSS(prev) ? newTime : prev
            })
        }
    }, [value])

    // Call onChange only if the formatted time differs from the value prop
    React.useEffect(() => {
        const formatted = formatHHMMSS(time)
        if (formatted !== value) {
            onChange?.(formatted)
        }
    }, [time, value, onChange])

    const handleInputChange = (field: keyof typeof time, max: number) => (e: React.ChangeEvent<HTMLInputElement>) => {
        e.stopPropagation()
        const inputValue = e.target.value
        let value = inputValue === "" ? 0 : Number(inputValue)
        if (isNaN(value) || value < 0) value = 0
        if (value > max) value = max
        setTime((prev) => ({ ...prev, [field]: value }))
    }

    return (
        <div className="flex flex-col space-y-1">
            {label && <Label>{label}</Label>}
            <Popover open={isOpen} onOpenChange={setIsOpen} modal={isModal}>
                <PopoverTrigger asChild>
                    <Button
                        variant={"outline"}
                        className={cn(
                            "w-full justify-start text-left font-normal",
                            !value && "text-muted-foreground",
                            className
                        )}
                        onClick={() => setIsOpen(true)}
                    >
                        <Clock className="mr-2 h-4 w-4" />
                        {displayLabel()}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-full p-4 space-y-2 z-[999999]">
                    <div className="flex justify-between gap-2">
                        <div className="flex items-center gap-1 w-full">
                            <Input
                                type="number"
                                inputMode="numeric"
                                min={0}
                                max={23}
                                value={time.hour}
                                defaultValue="0"
                                onChange={handleInputChange("hour", 23)}
                                placeholder="00"
                            />
                            <span className="text-sm font-medium">H</span>
                        </div>
                        <div className="flex items-center gap-1 w-full">
                            <Input
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                min={0}
                                max={59}
                                value={time.minute}
                                defaultValue="0"
                                onChange={handleInputChange("minute", 59)}
                                placeholder="00"
                            />
                            <span className="text-sm font-medium">M</span>
                        </div>
                        <div className="flex items-center gap-1 w-full">
                            <Input
                                type="number"
                                pattern="[0-9]*"
                                inputMode="numeric"
                                min={0}
                                max={59}
                                value={time.second}
                                defaultValue="0"
                                onChange={handleInputChange("second", 59)}
                                placeholder="00"
                            />
                            <span className="text-sm font-medium">S</span>
                        </div>
                    </div>
                </PopoverContent>
            </Popover>
        </div>
    )
}