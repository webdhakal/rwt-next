import { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { Card, CardContent } from '@/shadcn/ui/card'
import { CategoiryList } from '@/types/MockData'
import { useAutoplay } from '@/hooks/useAutoPlay'
import Autoplay from 'embla-carousel-autoplay'
import DefaultSectionTitle from '@/utils/DefaultSectionTitle'

const CategorySlider = ({ categoryData }: { categoryData: CategoiryList[] }) => {
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
    <>
      <DefaultSectionTitle
        title="Explore Categories"
        subtitle="Discover our wide range of products across various categories"
        showButton={false}
        className="lg:hidden"
        subtitleClassName="lg:hidden"
      />
      <div
        className="embla overflow-hidden"
        ref={emblaRef}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <div className="embla__container flex pb-1">
          {categoryData.map((category, index) => (
            <div
              className="embla__slide mx-2 flex-[0_0_50%] md:flex-[0_0_40%] lg:flex-[0_0_30%]"
              key={`category-${category.name}-${index}`}
            >
              <Card className="mx-2">
                <CardContent className="flex h-40 flex-col items-center justify-center p-4">
                  <category.icon className="mb-4 text-4xl text-primary" />
                  <h3 className="text-center text-sm font-semibold">{category.name}</h3>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}

export default CategorySlider
