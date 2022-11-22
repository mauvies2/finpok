import { useReducer } from 'react'
import { ITransaction } from 'finpoq-core/types'
import { useNavigate } from 'react-router-dom'
import { SelectedCrypto } from 'finpoq/types'

export interface IUiState {
  portfolio: {
    currentOwnedCrypto: string | null
    selectedCrypto: SelectedCrypto | null
    currentTransaction: ITransaction | null
  }
}

export interface IUiDispatch {
  selectCrypto: (selectedCrypto: SelectedCrypto) => void
  clearSelectedCrypto: () => void
  selectOwnedCryptoDetail: (ownedCrypto: string) => void
  selectCurrentTransaction: (transaction: ITransaction) => void
  openModal: (route: string) => void
  closeModal: (goBack: number) => void
}

// initial state
const initialState: IUiState = {
  portfolio: {
    selectedCrypto: null,
    currentOwnedCrypto: null,
    currentTransaction: null,
  },
}

// reducer
// eslint-disable-next-line
const UiReducer = (state: IUiState, event: { type: string; payload?: any }): IUiState => {
  switch (event.type) {
    case 'SELECT_ASSET_TO_ADD':
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          selectedCrypto: event.payload,
        },
      }

    case 'CLEAR_SELECTED_ASSET':
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          selectedCrypto: null,
        },
      }

    case 'SELECT_OWNED_CRYPTO':
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          currentOwnedCrypto: event.payload,
        },
      }

    case 'SELECT_SINGLE_TRANSACTION':
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          currentTransaction: event.payload,
        },
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
    dispatch({ type: 'SELECT_ASSET_TO_ADD', payload: selectedCrypto })
  }

  const clearSelectedCrypto = () => {
    dispatch({ type: 'CLEAR_SELECTED_ASSET' })
  }

  const selectOwnedCryptoDetail = (ownedCrypto: string) => {
    dispatch({ type: 'SELECT_OWNED_CRYPTO', payload: ownedCrypto })
  }

  const selectCurrentTransaction = (transaction: ITransaction) => {
    dispatch({ type: 'SELECT_SINGLE_TRANSACTION', payload: transaction })
  }

  const openModal = (route: string) => {
    navigate(route)
    dispatch({ type: 'OPEN_MODAL' })
  }

  const closeModal = (goBack: number) => {
    navigate(-goBack)
  }

  const events = {
    selectCrypto,
    clearSelectedCrypto,
    selectOwnedCryptoDetail,
    selectCurrentTransaction,
    closeModal,
    openModal,
  }

  return { state, events }
}
