import * as React from 'react'
import * as SwitchPrimitives from '@radix-ui/react-switch'

import { cn } from '@/shadcn/lib/utils'
import InputError from '@/components/InputError'
import { Label } from '@/shadcn/ui/label'

const Switch = React.forwardRef<
  React.ElementRef<typeof SwitchPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof SwitchPrimitives.Root>
>(({ className, ...props }, ref) => (
  <SwitchPrimitives.Root
    className={cn(
      'peer inline-flex h-5 w-9 shrink-0 cursor-pointer items-center rounded-full border-2 border-transparent shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:cursor-not-allowed disabled:opacity-50 data-[state=checked]:bg-primary data-[state=unchecked]:bg-input',
      className,
    )}
    {...props}
    ref={ref}
  >
    <SwitchPrimitives.Thumb
      className={cn(
        'pointer-events-none block h-4 w-4 rounded-full bg-background shadow-lg ring-0 transition-transform data-[state=checked]:translate-x-4 data-[state=unchecked]:translate-x-0',
      )}
    />
  </SwitchPrimitives.Root>
))
Switch.displayName = SwitchPrimitives.Root.displayName

interface SwitchWithLabelProps {
  label: string
  labelclassName?: string
  checked: boolean
  onCheckedChange: (checked: boolean) => void
  error?: string
}

const SwitchWithLabel: React.FC<SwitchWithLabelProps> = ({
  label,
  labelclassName,
  checked,
  onCheckedChange,
  error,
}) => {
  return (
    <div>
      <div className={cn('flex items-center gap-2 p-2')}>
        <Switch checked={checked} onCheckedChange={onCheckedChange} />
        <Label className={cn('text-sm font-medium text-muted-foreground', labelclassName)}>
          {label}
        </Label>
      </div>
      {error && <InputError message={error} />}
    </div>
  )
}

export { Switch, SwitchWithLabel }
