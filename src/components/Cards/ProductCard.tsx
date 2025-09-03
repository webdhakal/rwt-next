import { CiHeart, CiShoppingCart } from 'react-icons/ci'
import { MdOutlineRemoveRedEye } from 'react-icons/md'
import { Link } from '@inertiajs/react'
import { cn } from '@/shadcn/lib/utils'
import RatingStart from '@/utils/RatingStart'
import { GitCompare } from 'lucide-react'
import { Badge } from '@/shadcn/ui/badge'
import { Dialog, DialogContent, DialogTrigger } from '@/shadcn/ui/dialog'
import { ProductType } from '@/types/Product'
import { Button } from '@/shadcn/ui/button'
import ZoomableImage from '../ZoomableImage'
import { useState } from 'react'

const QuickViewDialog = ({ product }: { product: ProductType }) => {
  // Keeping the dialog state logic as-is because it's independent of hover behavior.
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpen(true)
          }}
          className="focus:outline-none"
        >
          <MdOutlineRemoveRedEye className="size-8 rounded-sm border-none bg-primary bg-white px-[6px] text-black duration-100 ease-out hover:bg-white hover:text-primary" />
        </button>
      </DialogTrigger>
      <DialogContent className="mx-auto w-full max-w-3xl p-6" onClick={(e) => e.preventDefault()}>
        <div className="mt-4 flex flex-col gap-6 sm:flex-row">
          <div className="sm:w-1/2">
            <ZoomableImage
              src={product.imageUrl}
              alt={product.name}
              className="flex-center"
              zoomScale={2.5}
            />
          </div>
          <div className="flex flex-col justify-between sm:w-1/2">
            <div>
              <h2 className="text-2xl font-bold text-gray-800 dark:text-white">{product.name}</h2>
              <div className="mt-2 flex items-center">
                <div className="font-secondary">
                  {product.stock > 0 ? (
                    <span className="text-green-500">In Stock</span>
                  ) : (
                    <span className="text-red-500">Out of Stock</span>
                  )}
                  <RatingStart rating={product.rating} />
                </div>
              </div>
              <p className="mt-4 line-clamp-4 font-secondary text-sm text-gray-600 dark:text-gray-300">
                {product.description}
              </p>
            </div>
            <div>{/* Size selection logic (commented out) */}</div>
            <div className="mt-4">
              <div className="flex items-center space-x-4">
                <span className="text-xl font-bold text-gray-800 dark:text-white">
                  Rs. {product.price}
                  {product.discount && (
                    <span className="ml-2 text-base text-gray-500 line-through dark:text-gray-400">
                      Rs. {product.discount}
                    </span>
                  )}
                </span>
              </div>
              <div className="mt-2 space-x-2">
                <Button className="font-secondary">Add to Cart</Button>
                <Button variant="outline" className="border-primary font-secondary" href="#">
                  More Details
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

const ProductCard = ({
  product,
  className,
  style,
}: {
  product: ProductType
  className?: string
  style?: object
}) => {
  const productBadgeColor = (badgeName: string) => {
    switch (badgeName) {
      case 'hot':
        return 'bg-red-500'
      case 'sale':
        return 'bg-green-500'
      case 'new':
        return 'bg-blue-500'
      default:
        return ''
    }
  }

  return (
    <Link href="#">
      <div
        className={cn(
          'group w-full transform cursor-pointer overflow-hidden rounded-md bg-white shadow-2 transition-all duration-200 dark:bg-transparent dark:ring-1 dark:ring-slate-700',
          className,
        )}
        style={style}
      >
        <div className="relative">
          <div className="overflow-hidden">
            <img
              src={product.imageUrl}
              alt="Product"
              className="h-48 w-full object-cover transition-transform duration-200 ease-out group-hover:scale-110"
            />
          </div>
          <div className="hidden lg:block">
            <div className="flex-center absolute bottom-1 z-50 w-full translate-y-5 gap-3 opacity-0 transition-all duration-300 ease-out group-hover:translate-y-0 group-hover:opacity-100">
              <Link href="#">
                <CiHeart className="size-8 rounded-sm border-none bg-primary bg-white px-[6px] text-black duration-100 ease-out hover:bg-white hover:text-primary" />
              </Link>
              <QuickViewDialog product={product} />
              <Link href="#">
                <CiShoppingCart className="size-8 rounded-sm border-none bg-primary bg-white px-[6px] text-black duration-100 ease-out hover:bg-white hover:text-primary" />
              </Link>
              <Link href="/compare">
                <GitCompare className="size-8 rounded-sm border-none bg-primary bg-white px-[6px] text-black duration-100 ease-out hover:bg-white hover:text-primary" />
              </Link>
            </div>
          </div>
          {product.badge && (
            <Badge
              className={cn(
                'absolute left-2 top-2 text-xs font-normal capitalize',
                productBadgeColor(product.badge.toString()),
              )}
            >
              {product.badge}
            </Badge>
          )}
        </div>
        <div className="space-y-1 p-3 lg:px-4 lg:py-3">
          <div className="flex flex-col items-start">
            <span className="mt-1 block font-secondary text-xs text-slate-400">
              {product.category}
            </span>
            <h2 className="text-card-title line-clamp-1 font-semibold text-gray-800 dark:text-slate-300">
              {product.name}
            </h2>
            <div className="mb-1 flex items-center gap-2">
              <RatingStart rating={product.rating} />
            </div>
          </div>
          <span className="text-2xsm">
            By{' '}
            <span className="font-secondary text-green-500">{product.vendorName || 'unknown'}</span>
          </span>
          <div className="flex-between">
            <div className="text-card-title space-x-2">
              <span className="font-semibold text-gray-900 dark:text-white">
                Rs.{product.price}
              </span>
              {product.discount && (
                <span className="h-fit w-fit rounded-full bg-green-100 px-2 text-sm text-green-700 line-through">
                  {/* removed the fixed method when data comes from the backend. */}
                  Rs.{(product.price - (product.discount / 100) * product.price).toFixed(2)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </Link>
  )
}

export default ProductCard
