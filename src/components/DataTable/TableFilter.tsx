import React, {
  Attributes,
  FC,
  HtmlHTMLAttributes,
  ReactNode,
  SetStateAction,
  useEffect,
  useState,
} from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { Button } from '@/shadcn/ui/button'
import { CheckIcon, CirclePlusIcon } from 'lucide-react'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/shadcn/ui/command'
import { cn } from '@/shadcn/lib/utils'
import { Separator } from '@/shadcn/ui/separator'
import { Badge } from '@/shadcn/ui/badge'
import { Filters } from '@/types/MockData'

interface FilterBadgesProps {
  selectedValues: string[]
  options: { label: string; value: string }[]
  maxCount?: number
}

const FilterBadges: FC<FilterBadgesProps> = ({ selectedValues, options, maxCount = 2 }) => (
  <>
    <Separator orientation="vertical" className="mx-2 h-4" />
    <Badge variant="secondary" className="rounded-sm px-1 font-normal lg:hidden">
      {selectedValues.length}
    </Badge>
    <div className="hidden space-x-1 lg:flex">
      {selectedValues.length > maxCount ? (
        <Badge variant="secondary" className="rounded-sm bg-gray-200/50 px-1 font-normal">
          {selectedValues.length} selected
        </Badge>
      ) : (
        options
          .filter((option) => selectedValues.includes(option.value))
          .map((option) => (
            <Badge
              variant="secondary"
              key={option.value}
              className="rounded-sm bg-gray-200/50 px-1 font-normal"
            >
              {option.label}
            </Badge>
          ))
      )}
    </div>
  </>
)

interface Option {
  value: string
  label: string
  icon?: React.ElementType
}

interface FilterOptionsProps {
  options: Option[]
  params: {
    filters?: string[]
  }
  filter: string
  onSelectFilter: (value: string) => void
}

const FilterOptions: FC<FilterOptionsProps> = ({ options, params, filter, onSelectFilter }) => (
  <CommandList>
    <CommandEmpty>No filters found.</CommandEmpty>
    <CommandGroup>
      {options.map((option) => {
        const isSelected = params.filters?.includes(`${filter}:${option.value}`)
        return (
          <CommandItem key={option.value} value={option.value} onSelect={onSelectFilter}>
            <div
              className={cn(
                'mr-2 flex h-4 w-4 items-center justify-center rounded-sm border border-primary',
                isSelected ? 'bg-gray-900 text-white' : 'opacity-50 [&_svg]:invisible',
              )}
            >
              <CheckIcon className={cn('h-4 w-4')} />
            </div>
            {option.icon && <option.icon className="mr-2 h-4 w-4 text-muted-foreground" />}
            <span>{option.label}</span>
          </CommandItem>
        )
      })}
    </CommandGroup>
  </CommandList>
)

interface ClearFiltersProps {
  clearFilters: () => void
}

const ClearFilters: FC<ClearFiltersProps> = ({ clearFilters }) => (
  <>
    <CommandSeparator />
    <CommandGroup>
      <CommandItem onSelect={clearFilters} className="justify-center text-center">
        Clear filters
      </CommandItem>
    </CommandGroup>
  </>
)

// is params an object or string ? what is it
interface Params {
  filters: string[]
}

interface TableFilterProps {
  className?: string
  params: Params
  // setParams: (newParams: { [key: string]: any }) => void
  // setTimeDebounce: (debounceTime: number) => void
  
  // not the very best idea but idk what is this string or object
  setParams: React.Dispatch<SetStateAction<any>>
  setTimeDebounce: React.Dispatch<SetStateAction<number>>
  title: string
  filter: string
  options: Option[]
  maxCount?: number
}

const TableFilter: FC<TableFilterProps> = ({
  className,
  params,
  setParams,
  setTimeDebounce,
  title,
  filter,
  options,
  maxCount,
}) => {
  const [selectedValues, setSelectedValues] = useState<string[]>([])

  const onSelectFilter = (value: string) => {
    const newFilter = `${filter}:${value}`
    let filters = params?.filters ? [...params.filters] : []

    filters = filters.includes(newFilter)
      ? filters.filter((filter) => filter !== newFilter)
      : [...filters, newFilter]

    setTimeDebounce(50)
    setParams({ ...params, filters })
  }

  const clearFilters = () => {
    setSelectedValues([])
    setParams({
      ...params,
      filters: params.filters.filter((f) => !f.startsWith(`${filter}:`)),
    })
  }

  useEffect(() => {
    if (params.filters) {
      setSelectedValues(
        params.filters.filter((f) => f.startsWith(`${filter}:`)).map((f) => f.split(':')[1]),
      )
    }
  }, [params.filters, filter])

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className={cn(
            'w-full border-dashed border-gray-400 text-xs hover:bg-gray-200/50 md:w-auto',
            className,
          )}
        >
          <CirclePlusIcon className="mr-1 h-4 w-4" />
          <span>{title}</span>
          {selectedValues.length > 0 && (
            <FilterBadges selectedValues={selectedValues} options={options} maxCount={maxCount} />
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-2 md:w-[200px]" align="start">
        <Command>
          <CommandInput placeholder={title} className="h-8" />
          <FilterOptions
            options={options}
            params={params}
            filter={filter}
            onSelectFilter={onSelectFilter}
          />
          {selectedValues.length > 0 && <ClearFilters clearFilters={clearFilters} />}
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default TableFilter
