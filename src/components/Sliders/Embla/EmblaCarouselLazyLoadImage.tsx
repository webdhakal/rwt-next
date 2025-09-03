import { Link } from '@inertiajs/react'
import React, { useState, useCallback } from 'react'

type LazyLoadImageProps = {
  imgSrc: string
  inView: boolean
  index: number
  href: string
}

export const LazyLoadImage: React.FC<LazyLoadImageProps> = ({ imgSrc, inView, index, href }) => {
  const [hasLoaded, setHasLoaded] = useState(false)
  const handleLoad = useCallback(() => {
    setHasLoaded(true)
  }, [])

  return (
    <Link href={href} className="embla__slide relative w-full flex-shrink-0">
      <div className="relative">
        <img
        // object-contain (Mar-10 google sheets.)
          className={`h-[600px] w-[1600px] object-cover transition-opacity duration-500 ${
            hasLoaded ? 'opacity-100' : 'opacity-0'
          }`}
          onLoad={handleLoad}
          src={inView ? imgSrc : 'https://placehold.co/1600x400?text=Loading...'}
          alt={`Slide ${index}`}
          loading="lazy"
        />
      </div>
    </Link>
  )
}
