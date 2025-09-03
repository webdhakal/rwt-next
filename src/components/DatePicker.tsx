import { useState } from 'react'
import { format } from 'date-fns'
import { CalendarIcon } from 'lucide-react'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { Button } from '@/shadcn/ui/button'
import { cn } from '@/shadcn/lib/utils'
import { Calendar } from '@/shadcn/ui/calendar'
import { Label } from '@/shadcn/ui/label'

export function DatePicker({ label }: { label?: string }) {
  const [date, setDate] = useState<Date>()

  return (
    <div className="w-full">
      <Popover>
        <PopoverTrigger className="w-full">
          {label && <Label className="mb-2 flex w-full text-slate-500">{label}</Label>}
          <Button
            variant="outline"
            className={cn(
              'w-full justify-start text-left font-normal',
              !date && 'text-muted-foreground',
            )}
          >
            <CalendarIcon />
            {date ? format(date, 'PPP') : <span>Pick a date</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0" align="start">
          <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
        </PopoverContent>
      </Popover>
    </div>
  )
}
