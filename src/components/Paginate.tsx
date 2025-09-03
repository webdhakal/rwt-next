import { Inertia } from '@inertiajs/inertia'
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/shadcn/ui/pagination'
import cn from 'classnames'

interface PaginationProps {
  pagination: {
    total: number
    count: number
    per_page: number
    current_page: number
    total_pages: number
  }
  setCurrentPage: (page: number) => void
}

const Paginate: React.FC<PaginationProps> = ({ pagination, setCurrentPage }) => {
  const { current_page, total_pages } = pagination

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= total_pages) {
      setCurrentPage(page) // Update the current page in the state

      // Send Inertia request to fetch the products for the selected page
      // Inertia.get(
      //   route('frontend.products.all'),
      //   { page },
      //   {
      //     preserveState: true, // Keeps current state (filters, sorts, etc.)
      //     replace: true, // Replaces the history entry (prevents creating new history entries)
      //     onStart: () => {
      //       // Optional: Show a loading spinner or change state when the request starts
      //     },
      //     onFinish: () => {
      //       // Optional: Hide the loading spinner or revert any changes when the request finishes
      //     },
      //   },
      // )
    }
  }

  return (
    <Pagination className="my-6 justify-start">
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(Math.max(current_page - 1, 1))
            }}
          />
        </PaginationItem>

        {/* Pagination Numbers */}
        {[...Array(total_pages)].map((_, index) => (
          <PaginationItem key={index}>
            <PaginationLink
              href="#"
              isActive={current_page === index + 1}
              onClick={(e) => {
                e.preventDefault()
                handlePageChange(index + 1)
              }}
              className={cn(
                'rounded-full',
                current_page === index + 1
                  ? 'bg-green-500 text-white hover:bg-green-500 hover:text-white'
                  : 'bg-slate-300',
              )}
            >
              {index + 1}
            </PaginationLink>
          </PaginationItem>
        ))}

        <PaginationItem>
          <PaginationNext
            href="#"
            onClick={(e) => {
              e.preventDefault()
              handlePageChange(Math.min(current_page + 1, total_pages))
            }}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  )
}

export default Paginate
