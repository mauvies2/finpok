import validator from 'validator'
import { useEffect } from 'react'
import { IUiState } from 'finpok/store/ui/UiContext'
import { useUiDispatch, useUiState } from 'finpok/store/ui/UiProvider'

type FormField = {
  type: 'numeric' | 'text'
  name: keyof IUiState['forms']['addTransaction']['error']
  value: string | number | undefined
}

type FormErrorHandleling = { [field: string]: FormField }

const fieldValidation = {
  numeric: (value: string | number) => validator.isNumeric(value.toString()),
  text: (value: string | number) => validator.isAscii(value.toString()),
}

export const useFormErrorHandleling = (fields: FormErrorHandleling) => {
  const { setFormFieldError, setFormFieldShowError, clearFormFieldError, clearFormFieldShowError } = useUiDispatch()
  const { error } = useUiState().forms.addTransaction

  const errorValidation = () => {
    for (const field in fields) {
      const inputField = fields[field]
      const passesValidation = fieldValidation[inputField.type]
      
      if (!passesValidation(inputField.value as string | number)) {
        setFormFieldShowError(fields[field].name)
      }
    }
  }

  useEffect(() => {
    for (const field in fields) {
      if (!fields[field].value) {
        setFormFieldError(fields[field].name)
      } else {
        if (error[fields[field].name].shouldShow) {
          clearFormFieldShowError(fields[field].name)
        }

        if (error[fields[field].name].isValid) {
          clearFormFieldError(fields[field].name)
        }
      }
    }
  }, [fields])

  useEffect(() => {
    return () => {
      for (const field in fields) {
        const inputField = fields[field]
        clearFormFieldShowError(inputField.name)
      }
    }
  }, [])

  return { error, errorValidation }
}
