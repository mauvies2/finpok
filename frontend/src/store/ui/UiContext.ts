import { useReducer } from 'react'
import { ITransaction } from 'finpok-core/domain'
import { useNavigate } from 'react-router-dom'

export interface IUiState {
  isModalOpen: boolean

  portfolio: {
    currentOwnedCrypto: string | null
    currentCrypto: string | null
    currentTransaction: ITransaction | null
  }
}

export interface IUiDispatch {
  selectCrypto: (cryptoSymbol: string) => void
  clearSelectedCrypto: () => void
  selectOwnedCryptoDetail: (ownedCrypto: string) => void
  selectCurrentTransaction: (transaction: ITransaction) => void
  openModal: (route: string) => void
  closeModal: (goBack: number) => void
}

// initial state
const initialState: IUiState = {
  isModalOpen: false,

  portfolio: {
    currentCrypto: null,
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
          currentCrypto: event.payload,
        },
      }

    case 'CLEAR_SELECTED_ASSET':
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          currentCrypto: null,
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

    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true,
      }

    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false,
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

  const selectCrypto = (cryptoSymbol: string) => {
    dispatch({ type: 'SELECT_ASSET_TO_ADD', payload: cryptoSymbol })
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
    dispatch({ type: 'CLOSE_MODAL' })
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
