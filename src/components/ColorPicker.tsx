import React, { useState } from 'react'

const ColorPicker = () => {
  const [color, setColor] = useState('#ff0000')

  const handleColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setColor(e.target.value)
  }

  return (
    <div className='container'>
      <label htmlFor="hs-color-input" className="mb-2 block text-sm font-medium dark:text-white">
        Color picker
      </label>

      {/* Color input with color picker */}
      <input
        type="color"
        id="hs-color-input"
        value={color}
        onChange={handleColorChange}
        className="block h-10 w-14 cursor-pointer rounded-lg border border-gray-200 bg-white p-1 disabled:pointer-events-none disabled:opacity-50 dark:border-neutral-700 dark:bg-neutral-900"
        title="Choose your color"
      />

      {/* Hex input box */}
      <div className="mt-3 flex items-center">
        <input
          type="text"
          value={color}
          onChange={handleColorChange}
          className="w-32 rounded-lg border border-gray-300 p-2 text-sm dark:border-neutral-700 dark:bg-neutral-800 dark:text-white"
          title="Enter hex color"
        />
      </div>
    </div>
  )
}

export default ColorPicker
