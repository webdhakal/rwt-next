import { useEffect, useState, useCallback } from 'react'
import { FaAngleDoubleUp } from 'react-icons/fa'

const ScrollToTop = () => {
  const [isScrollToTopVisible, setIsScrollToTopVisible] = useState(false)
  const [scrollProgress, setScrollProgress] = useState(0)

  const scrollTop = () => {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
  }

  const handleScroll = useCallback(() => {
    const currentScroll = document.documentElement.scrollTop || document.body.scrollTop
    const totalScrollableHeight =
      document.documentElement.scrollHeight - document.documentElement.clientHeight
    const progress = (currentScroll / totalScrollableHeight) * 100
    setScrollProgress(progress)
    setIsScrollToTopVisible(currentScroll > 250)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return (
    <div className="fixed bottom-4 right-4 md:bottom-22 md:right-7 z-50">
      {isScrollToTopVisible && (
        <div className="relative h-14 w-14">
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="white"
              strokeWidth="6"
              fill="none"
              opacity="0.2"
            />
            <circle
              cx="50"
              cy="50"
              r="40"
              stroke="#5ab27e"
              strokeWidth="6"
              fill="none"
              strokeDasharray="251.2"
              strokeDashoffset={251.2 - (251.2 * scrollProgress) / 100}
              strokeLinecap="round"
              className="transition-all duration-200 ease-linear"
            />
          </svg>
          <FaAngleDoubleUp
            className="absolute left-1/2 top-1/2 size-10 -translate-x-1/2 -translate-y-1/2 cursor-pointer rounded-full bg-primary p-2 text-white"
            onClick={scrollTop}
          />
        </div>
      )}
    </div>
  )
}

export default ScrollToTop
