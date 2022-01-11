import { useEffect, useReducer } from 'react'
import validator from 'validator'
import produce from 'immer'

type FormField = {
  type: 'numeric' | 'text'
  name: string
  value: string | number | undefined
  required?: boolean
}

type FormFieldData = {
  [field: string]: { value: string | number | undefined; isValid: boolean; shouldShow: boolean }
}

type FormErrorHandleling = FormField[]

const fieldValidation = {
  numeric: (value: string | number) => validator.isNumeric(value.toString()),
  text: (value: string | number) => validator.isAscii(value.toString()),
}

export const useFormErrorHandleling = (fields: FormErrorHandleling) => {
  const initialState = (): FormFieldData => {
    const formData: FormFieldData = {}
    for (const field of fields) {
      formData[field.name] = { value: field.value, isValid: false, shouldShow: false }
    }
    return formData
  }

  const [formData, dispatch] = useReducer(
    (state: FormFieldData, event: { type: string; payload?: unknown }): FormFieldData => {
      switch (event.type) {
        case 'SET_FORM_FIELD_ERROR':
          return produce(state, (draft) => {
            const field = event.payload as string

            draft[field].isValid = true
          })

        case 'CLEAR_FORM_FIELD_ERROR':
          return produce(state, (draft) => {
            const field = event.payload as string
            draft[field].isValid = false
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

        case 'SET_FIELD_VALUE':
          return produce(state, (draft) => {
            const field = event.payload as { field: string; value: string | number | undefined }
            draft[field.field].value = field.value
          })

        default:
          return state
      }
    },
    initialState()
  )

  // validate form data
  const errorValidation = () => {
    console.log('error validation')
    for (const field of fields) {
      const passesValidation = fieldValidation[field.type]

      if (!field.required && field.value === '') continue

      if (field.value !== undefined && !passesValidation(field.value)) {
        dispatch({ type: 'SET_FORM_FIELD_SHOW_ERROR', payload: field.name })
      }
    }
  }

  // validate form data on change
  useEffect(() => {
    for (const field of fields) {
      const passesValidation = fieldValidation[field.type]

      if (!field.required && field.value === '') continue

      if (field.value !== undefined && !passesValidation(field.value)) {
        dispatch({ type: 'SET_FORM_FIELD_ERROR', payload: field.name })
      } else {
        if (formData[field.name].shouldShow) {
          dispatch({ type: 'CLEAR_FORM_FIELD_SHOW_ERROR', payload: field.name })
        }

        if (formData[field.name].isValid) {
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

  return { formData, errorValidation }
}

// () => {
//   const formData: FormFieldData | Record<string, unknown> = {}
//   for (const field of fields) {
//     formData[field.name] = { isValid: false, shouldShow: false }
//   }
//   return formData
// }

// const setFieldError = (payload: string) => {
//   dispatch({ type: 'SET_FORM_FIELD_ERROR', payload })
// }

// const clearFieldError = (payload: string) => {
//   dispatch({ type: 'CLEAR_FORM_FIELD_ERROR', payload })
// }

// const setFormFieldShowError = (payload: string) => {
//   dispatch({ type: 'SET_FORM_FIELD_SHOW_ERROR', payload })
// }

// const clearFieldShowError = (payload: string) => {
//   dispatch({ type: 'CLEAR_FORM_FIELD_SHOW_ERROR', payload })
// }
