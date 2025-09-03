import { useState } from 'react'
import InputFieldBoxedButton from '@/components/Form/InputFieldBoxedButton'
import { CiSearch } from 'react-icons/ci'
import TagsSection from '@/components/Section/TagSection'

const ProductSearchHeader = () => {
  const [productSearching, setProductSearching] = useState(false)

  return (
    <div className="flex-center w-full">
      <div className="flex-center relative w-full gap-2 md:w-2/3">
        <InputFieldBoxedButton
          placeholder="What are you looking for today?"
          callback={setProductSearching}
        />
        {productSearching && (
          <div className="absolute left-0 top-12 z-1 h-fit w-full border bg-white p-2">
            <TagsSection />
          </div>
        )}
        {!productSearching && <CiSearch className="text-3xl" />}
      </div>
    </div>
  )
}

export default ProductSearchHeader
