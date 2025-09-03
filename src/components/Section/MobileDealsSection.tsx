import { useAutoplay } from '@/hooks/useAutoPlay'
import { Button } from '@/shadcn/ui/button'
import { CategoiryList } from '@/types/MockData'
import Autoplay from 'embla-carousel-autoplay'
import useEmblaCarousel from 'embla-carousel-react'
import { Smartphone, Tags } from 'lucide-react'
import { useEffect, useState } from 'react'
import { cartProducts } from '@/MOCK_DATA'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/shadcn/lib/utils'
const AppExlusiveCard = ({ product }: { product: any }) => {
  return (
    <div className="mx-2 flex h-full flex-col bg-white text-black shadow-md transition-shadow duration-300 hover:shadow-xl">
      <div className="h-48 overflow-hidden">
        <img src={product.productImage} alt={product.name} className="h-full w-full object-cover" />
      </div>
      <div className="flex flex-1 items-center justify-center p-4">
        <span className="text-center text-lg font-bold">{product.name}</span>
      </div>
    </div>
  )
}

const MobileDealsSection = () => {
  const { callbackRef, isVisible } = useIntersectionObserver()
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ playOnInit: false, delay: 4000 }),
  ])
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const { stopAutoPlay, startAutoPlay } = useAutoplay(emblaApi)

  useEffect(() => {
    if (!emblaApi) return

    const onSelect = () => {
      setActiveSlide(emblaApi.selectedScrollSnap())
    }
    startAutoPlay()
    emblaApi.on('select', onSelect)

    return () => {
      emblaApi.off('select', onSelect)
    }
  }, [emblaApi])
  return (
    <div
      ref={callbackRef}
      className={cn('bg-black opacity-0', isVisible && 'animate-slideInFromBottom')}
    >
      <div className="container mb-4 mt-8 md:hidden">
        <div className="flex items-center gap-2 pt-4 text-xl font-bold text-yellow-500">
          <Smartphone className="h-6 w-6" />
          <span>App Exclusive</span>
        </div>
      </div>
      <section className="container my-6 flex py-4 md:py-8">
        <div className="hidden w-[300px] flex-col justify-between pr-6 text-white md:flex">
          <div>
            <span className="flex gap-2 font-bold text-yellow-500">
              <Smartphone />
              <span>App Exclusive</span>
            </span>
            <span className="mt-8 flex items-center gap-2 text-2xl font-bold uppercase text-yellow-500">
              <Tags />
              <span>drops</span>
            </span>
            <p className="mt-2">
              Snag limited products release and additional savings - only in the app.
            </p>
          </div>
          <Button className="mt-4 w-full">Get the app</Button>
        </div>
        <div className="w-full text-white">
          <div
            className="embla h-full overflow-hidden"
            ref={emblaRef}
            onMouseEnter={stopAutoPlay}
            onMouseLeave={startAutoPlay}
          >
            <div className="embla__container flex h-full pb-1">
              {cartProducts.map((product, index) => (
                <div
                  className="embla__slide h-full flex-[0_0_80%] sm:flex-[0_0_60%] md:flex-[0_0_45%] lg:flex-[0_0_30%] xl:flex-[0_0_25%]"
                  key={`category-${product.name}-${index}`}
                >
                  <AppExlusiveCard product={product} />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default MobileDealsSection
