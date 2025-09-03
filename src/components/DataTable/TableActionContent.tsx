import { Button } from '@/shadcn/ui/button'
import { TableCell } from '@/shadcn/ui/table'
import { Pencil, Trash2 } from 'lucide-react'
import React, { FC, PropsWithChildren } from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/ui/dialog'
import { Label } from '@/shadcn/ui/label'
import { Input } from '@/shadcn/ui/input'
import { Link, usePage } from '@inertiajs/react'

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/shadcn/ui/alert-dialog'

type TableActionProps = {
  children: React.ReactElement
  className?: string
  content: {
    trigger: string
    heading: string
    description: string
  }
  actions: {
    create?: string
    edit?: string
  }
}

const TableActionContent: FC<TableActionProps> = ({ children, className, content, actions }) => {
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
            <Button type="submit">{actions.create ? 'Save' : 'Edit'} changes</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
export default TableActionContent
