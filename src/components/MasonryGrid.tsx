import { masnoryImages } from '@/Libs/Helper'
import DefaultSectionTitle from '@/utils/DefaultSectionTitle'

const MasonryGrid = () => {
  return (
    <div className="container px-4">
      <DefaultSectionTitle title="Masonry Gridlayout" subtitle="sample masonry layout" href="#" />
      <div className="mx-auto columns-1 gap-4 overflow-hidden md:columns-2 lg:columns-3 xl:columns-4">
        {masnoryImages(8).map((item, index) => (
          <div className="mb-4 break-inside-avoid" key={index}>
            <img src={item.src} loading="lazy" className="h-full w-full rounded-md" />
          </div>
        ))}
      </div>
    </div>
  )
}

export default MasonryGrid
