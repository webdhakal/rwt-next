import { InputHTMLAttributes, useState, useEffect } from 'react'
import { Label } from '@/shadcn/ui/label'
import { Switch } from '@/shadcn/ui/switch'
import { CustomPermissionState, MultiCheckboxProps } from '@/types/MockData'

export default function Checkbox({
  className = '',
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  return (
    <input
      {...props}
      type="checkbox"
      className={
        'rounded border-gray-300 text-indigo-600 shadow-sm focus:ring-indigo-500 ' + className
      }
    />
  )
}

export const MultiCheckbox = ({ data, selectedPermissions = [], onChange }: MultiCheckboxProps) => {
  const [checkedState, setCheckedState] = useState<CustomPermissionState>({})
  useEffect(() => {
    const initialState = Object.fromEntries(
      Object.entries(data).map(([menuName, permissionList]) => {
        const children = Object.fromEntries(
          permissionList.map((permission) => [permission.id, !!selectedPermissions[permission.id]]),
        )
        const parent = Object.values(children).every((isChecked) => isChecked)

        return [menuName, { parent, children }]
      }),
    )
    setCheckedState(initialState)
  }, [data, selectedPermissions])

  const handleParentToggle = (menuName: string) => {
    const newState = { ...checkedState }
    const isChecked = !newState[menuName].parent
    newState[menuName].parent = isChecked

    newState[menuName].children = Object.fromEntries(
      Object.keys(newState[menuName].children).map((id) => [id, isChecked]),
    )

    setCheckedState(newState)
    onChange(newState)
  }

  const handleChildToggle = (menuName: string, permissionId: string) => {
    const newState = { ...checkedState }
    newState[menuName].children[permissionId] = !newState[menuName].children[permissionId]
    newState[menuName].parent = Object.values(newState[menuName].children).every(
      (isChecked) => isChecked,
    )

    setCheckedState(newState)
    onChange(newState)
  }

  return (
    <div>
      {Object.entries(checkedState).map(([menuName, state]) => (
        <div key={menuName} className="mb-4">
          <div className="flex items-center space-x-2 bg-gray-200 px-2 py-2">
            <Label htmlFor={`menu-${menuName}`} className="capitalize">
              {menuName}
            </Label>
            <Switch
              id={`menu-${menuName}`}
              checked={state.parent}
              onClick={() => handleParentToggle(menuName)}
            />
          </div>

          <div className="mt-2 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {Object.entries(state.children).map(([permissionId, isChecked]) => (
              <div key={permissionId} className="flex items-center space-x-2">
                <Switch
                  id={`permission-${permissionId}`}
                  checked={isChecked}
                  onClick={() => handleChildToggle(menuName, permissionId)}
                />
                <Label htmlFor={`permission-${permissionId}`}>
                  {data[menuName].find((permission) => permission.id === Number(permissionId))
                    ?.name || 'Permission not found'}
                </Label>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
