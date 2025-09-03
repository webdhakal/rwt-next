import { cn } from '@/shadcn/lib/utils'
import { Button } from '@/shadcn/ui/button'
import { Dialog, DialogContent, DialogOverlay } from '@/shadcn/ui/dialog'
import { useEffect, useState } from 'react'
import { FaStar } from 'react-icons/fa'

interface RandomPromoCardProps {
  defaultOpen?: boolean
  title?: string
  subtitle?: string
  tagline?: string
  bigStat?: string
  rating?: string
  reviews?: string
  buttonLabel?: string
  onButtonClick?: () => void
  randomAppear?: boolean
  randomInterval?: { min: number; max: number }
}

export function RandomPromoCard({
  defaultOpen = false,
  title = 'Still Making Paper Bills?',
  subtitle = 'Switch to Vyapar App',
  tagline = '91% businesses who use Vyapar report 5X more profits!',
  bigStat = '1 Crore+ Happy Customers',
  rating = '4.7',
  reviews = '105K reviews',
  buttonLabel = 'Start 7 Days Free Trial',
  onButtonClick,
  randomAppear = false,
  randomInterval = { min: 5000, max: 15000 },
}: RandomPromoCardProps) {
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    if (randomAppear) {
      const randomTime =
        Math.floor(Math.random() * (randomInterval.max - randomInterval.min + 1)) +
        randomInterval.min

      const timer = setTimeout(() => {
        setOpen(true)
      }, randomTime)

      return () => clearTimeout(timer)
    }
  }, [randomAppear, randomInterval])

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {open && (
        <DialogOverlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm transition-opacity" />
      )}
      <DialogContent
        className={cn(
          'fixed left-1/2 top-1/2 z-[9999] w-[95%] max-w-3xl -translate-x-1/2 -translate-y-1/2 overflow-hidden rounded-lg bg-white shadow-lg transition-all duration-300 ease-in-out',
          open ? 'scale-100 opacity-100' : 'scale-95 opacity-0',
        )}
        closeButton={false}
      >
        <div className="flex flex-col lg:flex-row">
          <div className="space-y-4 p-6 sm:p-8 md:p-10 lg:w-2/3">
            <h1 className="text-xl font-bold text-gray-800 sm:text-2xl md:text-3xl lg:text-4xl">
              {title}
            </h1>
            <p className="text-sm text-gray-700 sm:text-lg">{subtitle}</p>
            <p className="text-xs text-gray-500 sm:text-base">{tagline}</p>
            <p className="text-lg font-semibold text-gray-800">{bigStat}</p>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1">
                <span className="text-lg font-bold">{rating}</span>
                <FaStar className="text-yellow-500" />
              </div>
              <p className="text-xs text-gray-600 sm:text-sm">{reviews}</p>
            </div>
            <Button
              onClick={() => {
                onButtonClick?.()
                setOpen(false)
              }}
              className="hover:bg-primary/90 mt-4 bg-primary px-6 py-3 text-white"
            >
              {buttonLabel}
            </Button>
          </div>
          <div className="hidden md:flex items-center justify-center bg-primary p-6 sm:p-8 md:p-10 lg:w-1/3">
            <img
              src="https://placehold.co/400x300?text=Picture+Here"
              alt="App Screenshot"
              className="h-auto max-w-full rounded-lg"
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
