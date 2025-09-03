import DefaultSectionTitle from '@/utils/DefaultSectionTitle'
import { useState } from 'react'
import { cn } from '@/shadcn/lib/utils'
import { RiExternalLinkLine } from 'react-icons/ri'
import { motion, AnimatePresence } from 'motion/react'
import { randomImage } from '@/Libs/Helper'
import { Link } from '@inertiajs/react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/shadcn/ui/tabs'

const TopVendorsSection = () => {
  const topVendorsMock = [
    {
      id: 1,
      name: 'Mira Fashion Pvt. Ltd.',
      description: 'Fruits(5) | Vegetable (30) | Snacks (09)',
      sales: 587,
      image: randomImage(1),
      brandImage: randomBrandImage(1),
      link: '#',
    },
    {
      id: 2,
      name: 'Elena Fashion Pvt. Ltd.',
      description: 'Fruits(8) | Vegetable (15) | Snacks (04)',
      sales: 428,
      image: randomImage(2),
      brandImage: randomBrandImage(2),
      link: '#',
    },
    {
      id: 3,
      name: 'Mario Fashion Pvt. Ltd.',
      description: 'Fruits(16) | Vegetable (42) | Snacks (18)',
      sales: 1024,
      image: randomImage(3),
      brandImage: randomBrandImage(3),
      link: '#',
    },
    {
      id: 4,
      name: 'Maria Fashion Pvt. Ltd.',
      description: 'Fruits(2) | Vegetable (10) | Snacks (03)',
      sales: 210,
      image: randomImage(4),
      brandImage: randomBrandImage(4),
      link: '#',
    },
  ]

  function randomImage(id: number) {
    return `https://picsum.photos/seed/${id}/400/400`
  }

  function randomBrandImage(id: number) {
    return `https://picsum.photos/seed/brand${id}/100/100`
  }

  const [selectedTab, setSelectedTab] = useState(topVendorsMock[0].id)

  return (
    <div className="my-4 mb-12 bg-white">
      <div className="container">
        <DefaultSectionTitle
          title="Top Vendors"
          subtitle="Our top partners at the platform"
          showButton={false}
        />
        <div className="grid gap-8 sm:grid-cols-1 md:gap-6 lg:grid-cols-[500px_auto]">
          {/* Image Preview */}
          <div className="relative h-[250px] sm:h-[400px] md:mr-2 md:h-[450px] xl:h-[500px]">
            <AnimatePresence mode="wait">
              <motion.img
                src={topVendorsMock.find((vendor) => vendor.id === selectedTab)?.image}
                alt="Vendor Preview"
                className="h-full w-full rounded-[30px] object-cover"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>

            <div className="absolute -bottom-7 flex w-full justify-center lg:translate-x-8 lg:transform lg:justify-end">
              <img
                src={topVendorsMock.find((vendor) => vendor.id === selectedTab)?.brandImage}
                alt="Brand Logo"
                className="size-22 rounded-full bg-white p-3 lg:size-32"
              />
            </div>
          </div>

          {/* Tabs */}
          <Tabs
            defaultValue={topVendorsMock[0].id.toString()}
            className="h-full w-full"
            onValueChange={(value) => setSelectedTab(Number(value))}
          >
            <TabsList className="grid h-full grid-cols-1 gap-2 bg-white">
              {topVendorsMock.map((vendor) => (
                <TabsTrigger
                  key={vendor.id}
                  value={vendor.id.toString()}
                  className={cn(
                    'block w-full items-center justify-between rounded-lg bg-secondary py-4 text-center sm:text-left md:flex md:py-6',
                    vendor.id === selectedTab ? 'ring-1 ring-success' : '',
                  )}
                >
                  <div>
                    <p
                      className={cn(
                        'text-sm font-medium text-gray-900 md:text-lg',
                        vendor.id === selectedTab ? 'text-success' : '',
                      )}
                    >
                      {vendor.name}
                    </p>
                    <p className="font-secondary text-xs text-gray-600">{vendor.description}</p>
                  </div>
                  <span className="text-sm font-semibold text-gray-700">
                    Sales - {vendor.sales}
                  </span>
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
      </div>
      {/* <div className="grid grid-cols-2">
          <div className="relative overflow-hidden rounded-xl">
            <AnimatePresence mode="wait">
              <motion.img
                key={selectedVendor}
                src={topVendorsMock[selectedVendor - 1].image}
                alt={topVendorsMock[selectedVendor - 1].name}
                className="w-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
              />
            </AnimatePresence>
            <Link
              href={topVendorsMock[selectedVendor - 1].link}
              className="absolute right-4 top-4 rounded-md bg-black p-2 text-xl text-white duration-75 ease-out hover:bg-white hover:text-black"
            >
              <RiExternalLinkLine />
            </Link>
          </div>
          <div className="flex w-full flex-col gap-3 md:w-2/3 lg:w-1/2">
            {topVendorsMock.map((item) => (
              <div
                key={item.id}
                className={cn(
                  'flex cursor-pointer flex-col justify-between rounded-3xl border px-6 py-4 duration-200 ease-linear',
                  selectedVendor === item.id
                    ? 'border-purple-300 bg-purple-100'
                    : 'border-slate-400 bg-slate-100',
                )}
                onClick={() => setSelectedVendor(item.id)}
              >
                <div>
                  <h1
                    className={cn(
                      'text-xl font-bold duration-200 ease-linear',
                      selectedVendor === item.id ? 'text-purple-400' : 'text-slate-600',
                    )}
                  >
                    {item.name}
                  </h1>
                  <p className="text-sm text-slate-400">{item.description}</p>
                </div>
                <span className="text-sm text-slate-400">Sales - {item.sales}</span>
              </div>
            ))}
          </div>
        </div> */}
    </div>
  )
}

export default TopVendorsSection
