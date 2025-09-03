import { Node, mergeAttributes, CommandProps } from '@tiptap/core'

export const Columns = Node.create({
  name: 'columns',
  group: 'block',
  content: 'column+',
  defining: true,
  parseHTML() {
    return [
      {
        tag: 'div[data-type="columns"]',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'columns',
        class: 'flex flex-wrap justify-between gap-4',
      }),
      0,
    ]
  },

  // @ts-ignore (doesnt matter i guess)
  addCommands() {
    return {
      insertColumns:
        (columnCount: number) =>
        ({ commands }: CommandProps) => {
          const columns = Array.from({ length: columnCount }, (_, i) => ({
            type: 'column',
            content: [
              {
                type: 'paragraph',
                content: [
                  {
                    type: 'text',
                    text: `Column ${i + 1}`,
                  },
                ],
              },
            ],
          }))
          return commands.insertContent({
            type: this.name,
            content: columns,
          })
        },
    }
  },
})

export const Column = Node.create({
  name: 'column',
  group: 'block',
  content: 'block+',
  parseHTML() {
    return [
      {
        tag: 'div[data-type="column"]',
      },
    ]
  },
  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, {
        'data-type': 'column',
        // border goes here just in case to see columns seperated.
        class: 'flex-1 p-2',
      }),
      0,
    ]
  },
})
