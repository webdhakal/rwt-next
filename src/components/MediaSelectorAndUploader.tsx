import { ChangeEvent, useEffect, useState } from 'react'
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from '@/shadcn/ui/dialog'
import { Button } from '@/shadcn/ui/button'
import { Input } from '@/shadcn/ui/input'
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/shadcn/ui/tabs'
import { Image, Video, File, HardDriveUpload, X } from 'lucide-react'
import { cn } from '@/shadcn/lib/utils'
import { Label } from '@/shadcn/ui/label'
import { Truncate } from '@/Libs/Helper'

export type MediaType = {
  id: string
  url: string
  name?: string
  alt?: string
  type: string
}

type BrandFormData = {
  name: string
  description: string
  status: boolean
  files: File[]
}

type MediaSelectorAndUploaderProps = {
  setData: <K extends keyof BrandFormData>(key: K, value: BrandFormData[K]) => void
  images: MediaType[]
  videos: MediaType[]
  files: MediaType[]
  uploadedMedias?: MediaType[]
  onConfirm?: () => void
}

const SelectableMediaCard = ({
  media,
  isSelected,
  onClick,
}: {
  media: MediaType
  isSelected: boolean
  onClick?: () => void
}) => (
  <img
    src={media.url}
    alt={media.alt || media.name || 'Media'}
    onClick={onClick}
    className={cn(
      'aspect-square cursor-pointer rounded-md border object-cover transition-all',
      isSelected ? 'border-primary ring-2 ring-primary' : 'border-muted',
    )}
  />
)

const MediaSelectorAndUploader = ({
  setData,
  images = [],
  videos = [],
  files = [],
  uploadedMedias = [],
}: MediaSelectorAndUploaderProps) => {
  const [mediaURL, setMediaURL] = useState<string>('')
  const [selectedGalleryItem, setSelectedGalleryItem] = useState<Array<string>>([])
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([])
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

  const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files
    if (!selectedFile) return
    setUploadedFiles(Array.from(selectedFile))
  }

  const handleFileRemoval = (index: number) => {
    setUploadedFiles((prev) => prev.filter((_, i) => i !== index))
  }

  const handleFileSubmission = () => {
    if (uploadedFiles && uploadedFiles.length > 0) {
      setData('files', uploadedFiles)
      console.log('files upated')
    } else if (mediaURL) {
      // handle after backend changes.
      console.log(mediaURL)
    } else if (selectedGalleryItem && selectedGalleryItem.length > 0) {
      // handle after backend changes.
      console.log(selectedGalleryItem)
    }
  }

  useEffect(() => {}, [uploadedFiles])

  return (
    <Dialog open={isDialogOpen} onOpenChange={() => setIsDialogOpen(!isDialogOpen)}>
      <Label className="mt-1 block text-sm font-medium text-muted-foreground">Media</Label>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="hover:bg-muted/40 flex w-full items-center gap-2 rounded-lg border-2 border-dashed border-muted-foreground px-4 py-2 text-sm"
          onClick={() => setIsDialogOpen(true)}
        >
          <Image className="h-4 w-4 text-muted-foreground" />
          <span>Upload Media</span>
        </Button>
      </DialogTrigger>
      <div className="grid grid-cols-3 gap-2">
        {uploadedMedias.length > 0 ? (
          uploadedMedias.map((media) => (
            <SelectableMediaCard
              key={media.id}
              media={media}
              isSelected={selectedGalleryItem.includes(media.url)}
              // onClick={() => setSelectedGalleryItem((prev) => [...prev, media.url])} // probably something like a large preview
            />
          ))
        ) : (
          <p className="col-span-full text-center text-muted-foreground">
            No media has been uploaded.
          </p>
        )}
      </div>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Select Media</DialogTitle>
          <DialogDescription>Paste a media URL or choose from your gallery.</DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="url" className="mt-4 w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="url">URL</TabsTrigger>
            <TabsTrigger value="gallery">Gallery</TabsTrigger>
            <TabsTrigger value="upload">Upload</TabsTrigger>
          </TabsList>

          <TabsContent value="url" className="mt-4 space-y-4">
            <Input
              placeholder="Paste image URL"
              value={mediaURL}
              onChange={(e) => setMediaURL(e.target.value)}
            />
            {mediaURL && <img src={mediaURL} alt="Preview" className="rounded-md" />}
          </TabsContent>

          <TabsContent value="gallery" className="mt-4">
            <Tabs defaultValue="images">
              <TabsList className="mb-2 grid w-full grid-cols-3">
                <TabsTrigger value="images">
                  <Image className="mr-1 h-4 w-4" /> Images
                </TabsTrigger>
                <TabsTrigger value="videos">
                  <Video className="mr-1 h-4 w-4" /> Videos
                </TabsTrigger>
                <TabsTrigger value="files">
                  <File className="mr-1 h-4 w-4" /> Files
                </TabsTrigger>
              </TabsList>

              <TabsContent value="images" className="grid grid-cols-3 gap-2">
                {images.length > 0 ? (
                  images.map((media) => (
                    <SelectableMediaCard
                      key={media.id}
                      media={media}
                      isSelected={selectedGalleryItem.includes(media.url)}
                      onClick={() =>
                        setSelectedGalleryItem((prev) =>
                          prev.includes(media.url)
                            ? prev.filter((prevMediaUrl) => prevMediaUrl !== media.url)
                            : [...prev, media.url],
                        )
                      }
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground">
                    No images found.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="videos" className="grid grid-cols-3 gap-2">
                {videos.length > 0 ? (
                  videos.map((media) => (
                    <SelectableMediaCard
                      key={media.id}
                      media={media}
                      isSelected={selectedGalleryItem.includes(media.url)}
                      onClick={() => setSelectedGalleryItem((prev) => [...prev, media.url])}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground">
                    No videos found.
                  </p>
                )}
              </TabsContent>

              <TabsContent value="files" className="grid grid-cols-3 gap-2">
                {files.length > 0 ? (
                  files.map((media) => (
                    <SelectableMediaCard
                      key={media.id}
                      media={media}
                      isSelected={selectedGalleryItem.includes(media.url)}
                      onClick={() => setSelectedGalleryItem((prev) => [...prev, media.url])}
                    />
                  ))
                ) : (
                  <p className="col-span-full text-center text-muted-foreground">No files found.</p>
                )}
              </TabsContent>
            </Tabs>
          </TabsContent>

          <TabsContent value="upload">
            <div className="flex cursor-pointer flex-col items-center justify-center rounded-2xl border-2 border-dashed border-gray-300 p-6 text-center transition hover:border-blue-400">
              <label
                htmlFor="file-upload"
                className="flex-center cursor-pointer flex-col gap-3 font-medium text-gray-500 hover:text-blue-500"
              >
                <HardDriveUpload />
                Click to upload or drag and drop
                <p className="mt-1 text-xs text-gray-400">PNG, JPG, PDF up to 10MB</p>
              </label>
              <input
                id="file-upload"
                multiple
                type="file"
                className="hidden"
                onChange={handleFileUpload}
              />
            </div>
            {uploadedFiles.length > 0 && (
              <div className="mt-4">
                <h3 className="mb-2 text-sm font-semibold text-gray-700">Selected Files:</h3>
                <ul className="list-inside list-disc space-y-2 text-sm text-gray-600">
                  {uploadedFiles.map((uploads, index) => (
                    <li key={index} className="grid grid-cols-2">
                      {Truncate(uploads.name)} ({Math.round(uploads.size / 1024)} KB)
                      <span onClick={() => handleFileRemoval(index)}>
                        <X
                          size={24}
                          className="ml-2 rounded-md border p-[3px] hover:border-transparent hover:bg-red hover:text-white"
                        />
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </TabsContent>
        </Tabs>

        <DialogFooter className="mt-4">
          <Button
            type="submit"
            onClick={() => {
              setIsDialogOpen(false)
              handleFileSubmission()
            }}
          >
            Confirm
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

export default MediaSelectorAndUploader
