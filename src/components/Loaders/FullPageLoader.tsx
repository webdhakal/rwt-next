import { useLoader } from '@/hooks/LoaderProvider'

const FullPageLoader = () => {
  const loading = useLoader()

  if (!loading) return null

  return (
    <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-50 z-9999">
      <div className="w-16 h-16 border-4 border-gray-300 border-t-primary rounded-full animate-spin"></div>
    </div>
  )
}

export default FullPageLoader
