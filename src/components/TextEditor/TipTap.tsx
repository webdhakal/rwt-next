import '../../../css/tiptap.css'
import { FormEvent, useState } from 'react'
import TipTapToolbar from './TipTapToolbar'
import { EditorContent, useEditor } from '@tiptap/react'
import Heading from '@tiptap/extension-heading'
import StarterKit from '@tiptap/starter-kit'
import Underline from '@tiptap/extension-underline'
import Image from '@tiptap/extension-image'
import ListItem from '@tiptap/extension-list-item'
import OrderedList from '@tiptap/extension-ordered-list'
import BulletList from '@tiptap/extension-bullet-list'
import Table from '@tiptap/extension-table'
import TableCell from '@tiptap/extension-table-cell'
import TableHeader from '@tiptap/extension-table-header'
import TableRow from '@tiptap/extension-table-row'
import HardBreak from '@tiptap/extension-hard-break'
import Link from '@tiptap/extension-link'
import Superscript from '@tiptap/extension-superscript'
import Subscript from '@tiptap/extension-subscript'
import CharacterCount from '@tiptap/extension-character-count'
import { Card, CardContent } from '@/shadcn/ui/card'
import { Separator } from '@/shadcn/ui/separator'
import { Column, Columns } from './extensions/Columns'
import { Button } from '@/shadcn/ui/button'
import { Label } from '@/shadcn/ui/label'

const TipTap = () => {
  const [content, setContent] = useState<string>('<p><strong>sauravp</strong> is bold.</p>')
  const [customHtml, setCustomHtml] = useState<string>('')
  const [customCss, setCustomCss] = useState<string>('')
  const [htmlView, setHtmlView] = useState<boolean>(false)

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    console.log({
      editorContent: content,
      customHtml: customHtml.split('\n').join(''),
      customCss: customCss.split('\n').join(''),
    })
  }

  const editor = useEditor({
    extensions: [
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      StarterKit.configure({ heading: false }),
      Underline,
      Image.configure({ inline: true, allowBase64: true }),
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
      BulletList.configure({
        itemTypeName: 'listItem',
        HTMLAttributes: { class: 'list-disc' },
        keepMarks: true,
        keepAttributes: true,
      }),
      OrderedList.configure({
        itemTypeName: 'listItem',
        HTMLAttributes: { class: 'list-decimal' },
        keepMarks: true,
        keepAttributes: true,
      }),
      ListItem,
      HardBreak,
      Link.configure({
        openOnClick: false,
        autolink: true,
        defaultProtocol: 'https',
        protocols: ['http', 'https'],
        isAllowedUri: (url, ctx) => {
          try {
            const parsedUrl = url.includes(':')
              ? new URL(url)
              : new URL(`${ctx.defaultProtocol}://${url}`)
            if (!ctx.defaultValidate(parsedUrl.href)) return false
            const disallowedProtocols = ['ftp', 'file', 'mailto']
            const protocol = parsedUrl.protocol.replace(':', '')
            if (disallowedProtocols.includes(protocol)) return false
            const allowedProtocols = ctx.protocols.map((p) =>
              typeof p === 'string' ? p : p.scheme,
            )
            if (!allowedProtocols.includes(protocol)) return false
            const disallowedDomains = ['example-phishing.com', 'malicious-site.net']
            const domain = parsedUrl.hostname
            if (disallowedDomains.includes(domain)) return false
            return true
          } catch {
            return false
          }
        },
        shouldAutoLink: (url) => {
          try {
            const parsedUrl = url.includes(':') ? new URL(url) : new URL(`https://${url}`)
            const disallowedDomains = ['example-no-autolink.com', 'another-no-autolink.com']
            const domain = parsedUrl.hostname
            return !disallowedDomains.includes(domain)
          } catch {
            return false
          }
        },
      }),
      Superscript,
      Subscript,
      CharacterCount.configure(),
      Columns,
      Column,
    ],
    content: content,
    editorProps: {
      attributes: {
        class:
          'flex flex-col px-4 py-3 border border-input border-gray-700 w-full gap-3 font-medium text-[16px] pt-4 outline-none',
      },
    },
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML())
    },
  })

  return (
    <form onSubmit={handleSubmit} className="grid pb-10">
      <div className="w-full max-w-4xl">
        <TipTapToolbar
          editor={editor}
          content={content}
          setContent={setContent}
          isHtmlView={htmlView}
          toggleHtmlView={() => setHtmlView((prev) => !prev)}
        />
        {htmlView ? (
          <textarea
            value={editor ? editor.getHTML() : ''}
            onChange={(e) => editor && editor.commands.setContent(e.target.value)}
            className="w-full border border-gray-700 p-2"
            style={{ whiteSpace: 'pre-line', minHeight: '150px' }}
          />
        ) : (
          <EditorContent style={{ whiteSpace: 'pre-line' }} editor={editor} />
        )}
        {editor !== null && (
          <Card className="mt-4 w-fit">
            <CardContent className="flex items-center space-x-4 p-4">
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {editor.storage.characterCount.characters()} characters
                </span>
              </div>
              <Separator orientation="vertical" className="h-6" />
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium">
                  {editor.storage.characterCount.words()} words
                </span>
              </div>
            </CardContent>
          </Card>
        )}

        {/* this might come in use later... */}

        {/* <h1 className="mt-6 ">Editor Content Preview:</h1>
        <Card className="mt-1">
          <CardContent>
            <div className="custom-preview p-4">
              <style>
                {`
                  .custom-preview h1 { font-size: 2em; margin: 0.67em 0; font-weight: bold; }
                  .custom-preview h2 { font-size: 1.75em; margin: 0.75em 0; font-weight: bold; }
                  .custom-preview h3 { font-size: 1.5em; margin: 0.83em 0; font-weight: bold; }
                  .custom-preview h4 { font-size: 1.25em; margin: 1.12em 0; font-weight: bold; }
                  .custom-preview h5 { font-size: 1em; margin: 1.5em 0; font-weight: bold; }
                  .custom-preview h6 { font-size: 0.875em; margin: 1.67em 0; font-weight: bold; }
                `}
              </style>
              {customCss && <style>{customCss}</style>}
              <div dangerouslySetInnerHTML={{ __html: content }} />
            </div>
          </CardContent>
        </Card>
        <div className="mt-24">
          <div className="mb-4 flex gap-4  text-2xl font-bold">
            Custom HTML &amp; CSS
          </div>
          <div>
            <div className="mb-4 space-y-4">
              <div>
                <Label htmlFor="customCss" className="mb-1 block">
                  Custom CSS (optional):
                </Label>
                <textarea
                  id="customCss"
                  className="w-full rounded-md border border-gray-300 p-2 dark:bg-slate-900"
                  rows={3}
                  value={customCss}
                  onChange={(e) => setCustomCss(e.target.value)}
                  placeholder="h1 { color: red }"
                />
              </div>
              <div>
                <Label htmlFor="customHtml" className="mb-1 block">
                  Custom HTML:
                </Label>
                <textarea
                  id="customHtml"
                  className="w-full rounded-md border border-gray-300 p-2 dark:bg-slate-900"
                  rows={5}
                  value={customHtml}
                  onChange={(e) => setCustomHtml(e.target.value)}
                  placeholder="<h1> sauravp </h1>"
                />
              </div>
            </div>
            <h1 className="mt-6 ">Custom HTML/CSS Preview:</h1>
            <Card>
              <CardContent>
                <div className="custom-preview p-4">
                  <style>
                    {`.custom-preview h1 { font-size: 2em; margin: 0.67em 0; font-weight: bold; }
                      .custom-preview h2 { font-size: 1.75em; margin: 0.75em 0; font-weight: bold; }
                      .custom-preview h3 { font-size: 1.5em; margin: 0.83em 0; font-weight: bold; }
                      .custom-preview h4 { font-size: 1.25em; margin: 1.12em 0; font-weight: bold; }
                      .custom-preview h5 { font-size: 1em; margin: 1.5em 0; font-weight: bold; }
                      .custom-preview h6 { font-size: 0.875em; margin: 1.67em 0; font-weight: bold; }
                    `}
                  </style>
                  {customCss && <style>{customCss}</style>}
                  <div dangerouslySetInnerHTML={{ __html: customHtml }} />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
        <div className="mt-6 flex justify-end gap-2">
          <Button
            variant="outline"
            onClick={() => {
              setCustomHtml('')
              setCustomCss('')
            }}
          >
            Clear
          </Button>
          <Button variant="default" type="submit">
            Add
          </Button>
        </div> */}
      </div>
    </form>
  )
}

export default TipTap
