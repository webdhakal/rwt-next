import ProductCard from './ProductCard'
import DefaultSectionTitle from '@/utils/DefaultSectionTitle'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/shadcn/lib/utils'
import { ProductType } from '@/types/Product'
const ProductGrid = ({ products }: { products: ProductType[] }) => {
  const { callbackRef, isVisible } = useIntersectionObserver()

  return (
    <div className="container">
      <DefaultSectionTitle
        title="All Products"
        subtitle="Shop online for new arrivals and get free shipping!"
        href="#"
        // href="#"
      />
      <div className="responsive-product-grid" ref={callbackRef}>
        {products.map((product, index) => (
          <ProductCard
            key={product.id}
            product={product}
            className={cn('opacity-0', isVisible && 'animate-slideInFromBottom')}
            style={{ animationDelay: `${index * 75}ms` }}
          />
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
