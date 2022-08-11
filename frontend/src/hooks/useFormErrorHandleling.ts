import { useEffect, useReducer } from 'react'
import validator from 'validator'
import produce from 'immer'
import { capitalizeFirstLetter } from 'finpoq/utils/capitalizeString'

type FormField = {
  type: 'numeric' | 'text' | 'email' | 'password'
  name: string
  value: string | number | undefined
  required?: boolean
}

type FormFieldValidation = {
  [field: string]: { hasError: boolean; shouldShow: boolean; errorMessage: string }
}

const fieldValidation = {
  numeric: {
    isValueValid: (value: string | number) => validator.isNumeric(value.toString()),
    message: 'This field must be a number',
  },
  text: {
    isValueValid: (value: string | number) => validator.isAscii(value.toString()),
    message: 'This field must be text',
  },
  email: {
    isValueValid: (value: string | number) => validator.isEmail(value.toString()),
    message: 'This field must be a valid email',
  },
  password: {
    isValueValid: (value: string | number) => validator.isStrongPassword(value.toString()),
    message: 'The password must contain letters, numbers and symbols',
  },
}

export const useFormErrorHandleling = (fields: FormField[]) => {
  const initialState = (): FormFieldValidation => {
    const formData: FormFieldValidation = {}

    for (const field of fields) {
      formData[field.name] = { hasError: false, shouldShow: false, errorMessage: '' }
    }

    return formData
  }

  const [formData, dispatch] = useReducer(
    (state: FormFieldValidation, event: { type: string; payload: unknown }): FormFieldValidation => {
      switch (event.type) {
        case 'SET_FORM_FIELD_ERROR':
          return produce(state, (draft) => {
            const field = event.payload as string

            draft[field].hasError = true
          })

        case 'CLEAR_FORM_FIELD_ERROR':
          return produce(state, (draft) => {
            const field = event.payload as string
            draft[field].hasError = false
          })

        case 'SET_FORM_FIELD_SHOW_ERROR':
          return produce(state, (draft) => {
            const field = event.payload as string
            draft[field].shouldShow = true
          })

        case 'CLEAR_FORM_FIELD_SHOW_ERROR':
          return produce(state, (draft) => {
            const field = event.payload as string
            draft[field].shouldShow = false
          })

        case 'SET_FORM_FIELD_ERROR_MESSAGE':
          return produce(state, (draft) => {
            const { field, message } = event.payload as { field: string; message: string }
            draft[field].errorMessage = message
          })

        default:
          return state
      }
    },
    initialState()
  )

  // validate form data
  const isFormValid = (): boolean => {
    let isValid: boolean = true

    for (const field of fields) {
      const fieldValidator = fieldValidation[field.type]

      if (!field.required && field.value === '') continue

      if (field.value === '' || field.value === undefined) {
        dispatch({ type: 'SET_FORM_FIELD_SHOW_ERROR', payload: field.name })
        dispatch({
          type: 'SET_FORM_FIELD_ERROR_MESSAGE',
          payload: { field: field.name, message: `${capitalizeFirstLetter(field.name)} is required` },
        })

        isValid = false
      }

      if (field.value && !fieldValidator.isValueValid(field.value)) {
        dispatch({ type: 'SET_FORM_FIELD_SHOW_ERROR', payload: field.name })
        dispatch({
          type: 'SET_FORM_FIELD_ERROR_MESSAGE',
          payload: { field: field.name, message: fieldValidator.message },
        })

        isValid = false
      }
    }

    return isValid
  }

  // validate form data on change
  useEffect(() => {
    for (const field of fields) {
      if (!field.required && field.value === '') continue

      const fieldValidator = fieldValidation[field.type]

      if (field.value !== undefined && !fieldValidator.isValueValid(field.value)) {
        dispatch({ type: 'SET_FORM_FIELD_ERROR', payload: field.name })
      } else {
        if (formData[field.name].shouldShow) {
          dispatch({ type: 'CLEAR_FORM_FIELD_SHOW_ERROR', payload: field.name })
        }

        if (formData[field.name].hasError) {
          dispatch({ type: 'CLEAR_FORM_FIELD_ERROR', payload: field.name })
        }
      }
    }
  }, [fields, formData])

  // clear field errors when component unmounts
  useEffect(() => {
    return () => {
      for (const field of fields) {
        dispatch({ type: 'CLEAR_FORM_FIELD_SHOW_ERROR', payload: field.name })
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return { formData, isFormValid }
}
