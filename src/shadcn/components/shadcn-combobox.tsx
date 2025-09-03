import { SetStateAction } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover'
import { Button } from '../ui/button'
import { Check, ChevronsUpDown } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '../ui/command'
import { cn } from '../lib/utils'
import { Label } from '../ui/label'

function ShadcnCombobox({
  placeholder,
  items,
  className,
  label,
  required = false,
  comboRef,
  state,
  setState,
}: {
  placeholder: string
  items: string[]
  className?: string
  label?: string
  required?: boolean
  comboRef?: React.MutableRefObject<string>
  state: string
  setState: React.Dispatch<SetStateAction<string>>
}) {
  const handleSelect = (item: string) => {
    setState(item)
    if (comboRef) {
      comboRef.current = item
    }
  }

  return (
    <div className={cn(className)}>
      {label && (
        <Label className={cn('text-slate-500', required && 'required-field')}>{label}</Label>
      )}
      <div className="mt-1">
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" role="combobox" className="w-full justify-between">
              {state || placeholder}
              <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="z-9999 p-0">
            <Command>
              <CommandInput placeholder="Search..." className="h-9" />
              <CommandList className="max-h-48 overflow-y-auto">
                <CommandEmpty>No items found.</CommandEmpty>
                <CommandGroup>
                  {items.map((item) => (
                    <CommandItem
                      key={item}
                      onSelect={() => handleSelect(item)}
                      className="cursor-pointer"
                    >
                      {item}
                      <Check
                        className={cn(
                          'ml-auto transition-opacity',
                          state === item ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  )
}

export default ShadcnCombobox
