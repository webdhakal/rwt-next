import React, { useState, useCallback } from "react";
import Image, { ImageProps, StaticImageData } from "next/image";

// Define the props interface
interface AppImageProps extends Omit<ImageProps, "src" | "alt"> {
  src: string | StaticImageData;
  alt: string; // Make alt required for accessibility
  className?: string;
  fallbackSrc?: string; // Optional fallback image
  priority?: boolean; // Explicitly handle priority
  sizes?: string; // Add sizes for responsive images
}

// Default fallback image
const DEFAULT_FALLBACK_SRC = "/assets/images/no_image.png";

function AppImage({
  src,
  alt,
  className = "",
  fallbackSrc = DEFAULT_FALLBACK_SRC,
  priority = false,
  sizes = "100vw", // Default for full-width images
  ...props
}: AppImageProps) {
  const [imgSrc, setImgSrc] = useState<string | StaticImageData>(src);

  // Handle image error with a memoized callback to prevent re-renders
  const handleError = useCallback(() => {
    setImgSrc(fallbackSrc);
  }, [fallbackSrc]);

  return (
    <Image
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      layout="fill" // Default for HeroBanner compatibility
      objectFit="cover" // Default for HeroBanner
      quality={75} // Optimize image quality
      priority={priority}
      sizes={sizes} // Responsive sizes
      placeholder="blur" // Add blur placeholder for better UX
      blurDataURL={
        typeof imgSrc === "string" ? imgSrc : DEFAULT_FALLBACK_SRC
      } // Fallback for StaticImageData
      {...props}
    />
  );
}

export default AppImage;