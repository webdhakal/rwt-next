import { Link } from '@inertiajs/react'
import { TrendingSearchData as tags } from '@/MOCK_DATA'

const TagSection = () => {
  return (
    <div className="container z-99999">
      {/* <DefaultSectionTitle title="trending tags" subtitle="Makes easy to know our products" /> */}
      <div className="flex flex-wrap gap-2">
        {tags.map((item, _) => (
          <Link
            href={item.href}
            key={_}
            className="flex-center hover:bg-primary/50 rounded-lg bg-gray-200 px-2 py-1 text-2xsm dark:bg-black"
          >
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  )
}

export default TagSection
