import { useState } from 'react'
import { Copy } from 'lucide-react'
import { Button } from '@/shadcn/ui/button'
import { toast } from 'sonner'

interface CopyButtonProps {
  text?: string
  className?: string
}

export function Clipboard({ text = '', className }: CopyButtonProps) {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    await navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Button variant="outline" size="sm" className={className} onClick={copyToClipboard}>
      <Copy className="mr-2 h-4 w-4" />
      {copied ? 'Copied!' : 'Copy to Clipboard'}
    </Button>
  )
}
