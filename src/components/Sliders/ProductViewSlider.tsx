import { useRef, useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { AspectRatio } from '@/shadcn/ui/aspect-ratio'
import { ProductType } from '@/types/Product'
import ZoomableImage from '../ZoomableImage'
import { cn } from '@/shadcn/lib/utils'

const ProductViewSlider = ({ product }: { product: ProductType }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [emblaRefNav, emblaApiNav] = useEmblaCarousel({
    containScroll: 'keepSnaps',
    dragFree: true,
  })

  useEffect(() => {
    if (!emblaApiNav) return

    emblaApiNav.on('select', () => {
      const selectedIndex = emblaApiNav.selectedScrollSnap()
      setCurrentIndex(selectedIndex)
    })
  }, [emblaApiNav])

  const handleThumbnailClick = (index: number) => {
    if (emblaApiNav) emblaApiNav.scrollTo(index)
    setCurrentIndex(index)
  }

  return (
    <div>
      <div className="mb-3">
        <ZoomableImage
          src={product.gallery[currentIndex].imageUrl}
          alt={product.name}
          zoomScale={2.5}
          imgClassName="w-full h-[500px]"
        />
      </div>

      <div className="slider-nav mt-3" ref={emblaRefNav}>
        <div className="embla__container flex-center overflow-hidden">
          {product.gallery.map((image, idx) => (
            <div
              key={`nav-${idx}`}
              className={cn(
                'embla__slide w-1/4 cursor-pointer p-1',
                idx === currentIndex ? 'border-2 border-primary' : '',
              )}
              onClick={() => handleThumbnailClick(idx)}
            >
              <AspectRatio ratio={1}>
                <img
                  src={image.imageUrl}
                  alt={`Thumbnail ${idx}`}
                  className="mx-auto h-full w-full object-cover"
                  loading="lazy"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductViewSlider
