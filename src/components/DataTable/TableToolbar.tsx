import React, { FC, PropsWithChildren, ReactNode, useState } from 'react'
import { Input, InputWithLabel } from '@/shadcn/ui/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/shadcn/ui/select'
import { Button } from '@/shadcn/ui/button'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/ui/dialog'

interface RowsPerPageSelectProps {
  limit: string
  setLimit: (value: string) => void
  setParams: (params: any) => void
  params: any
  setTimeDebounce: (time: number) => void
}

interface SearchInputProps {
  placeholder?: string
  search: string
  setParams: (params: any) => void
  params: any
  setTimeDebounce: (time: number) => void
}

type TableActionContentType = {
  trigger: string
  heading: string
  description: string
}

type TableActionSetActionType = {
  create?: string
  edit?: string
}

interface TableToolbarProps extends PropsWithChildren {
  params: any
  placeholder: string
  setParams: (params: any) => void
  setTimeDebounce: (time: number) => void
  search: string | null
  setContent?: TableActionContentType
  setAction?: TableActionSetActionType
}

interface TableActionContentProps extends PropsWithChildren {
  content: TableActionContentType
  action: TableActionSetActionType
}

const RowsPerPageSelect: FC<RowsPerPageSelectProps> = ({
  limit,
  setLimit,
  setParams,
  params,
  setTimeDebounce,
}) => (
  <Select
    value={limit}
    onValueChange={(value) => {
      setLimit(value)
      setTimeDebounce(50)
      setParams({ ...params, limit: value })
    }}
  >
    <SelectTrigger className="mt-2 mr-2 h-10 w-[70px] border-gray-300 focus:outline-none focus:ring-0 focus:ring-offset-0">
      <SelectValue placeholder="10" />
    </SelectTrigger>
    <SelectContent align="end" side="bottom">
      {[10, 25, 50, 100].map((limit) => (
        <SelectItem key={limit} value={`${limit}`} className="cursor-pointer focus:bg-gray-200/50">
          {limit}
        </SelectItem>
      ))}
    </SelectContent>
  </Select>
)

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

const TableActionContent: FC<TableActionContentProps> = ({ children, content, action }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">{content.trigger}</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>{content.heading}</DialogTitle>
            <DialogDescription>{content.description}</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4">{children}</div>
          <DialogFooter>
            <Button type="submit">{action.create ? 'Save' : 'Edit'} changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}

const TableToolbar: FC<TableToolbarProps> = ({
  placeholder,
  params,
  setParams,
  setTimeDebounce,
  setContent,
  setAction,
  search,
}) => {
  const [limit, setLimit] = useState((params.limit || 10).toString())

  return (
    <div className="items-center justify-between space-y-2 sm:flex sm:space-y-0">
      <div className="flex items-center">
        {/* <p className="mr-1 hidden text-xs font-medium sm:block">Page</p> */}
        <RowsPerPageSelect
          limit={limit}
          setLimit={setLimit}
          setParams={setParams}
          params={params}
          setTimeDebounce={setTimeDebounce}
        />
      </div>
    </div>
  )
}

export default TableToolbar
