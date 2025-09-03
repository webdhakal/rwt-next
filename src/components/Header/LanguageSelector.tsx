import React from 'react'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/shadcn/ui/select'

const LanguageSelector = () => {
  return (
    <>
      <Select defaultValue="en">
        <SelectTrigger className="w-[100px]">
          <SelectValue placeholder="Languages" />
        </SelectTrigger>
        <SelectContent align="end">
          <SelectGroup>
            <SelectLabel>Languages</SelectLabel>
            <SelectItem value="np">Nepali</SelectItem>
            <SelectItem value="en">English</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </>
  )
}

export default LanguageSelector
