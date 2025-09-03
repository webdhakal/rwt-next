import { cn } from '@/shadcn/lib/utils'
import { Button } from '@/shadcn/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/ui/dialog'
import { Input } from '@/shadcn/ui/input'
import { Tabs, TabsContent } from '@/shadcn/ui/tabs'
import InputError from '../InputError'
import { useEffect, useState } from 'react'
import { X } from 'lucide-react'
import { Progress } from '@/shadcn/ui/progress'

export interface ImageUploaderProps<T> {
  className?: string
  buttonName?: string
  data: T
  setData: (name: string, data: File[]) => void
  allowMultiple?: boolean
  uploadProgress?: number
  error?: string
}

const ImageUploader = <T,>({
  className,
  buttonName,
  data,
  setData,
  allowMultiple = false,
  uploadProgress,
  error
}: ImageUploaderProps<T>) => {
  const [openDialog, setOpenDialog] = useState(false)

  const [files, setFiles] = useState<File[]>([])
  const [previewURLs, setPreviewURLs] = useState<string[]>([])

  useEffect(() => {
    const urls = files.map(file => URL.createObjectURL(file))
    setPreviewURLs(urls)

    return () => {
      urls.forEach(url => URL.revokeObjectURL(url))
    }
  }, [files])

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = e.target.files ? Array.from(e.target.files) : []
    if (selectedFiles.length === 0) return

    const updatedFiles = [...files, ...selectedFiles]
    setFiles(updatedFiles)
    setData('files', updatedFiles)
    setOpenDialog(false)
  }

  const handleRemoveImage = (index: number) => {
    const updatedFiles = [...files]
    updatedFiles.splice(index, 1)
    setFiles(updatedFiles)
    setData('files', updatedFiles)
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className='mt-2'>
        {uploadProgress !== undefined && <Progress value={uploadProgress * 100} />}
      </div>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        {!(!allowMultiple && files.length === 1) && <DialogTrigger asChild>
          {buttonName ? (
            <Button>{buttonName}</Button>
          ) : (
            <div className="cursor-pointer rounded-md border-2 border-dashed border-gray-300 p-6 text-center transition hover:bg-gray-50">
              <p className="font-semibold">Click Files to Upload</p>
              <p className="mt-2 text-sm text-gray-500">
                Dimension of the logo image should be 600 x 600px
              </p>
            </div>
          )}
        </DialogTrigger>}

        {previewURLs.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {previewURLs.map((url, index) => (
              <Dialog key={index}>
                <DialogTrigger asChild>
                  <div className="relative border rounded-md overflow-hidden cursor-pointer">
                    <img
                      src={url}
                      alt={`Preview ${index}`}
                      className="w-full size-24 object-cover"
                    />
                    <Button
                      type="button"
                      size="icon"
                      className="absolute size-fit top-2 right-2 bg-white text-red-500 p-1 rounded-full shadow z-10"
                      variant="ghost"
                      onClick={(e) => {
                        e.stopPropagation()
                        handleRemoveImage(index)
                      }}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </DialogTrigger>

                <DialogContent className="max-w-4xl p-4">
                  <img src={url} alt={`Full preview ${index}`} className="w-full h-auto rounded-md" />
                </DialogContent>
              </Dialog>
            ))}
          </div>
        )}


        <InputError message={error} />

        <DialogContent>
          <DialogHeader>
            <DialogTitle>Upload Image</DialogTitle>
            <DialogDescription>
              Choose one or multiple images from your computer
            </DialogDescription>
          </DialogHeader>

          <Tabs defaultValue="upload-files" className="mt-4">
            <TabsContent value="upload-files" className="space-y-4">
              <div>
                <label className="mb-2 block font-medium">Select files to upload:</label>
                <Input
                  type="file"
                  accept="image/jpeg,image/png,image/gif"
                  multiple={allowMultiple}
                  onChange={handleFileChange}
                  className="mt-1 block w-full"
                />
              </div>
            </TabsContent>
          </Tabs>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default ImageUploader
