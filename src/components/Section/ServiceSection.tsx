import { ServiceBlockData } from '@/MOCK_DATA'
import { cn } from '@/shadcn/lib/utils'
import { AnimatedSection } from '../AnimatedSection'

const ServiceSection = () => {
  return (
    <AnimatedSection
      className={cn('hidden bg-gradient-to-r from-primary to-emerald-400 py-6 md:block')}
    >
      <div className="container mx-auto">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ServiceBlockData.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center rounded-xl bg-white p-4 text-center shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
            >
              <div className="mb-3 text-green-600">
                <item.icon className="size-7 lg:size-8" />
              </div>
              <h3 className="mb-1.5 text-base font-semibold text-gray-800 lg:text-lg">
                {item.title}
              </h3>
              <p className="text-sm leading-relaxed text-gray-600">{item.description}</p>
            </div>
          ))}
        </div>
      </div>
    </AnimatedSection>
  )
}

export default ServiceSection
