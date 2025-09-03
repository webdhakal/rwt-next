import {
  Bold,
  Strikethrough,
  Italic,
  List,
  ListOrdered,
  Heading2,
  Underline,
  Undo,
  Redo,
  Code,
  ImageDown,
  Plus,
  Table,
  Split,
  Link as LinkIcon,
  Superscript,
  Subscript,
  Columns2,
  CodeXml,
} from 'lucide-react'
import { Editor } from '@tiptap/react'
import { cn } from '@/shadcn/lib/utils'
import { Button } from '@/shadcn/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/shadcn/ui/dropdown-menu'
import { SetStateAction, useCallback, useState } from 'react'
import { Popover, PopoverContent, PopoverTrigger } from '@/shadcn/ui/popover'
import { Label } from '@/shadcn/ui/label'
import { Input } from '@/shadcn/ui/input'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/shadcn/ui/dialog'

interface ImageDetails {
  url: string
  alt: string
  width: string
  height: string
}

const TABLE_DEFAULT_DETAILS = {
  rows: 3,
  columns: 3,
}

const IMAGE_DEFAULT_DETAILS = {
  url: '',
  alt: '',
  width: '',
  height: '',
}

const URL_DEFAULT_DETAILS = null

interface TipTapToolbarProps {
  editor: Editor | null
  content: string
  setContent: React.Dispatch<SetStateAction<string>>
  onAdd?: () => void
  // New props for toggling HTML view
  isHtmlView: boolean
  toggleHtmlView: () => void
}

const TipTapToolbar = ({
  editor,
  content,
  setContent,
  onAdd,
  isHtmlView,
  toggleHtmlView,
}: TipTapToolbarProps) => {
  const [imageDetails, setImageDetails] = useState<ImageDetails>(IMAGE_DEFAULT_DETAILS)
  const [tableDetails, setTableDetails] = useState(TABLE_DEFAULT_DETAILS)
  const [urlDetails, setUrlDetails] = useState<string | null>(URL_DEFAULT_DETAILS)
  const [columnCount, setColumnCount] = useState<string>('')

  if (!editor) {
    return null
  }

  // Insert an image using provided details
  const addImage = () => {
    if (imageDetails.url) {
      editor
        .chain()
        .focus()
        .insertContent({
          type: 'image',
          attrs: {
            src: imageDetails.url,
            alt: imageDetails.alt,
            width: imageDetails.width ? parseInt(imageDetails.width) : null,
            height: imageDetails.height ? parseInt(imageDetails.height) : null,
          },
        })
        .run()
    }
  }

  // Insert a table with given rows and columns
  const addTable = () => {
    editor
      .chain()
      .focus()
      .insertTable({ rows: tableDetails.rows, cols: tableDetails.columns, withHeaderRow: true })
      .run()
  }

  // Add or remove a link based on URL input
  const addLink = useCallback(() => {
    const url = urlDetails
    if (url === null) return

    if (url === '') {
      editor.chain().focus().extendMarkRange('link').unsetLink().run()
      return
    }

    editor.chain().focus().extendMarkRange('link').setLink({ href: url }).run()
  }, [editor, urlDetails])

  const activeStyling = 'ring-1 ring-primary ring-offset-2'

  return (
    <div className="flex flex-col gap-4 border border-input px-4 py-3">
      <div className="flex w-full flex-wrap items-center justify-start gap-5">
        {/* Bold */}
        <Button
          variant="outline"
          size="icon"
          toolTip="Bold"
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleBold().run()
          }}
          className={cn(editor.isActive('bold') && activeStyling)}
        >
          <Bold className="h-4 w-4" />
        </Button>

        {/* Italic */}
        <Button
          variant="outline"
          size="icon"
          toolTip="Italic"
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleItalic().run()
          }}
          className={cn(editor.isActive('italic') && activeStyling)}
        >
          <Italic className="h-4 w-4" />
        </Button>

        {/* Strike Through */}
        <Button
          variant="outline"
          toolTip="Strike"
          size="icon"
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleStrike().run()
          }}
          className={cn(editor.isActive('strike') && activeStyling)}
        >
          <Strikethrough className="h-4 w-4" />
        </Button>

        {/* Headings */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" toolTip="Headings">
              <Heading2 className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuLabel>Headings</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="flex flex-col gap-2 p-2">
              {Array.from({ length: 6 }, (_, i: number) => (
                <Button
                  key={i}
                  variant="ghost"
                  className={cn(
                    'justify-start',
                    editor.isActive('heading', { level: i + 1 }) && activeStyling,
                  )}
                  onClick={(e) => {
                    e.preventDefault()
                    const level: 1 | 2 | 3 | 4 | 5 | 6 = (i + 1) as 1 | 2 | 3 | 4 | 5 | 6
                    editor.chain().focus().toggleHeading({ level }).run()
                  }}
                >
                  Heading {i + 1}
                </Button>
              ))}
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        {/* Underline */}
        <Button
          variant="outline"
          size="icon"
          toolTip="Underline"
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleUnderline().run()
          }}
          className={cn(editor.isActive('underline') && activeStyling)}
        >
          <Underline className="h-4 w-4" />
        </Button>

        {/* Code */}
        <Button
          variant="outline"
          size="icon"
          toolTip="Code"
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleCode().run()
          }}
          className={cn(editor.isActive('code') && activeStyling)}
        >
          <Code className="h-4 w-4" />
        </Button>

        {/* Image with Popover */}
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" size="icon" toolTip="Image">
              <ImageDown className="h-4 w-4" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-80">
            <div className="grid gap-4">
              <div className="space-y-2">
                <h4 className="font-medium leading-none">Image Details</h4>
                <p className="text-sm text-muted-foreground">
                  Set the URL, ALT text, and dimensions for your image.
                </p>
              </div>
              <div className="grid gap-2">
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="url">URL</Label>
                  <Input
                    id="url"
                    value={imageDetails.url}
                    onChange={(e) => setImageDetails((prev) => ({ ...prev, url: e.target.value }))}
                    className="col-span-2"
                    placeholder="https://"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="alt">ALT</Label>
                  <Input
                    id="alt"
                    value={imageDetails.alt}
                    onChange={(e) => setImageDetails((prev) => ({ ...prev, alt: e.target.value }))}
                    className="col-span-2"
                    placeholder="Image description"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="width">Width</Label>
                  <Input
                    id="width"
                    value={imageDetails.width}
                    onChange={(e) =>
                      setImageDetails((prev) => ({ ...prev, width: e.target.value }))
                    }
                    className="col-span-2"
                    placeholder="e.g. 400"
                  />
                </div>
                <div className="grid grid-cols-3 items-center gap-4">
                  <Label htmlFor="height">Height</Label>
                  <Input
                    id="height"
                    value={imageDetails.height}
                    onChange={(e) =>
                      setImageDetails((prev) => ({ ...prev, height: e.target.value }))
                    }
                    className="col-span-2"
                    placeholder="e.g. 300"
                  />
                </div>
                <Button onClick={addImage} className="mt-2">
                  Add Image
                </Button>
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {/* Undo */}
        <Button
          variant="outline"
          size="icon"
          toolTip="Undo"
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().undo().run()
          }}
        >
          <Undo className="h-4 w-4" />
        </Button>

        {/* Redo */}
        <Button
          variant="outline"
          size="icon"
          toolTip="Redo"
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().redo().run()
          }}
        >
          <Redo className="h-4 w-4" />
        </Button>

        {/* Hardbreak */}
        <Button
          variant="outline"
          size="icon"
          toolTip="Hardbreak"
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().setHardBreak().run()
          }}
        >
          <Split className="h-4 w-4" />
        </Button>

        {/* Superscript */}
        <Button
          variant="outline"
          size="icon"
          toolTip="Superscript"
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleSuperscript().run()
          }}
        >
          <Superscript className="h-4 w-4" />
        </Button>

        {/* Subscript */}
        <Button
          variant="outline"
          size="icon"
          toolTip="Subscript"
          onClick={(e) => {
            e.preventDefault()
            editor.chain().focus().toggleSubscript().run()
          }}
        >
          <Subscript className="h-4 w-4" />
        </Button>

        {/* Toggle HTML Button */}
        <Button
          variant="outline"
          onClick={toggleHtmlView}
          toolTip="Toggle HTML"
          className={cn(isHtmlView && activeStyling)}
        >
          <CodeXml className="h-4 w-4" />
        </Button>

        {/* More Options */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline">
              More <Plus className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <div className="flex flex-col items-start gap-2 p-2">
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start',
                  editor.isActive('bulletList') && activeStyling,
                )}
                onClick={() => editor.chain().focus().toggleBulletList().run()}
              >
                <List className="mr-2 h-4 w-4" />
                Bullet List
              </Button>
              <Button
                variant="ghost"
                className={cn(
                  'w-full justify-start',
                  editor.isActive('orderedList') && activeStyling,
                )}
                onClick={() => editor.chain().focus().toggleOrderedList().run()}
              >
                <ListOrdered className="mr-2 h-4 w-4" />
                Ordered List
              </Button>
              {/* Table */}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="ghost"
                    className={cn(
                      'w-full justify-start',
                      editor.isActive('table') && activeStyling,
                    )}
                  >
                    <Table className="mr-2 h-4 w-4" />
                    Table
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80" align="center">
                  <div className="grid gap-4">
                    <div className="space-y-2">
                      <h4 className="font-medium leading-none">Table Details</h4>
                      <p className="text-sm text-muted-foreground">Enter the table dimensions.</p>
                    </div>
                    <div className="grid gap-2">
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="rows">Rows</Label>
                        <Input
                          id="rows"
                          type="number"
                          value={tableDetails.rows}
                          onChange={(e) =>
                            setTableDetails((prev) => ({ ...prev, rows: Number(e.target.value) }))
                          }
                          className="col-span-2"
                          placeholder="e.g. 3"
                        />
                      </div>
                      <div className="grid grid-cols-3 items-center gap-4">
                        <Label htmlFor="columns">Columns</Label>
                        <Input
                          id="columns"
                          type="number"
                          value={tableDetails.columns}
                          onChange={(e) =>
                            setTableDetails((prev) => ({
                              ...prev,
                              columns: Number(e.target.value),
                            }))
                          }
                          className="col-span-2"
                          placeholder="e.g. 3"
                        />
                      </div>
                      <Button onClick={addTable} className="mt-2">
                        Add Table
                      </Button>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
              {/* Link Dialog */}
              <Dialog>
                <DialogTrigger className="w-full">
                  <Button
                    variant="ghost"
                    className={cn('w-full justify-start', editor.isActive('link') && activeStyling)}
                  >
                    <LinkIcon className="h-4 w-4" />
                    Link
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Paste the URL here</DialogTitle>
                    <DialogDescription>Enter the URL to link.</DialogDescription>
                  </DialogHeader>
                  <Input
                    onChange={(e) => setUrlDetails(e.target.value)}
                    placeholder="https://example.com"
                  />
                  <Button onClick={addLink} className="mt-2">
                    Add URL
                  </Button>
                </DialogContent>
              </Dialog>
              {/* Columns */}
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="ghost" className="w-full">
                    <Columns2 className="-ml-8 h-4 w-4" />
                    Columns
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Insert Columns</DialogTitle>
                    <DialogDescription>
                      Enter the number of columns you would like to insert.
                    </DialogDescription>
                  </DialogHeader>
                  <Input
                    type="number"
                    placeholder="Number of columns"
                    value={columnCount}
                    onChange={(e) => setColumnCount(e.target.value)}
                  />
                  <Button
                    onClick={() => {
                      const count = parseInt(columnCount, 10)
                      if (count > 0) {
                        // @ts-ignore (doesnt matter i guess)
                        editor.chain().focus().insertColumns(count).run()
                      }
                    }}
                    className="mt-2"
                  >
                    Insert
                  </Button>
                </DialogContent>
              </Dialog>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2">
        <Button
          variant="outline"
          onClick={() => {
            setContent('')
          }}
        >
          Clear
        </Button>
        <Button variant="default" onClick={onAdd}>
          Add
        </Button>
      </div>
    </div>
  )
}

export default TipTapToolbar
