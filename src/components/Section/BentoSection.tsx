import { Badge } from '@/shadcn/ui/badge'
import { Button } from '@/shadcn/ui/button'
import { randomImage } from '@/Libs/Helper'
import DefaultSectionTitle from '@/utils/DefaultSectionTitle'
import { cn } from '@/shadcn/lib/utils'
import { AnimatedSection } from '../AnimatedSection'

const BentoSection = () => {
  const randomBentoProducts = () => {
    return Array.from({ length: 9 }, (_, i) => randomImage(Math.random()))
  }

  const products = [
    {
      title: 'Featured Product',
      description: 'Discover our handpicked selection',
      discount: null,
      span: 'lg:col-span-3 lg:row-span-3',
      href: '#',
      priority: 'primary',
    },
    {
      title: 'Printable Greeting Cards',
      description: 'Express yourself with style',
      discount: null,
      span: 'lg:col-span-2 lg:row-span-2',
      href: '#',
      priority: 'secondary',
    },
    {
      title: 'Downloadable DIY Crafts',
      description: 'Create something unique',
      discount: null,
      span: 'lg:col-span-2 lg:row-span-2',
      href: '#',
      priority: 'secondary',
    },
    {
      title: 'Flash Sale',
      description: 'Limited time offer',
      discount: '60% off',
      span: 'md:col-span-1 lg:row-span-1',
      priority: 'sale',
    },
    {
      title: 'Special Deal',
      description: 'Today only',
      discount: '50% off',
      span: 'md:col-span-1 lg:row-span-1',
      priority: 'sale',
    },
    {
      title: 'Clearance',
      description: 'While stocks last',
      discount: '32% off',
      span: 'md:col-span-1 lg:row-span-1',
      priority: 'sale',
    },
    {
      title: 'Exclusive',
      description: 'Exclusive offer',
      discount: '15% off',
      span: 'md:col-span-1 lg:row-span-1',
      priority: 'sale',
    },
  ]
  return (
    <AnimatedSection className={cn('container my-4 space-y-8')}>
      <DefaultSectionTitle
        title="Unmissable Offers"
        subtitle="Don't miss out on these exclusive deals"
        showButton={false}
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:h-[700px] lg:grid-cols-7 lg:grid-rows-3">
        {products.map((product, index) => (
          <div
            key={index}
            className={`group relative ${product.span} h-48 overflow-hidden rounded-xl bg-gray-100 shadow-lg transition-all duration-500 hover:shadow-2xl sm:h-64 md:h-full`}
          >
            <img
              src={randomBentoProducts()[index]}
              loading="lazy"
              alt={product.title}
              className="h-full w-full object-cover transition-transform duration-700"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-80" />

            <div className="absolute inset-x-0 bottom-0 p-4 text-white transition-transform duration-300 group-hover:translate-y-0">
              {product.discount && (
                <Badge className="mb-2 bg-primary text-sm font-bold tracking-wide text-white">
                  {product.discount}
                </Badge>
              )}

              <h3 className="text-lg font-bold tracking-wide md:text-xl lg:text-2xl">
                {product.title}
              </h3>

              <p className="mt-1 text-sm text-gray-200 opacity-90">{product.description}</p>

              {product.href && (
                <div className="mt-4 transform opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <Button
                    variant="secondary"
                    size="sm"
                    href="#"
                    className="w-full bg-white text-sm font-semibold text-gray-900 shadow-md transition-colors hover:bg-gray-100"
                  >
                    Shop Now
                  </Button>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </AnimatedSection>
  )
}

export default BentoSection
