import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/shadcn/ui/table'
import TableSortHeader from '@/components/DataTable/TableSortHeader'
import TablePagination from '@/components/DataTable/TablePagination'
import TableToolbar from '@/components/DataTable/TableToolbar'
import TableFilter from '@/components/DataTable/TableFilter'
import { useDebouncedSearch } from '@/hooks/useDebouncedSearch'
import { useSorting } from '@/hooks/useSorting'
import TableAction from '@/components/DataTable/TableAction'
import { Input } from '@/shadcn/ui/input'
import { FC, ReactNode, useState } from 'react'
import { Button } from '@/shadcn/ui/button'
import { ChevronDown, Ellipsis, Plus, PlusCircle } from 'lucide-react'
import { MultiSelect } from '@/shadcn/ui/multi-select'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import { Checkbox } from '@/shadcn/ui/checkbox'
import { cn } from '@/shadcn/lib/utils'
import { DataTableProps, SearchInputProps, WithID } from '@/types/MockData'
import { Sheet, SheetContent, SheetTrigger } from '@/shadcn/ui/sheet'
import { Link } from '@inertiajs/react'
import { getRouteParameter } from '@/utils'
import { Popover } from '@/shadcn/ui/popover'
import { PopoverContent, PopoverTrigger } from '@radix-ui/react-popover'

const SearchInput: FC<SearchInputProps> = ({
  placeholder,
  search,
  setParams,
  params,
  setTimeDebounce,
}) => (
  <Input
    placeholder={placeholder || 'Search'}
    className="h-8 w-full text-xs lg:w-[250px]"
    value={search || ''}
    onChange={(e) => {
      setParams({ ...params, search: e.target.value })
      setTimeDebounce(500)
    }}
  />
)

export default function DataTable<T extends WithID>({ data = [], options }: DataTableProps<T>) {
  const { params, setParams, setTimeDebounce } = useDebouncedSearch(
    route(route().current() as string),
    // This is a hardcoded filters value for now, as we dont have it form the backend right now
    { search: null, col: null, filters: null, limit: null, sort: null },
    // options.filters,
  )
  const { sort } = useSorting(options.filters!, setParams)

  const [selectedEntriesByPage, setSelectedEntriesByPage] = useState<Record<number, T[]>>({})
  const currentPage = options.pagination.meta.current_page
  const currentPageItems = data
  const currentPageSelection = selectedEntriesByPage[currentPage] || []
  const isCurrentPageFullySelected = currentPageSelection.length === currentPageItems.length

  const routeParameter = getRouteParameter()

  const handleSelectionChange = (item: T) => {
    setSelectedEntriesByPage((prev) => {
      const currentSelections = prev[currentPage] || []
      const isSelected = currentSelections.some((entry) => entry.id === item.id)
      return {
        ...prev,
        [currentPage]: isSelected
          ? currentSelections.filter((entry) => entry.id !== item.id)
          : [...currentSelections, item],
      }
    })
  }

  const handleBulkAction = (action: (selected: (string | number)[]) => void) => {
    const allSelected = Object.values(selectedEntriesByPage).flat()
    const resultingIDs = allSelected.map((item) => item.id)
    // array of ID's to perform BULK ACTIONS.
    action(resultingIDs)
    setSelectedEntriesByPage({})
  }

  const [visibleColumns, setVisibleColumns] = useState<string[]>(
    options.columns.map((col) => col.value),
  )
  const visibleColumnsConfig = options.columns.filter((col) => visibleColumns.includes(col.value))

  return (
    <div className="space-y-4">
      {/* Breadcrumbs and Filters */}
      <div className="space-y-2">
        <div className="flex-between flex-col sm:flex-row">
          <div className="w-full flex-col gap-1 sm:flex-row sm:space-x-1">
            {options.tableFilters &&
              options.tableFilters.map((item, index: number) => (
                <TableFilter
                  title={item.title}
                  filter={item.filter}
                  options={item.options}
                  params={params}
                  setParams={setParams}
                  setTimeDebounce={setTimeDebounce}
                  key={`tableFilters-${item.title}-${index}`}
                />
              ))}
          </div>
          {options.bulkActions && options.bulkActions.length > 0 && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild className="w-full md:w-fit">
                <Button variant="outline">
                  Bulk Actions <ChevronDown className="size-3" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>Bulk Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                {options.bulkActions.map((action, index) => (
                  <DropdownMenuItem
                    key={`bulkAction-${action.label}-${index}`}
                    onSelect={() => handleBulkAction(action.action)}
                  >
                    {action.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>
      </div>

      {/* Table Controls */}
      <div className="my-3 items-center justify-between gap-3 space-y-2 lg:flex lg:space-y-0">
        <div className="block items-center space-y-2 align-middle sm:flex">
          <div className="flex">
            <TableToolbar
              placeholder={options.searchPlaceholder || 'Placeholder'}
              search={params.search}
              params={params}
              setParams={setParams}
              setTimeDebounce={setTimeDebounce}
            />
            {/* actions.create is assumed to always be provided */}
            {options.actions.create && (
              <div className="block md:hidden">
                {options.actions.create.hasSheet ? (
                  <Sheet>
                    <SheetTrigger asChild>
                      <Button>
                        <Plus />
                      </Button>
                    </SheetTrigger>
                    <SheetContent className="overflow-scroll">
                      {options.actions.create.sheetContent ? (
                        options.actions.create.sheetContent()
                      ) : (
                        <div>
                          <h2>Create Item</h2>
                          <p>No content provided for the sheet.</p>
                        </div>
                      )}
                    </SheetContent>
                  </Sheet>
                ) : (
                  <Button asChild variant="ghost" size="icon">
                    <Link href={route(options.actions.create.href)}>
                      <PlusCircle />
                    </Link>
                  </Button>
                )}
              </div>
            )}
          </div>
          <MultiSelect
            options={options.columns.map((col) => ({
              value: col.value,
              label: col.label,
            }))}
            onValueChange={setVisibleColumns}
            defaultValue={visibleColumns}
            placeholder="Hide Columns"
            maxCount={options.columns.length}
            className="p-0 sm:max-w-fit"
          />
        </div>

        <div className="block gap-2 sm:flex sm:flex-row">
          <SearchInput
            placeholder="Search"
            search={params.search}
            setParams={setParams}
            params={params}
            setTimeDebounce={setTimeDebounce}
          />
          {options.actions.create && (
            <>
              {options.actions.create.hasSheet ? (
                <Sheet>
                  <SheetTrigger asChild>
                    <Button>
                      Add New
                      <Plus />
                    </Button>
                  </SheetTrigger>
                  <SheetContent className="overflow-scroll">
                    {options.actions.create.sheetContent ? (
                      options.actions.create.sheetContent()
                    ) : (
                      <div>
                        <h2>Create Item</h2>
                        <p>No content provided for the sheet.</p>
                      </div>
                    )}
                  </SheetContent>
                </Sheet>
              ) : (
                <Button href={route(options.actions.create.href)}>
                  Add New
                  <Plus />
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Data Table */}
      <Table>
        <TableHeader>
          <TableRow className="border-t">
            {data.length > 0 && (
              <TableHead className={cn('w-12 py-2 text-left')}>
                <div className="flex w-12 items-center justify-center">
                  <Checkbox
                    checked={isCurrentPageFullySelected}
                    onCheckedChange={() => {
                      setSelectedEntriesByPage((prev) => ({
                        ...prev,
                        [currentPage]: isCurrentPageFullySelected ? [] : currentPageItems,
                      }))
                    }}
                  />
                </div>
              </TableHead>
            )}
            {visibleColumnsConfig.map((column, index) => (
              <TableHead
                key={`visibleColumns-${column.value}-${index}`}
                className={cn('px-0', column.className)}
              >
                {options.sortableColumns && options.sortableColumns.includes(column.value) ? (
                  <TableSortHeader
                    title={column.label}
                    sort={params.sort}
                    onClick={() => {
                      setTimeDebounce(50)
                      sort(column.value)
                    }}
                  />
                ) : (
                  column.label
                )}
              </TableHead>
            ))}
            {(options.actions?.edit || options.actions?.destroy) && (
              <TableHead className="px-0">Actions</TableHead>
            )}
          </TableRow>
        </TableHeader>
        {(options.actions?.edit || options.actions?.destroy) && (
          <TableBody>
            {data.length > 0 ? (
              data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className={cn(index % 2 !== 0 && 'bg-slate-100 dark:bg-slate-900')}
                >
                  <TableCell className="w-12">
                    <div className="flex w-12 items-center justify-center">
                      <Checkbox
                        checked={isCurrentPageFullySelected}
                        onCheckedChange={() => {
                          setSelectedEntriesByPage((prev) => ({
                            ...prev,
                            [currentPage]: isCurrentPageFullySelected ? [] : currentPageItems,
                          }))
                        }}
                      />
                    </div>
                  </TableCell>
                  {visibleColumnsConfig.map((column, index) => (
                    <TableCell
                      key={`visibleColumns-${column.value}-${index}`}
                      className={cn(
                        'max-w-[350px] truncate whitespace-nowrap px-0 py-2 text-left align-middle',
                        column.className,
                      )}
                    >
                      {column.body
                        ? column.body(item)
                        : (item[column.value as keyof T] as ReactNode)}
                    </TableCell>
                  ))}
                  {options.actions && (
                    <TableCell className="px-0">
                      <Popover>
                        <PopoverTrigger>
                          <Ellipsis className="rounded-full border p-1" />
                        </PopoverTrigger>
                        <PopoverContent>
                          <TableAction
                            item={item}
                            className="bg-slate-100 p-2 dark:bg-slate-900"
                            action={{
                              create: options.actions.create,
                              show: options.actions.show,
                              edit: options.actions.edit
                                ? {
                                  href: route(options.actions.edit.href, {
                                    [routeParameter]: item.id,
                                  }),
                                  hasSheet: options.actions.edit.hasSheet || false,
                                  sheetContent: options.actions.edit.sheetContent,
                                }
                                : undefined,
                              delete: options.actions.destroy
                                ? route(options.actions.destroy, { [routeParameter]: item.id })
                                : undefined,
                            }}
                          />
                        </PopoverContent>
                      </Popover>
                    </TableCell>
                  )}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={visibleColumnsConfig.length + 2} className="h-24 text-center">
                  No results found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        )}
      </Table>
      <TablePagination links={options.pagination.links} meta={options.pagination.meta} />
    </div>
  )
}
