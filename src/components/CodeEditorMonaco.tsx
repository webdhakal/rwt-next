import { Button } from '@/shadcn/ui/button'
import Editor, { OnMount } from '@monaco-editor/react'
import { Check } from 'lucide-react'
import * as monacoEditor from 'monaco-editor'
import React, { SetStateAction, useRef } from 'react'

interface CodeEditorMonacoProps {
  content: string
  id: string
  height: string
  viewing: string
  onEdit: (name: string, value: Array<any> | boolean, menuID: string) => void
  onCreate: (name: string, value: Array<any> | boolean) => void // This will be used.
  setState: React.Dispatch<SetStateAction<any>>
  state: any
}

const CodeEditorMonaco = ({
  content,
  height,
  id,
  viewing,
  onEdit,
  onCreate,
  setState,
}: Partial<CodeEditorMonacoProps>) => {
  const editorRef = useRef<monacoEditor.editor.IStandaloneCodeEditor | null>(null)

  // @ts-ignore
  const onEditorMount: OnMount = (editor, monaco) => {
    editorRef.current = editor
  }

  const saveEditorData = () => {
    if (!editorRef.current) return
    try {
      const value = editorRef.current.getValue()
      const parsed = JSON.parse(value)
      setState && setState(parsed)
      if (value === content) {
        alert('No change detected')
        return
      }
      onEdit && onEdit('content', parsed, id as string)
      onCreate && onCreate('content', parsed)
    } catch (error) {
      console.error('Invalid JSON:', error)
    }
  }

  return (
    <div className="mt-2 rounded-md border border-black p-2">
      <div className="flex-between mb-4">
        {viewing ? (
          <h1 className="whitespace-nowrap text-sm font-bold">{viewing}'s Content:</h1>
        ) : (
          <h1 className="whitespace-nowrap text-sm font-bold">JSON Content:</h1>
        )}
        <div className="flex w-full justify-end">
          <Button onClick={saveEditorData}>
            <Check className="size-4" />
          </Button>
        </div>
      </div>
      <Editor
        height={height || '40vh'}
        defaultLanguage="json"
        defaultValue={content ?? JSON.stringify({ data: 'No data to display' })}
        onMount={onEditorMount}
      />
    </div>
  )
}

export default CodeEditorMonaco
