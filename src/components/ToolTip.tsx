import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/shadcn/ui/tooltip'
import { ReactNode } from 'react'

const ToolTip = ({ children, toolTipContent }: { children: ReactNode; toolTipContent: string }) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>{toolTipContent}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

export default ToolTip
