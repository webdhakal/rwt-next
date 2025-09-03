import { cn } from '@/shadcn/lib/utils'
import { Button, ButtonProps } from '@/shadcn/ui/button'
import { ArrowDownIcon, ArrowUpIcon, ChevronsUpDownIcon } from 'lucide-react'
import { FC } from 'react'

interface SortIconProps {
  sort: 'asc' | 'desc' | null
}

const SortIcon: FC<SortIconProps> = ({ sort }) => {
  if (sort === 'desc') return <ArrowDownIcon className="ml-2 h-3.5 w-3.5" />
  if (sort === 'asc') return <ArrowUpIcon className="ml-2 h-3.5 w-3.5" />
  return <ChevronsUpDownIcon className="ml-2 h-4 w-4" />
}

interface TableSortHeaderProps extends ButtonProps {
  className?: string // Optional className for the container div
  title: string // Title of the column
  sort: 'asc' | 'desc' | null // Sorting state
}

const TableSortHeader: FC<TableSortHeaderProps> = ({ className, title, sort, ...props }) => {
  return (
    <div className={cn('flex items-center space-x-2', className)}>
      <Button
        variant="ghost"
        size="sm"
        className="-ml-0.5 flex h-8 items-center border-none hover:bg-gray-200 px-1"
        {...props}
      >
        <span>{title}</span>
        <SortIcon sort={sort} />
      </Button>
    </div>
  )
}

export default TableSortHeader
