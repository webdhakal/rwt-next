import { SetStateAction, useCallback, useState, useMemo } from 'react'
import type { MediaType } from '@/types/MockData'
import { Button } from '@/shadcn/ui/button'
import { Input } from '@/shadcn/ui/input'
import { Label } from '@/shadcn/ui/label'
import { useDropzone } from 'react-dropzone'
import { Card, CardContent, CardHeader, CardTitle } from '@/shadcn/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from '@/shadcn/ui/dialog'
import {
  ExternalLink,
  File,
  FileText,
  Image,
  Save,
  Search,
  Trash2,
  Upload,
  Video,
  X,
} from 'lucide-react'
import { ScrollArea } from '@/shadcn/ui/scroll-area'
import { Tabs, TabsList, TabsTrigger } from '@/shadcn/ui/tabs'
import { cn } from '@/shadcn/lib/utils'
import { toast } from 'sonner'
import { router } from '@inertiajs/react'
import { Clipboard } from '@/shadcn/ui/clipboard'
import { Truncate } from '@/Libs/Helper'

// Type definition for Media
// Updated type definition for props
type MediaUploaderProps = {
  images: MediaType[]
  videos: MediaType[]
  files: MediaType[]
}

// File icon mapping for common file types
export const getFileIcon = (mimeType: string) => {
  switch (mimeType) {
    case 'application/pdf':
      return <FileText className="h-12 w-12 text-gray-500" />
    case 'application/msword':
    case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
      return <File className="h-12 w-12 text-blue-500" />
    case 'application/vnd.ms-excel':
    case 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet':
      return <File className="h-12 w-12 text-green-500" />
    case 'application/vnd.ms-powerpoint':
    case 'application/vnd.openxmlformats-officedocument.presentationml.presentation':
      return <File className="h-12 w-12 text-orange-500" />
    case 'text/plain':
      return <File className="h-12 w-12 text-gray-500" />
    case 'application/zip':
    case 'application/x-rar-compressed':
      return <File className="h-12 w-12 text-purple-500" />
    default:
      return <File className="h-12 w-12 text-gray-500" />
  }
}

// MediaCard component for all types
const MediaCard = ({ media, onClick }: { media: MediaType; onClick: () => void }) => (
  <div
    className="group relative aspect-square cursor-pointer overflow-hidden rounded-md border border-gray-200"
    onClick={onClick}
  >
    {media.type?.startsWith('image/') ? (
      <img
        src={media.url}
        alt={media.alt || 'Image'}
        className="h-full w-full object-cover transition-transform group-hover:scale-105"
        loading="lazy"
      />
    ) : media.type?.startsWith('video/') ? (
      <div className="flex h-full w-full items-center justify-center bg-black">
        <video className="h-full w-full object-contain">
          <source src={media.url} type={media.type} />
        </video>
        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2 top-2 rounded-full bg-gray-800 bg-opacity-70 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
          title="Open video in new tab"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    ) : media.type === 'application/pdf' ? (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 p-4">
        <FileText className="h-12 w-12 text-gray-500" />
        <span className="mt-2 truncate text-sm font-medium text-gray-600">{media.name}</span>
        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2 top-2 rounded-full bg-gray-800 bg-opacity-70 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
          title="Open PDF in new tab"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    ) : (
      <div className="flex h-full w-full flex-col items-center justify-center bg-gray-100 p-4">
        {getFileIcon(media.type)}
        <span className="mt-2 truncate text-sm font-medium text-gray-600">{media.name}</span>
        <a
          href={media.url}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute right-2 top-2 rounded-full bg-gray-800 bg-opacity-70 p-2 text-white opacity-0 transition-opacity group-hover:opacity-100"
          title="Open file in new tab"
          onClick={(e) => e.stopPropagation()}
        >
          <ExternalLink className="h-4 w-4" />
        </a>
      </div>
    )}
    <div className="absolute inset-0 flex items-end justify-start bg-black bg-opacity-0 p-2 transition-opacity group-hover:bg-opacity-40">
      <span className="text-sm font-medium text-white opacity-0 transition-opacity group-hover:opacity-100">
        {media.name}
      </span>
    </div>
  </div>
)

// MediaDetailsCard for all types
const MediaDetailsCard = ({
  mediaDetails,
  setMediaDetails,
  onSave,
  onDelete,
}: {
  mediaDetails: MediaType
  setMediaDetails: React.Dispatch<SetStateAction<MediaType | null>>
  onSave: () => void
  onDelete: () => void
}) => {
  const isImage = mediaDetails.type?.startsWith('image/')
  const isVideo = mediaDetails.type?.startsWith('video/')
  const isPDF = mediaDetails.type === 'application/pdf'
  const isOtherFile = !isImage && !isVideo && !isPDF
  return (
    <Dialog open={!!mediaDetails} onOpenChange={(open) => !open && setMediaDetails(null)}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            {isImage ? 'Image' : isVideo ? 'Video' : isPDF ? 'PDF' : 'File'} Details
          </DialogTitle>
          <DialogDescription>
            View or edit details for this{' '}
            {isImage ? 'image' : isVideo ? 'video' : isPDF ? 'PDF' : 'file'}.
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full justify-end">
          <Clipboard text={mediaDetails.url} />
        </div>
        <div className="space-y-4">
          {isImage && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <img
                src={mediaDetails.url}
                alt={mediaDetails.alt || 'Image'}
                className="h-auto max-h-64 w-full rounded-md object-contain"
              />
            </div>
          )}
          {isVideo && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <video controls className="h-auto max-h-64 w-full rounded-md object-contain">
                <source src={mediaDetails.url} type={mediaDetails.type} />
                Your browser does not support the video tag.
              </video>
            </div>
          )}
          {isPDF && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <object
                data={mediaDetails.url}
                type="application/pdf"
                className="h-64 w-full rounded-md"
              >
                <p className="text-sm text-muted-foreground">
                  PDF preview is not supported in this browser.{' '}
                  <a
                    href={mediaDetails.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    View PDF in new tab
                  </a>
                </p>
              </object>
            </div>
          )}
          {isOtherFile && (
            <div className="space-y-2">
              <Label>Preview</Label>
              <div className="flex items-center justify-center rounded-md bg-gray-100 p-4">
                {getFileIcon(mediaDetails.type)}
                <a
                  href={mediaDetails.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="ml-2 text-blue-500 hover:underline"
                >
                  grossesse: 100% Open {mediaDetails.name} in new tab
                </a>
              </div>
            </div>
          )}
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Media name"
              value={mediaDetails.name || ''}
              onChange={(e) => setMediaDetails({ ...mediaDetails, name: e.target.value })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="alt">ALT Text</Label>
            <Input
              id="alt"
              placeholder="Media alt text"
              value={mediaDetails.alt || ''}
              onChange={(e) => setMediaDetails({ ...mediaDetails, alt: e.target.value })}
            />
          </div>
          {isImage && (
            <div className="space-y-2">
              <Label>Dimensions</Label>
              <div className="text-sm text-muted-foreground">
                <p>Height: {mediaDetails.height || 'N/A'}px</p>
                <p>Width: {mediaDetails.width || 'N/A'}px</p>
              </div>
            </div>
          )}
          {(isVideo || isPDF || isOtherFile) && (
            <div className="space-y-2">
              <Label>File Size</Label>
              <div className="text-sm text-muted-foreground">
                <p>{(mediaDetails.size / (1024 * 1024)).toFixed(2)} MB</p>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={onSave}>
              <Save className="mr-2 h-4 w-4" />
              Save
            </Button>
            <Button variant="destructive" onClick={onDelete}>
              <Trash2 className="mr-2 h-4 w-4" />
              Delete
            </Button>
          </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Constants for validation
const MAX_FILE_SIZE = 100 * 1024 * 1024 // 100MB
const MAX_FILES = 10

// AddNewMediaDialog for all types
const AddNewMediaDialog = ({ activeTab }: { activeTab: 'images' | 'videos' | 'files' }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([])
  const [name, setName] = useState('')
  const [alt, setAlt] = useState('')
  const [isUploading, setIsUploading] = useState(false)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [open, setOpen] = useState(false) // Control modal open state

  // File type configuration based on active tab
  const fileTypes = useMemo(() => {
    switch (activeTab) {
      case 'images':
        return {
          accept: {
            'image/jpeg': ['.jpg', '.jpeg'],
            'image/png': ['.png'],
            'image/gif': ['.gif'],
            'image/webp': ['.webp'],
            'image/svg+xml': ['.svg'],
          },
          mimeTypes: ['image/jpeg', 'image/png', 'image/gif', 'image/webp', 'image/svg+xml'],
        }
      case 'videos':
        return {
          accept: {
            'video/mp4': ['.mp4'],
            'video/quicktime': ['.mov'],
            'video/x-msvideo': ['.avi'],
            'video/x-ms-wmv': ['.wmv'],
            'video/webm': ['.webm'],
          },
          mimeTypes: [
            'video/mp4',
            'video/quicktime',
            'video/x-msvideo',
            'video/x-ms-wmv',
            'video/webm',
          ],
        }
      case 'files':
        return {
          accept: {
            'application/pdf': ['.pdf'],
            'application/msword': ['.doc'],
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
            'application/vnd.ms-excel': ['.xls'],
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': ['.xlsx'],
            'application/vnd.ms-powerpoint': ['.ppt'],
            'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
            'text/plain': ['.txt'],
            'application/zip': ['.zip'],
            'application/x-rar-compressed': ['.rar'],
          },
          mimeTypes: [
            'application/pdf',
            'application/msword',
            'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
            'application/vnd.ms-excel',
            'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            'application/vnd.ms-powerpoint',
            'application/vnd.openxmlformats-officedocument.presentationml.presentation',
            'text/plain',
            'application/zip',
            'application/x-rar-compressed',
          ],
        }
      default:
        return { accept: {}, mimeTypes: [] }
    }
  }, [activeTab])

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const errors: string[] = []
      for (const file of acceptedFiles) {
        if (!fileTypes.mimeTypes.includes(file.type)) {
          errors.push(`${file.name} is not a valid ${activeTab.slice(0, -1)} type.`)
        }
        if (file.size > MAX_FILE_SIZE) {
          errors.push(`${file.name} exceeds the ${MAX_FILE_SIZE / (1024 * 1024)}MB size limit.`)
        }
      }
      if (acceptedFiles.length + selectedFiles.length > MAX_FILES) {
        errors.push(`Maximum ${MAX_FILES} files allowed.`)
      }

      if (errors.length > 0) {
        setValidationErrors(errors)
        return
      }

      setValidationErrors([])
      setSelectedFiles((prevFiles) => [...prevFiles, ...acceptedFiles])
    },
    [selectedFiles, activeTab, fileTypes.mimeTypes],
  )

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: fileTypes.accept,
  })

  const removeFile = (fileToRemove: File) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((file) => file !== fileToRemove))
    setValidationErrors([])
  }

  const handleUpload = () => {
    const errors: string[] = []
    if (!name.trim()) {
      errors.push('Name is required.')
    }
    if (selectedFiles.length === 0) {
      errors.push(`At least one ${activeTab.slice(0, -1)} is required.`)
    }

    if (errors.length > 0) {
      setValidationErrors(errors)
      return
    }

    setIsUploading(true)
    setValidationErrors([])
    const formData = new FormData()
    selectedFiles.forEach((file) => formData.append('files[]', file))
    formData.append('name', name)
    formData.append('alt', alt)
    formData.append('type', activeTab)

    router.post(route('admin.media.store'), formData, {
      onSuccess: () => {
        setIsUploading(false)
        toast.success(`Successfully uploaded ${selectedFiles.length} ${activeTab}!`)
        setSelectedFiles([])
        setName('')
        setAlt('')
        setOpen(false) // Close modal after success
        router.visit(route('admin.media.index'), {
          preserveState: true,
          preserveScroll: true,
          only: ['images', 'videos', 'files'],
        })
      },
      onError: (errors) => {
        console.log(errors)
        setIsUploading(false)
        const errorMessages = Object.values(errors).flat() as string[]
        setValidationErrors(errorMessages)
        toast.error('Failed to upload files. Please check the errors.')
      },
    })
  }

  const handleClearForm = () => {
    setSelectedFiles([])
    setName('')
    setAlt('')
    setValidationErrors([])
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="bg-green-500 text-white hover:bg-green-600">
          <Upload className="mr-2 h-4 w-4" />
          Add New {activeTab === 'images' ? 'Image' : activeTab === 'videos' ? 'Video' : 'File'}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            Add New {activeTab === 'images' ? 'Image' : activeTab === 'videos' ? 'Video' : 'File'}
          </DialogTitle>
          <DialogDescription>Upload new {activeTab} to your media library.</DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {validationErrors.length > 0 && (
            <div className="rounded-md bg-red-100 p-4 text-red-700">
              {validationErrors.map((error, index) => (
                <p key={index}>{error}</p>
              ))}
            </div>
          )}
          <div className="grid items-center gap-4">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              className="w-full"
              placeholder="Media name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="grid items-center gap-4">
            <Label htmlFor="alt">Alt Text</Label>
            <Input
              id="alt"
              className="w-full"
              placeholder="Media alt text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
            />
          </div>
          <div className="grid items-center gap-4">
            <Label htmlFor="media">Media</Label>
            <div
              {...getRootProps()}
              className={cn(
                'flex h-44 cursor-pointer flex-col items-center justify-center rounded-md border-2 border-dashed border-primary transition-colors',
                isDragActive ? 'bg-primary/10' : 'hover:bg-primary/5',
              )}
            >
              <input {...getInputProps()} />
              <Upload className="mb-2 h-10 w-10 text-primary" />
              {isDragActive ? (
                <p className="text-sm text-primary">Drop the files here ...</p>
              ) : (
                <p className="text-sm text-primary">
                  Drag 'n' drop some {activeTab} here, or click to select files
                </p>
              )}
            </div>
          </div>
          {selectedFiles.length > 0 && (
            <div className="mt-4">
              <Label>Selected Files</Label>
              <ScrollArea className="h-[200px] w-full rounded-md border p-4">
                <ul className="space-y-2">
                  {selectedFiles.map((file, index) => {
                    const url = URL.createObjectURL(file)
                    return (
                      <li
                        key={index}
                        className="flex items-center justify-between rounded-md bg-secondary p-2"
                      >
                        <div className="flex items-center space-x-2">
                          {file.type.startsWith('image/') ? (
                            <img src={url} alt={file.name} className="h-8 w-8 object-cover" />
                          ) : file.type === 'application/pdf' ? (
                            <FileText className="h-8 w-8 text-primary" />
                          ) : file.type.startsWith('video/') ? (
                            <Video className="h-8 w-8 text-primary" />
                          ) : (
                            getFileIcon(file.type)
                          )}
                          <span className="truncate text-sm">{Truncate(file.name)}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            URL.revokeObjectURL(url)
                            removeFile(file)
                          }}
                          className="h-8 w-8 p-0 hover:bg-destructive hover:text-destructive-foreground"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </li>
                    )
                  })}
                </ul>
              </ScrollArea>
            </div>
          )}
        </div>
        <DialogFooter>
          <Button
            variant="outline"
            onClick={handleClearForm}
            className="mr-2"
            disabled={isUploading}
          >
            Clear Form
          </Button>
          <Button
            type="submit"
            disabled={selectedFiles.length === 0 || isUploading || validationErrors.length > 0}
            onClick={handleUpload}
            className={cn(
              selectedFiles.length > 0 && !isUploading && validationErrors.length === 0
                ? 'bg-green-500'
                : 'bg-primary',
              'text-white hover:bg-green-600',
            )}
          >
            {isUploading
              ? 'Uploading...'
              : `Upload ${selectedFiles.length} ${selectedFiles.length === 1 ? 'File' : 'Files'}`}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

// Main Component: MediaUploader
const MediaUploader = ({ images, videos, files }: MediaUploaderProps) => {
  const [mediaDetails, setMediaDetails] = useState<MediaType | null>(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [activeTab, setActiveTab] = useState<'images' | 'videos' | 'files'>('images')

  // Get current media based on active tab
  const currentMedia = useMemo(() => {
    switch (activeTab) {
      case 'images':
        return images || []
      case 'videos':
        return videos || []
      case 'files':
        return files || []
      default:
        return []
    }
  }, [activeTab, images, videos, files])

  // Filter media based on search
  const filteredMedia = useMemo(() => {
    return currentMedia.filter(
      (item) =>
        (item.alt?.toLowerCase() || '').includes(searchQuery.toLowerCase()) ||
        (item.name?.toLowerCase() || '').includes(searchQuery.toLowerCase()),
    )
  }, [currentMedia, searchQuery])

  const handleSave = (media: MediaType) => {
    router.post(
      route('media.update', media.id),
      {
        alt: media.alt,
        name: media.name,
      },
      {
        onSuccess: () => {
          toast.success('Media details updated successfully!')
          setMediaDetails(null)
          router.visit(route('admin.media.index'), {
            preserveState: true,
            preserveScroll: true,
            only: ['images', 'videos', 'files'],
          })
        },
        onError: (errors) => {
          toast.error('Failed to update media details.')
          console.error('Save failed:', errors)
        },
      },
    )
  }

  const handleDelete = (media: MediaType) => {
    if (confirm('Are you sure you want to delete this media item?')) {
      router.delete(route('admin.media.delete', media.id), {
        onSuccess: () => {
          toast.success('Media deleted successfully!')
          setMediaDetails(null)
          router.visit(route('admin.media.index'), {
            preserveState: true,
            preserveScroll: true,
            only: ['images', 'videos', 'files'],
          })
        },
        onError: (errors) => {
          toast.error('Failed to delete media.')
          console.error('Delete failed:', errors)
        },
      })
    }
  }

  return (
    <div className="container mx-auto my-12 px-4">
      <Card className="mb-8 shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-primary">Media Library</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col items-center justify-between gap-4 sm:flex-row">
            <div className="relative w-full sm:w-64">
              <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search media by name or alt..."
                className="pl-8"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <AddNewMediaDialog activeTab={activeTab} />
          </div>
          <Tabs
            value={activeTab}
            onValueChange={(value) => setActiveTab(value as 'images' | 'videos' | 'files')}
            className="mt-4"
          >
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="images">
                <Image className="mr-2 h-4 w-4" /> Images
              </TabsTrigger>
              <TabsTrigger value="videos">
                <Video className="mr-2 h-4 w-4" /> Videos
              </TabsTrigger>
              <TabsTrigger value="files">
                <File className="mr-2 h-4 w-4" /> Files
              </TabsTrigger>
            </TabsList>
          </Tabs>
        </CardContent>
      </Card>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
        {filteredMedia.length > 0 ? (
          filteredMedia.map((item) => (
            <MediaCard key={item.id} media={item} onClick={() => setMediaDetails(item)} />
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
            <div className="mb-4 rounded-full bg-gray-100 p-4">
              {activeTab === 'images' ? (
                <Image className="h-8 w-8 text-gray-400" />
              ) : activeTab === 'videos' ? (
                <Video className="h-8 w-8 text-gray-400" />
              ) : (
                <File className="h-8 w-8 text-gray-400" />
              )}
            </div>
            <p className="text-lg font-medium text-gray-500">No {activeTab} found</p>
            <p className="mt-2 text-muted-foreground">
              Try uploading new {activeTab} or adjusting your search
            </p>
          </div>
        )}
      </div>

      {mediaDetails && (
        <MediaDetailsCard
          mediaDetails={mediaDetails}
          setMediaDetails={setMediaDetails}
          onSave={() => handleSave(mediaDetails)}
          onDelete={() => handleDelete(mediaDetails)}
        />
      )}
    </div>
  )
}

export default MediaUploader
