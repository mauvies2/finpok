import { FC } from 'react'
import FieldError from '../FieldError/FieldError'

type FormInputProps = {
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

const FormInput: FC<FormInputProps> = ({
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
}) => {
  return (
    <label className={`pl-2 text-sm font-semibold ${labelClass}`}>
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
          className={`focus:shadow-input mt-2 h-10 w-full rounded-full border border-gray-200 px-6 focus:outline-none
            ${shouldShowError && 'border-red-500 bg-red-50'}
            ${inputClass}
          `}
          onChange={onChange}
        />
        {symbol && <p className="absolute top-[19px] left-3 ">{symbol}</p>}
        <FieldError condition={shouldShowError}>{labelOnError}</FieldError>
      </div>
    </label>
  )
}

export default FormInput
