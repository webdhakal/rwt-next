import DefaultSectionTitle from '@/utils/DefaultSectionTitle'
import ProductCard from '../Cards/ProductCard'
import { cn } from '@/shadcn/lib/utils'
import useHighlight from '@/hooks/useProductHighlight'
import { ProductType } from '@/types/Product'
import { AnimatedSection } from '../AnimatedSection'
import { usePage } from '@inertiajs/react'

const RecentProductSection = () => {
  console.log(usePage().props)

  const recentlyViewed = useHighlight<ProductType>('recently_viewed')

  return (
    <AnimatedSection className={cn('container my-4')}>
      <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
        <DefaultSectionTitle
          title="Recently Viewed"
          subtitle="Discover your browsing history and continue shopping"
          showButton={false}
        />
      </div>

      <div className="responsive-product-grid">
        {recentlyViewed?.map((item, index) => (
          <ProductCard
            product={item}
            key={`${'recent-product' + index}`}
            className={cn(' duration-500')}
            style={{ animationDelay: `${index * 300}ms` }}
          />
        ))}
      </div>
    </AnimatedSection>
  )
}

export default RecentProductSection
