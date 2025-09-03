import React, { useRef, forwardRef, useImperativeHandle } from 'react'
import { cn } from '@/shadcn/lib/utils'
import { Button } from '@/shadcn/ui/button'
import { Input } from '@/shadcn/ui/input'

interface ImageUploaderProps {
  className?: string
  buttonName?: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  name: string
  imageUploaderTitle?: string
  imageUploaderDescription?: string
}

const ClientSideSingleImageUploader = forwardRef<HTMLInputElement, ImageUploaderProps>(
  (
    {
      className,
      buttonName,
      onChange,
      name,
      imageUploaderTitle = 'Upload Image',
      imageUploaderDescription = 'Dimension of the image should be 600 x 600',
    },
    ref,
  ) => {
    const internalRef = useRef<HTMLInputElement>(null)

    useImperativeHandle(ref, () => internalRef.current as HTMLInputElement)

    const handleClick = () => {
      if (internalRef.current) {
        internalRef.current.click()
      }
    }
    return (
      <div className={cn('space-y-4', className)}>
        {buttonName ? (
          <Button onClick={handleClick}>{buttonName}</Button>
        ) : (
          <div
            onClick={handleClick}
            className="cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-6 text-center transition hover:bg-gray-50"
          >
            <p className="font-semibold">{imageUploaderTitle}</p>
            <p className="mt-2 text-sm text-gray-500">{imageUploaderDescription}</p>
          </div>
        )}
        <Input
          type="file"
          name={name}
          onChange={onChange}
          ref={internalRef}
          style={{ display: 'none' }} 
          className="border-none shadow-none"
        />
      </div>
    )
  },
)

ClientSideSingleImageUploader.displayName = 'ClientSideSingleImageUploader'
export default ClientSideSingleImageUploader
