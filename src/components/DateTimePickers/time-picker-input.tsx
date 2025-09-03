import React from 'react'
import { Period, TimePickerType } from './time-picker-utils'
import { Input } from '@/shadcn/ui/input'

export interface TimePickerInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  picker: 'hours' | 'minutes' | 'seconds'
  value: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export const TimePickerInput = ({ value, onChange, picker, ...props }: TimePickerInputProps) => {
  return (
    <Input
      id={picker}
      name={picker}
      className="text-center font-mono text-base tabular-nums caret-transparent"
      value={value}
      onChange={onChange}
      type="text"
      inputMode="numeric"
      {...props}
    />
  )
}
