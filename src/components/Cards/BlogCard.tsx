import { cn } from '@/shadcn/lib/utils'
import { Separator } from '@/shadcn/ui/separator'
import { BlogDataType } from '@/types/MockData'

const BlogCard = ({
  blogData,
  className,
  style,
}: {
  blogData: BlogDataType
  className?: string
  style?: object
}) => {
  // need a function to filter the views and readTime. (not needed if we pass everything as a string from backend.)
  return (
    <div
      className={cn(
        'max-w-xs overflow-hidden rounded-md bg-white shadow-md transition-transform hover:shadow-lg dark:bg-transparent dark:ring-1 dark:ring-slate-700',
        className,
      )}
      style={style}
    >
      <img src={blogData.image} alt="Dish Image" className="h-44 w-full object-cover" />
      <div className="flex flex-col p-4 md:items-center">
        <p className="mb-2 text-xs font-bold text-slate-400">{blogData.category}</p>
        <h3 className="mb-4 font-secondary text-sm md:text-center lg:text-lg">{blogData.title}</h3>
        <div className="hidden flex-col gap-4 text-xs text-gray-500 md:flex md:flex-row lg:items-center">
          <p className="font-secondary">{blogData.date}</p>
          <Separator className="hidden size-2 rounded-full" />
          <p className="font-secondary">{blogData.views} views</p>
          <Separator className="hidden size-2 rounded-full" />
          <p className="font-secondary">{blogData.readTimeInMinutes} min</p>
        </div>
      </div>
    </div>
  )
}

export default BlogCard
