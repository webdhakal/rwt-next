import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { cn } from '@/shadcn/lib/utils'
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/shadcn/ui/breadcrumb'
import { IoHomeOutline } from 'react-icons/io5'

type PageBannerSectionProps = {
  pageTitle: string
  firstPage?: boolean
  renderChildren?: () => React.ReactNode
}

const PageBannerSection = ({ pageTitle, renderChildren, firstPage }: PageBannerSectionProps) => {
  const formattedPageTitle = pageTitle.split('/').pop()
  const { callbackRef, isVisible } = useIntersectionObserver()
  return (
    <section
      className={cn('mt-4', isVisible && firstPage && 'animate-bannerFadeIn')}
      ref={callbackRef}
    >
      <div className="item-center mb-6 hidden h-[220px] justify-between rounded-xl bg-green-200 px-8 py-6 shadow-md dark:bg-slate-900 md:flex lg:px-16 lg:py-8">
        <div className="flex-between w-full">
          <div>
            <h1 className="text-4xl font-bold capitalize text-green-900">{formattedPageTitle}</h1>
            <Breadcrumb className="mt-2">
              <BreadcrumbList className="flex items-center text-sm text-green-700">
                <BreadcrumbItem>
                  <BreadcrumbLink href="/" className="flex gap-2 hover:text-green-600">
                    <IoHomeOutline size={18} />
                    <span className="font-secondary">Home</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="text-green-600">/</BreadcrumbSeparator>
                <BreadcrumbItem>
                  <BreadcrumbPage className="font-secondary capitalize text-green-800">
                    {formattedPageTitle}
                  </BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className="relative">{renderChildren && renderChildren()}</div>
        </div>
      </div>
      <div className="mt-4 md:hidden">
        <h1 className="text-center text-3xl font-extrabold capitalize text-green-900">
          {formattedPageTitle}
        </h1>
        <div className="mt-3 flex justify-center">
          <Breadcrumb className="flex list-none flex-wrap justify-center space-x-2 text-sm text-green-700">
            <BreadcrumbItem>
              <BreadcrumbLink href="/" className="flex items-center gap-1 hover:text-green-600">
                <IoHomeOutline size={16} />
                <span>Home</span>
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator className="text-green-600">/</BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="capitalize text-green-800">
                {formattedPageTitle}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </Breadcrumb>
        </div>
      </div>
    </section>
  )
}

export default PageBannerSection
