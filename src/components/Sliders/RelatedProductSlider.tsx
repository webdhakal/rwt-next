// import { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { ProductType } from '@/types/Product'
import ProductCard from '../Cards/ProductCard'
import DefaultSectionTitle from '@/utils/DefaultSectionTitle'

const RelatedProductSlider = ({ products }: { products: ProductType[] }) => {
  const [emblaRef] = useEmblaCarousel({ loop: true })
  // test this later when more related products are available. 

  // const [activeSlide, setActiveSlide] = useState<number>(0)

  // useEffect(() => {
  //   if (!emblaApi) return

  //   const onSelect = () => {
  //     setActiveSlide(emblaApi.selectedScrollSnap())
  //   }
  //   emblaApi.on('select', onSelect)
  //   return () => {
  //     emblaApi.off('select', onSelect)
  //   }
  // }, [emblaApi])

  return (
    <div className="slider-container container pb-1">
      <DefaultSectionTitle title="Related Products" subtitle="" showButton={false} />
      <div className="relative overflow-hidden" ref={emblaRef}>
        <div className="flex gap-4">
          {products.map((product, index) => (
            <div
              key={`product-${product.name}-${index}`}
              className="flex-[0_0_80%] px-1 sm:flex-[0_0_50%] md:flex-[0_0_33.33%]"
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default RelatedProductSlider
