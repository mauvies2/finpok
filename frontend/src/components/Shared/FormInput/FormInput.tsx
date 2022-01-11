import classNames from 'classnames'
import { FC } from 'react'
import FieldError from '../FieldError/FieldError'

type FormInputProps = {
  id?: string
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
    <label className="text-sm font-semibold">
      {label}
      <div className="form-control relative mb-4">
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
          className={classNames('input mt-2 border border-gray-200 pl-6', [
            {
              inputClass,
              'border-red-500 bg-red-50': shouldShowError,
            },
          ])}
          onChange={onChange}
        />
        {symbol && <p className="absolute top-[23px] left-3 ">{symbol}</p>}
        <FieldError condition={shouldShowError}>{labelOnError}</FieldError>
      </div>
    </label>
  )
}

export default FormInput
