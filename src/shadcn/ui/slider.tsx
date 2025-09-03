import * as React from 'react'
import * as SliderPrimitive from '@radix-ui/react-slider'

import { cn } from '@/shadcn/lib/utils'

interface SliderTrackProp extends React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root> {
  doubleKnob?: boolean
}

const Slider = React.forwardRef<
  React.ElementRef<typeof SliderPrimitive.Root>,
  // React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
  SliderTrackProp
>(({ doubleKnob = false, color, className, ...props }, ref) =>
  doubleKnob ? (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="relative h-2 w-full grow overflow-hidden rounded-full bg-secondary">
        <SliderPrimitive.Range className={cn('absolute h-full', `bg-${color}`)} />
      </SliderPrimitive.Track>
      {props.defaultValue?.map((_, index) => (
        <SliderPrimitive.Thumb
          key={index}
          className={cn(
            'block h-5 w-5 rounded-full border-2 bg-background ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
            `border-${color}`,
          )}
        />
      ))}
    </SliderPrimitive.Root>
  ) : (
    <SliderPrimitive.Root
      ref={ref}
      className={cn('relative flex w-full touch-none select-none items-center', className)}
      {...props}
    >
      <SliderPrimitive.Track className="bg-primary/20 relative h-1.5 w-full grow overflow-hidden rounded-full">
        <SliderPrimitive.Range className={cn('absolute h-full', color)} />
      </SliderPrimitive.Track>
      <SliderPrimitive.Thumb className="border-primary/50 block h-4 w-4 rounded-full border bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
    </SliderPrimitive.Root>
  ),
)
Slider.displayName = SliderPrimitive.Root.displayName

export { Slider }
