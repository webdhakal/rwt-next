import { Dispatch, FC, SetStateAction, useRef } from 'react'
import { BiSend } from 'react-icons/bi'
import { GoSearch } from 'react-icons/go'

interface InputFieldBoxedButtonProps {
  placeholder: string
  callback: Dispatch<SetStateAction<boolean>>
}

const InputFieldBoxedButton: FC<InputFieldBoxedButtonProps> = ({
  placeholder,
  callback = () => {},
}) => {
  const inputValueRef = useRef<HTMLInputElement | null>(null)

  const handleInputChange = () => {
    if (inputValueRef.current) {
      callback(inputValueRef.current.value !== '')
    }
  }

  return (
    <div className="relative w-full">
      <input
        ref={inputValueRef}
        type="text"
        className="outline-remove-all w-full rounded-md border-slate-300 py-3 text-sm"
        placeholder={`${placeholder || ''}`}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default InputFieldBoxedButton
