import { useTheme } from '@/hooks/useTheme'
import { cn } from '@/shadcn/lib/utils'
import { Button } from '@/shadcn/ui/button'
import { Moon, Sun } from 'lucide-react'
import { useEffect, useState } from 'react'

const ToggleThemeButton = ({ className }: { className?: string }) => {
  const [mounted, setMounted] = useState(false)
  const { setCurrTheme } = useTheme()
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== 'undefined') {
      return 'dark' === localStorage.getItem('theme')
    }
    return false
  })

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setCurrTheme && setCurrTheme('dark')
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setCurrTheme && setCurrTheme('light')
    }
  }, [darkMode, setCurrTheme])

  if (!mounted) {
    return null
  }

  return (
    <Button
      type="button"
      onClick={() => setDarkMode((prev) => !prev)}
      className={cn(
        'relative inline-flex h-6 w-13 items-center rounded-full transition-colors duration-200 focus:outline-none',
        darkMode ? 'bg-gray-700' : 'bg-gray-200', className
      )}
    >
      <span
        className={cn(
          'absolute left-1 top-1 size-4 transform rounded-full bg-white shadow transition-transform duration-200',
          darkMode ? 'translate-x-7' : 'translate-x-0',
        )}
      />
      <span className="absolute inset-0 flex items-center justify-center">
        <Moon
          className={cn(
            'absolute right-1  -translate-y-1/2 top-1/2 size-4 text-gray-600 transition-all duration-200',
            darkMode ? 'translate-x-4 opacity-0' : 'translate-x-0 opacity-100',
          )}
        />
        <Sun
          className={cn(
            'absolute left-1 -translate-y-1/2 top-1/2 size-4 text-yellow-500 transition-all duration-200',
            darkMode ? 'translate-x-0 opacity-100' : '-translate-x-4 opacity-0',
          )}
        />
      </span>
    </Button>
  )
}

export default ToggleThemeButton
