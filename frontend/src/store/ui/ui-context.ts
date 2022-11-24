import { useReducer } from 'react'
import { ITransaction } from 'finpoq-core/types'
import { useNavigate } from 'react-router-dom'
import { SelectedCrypto } from 'finpoq/types'

export interface IUiState {
  selectedCrypto: SelectedCrypto | null
}

export interface IUiDispatch {
  selectCrypto: (selectedCrypto: SelectedCrypto) => void
  clearSelectedCrypto: () => void
}

// initial state
const initialState: IUiState = {
  selectedCrypto: null,
}

// reducer
// eslint-disable-next-line
const UiReducer = (state: IUiState, event: { type: string; payload?: any }): IUiState => {
  switch (event.type) {
    case 'SELECT_CRYPTO_TO_ADD':
      return {
        ...state,
        selectedCrypto: event.payload,
      }

    case 'CLEAR_SELECTED_CRYPTO':
      return {
        ...state,
      }

    default:
      return state
  }
}

// eslint-disable-next-line
const reducer = (state: IUiState, event: { type: string; payload?: any }) => {
  const newState = UiReducer(state, event)
  localStorage.setItem('ui', JSON.stringify(newState))
  return newState
}

// events
export const useUiActions = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const navigate = useNavigate()

  const selectCrypto = (selectedCrypto: SelectedCrypto) => {
    dispatch({ type: 'SELECT_CRYPTO_TO_ADD', payload: selectedCrypto })
  }

  const clearSelectedCrypto = () => {
    dispatch({ type: 'CLEAR_SELECTED_CRYPTO' })
  }

  const events = {
    selectCrypto,
    clearSelectedCrypto,
  }

  return { state, events }
}
