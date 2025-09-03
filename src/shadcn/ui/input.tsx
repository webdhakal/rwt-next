import * as React from 'react'
import { cn } from '@/shadcn/lib/utils'
import InputError from '@/components/InputError'
import { Check, Copy, Eye, EyeOff, LucideIcon, X } from 'lucide-react'
import { Button } from './button'
import { Textarea } from './textarea'
import { Label } from './label'

interface InputProps extends React.ComponentProps<'input'> {
  children?: React.ReactNode
  inputParentClassName?: React.ReactNode
  renderAfterComponent?: React.ReactNode
  icon?: {
    value: LucideIcon
    align: 'prepend' | 'append'
    iconClass?: string
  }
  error?: string
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  (
    {
      children,
      inputParentClassName,
      className,
      error,
      icon,
      type,
      renderAfterComponent,
      ...props
    },
    ref,
  ) => {
    const [showPassword, setShowPassword] = React.useState(false)
    const isPasswordType = type === 'password'

    const IconComponent = icon?.value

    return (
      <>
        <div
          className={cn(
            'relative flex w-full items-center rounded-md border border-input bg-transparent shadow-sm',
            inputParentClassName,
          )}
        >
          {icon && icon.align === 'prepend' && IconComponent && (
            <div className="pointer-events-none absolute left-3 flex items-center text-muted-foreground">
              <IconComponent className="h-4 w-4" />
            </div>
          )}
          <input
            type={isPasswordType && showPassword ? 'text' : type}
            className={cn(
              'flex h-9 w-full rounded-md border-none bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
              icon?.align === 'prepend' ? 'pl-10' : '',
              icon?.align === 'append' ? 'pr-10' : '',
              isPasswordType ? 'pr-10' : '',
              className,
            )}
            ref={ref}
            {...props}
          />
          {isPasswordType && (
            <Button
              type="button"
              size="icon"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-0 bg-transparent text-muted-foreground shadow-none"
            >
              {showPassword ? <Eye /> : <EyeOff />}
            </Button>
          )}
          {renderAfterComponent && renderAfterComponent}
          {icon && icon.align === 'append' && IconComponent && (
            <div className={cn("pointer-events-none absolute right-3 flex items-center text-muted-foreground", icon.iconClass)}>
              <IconComponent className="h-4 w-4" />
            </div>
          )}
        </div>
        {error && <InputError message={error} />}
      </>
    )
  },
)
Input.displayName = 'Input'

interface InputWithLabelProps extends React.ComponentProps<'input'> {
  children?: React.ReactNode
  label: string
  subLabel?: string
  labelClassName?: string
  inputClassName?: string
  textAreaClassName?: string
  inputParentClassName?: string
  renderAfterComponent?: React.ReactNode
  clipboardCopy?: boolean
  error?: string
  required?: boolean
  className?: string
  icon?: {
    value: LucideIcon
    align: 'prepend' | 'append',
    iconClass?: string
  }
}

interface TextAreaWithLabelProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string
  subLabel?: string
  error?: string
  labelClassName?: string
  textAreaClassName?: string
}

const InputWithLabel = React.forwardRef<HTMLInputElement, InputWithLabelProps>(
  (
    {
      children,
      label,
      error,
      labelClassName,
      className,
      icon,
      inputClassName,
      inputParentClassName,
      renderAfterComponent,
      clipboardCopy = false,
      required = false,
      value,
      ...props
    },
    ref,
  ) => {
    const [copied, setCopied] = React.useState(false)
    const handleCopy = async () => {
      if (typeof value === 'string') {
        await navigator.clipboard.writeText(value)
        setCopied(true)
        setTimeout(() => setCopied(false), 1500)
      }
    }
    return (
      <div className={cn('space-y-1', className)}>
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              'text-sm font-medium text-muted-foreground',
              required && 'required-field',
              labelClassName,
            )}
          >
            {label}
          </label>
        )}

        <div className="relative w-full">
          <Input
            ref={ref}
            icon={icon}
            className={cn('pr-10 text-sm', inputClassName)} // pr-10 gives space for the icon
            inputParentClassName={inputParentClassName}
            {...props}
            value={value}
            renderAfterComponent={renderAfterComponent}
          />

          {clipboardCopy && typeof value === 'string' && (
            <button
              type="button"
              onClick={handleCopy}
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 transition-colors hover:bg-accent"
              title="Copy to clipboard"
            >
              {copied ? (
                <Check size={16} className="text-muted-foreground" />
              ) : (
                <Copy size={16} className="text-muted-foreground" />
              )}
            </button>
          )}
        </div>

        {error && <InputError message={error} />}
      </div>
    )
  },
)
InputWithLabel.displayName = 'InputWithLabel'

const TextAreaWithLabel = React.forwardRef<HTMLTextAreaElement, TextAreaWithLabelProps>(
  (
    {
      children,
      label,
      subLabel,
      textAreaClassName,
      error,
      labelClassName,
      className,
      placeholder,
      required,
      ...props
    },
    ref,
  ) => {
    return (
      <div className={cn('space-y-1', className)}>
        {label && (
          <label
            htmlFor={props.id}
            className={cn(
              'text-sm font-medium text-muted-foreground',
              required && 'required-field',
              labelClassName,
            )}
          >
            {label}
          </label>
        )}
        <Textarea
          ref={ref}
          placeholder={placeholder}
          className={cn(textAreaClassName)}
          {...props}
        />
        {subLabel && (
          <label className={cn('text-xs font-medium text-muted-foreground', labelClassName)}>
            {subLabel}
          </label>
        )}
        {error && <InputError message={error} />}
      </div>
    )
  },
)
InputWithLabel.displayName = 'TextAreaWithLabel'

interface InputWithColorProps extends React.ComponentProps<'input'> {
  color: string
  label?: string
  subLabel?: string
  labelClassName?: string
  colorClassName?: string
  inputClassName?: string
  error?: string
}

const InputWithColor = React.forwardRef<HTMLInputElement, InputWithColorProps>(
  (
    { label, subLabel, color, error, labelClassName, colorClassName, inputClassName, ...props },
    ref,
  ) => {
    return (
      <div>
        {label && (
          <Label
            htmlFor={props.id}
            className={cn('text-sm font-medium text-muted-foreground', labelClassName)}
          >
            {label}
          </Label>
        )}
        <Input
          ref={ref}
          className={cn('select-none text-white focus-visible:ring-0', inputClassName)}
          {...props}
          style={{
            backgroundColor: color,
          }}
        />
        {subLabel && <Label className="hidden text-xs text-slate-500 md:block">{subLabel}</Label>}
        {error && <InputError message={error} />}
      </div>
    )
  },
)
InputWithColor.displayName = 'InputWithColor'

interface InputWithTagsProps {
  label?: string
  placeholder?: string
  tags: string[]
  disable?: boolean
  setTags: React.Dispatch<React.SetStateAction<string>>
}
const InputWithTags = ({
  label,
  tags,
  placeholder,
  disable,
  setTags,
  ...props
}: InputWithTagsProps) => {
  const handleTagsRemoval = (idx: number) => {
    setTags((prev) =>
      prev
        .split(' ')
        .filter((item, index) => index !== idx)
        .join(' '),
    )
  }
  return (
    <div className={cn('space-y-1')}>
      {label && <label className="text-sm font-medium text-muted-foreground">{label}</label>}
      <Input className="border-0 shadow-none" placeholder={placeholder} {...props} />
      <div className="flex flex-wrap gap-1 overflow-hidden">
        {tags.length > 0 &&
          tags[0] !== '' &&
          tags.map((item, index) => (
            <span
              key={`tags-number-${index + 1}`}
              className="flex items-center gap-1 rounded-xl bg-slate-500 p-1 text-xs font-semibold text-white"
            >
              <X height={12} width={12} onClick={() => handleTagsRemoval(index)} />
              {item}
            </span>
          ))}
      </div>
    </div>
  )
}
InputWithTags.displayName = 'InputWithTags'

export { Input, InputWithLabel, InputWithColor, TextAreaWithLabel, InputWithTags }
