import { Button } from '@/shadcn/ui/button'
import { TableCell } from '@/shadcn/ui/table'
import { Eye, Pencil, Trash2 } from 'lucide-react'
import { FC, ReactNode } from 'react'
import { Link } from '@inertiajs/react'
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
import { Sheet, SheetTrigger, SheetContent } from '@/shadcn/ui/sheet'
import { Dialog, DialogContent, DialogTrigger } from '@/shadcn/ui/dialog'
import { cn } from '@/shadcn/lib/utils'

type ActionProps<T> = {
  create?: { href: string; hasSheet?: boolean; sheetContent?: () => ReactNode }
  edit?: { href: string; hasSheet?: boolean; sheetContent?: (item: T) => ReactNode }
  show?: { href: string; sheetContent?: (item: T) => ReactNode }
  delete?: string
}

type TableActionProps<T> = {
  action: ActionProps<T>
  item?: T
  className?: string
}

const TableAction: FC<TableActionProps<any>> = ({ action, item, className }) => {
  return (
    <TableCell className={cn("flex w-full max-w-xs flex-wrap items-center justify-center gap-3 rounded-md bg-white px-0 py-2 shadow", className)}>
      {action.edit && (
        <>
          {action.edit.hasSheet ? (
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" aria-label="Edit">
                  <Pencil />
                </Button>
              </SheetTrigger>
              <SheetContent className="overflow-y-auto">
                {action.edit.sheetContent ? (
                  action.edit.sheetContent(item)
                ) : (
                  <div>
                    <h2>Edit Item</h2>
                    <p>No content provided for the sheet.</p>
                  </div>
                )}
              </SheetContent>
            </Sheet>
          ) : (
            <Button asChild variant="ghost" size="icon" aria-label="Edit">
              <Link href={action.edit.href}>
                <Pencil />
              </Link>
            </Button>
          )}
        </>
      )}
      {action.show && action.show.sheetContent ? (
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="View">
              <Eye />
            </Button>
          </DialogTrigger>
          <DialogContent className="w-full max-w-md">
            {action.show.sheetContent(item)}
          </DialogContent>
        </Dialog>
      ) : (
        <div>
          <p>Hello world</p>
        </div>
      )}
      {action.delete && (
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button size="icon" variant="destructive" aria-label="Delete">
              <Trash2 />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle className="flex flex-col items-center gap-2">
                <Trash2 className="size-8 sm:size-10 md:size-12" />
                <span>Are you sure you want to delete this item?</span>
              </AlertDialogTitle>
              <AlertDialogDescription className="text-center">
                This action cannot be undone. This will permanently delete your account and remove
                your data from our servers.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="flex justify-center gap-2">
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction className="bg-destructive text-white">
                <Link className="inline-flex" href={action.delete} method="delete">
                  Continue
                </Link>
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </TableCell>
  )
}

export default TableAction
