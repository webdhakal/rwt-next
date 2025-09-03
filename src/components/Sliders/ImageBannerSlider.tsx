import React, { useCallback, useEffect, useState } from 'react'
import { EmblaCarouselType, EmblaOptionsType } from 'embla-carousel'
import useEmblaCarousel from 'embla-carousel-react'
import { LazyLoadImage } from './Embla/EmblaCarouselLazyLoadImage'
import { randomImage } from '@/Libs/Helper'
import { Button } from '@/shadcn/ui/button'
import { cn } from '@/shadcn/lib/utils'
import Autoplay from 'embla-carousel-autoplay'
import { useAutoplay } from '@/hooks/useAutoPlay'
import bannerImage1 from '../../../../public/images/bannerImages/bannerImage1.png'
import bannerImage2 from '../../../../public/images/bannerImages/bannerImage2.png'
import bannerImage3 from '../../../../public/images/bannerImages/bannerImage3.png'
import bannerImage4 from '../../../../public/images/bannerImages/bannerImage4.png'
import bannerImage5 from '../../../../public/images/bannerImages/bannerImage5.png'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { AnimatedSection } from '../AnimatedSection'

const ImageBannerSlider = () => {
  const slides = [
    { image: bannerImage1, link: '#' },
    { image: bannerImage2, link: '#' },
    { image: bannerImage3, link: '#' },
    { image: bannerImage4, link: '#' },
    { image: bannerImage5, link: '#' },
  ]
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ playOnInit: false, delay: 3000 })],
  )
  const [slidesInView, setSlidesInView] = useState<number[]>([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([])
  const { callbackRef, isVisible } = useIntersectionObserver()
  const updateSlidesInView = useCallback((embla: EmblaCarouselType) => {
    const inView = embla.slidesInView()
    setSlidesInView((prev) => Array.from(new Set([...prev, ...inView])))
  }, [])

  const { stopAutoPlay, startAutoPlay } = useAutoplay(emblaApi)

  useEffect(() => {
    if (!emblaApi) return
    setScrollSnaps(emblaApi.scrollSnapList())
    setSelectedIndex(emblaApi.selectedScrollSnap())
    updateSlidesInView(emblaApi)
    startAutoPlay()
    emblaApi.on('select', () => setSelectedIndex(emblaApi.selectedScrollSnap()))
    emblaApi.on('slidesInView', updateSlidesInView)
  }, [emblaApi, updateSlidesInView])

  const scrollToSlide = useCallback(
    (index: number) => {
      if (!emblaApi) return
      emblaApi.scrollTo(index)
    },
    [emblaApi],
  )

  //   const scrollPrev = useCallback(() => {
  //     if (!emblaApi) return
  //     emblaApi.scrollPrev()
  //   }, [emblaApi])

  //   const scrollNext = useCallback(() => {
  //     if (!emblaApi) return
  //     emblaApi.scrollNext()
  //   }, [emblaApi])

  return (
    <AnimatedSection>
      <div
        className={cn(
          'embla container relative my-4 w-full overflow-hidden',
        )}
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
      >
        <div className="embla__viewport overflow-hidden shadow-5" ref={emblaRef}>
          <div className="embla__container flex">
            {slides.map((val, index) => (
              <LazyLoadImage
                key={`carousel-slide-${index}`}
                index={index}
                imgSrc={val.image}
                inView={slidesInView.includes(index)}
                href={val.link}
              />
            ))}
          </div>
        </div>
        <div className="mt-4 flex items-center justify-center">
          {/* <Button onClick={scrollPrev} variant="outline" className="p-2">
          Prev
        </Button> */}
          <div className="flex space-x-2">
            {scrollSnaps.map((_, index) => (
              <Button
                key={`dot-${index}`}
                onClick={() => scrollToSlide(index)}
                variant={selectedIndex === index ? 'default' : 'ghost'}
                className={cn(
                  'h-3 w-3 rounded-full p-0',
                  selectedIndex === index ? 'bg-primary' : 'bg-slate-300',
                )}
              >
                <span className="sr-only">Go to slide {index + 1}</span>
              </Button>
            ))}
          </div>
          {/* <Button onClick={scrollNext} variant="outline" className="p-2">
          Next
        </Button> */}
        </div>
      </div>
    </AnimatedSection >
  )
}

export default ImageBannerSlider
