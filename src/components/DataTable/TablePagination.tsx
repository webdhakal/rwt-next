import { FC } from 'react'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from 'lucide-react'
import { Link } from '@inertiajs/react'
import { Pagination } from '@/types/MockData'

interface PaginationLinkProps {
  href: string | null
  srText: string
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>
  hiddenOnMd?: boolean
}

const PaginationLink: FC<PaginationLinkProps> = ({ href, srText, icon: Icon, hiddenOnMd }) => (
  <Link
    preserveScroll
    preserveState
    href={href || '#'}
    className={`inline-flex h-8 w-8 items-center justify-center whitespace-nowrap rounded-md border border-gray-200 bg-background p-0 text-sm font-medium shadow-sm hover:bg-gray-50 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 ${
      hiddenOnMd ? 'hidden md:inline-flex' : ''
    }`}
    disabled={!href}
  >
    <span className="sr-only">{srText}</span>
    <Icon className="h-4 w-4" />
  </Link>
)

const TablePagination: FC<Pagination> = ({ links, meta }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="hidden md:block">
        <p className="text-nile-blue text-xs">
          Showing <span className="font-bold">{meta.from || 0}</span> to{' '}
          <span className="font-bold">{meta.to || 0}</span> of{' '}
          <span className="font-bold">{meta.total}</span> entries
        </p>
      </div>

      <div className="block space-x-1 md:hidden">
        <PaginationLink href={links.first} srText="Go to first page" icon={ChevronsLeftIcon} />
        <PaginationLink href={links.prev} srText="Go to previous page" icon={ChevronLeftIcon} />
      </div>

      <div className="text-xs font-bold text-gray-900">
        {meta.current_page} / {meta.last_page}
      </div>

      <div className="flex items-center space-x-2">
        <PaginationLink
          href={links.first}
          srText="Go to first page"
          icon={ChevronsLeftIcon}
          hiddenOnMd
        />
        <PaginationLink
          href={links.prev}
          srText="Go to previous page"
          icon={ChevronLeftIcon}
          hiddenOnMd
        />
        <PaginationLink href={links.next} srText="Go to next page" icon={ChevronRightIcon} />
        <PaginationLink href={links.last} srText="Go to last page" icon={ChevronsRightIcon} />
      </div>
    </div>
  )
}

export default TablePagination
