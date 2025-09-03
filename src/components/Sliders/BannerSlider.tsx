import { useState, useEffect } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import { bannerSlider } from '@/MOCK_DATA'
import { Button } from '@/shadcn/ui/button'
import Autoplay from 'embla-carousel-autoplay'
import { Badge } from '@/shadcn/ui/badge'
import { cn } from '@/shadcn/lib/utils'
import { useAutoplay } from '@/hooks/useAutoPlay'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import Typewriter from 'typewriter-effect'
import { AnimatedSection } from '../AnimatedSection'

interface BannerSliderItem {
  subtitle: string
  title: string
  slug: string
  buttonText: string
  image: string
}

const BannerSlider = () => {
  const [activeSlide, setActiveSlide] = useState<number>(0)
  const { callbackRef, isVisible } = useIntersectionObserver(0.3)
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
    },
    [Autoplay({ playOnInit: false, delay: 5000 })],
  )
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
    <AnimatedSection
      className={cn(
        'relative my-4 h-fit w-full bg-ashGray py-5 dark:bg-slate-900',
      )}
    // style={{ animationDelay: '500ms' }}
    // only add the above style if this is made the second component in the home page (i.e. after the image banner)
    >
      <div
        className="container relative w-full overflow-hidden"
        onMouseEnter={stopAutoPlay}
        onMouseLeave={startAutoPlay}
        ref={callbackRef}
      >
        <div className="embla" ref={emblaRef}>
          <div className="embla__container flex gap-4">
            {bannerSlider.map((item: BannerSliderItem, index: number) => (
              <div className="embla__slide mx-2 flex-[0_0_100%]" key={index}>
                <div className="relative grid h-full grid-cols-1 place-items-center gap-2 py-6 md:grid-cols-[450px_auto] md:justify-between md:justify-items-start">
                  <div className="order-2 flex-col space-y-2 text-center md:order-1 md:text-left">
                    <h2 className="text-2xl font-bold lg:text-5xl">
                      <Typewriter
                        options={{
                          loop: true,
                          autoStart: true,
                        }}
                        onInit={(typewriter) => {
                          const formattedText = item.title
                            .split(' ')
                            .map((word, i) =>
                              i === 1 ? `<span class="text-primary">${word}</span>` : word,
                            )
                            .join(' ')

                          typewriter.typeString(formattedText).pauseFor(5000).deleteAll().start()
                        }}
                      />
                    </h2>
                    <p className="py-4 font-secondary text-slate-500">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore modi
                      facilis, provident est sint culpa excepturi maxime natus voluptate eius.
                    </p>
                    <Button href="#" className="font-secondary">
                      {item.buttonText}
                    </Button>
                  </div>
                  <div className="relative order-1 mx-auto h-full self-stretch">
                    <img
                      src={item.image}
                      loading="lazy"
                      alt="Banner image"
                      className="h-[250px] rounded-md object-cover sm:h-[300px] md:h-[350px] lg:h-[450px]"
                    />
                    <Badge
                      className="absolute right-4 top-4 z-9999 text-center text-xs font-normal text-white md:rounded-md md:text-sm"
                      variant="secondary"
                    >
                      {item.subtitle}
                    </Badge>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="container absolute bottom-0 hidden w-full space-x-1 md:absolute md:bottom-0 md:left-0 md:block">
          {Array.from({ length: bannerSlider.length }, (_, index) => (
            <button
              key={index}
              onClick={() => emblaApi && emblaApi.scrollTo(index)}
              className={cn(
                'h-4 origin-center -skew-x-12 transform cursor-pointer ease-in-out',
                index === activeSlide
                  ? 'w-15 scale-100 bg-primary'
                  : 'w-4 scale-90 bg-black/40 hover:scale-95 hover:bg-black/60 dark:bg-slate-200/40 dark:hover:bg-slate-200/60',
              )}
              style={{
                transition: 'background 0.3s ease, transform 0.3s ease',
              }}
            />
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default BannerSlider
