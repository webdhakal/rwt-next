import * as React from 'react'
import { TimePickerInput } from './time-picker-input'
import { Label } from '@/shadcn/ui/label'
import InputError from '../InputError'

export type TimePickerProps = {
  label: string
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  error: string | undefined
}
export function TimePicker({ label, value, onChange, error }: TimePickerProps) {
  const [time, setTime] = React.useState(() => {
    const [h, m, s] = value?.split(':')
    return {
      hours: h,
      minutes: m,
      seconds: s,
    }
  })
  React.useEffect(() => {
    const { hours, minutes, seconds } = time
    const formatted = `${hours}:${minutes}:${seconds}`
    onChange({ target: { value: formatted } } as React.ChangeEvent<HTMLInputElement>)
  }, [time])

  return (
    <div>
      <label className="mb-2 block w-full text-sm font-bold text-muted-foreground">{label}</label>
      <div className="flex items-end gap-2">
        <div className="grid w-full gap-1 text-center">
          <Label htmlFor="hours" className="text-xs">
            Hours
          </Label>
          <TimePickerInput
            picker="hours"
            value={time.hours}
            onChange={(e) => setTime((prev) => ({ ...prev, hours: e.target.value }))}
          />
        </div>

        <div className="grid w-full gap-1 text-center">
          <Label htmlFor="minutes" className="text-xs">
            Minutes
          </Label>
          <TimePickerInput
            picker="minutes"
            value={time.minutes}
            onChange={(e) => setTime((prev) => ({ ...prev, minutes: e.target.value }))}
          />
        </div>

        <div className="grid w-full gap-1 text-center">
          <Label htmlFor="seconds" className="text-xs">
            Seconds
          </Label>
          <TimePickerInput
            picker="seconds"
            value={time.seconds}
            onChange={(e) => setTime((prev) => ({ ...prev, seconds: e.target.value }))}
          />
        </div>
        {error && <InputError message={error} />}
      </div>
    </div>
  )
}
