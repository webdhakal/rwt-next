// THIS COMPONENT IS UNUSED RIGHT NOW, CHECK DEFAULTHEADER.TSX LINENO:235
// we can delete this
import { categories } from '@/MOCK_DATA'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetClose } from '@/shadcn/ui/sheet'
import { Grid } from 'lucide-react'

interface CategoryModalProps {
  setToggleCategory: React.Dispatch<React.SetStateAction<boolean>>
}

const CategoryModal = ({ setToggleCategory }: CategoryModalProps) => {
  return (
    <Sheet open onOpenChange={setToggleCategory}>
      <SheetContent side="left" className="w-full sm:w-80">
        <SheetHeader className="flex items-center justify-between border-b px-4 py-3">
          <div className="flex w-full">
            <Grid className="mr-2 h-6 w-6 text-primary" />
            <SheetTitle className="text-lg font-semibold">Categories</SheetTitle>
          </div>
          <SheetClose asChild></SheetClose>
        </SheetHeader>
        <ul className="space-y-2 p-4">
          {categories.map((category) => (
            <li
              key={category.id}
              className="flex cursor-pointer items-center rounded-md px-3 py-2 transition-colors hover:bg-primary hover:text-white"
            >
              <span>{category.name}</span>
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}

export default CategoryModal
