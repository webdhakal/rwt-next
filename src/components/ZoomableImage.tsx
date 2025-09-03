import { cn } from '@/shadcn/lib/utils'
import { ZoomableImageProps } from '@/types/MockData'
import { useState } from 'react'

const ZoomableImage: React.FC<ZoomableImageProps> = ({
  src,
  alt,
  className = '',
  imgClassName = '',
  zoomScale = 1.5,
}) => {
  const [transformOrigin, setTransformOrigin] = useState('50% 50%')
  const [isHovered, setIsHovered] = useState(false)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - left) / width) * 100
    const y = ((e.clientY - top) / height) * 100
    setTransformOrigin(`${x}% ${y}%`)
  }

  return (
    <div
      className={cn('overflow-hidden', className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false)
        setTransformOrigin('50% 50%')
      }}
    >
      <img
        src={src}
        alt={alt}
        className={cn('duration-250 transition-transform ease-in-out object-contain', imgClassName)}
        style={{
          transform: isHovered ? `scale(${zoomScale})` : 'scale(1)',
          transformOrigin,
        }}
      />
    </div>
  )
}

export default ZoomableImage
