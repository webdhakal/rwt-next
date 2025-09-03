import { useState, useEffect } from 'react'
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from '@/shadcn/ui/command'
import { CircleX, Search } from 'lucide-react'
import TagSection from '@/components/Section/TagSection'
import { Item } from '@/types/MockData'
import { items } from '@/MOCK_DATA'

const SearchModal = () => {
  const [searchValue, setSearchValue] = useState<string>('')
  const [filteredItems, setFilteredItems] = useState<Item[]>([])
  const [searchModalOpen, setSearchModalOpen] = useState<boolean>(false)

  useEffect(() => {
    if (searchModalOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [searchModalOpen])

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        handleModalClose()
      }
    }

    if (searchModalOpen) {
      window.addEventListener('keydown', handleKeyDown)
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [searchModalOpen])

  const handleInputChange = (value: string): void => {
    setSearchValue(value)

    if (value.trim() === '') {
      setFilteredItems([])
    } else {
      const results = items.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
      setFilteredItems(results)
    }
  }

  const handleSearchIconClick = (): void => setSearchModalOpen(true)

  const handleModalClose = (): void => {
    setSearchValue('')
    setFilteredItems([])
    setSearchModalOpen(false)
  }

  return (
    <div className="relative w-full lg:hidden">
      <button
        onClick={handleSearchIconClick}
        className="rounded-full bg-gray-200 p-2 dark:border-gray-200 dark:bg-transparent"
        aria-label="Open search modal"
      >
        <Search />
      </button>

      {searchModalOpen && (
        <div className="fixed inset-0 z-20 items-center justify-center bg-black bg-opacity-50">
          <div className="absolute top-28 w-[95%] left-1/2 -translate-x-1/2 rounded-sm bg-white p-4 px-2 shadow-lg dark:bg-black">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">Search</h2>
              <button onClick={handleModalClose} aria-label="Close search modal">
                <CircleX />
              </button>
            </div>

            <Command>
              <CommandInput
                value={searchValue}
                onValueChange={handleInputChange}
                placeholder="What are you looking for today?"
                aria-label="Search input"
                className="mt-2"
              />
              <CommandList className="mt-2 max-h-[220px]">
                {searchValue.length === 0 && (
                  <CommandGroup heading="Trending Items">
                    <CommandItem className="dark:bg-transparent">
                      <TagSection />
                    </CommandItem>
                  </CommandGroup>
                )}
                {searchValue.trim() !== '' && filteredItems.length > 0 ? (
                  <CommandGroup heading="Results">
                    {filteredItems.map((item) => (
                      <CommandItem key={item.id}>{item.name}</CommandItem>
                    ))}
                  </CommandGroup>
                ) : searchValue.trim() !== '' ? (
                  <CommandEmpty>No results found.</CommandEmpty>
                ) : null}
              </CommandList>
            </Command>
          </div>
        </div>
      )}
    </div>
  )
}

export default SearchModal
