import { Button } from '@/shadcn/ui/button'
import { CloseButtonProps } from '@/types'
import { Circle } from 'lucide-react'
import React from 'react'

const CloseButton = ({ onClick }: CloseButtonProps) => {
  return (
    <>
      <Button variant="close" size="close" onClick={onClick}>
        <Circle size="icon" />
      </Button>
    </>
  )
}

export default CloseButton
