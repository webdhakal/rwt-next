import DefaultSectionTitle from '@/utils/DefaultSectionTitle'
import { cn } from '@/shadcn/lib/utils'
import ProductCard from '../Cards/ProductCard'
import { useState } from 'react'
import useHighlight from '@/hooks/useProductHighlight'
import { usePage } from '@inertiajs/react'
import { CustomSiteProps, TabFilterProduct } from '@/types/MockData'
import { AnimatedSection } from '../AnimatedSection'

const NewArrivalsSection = () => {
  // const newArrivals = useHighlight<ProductType>('new_arrivals')

  const [activeTab, setActiveTab] = useState<string>('All')
  const {
    product: { new_arrivals },
  } = usePage<TabFilterProduct>().props
  const productTabs = Object.keys(new_arrivals)

  return (
    <AnimatedSection className={cn('container mx-auto my-4')}>
      <div className="lg:flex-between">
        <DefaultSectionTitle
          title="New Arrivals"
          subtitle="Shop online for new arrivals and get free shipping!"
          showButton={false}
        />
        <div className="flex w-full justify-center gap-5 rounded-md bg-primary py-2 lg:justify-end lg:gap-6 lg:bg-white lg:dark:bg-transparent">
          {productTabs.map((tab, index) => (
            <div className="text-white lg:text-slate-500" key={`recent-product-${index}`}>
              <span
                className={cn(
                  'cursor-pointer font-bold duration-100 ease-out hover:text-white lg:hover:text-primary',
                  tab === activeTab &&
                    'rounded-md bg-white px-2 py-1 text-primary hover:text-primary dark:bg-transparent dark:text-white lg:p-0',
                )}
                onClick={() => {
                  setActiveTab(tab)
                }}
              >
                {tab}
              </span>
              {productTabs.length - 1 !== index && <span className="ml-3 hidden lg:inline">/</span>}
            </div>
          ))}
        </div>
      </div>
      <div className="responsive-product-grid">
        {new_arrivals[activeTab]?.data?.map((item, index) => (
          <ProductCard product={item} key={`product-${item.id}`} />
        ))}
      </div>
    </AnimatedSection>
  )
}

export default NewArrivalsSection
