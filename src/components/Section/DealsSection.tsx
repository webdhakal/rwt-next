import { calculateTimeInterval } from '@/hooks/useFormatDateTime'
import DefaultSectionTitle from '@/utils/DefaultSectionTitle'
import { useEffect, useState } from 'react'
import { motion } from 'motion/react'
import { Card, CardContent } from '@/shadcn/ui/card'
import ProductCard from '../Cards/ProductCard'
import { cn } from '@/shadcn/lib/utils'
import useHighlight from '@/hooks/useProductHighlight'
import { ProductType } from '@/types/Product'
import { AnimatedSection } from '../AnimatedSection'

interface TimeUnitProps {
  label: string
  value: number
}

function TimeUnit({ label, value }: TimeUnitProps) {
  return (
    <div className="flex flex-col items-center font-secondary">
      <motion.div
        key={value}
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        className="flex-center rounded-md border-none border-gray-100 bg-gray-100 bg-opacity-20 bg-clip-padding text-xl text-white backdrop-blur-md backdrop-filter md:size-16 md:text-3xl lg:text-4xl"
      >
        {value.toString().padStart(2, '0')}
      </motion.div>
      <span className="font-secondary text-sm text-white">{label}</span>
    </div>
  )
}

function Timer({ endTime }: { endTime: Date }) {
  const [time, setTime] = useState(calculateTimeInterval(endTime))

  useEffect(() => {
    const timer = setInterval(() => {
      const formatted = calculateTimeInterval(endTime)
      setTime(formatted)
      if (!formatted) clearInterval(timer)
    }, 1000)

    return () => clearInterval(timer)
  }, [endTime])

  if (!time) return null

  return (
    <Card className="flex-center rounded-md bg-gradient-to-r from-emerald-400 to-cyan-400 p-6 shadow-none dark:from-cyan-700 dark:to-slate-800">
      <CardContent className="flex-center gap-6 p-0 md:gap-8">
        <TimeUnit label="Days" value={time.days} />
        <TimeUnit label="Hours" value={time.hours} />
        <TimeUnit label="Minutes" value={time.minutes} />
        <TimeUnit label="Seconds" value={time.seconds} />
      </CardContent>
    </Card>
  )
}

const DealsSection = () => {
  const weeklyDeals = useHighlight<ProductType>('weekly_deals')

  return (
    <AnimatedSection
      className={cn(
        'container my-4 dark:bg-transparent',
      )}
      delay={500}
    >
      <DefaultSectionTitle
        title="Weekly Deals"
        subtitle="Grab it before its too late!"
        buttonContent="All weekly Deals"
      />
      <Timer endTime={new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)} />
      <div className="responsive-product-grid">
        {weeklyDeals?.map((product, index) => (
          <ProductCard
            key={index}
            product={product}
            style={{ animationDelay: `${index * 400}ms` }}
          />
        ))}
      </div>
    </AnimatedSection>
  )
}

export default DealsSection
