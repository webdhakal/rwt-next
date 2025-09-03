import {
  DiAndroid,
  DiAngularSimple,
  DiAppcelerator,
  DiAppstore,
  DiAptana,
  DiAsterisk,
  DiAtlassian,
  DiAtom,
  DiAws,
  DiBackbone,
} from 'react-icons/di'
import { motion, useAnimation } from 'motion/react'
import { Link } from '@inertiajs/react'
import { useEffect } from 'react'

function SliderContent() {
  const content = [
    { img: <DiAndroid />, link: '#' },
    { img: <DiAngularSimple />, link: '#' },
    { img: <DiAppcelerator />, link: '#' },
    { img: <DiAppstore />, link: '#' },
    { img: <DiAptana />, link: '#' },
    { img: <DiAsterisk />, link: '#' },
    { img: <DiAtlassian />, link: '#' },
    { img: <DiAtom />, link: '#' },
    { img: <DiAws />, link: '#' },
    { img: <DiBackbone />, link: '#' },
  ]

  return (
    <>
      {content.map((item, index) => (
        <Link key={index} href={item.link} className="ml-16 text-5xl md:text-6xl lg:text-7xl">
          {item.img}
        </Link>
      ))}
    </>
  )
}

const InfiniteSlider = () => {
  const controls = useAnimation()

  const startAnimation = () => {
    controls.start({ x: '-100%', transition: { duration: 20, repeat: Infinity, ease: 'linear' } })
  }

  useEffect(() => {
    startAnimation()
  }, [])

  return (
    <div className="container my-12">
      <div
        className="mask-gradient flex overflow-hidden bg-gradient-to-r from-white via-transparent to-white dark:from-transparent"
        onMouseEnter={() => controls.stop()}
        onMouseLeave={startAnimation}
      >
        {[...Array(2)].map((_, i) => (
          <motion.div
            key={`infinite-slider-${i}`}
            className="flex flex-shrink-0"
            animate={controls}
          >
            <SliderContent />
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default InfiniteSlider
