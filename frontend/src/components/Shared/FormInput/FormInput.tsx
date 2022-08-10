import FieldError from '../FieldError/FieldError'

interface Props {
  id?: string
  labelClass?: string
  name?: string
  type?: string
  min?: string
  step?: string
  placeholder?: string
  autoComplete?: string
  inputClass?: string
  value: string | number
  symbol?: string
  shouldShowError?: boolean
  labelOnError?: string
  label?: string
  autoFocus?: boolean
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const FormInput = ({
  id = '',
  name = '',
  labelClass = '',
  type = 'number',
  min,
  step,
  placeholder = '',
  autoComplete = 'off',
  inputClass = '',
  symbol,
  value,
  autoFocus,
  shouldShowError,
  label,
  labelOnError = 'This field is required',
  onChange,
}: Props) => {
  return (
    <label className={`dark:text-dark-text pl-3 text-sm font-normal ${labelClass}`}>
      {label}
      <div className="relative mb-4">
        <input
          id={id}
          name={name}
          type={type}
          value={value}
          min={min}
          step={step}
          placeholder={placeholder}
          autoComplete={autoComplete}
          autoFocus={autoFocus}
          className={`dark:bg-dark dark:border-dark-line focus:shadow-input mt-2 h-10 w-full rounded-full border border-gray-200 px-6 focus:border focus:border-red-300 focus:outline-none
            ${shouldShowError && 'border-red-500 bg-red-50'}
            ${inputClass}
          `}
          onChange={onChange}
        />
        {symbol && <p className="absolute top-[18px] left-3 ">{symbol}</p>}
        <FieldError condition={shouldShowError}>{labelOnError}</FieldError>
      </div>
    </label>
  )
}

export default FormInput
