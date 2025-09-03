import { useState } from 'react'
import { CalendarIcon, Check } from 'lucide-react'
import { Calendar } from '@/shadcn/ui/calendar'
import { Button } from '@/shadcn/ui/button'
import { format } from 'date-fns'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import { Input, InputWithLabel } from '@/shadcn/ui/input'
import { cn } from '@/shadcn/lib/utils'
import { Label } from '@/shadcn/ui/label'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/shadcn/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { MultiSelect } from '@/shadcn/ui/multi-select'

const discountOn = [
  { id: 1, name: 'All Products' },
  { id: 2, name: 'Category' },
  { id: 3, name: 'Sub-Category' },
  { id: 4, name: 'Child-Category' },
  { id: 5, name: 'Product' },
  { id: 6, name: 'Shipping' },
]

const categories = [
  { label: 'Home & Living', value: 'Home & Living' },
  { label: 'Fashion', value: 'Fashion' },
  { label: 'Electronics', value: 'Electronics' },
  { label: 'Personal Care & Beauty', value: 'Personal Care & Beauty' },
  { label: 'Kids & Babies', value: 'Kids & Babies' },
  { label: 'Arts & Crafts', value: 'Arts & Crafts' },
  { label: 'Health & Wellnessg', value: 'Health & Wellnessg' },
]

const DynamicFilterRender = ({ value }: { value: string }) => {
  switch (value.toLowerCase()) {
    case 'category':
      return <CustomPopOverMenuForFilters filterList={categories} label="Category" />
    case 'sub-category':
      return <CustomPopOverMenuForFilters filterList={categories} label="Sub-Category" />

    case 'child-category':
      return <CustomPopOverMenuForFilters filterList={categories} label="Child-Category" />

    case 'product':
      return <CustomPopOverMenuForFilters filterList={categories} label="Product" />
  }
}

const CustomPopOverMenuForFilters = ({ filterList, label }: { filterList: any; label: string }) => {
  const [selectedColumns, setSelectedColumns] = useState<string[]>(
    filterList.map((item: { label: string; value: string }) => item.value),
  )
  return (
    <div>
      <MultiSelect
        options={filterList}
        onValueChange={setSelectedColumns}
        placeholder={label}
        maxCount={2}
        className="p-0 sm:max-w-fit"
        showBadge={false}
      />
      {/* <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className="block">
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-[200px] justify-between text-primary"
          >
            {valueInner ? valueInner : 'Select an option'}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[300px]" align="start">
          <Command>
            <CommandInput placeholder="Search category" className="h-9" />
            <CommandList onChange={() => console.log('changed.')}>
              <CommandEmpty>No category found.</CommandEmpty>
              <CommandGroup>
                {filterList.map((item: any, index: number) => (
                  <CommandItem
                    key={`discount-on-${item.id}`}
                    value={item.name}
                    onSelect={(currentValue) => {
                      setValueInner(currentValue)
                      setOpen(false)
                    }}
                    className=" text-sm"
                  >
                    {item.name}
                    <Check
                      className={cn(
                        'ml-auto',
                        valueInner === item.name ? 'opacity-100' : 'opacity-0',
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover> */}
    </div>
  )
}

const CouponManage = () => {
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState('')

  return (
    <div className="w-full space-y-2 border p-4">
      <InputWithLabel label="Coupon Title" />
      <InputWithLabel label="Coupon Code" />
      {/* DRY */}
      <div>
        <Label>Discount On</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild className="block">
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full text-primary"
            >
              {value ? discountOn.find((item) => item.name === value)?.name : 'Select an option'}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="h-[200px]" align="start">
            <Command>
              <CommandInput placeholder="Search category" className="h-9" />
              <CommandList onChange={() => console.log('changed.')}>
                <CommandEmpty>No category found.</CommandEmpty>
                <CommandGroup>
                  {discountOn.map((item, index) => (
                    <CommandItem
                      key={`discount-on-${item.id}`}
                      value={item.name}
                      onSelect={(currentValue) => {
                        setValue(currentValue)
                        setOpen(false)
                      }}
                      className="text-sm"
                    >
                      {item.name}
                      <Check
                        className={cn('ml-auto', value === item.name ? 'opacity-100' : 'opacity-0')}
                      />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
      {value.length !== 0 && <DynamicFilterRender value={value} />}
      <InputWithLabel label="Discount" />
      {/* DRY */}
      <div>
        <Label>Coupon Type</Label>
        <DropdownMenu>
          <DropdownMenuTrigger className="block w-full">
            <Button variant="ghost" className="w-full border shadow-1">
              Select Type
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>Percentage</DropdownMenuItem>
            <DropdownMenuItem>Amount</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex flex-col gap-1">
        <Label>Expire Date</Label>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={'outline'}
              className={cn(
                'w-[280px] justify-start text-left font-normal',
                !date && 'text-muted-foreground',
              )}
            >
              <CalendarIcon className="mr-2 h-4 w-4" />
              {date ? format(date, 'PPP') : <span>Pick a date</span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
          </PopoverContent>
        </Popover>
      </div>
      <div>
        <Label>Status</Label>
        <DropdownMenu>
          <DropdownMenuTrigger className="block w-full">
            <Button variant="ghost" className="w-full border shadow-1">
              Select status
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-full">
            <DropdownMenuItem>Publish</DropdownMenuItem>
            <DropdownMenuItem>Draft</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
export default CouponManage
