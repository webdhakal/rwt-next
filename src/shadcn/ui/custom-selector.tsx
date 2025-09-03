import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './select'

const CustomSelector = ({
  selectorValue,
  selectorData,
  selectorLabel,
  selectorPlaceholder,
  selectorOnValueChange,
}: {
  selectorValue: string
  selectorData: Array<Record<string, string>>
  selectorLabel: string
  selectorPlaceholder: string
  selectorOnValueChange: (currVal: string) => void
}) => {
  // console.log('data', selectorData)
  // console.log('label', selectorLabel)
  // console.log('value', selectorValue)

  // function getObjectFromValue(value: string) {
  //   const updatedValue = selectorData.filter((item) => item.id === value)
  //   return updatedValue[0]
  // }

  return (
    <div>
      <label className="mb-1 block text-sm font-medium text-muted-foreground">
        {selectorLabel}
      </label>
      {/* <Select value={selectorValue} onValueChange={selectorOnValueChange}> */}
      <Select
        value={selectorValue}
        // onValueChange={(value) => selectorOnValueChange(getObjectFromValue(value))}
        onValueChange={selectorOnValueChange}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder={selectorPlaceholder} />
        </SelectTrigger>
        <SelectContent>
          {selectorData &&
            selectorData.map((data) => (
              <SelectItem key={data.id} value={data.id}>
                {data.name}
              </SelectItem>
            ))}
        </SelectContent>
      </Select>
    </div>
  )
}

export default CustomSelector
