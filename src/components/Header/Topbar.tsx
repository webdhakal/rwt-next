import { Link } from '@inertiajs/react'
import LanguageSelector from './LanguageSelector'
import ToggleThemeButton from '../Button/ToggleThemeButton'
import { Button } from '@/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import { ChevronDown } from 'lucide-react'
import { FiMapPin } from 'react-icons/fi'
import { __ } from '@/Libs/Lang'

export const Topbar = () => {
  return (
    <div className="bg-primarydark text-white dark:bg-slate-900">
      <div className="container mx-auto items-center justify-between py-2 text-center text-sm sm:flex">
        <div className="flex w-full items-center justify-between">
          <Link href="#">Flat 50% Off on Hot Sales</Link>
          <div className="flex items-center gap-3">
            <ToggleThemeButton />
            <div className="hidden items-center space-x-4 md:flex">
              <Link
                className="md:flex-center gap-1 rounded-md border border-primary p-2 text-sm text-slate-400"
                href={route('order-tracking')}
              >
                {__('Order Tracking')}
                <span className="text-primary">
                  <FiMapPin />
                </span>
              </Link>
              <DropdownMenu>
                <DropdownMenuTrigger className="flex items-center gap-1 rounded-md border p-2 text-xs duration-100 ease-in-out hover:bg-slate-300 hover:text-black">
                  Lang
                  <ChevronDown className="mt flex size-4 items-center" />
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                  <DropdownMenuItem>English</DropdownMenuItem>
                  <DropdownMenuItem>Nepali</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Link href="#">Help?</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
