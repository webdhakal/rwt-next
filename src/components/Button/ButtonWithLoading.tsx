import { LoaderCircle } from 'lucide-react'
import { Button, ButtonProps } from '@/shadcn/ui/button'
import { ButtonWithLoadingProps } from '@/types'

export default function ButtonWithLoading({
  className,
  processing,
  label,
  variant,
  onclick,
  ...props
}: ButtonWithLoadingProps) {
  return (
    <Button
      className={className}
      disabled={processing}
      {...props}
      onClick={onclick}
      variant={variant}
    >
      {processing ? (
        <div className="flex items-center gap-2">
          <LoaderCircle className="size-5 animate-spin text-white" />
          {label}
        </div>
      ) : (
        label
      )}
    </Button>
  )
}
