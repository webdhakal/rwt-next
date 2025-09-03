// Unused component as of now.
import { useRef } from 'react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import { mockProducts as products } from '@/MOCK_DATA'
import { AspectRatio } from '@/shadcn/ui/aspect-ratio'

const OrderTrackingSlider = () => {
  const sliderForRef = useRef<Slider | null>(null)
  const sliderNavRef = useRef<Slider | null>(null)

  const settingsFor: Settings = {
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: sliderNavRef.current ?? undefined,
  }

  const settingsNav: Settings = {
    autoplay: true,
    autoplaySpeed: 4000,
    slidesToShow: 4,
    slidesToScroll: 1,
    asNavFor: sliderForRef.current ?? undefined,
    dots: false,
    focusOnSelect: true,
  }

  return (
    <>
      <div className="">
        <div className="slider-nav">
          <Slider ref={sliderNavRef} {...settingsNav} className="!flex flex-col">
            {products.map((product) => (
              <div key={`nav-${product.id}`} className="w-full">
                <AspectRatio ratio={1}>
                  <img
                    src={product.imageUrl}
                    alt={`Thumbnail ${product.id}`}
                    className="mx-auto h-full w-[95%] rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            ))}
          </Slider>
        </div>
        <div className="slider-for">
          <Slider ref={sliderForRef} {...settingsFor}>
            {products.map((product) => (
              <div key={`for-${product.id}`} className="h-full w-full">
                <AspectRatio ratio={16 / 9}>
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="h-full w-full rounded-md object-cover"
                  />
                </AspectRatio>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </>
  )
}

export default OrderTrackingSlider
