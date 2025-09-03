import { cn } from '@/shadcn/lib/utils';
import { HTMLAttributes, ReactNode, useEffect, useRef, useState } from 'react';

type AnimationType = 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'zoom-out';

interface AnimatedSectionProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
  delay?: number;
  threshold?: number;
}

export function AnimatedSection({ children, className, animation = 'fade-up', delay = 0, threshold = 0.1, ...props }: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -100px 0px',
      },
    );

    const currentRef = ref.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [threshold]);

  const animations: Record<AnimationType, string> = {
    'fade-up': 'translate-y-10 opacity-0',
    'fade-down': 'translate-y-[-10px] opacity-0',
    'fade-left': 'translate-x-[-10px] opacity-0',
    'fade-right': 'translate-x-10 opacity-0',
    'zoom-in': 'scale-95 opacity-0',
    'zoom-out': 'scale-105 opacity-0',
  };

  return (
    <div
      ref={ref}
      className={cn('transition-all duration-700 ease-out', isVisible ? '' : animations[animation], isVisible ? '' : 'transform', className)}
      style={{ transitionDelay: `${delay}ms` }}
      {...props}
    >
      {children}
    </div>
  );
}

