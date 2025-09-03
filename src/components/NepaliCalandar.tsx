import NepaliDatePicker, { NepaliDate } from '@zener/nepali-datepicker-react'
import '@zener/nepali-datepicker-react/index.css'
import { useState } from 'react'

const NepaliCalandar = () => {
  const [value, setValue] = useState<NepaliDate | null>(null)
  return (
    <div className='container my-4'>
      <span>Nepali Date Picker</span>
      <NepaliDatePicker
        value={value}
        placeholder="Select date"
        onChange={(e) => {
          setValue(e)
        }}
      />
    </div>
  )
}

export default NepaliCalandar
