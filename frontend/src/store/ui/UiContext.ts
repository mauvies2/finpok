import { useReducer } from 'react'
import { ITransaction } from 'finpok-core/domain'
import { useNavigate } from 'react-router-dom'

export interface IUiState {
  isMobileMenuOpen: boolean
  modalRouteProgress: number

  portfolio: {
    currentOwnedCrypto: string | null
    currentCrypto: string | null
    currentTransaction: ITransaction | null
  }
}

export interface IUiDispatch {
  toggleMobileMenu: () => void
  selectCrypto: (cryptoSymbol: string) => void
  clearSelectedCrypto: () => void
  selectOwnedCryptoDetail: (ownedCrypto: string) => void
  selectCurrentTransaction: (transaction: ITransaction) => void
  openModal: (route: string) => void
  closeModal: () => void
}

// initial state
const initialState: IUiState = {
  isMobileMenuOpen: false,
  modalRouteProgress: 0,

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
    case 'TOGGLE_MENU':
      return {
        ...state,
        isMobileMenuOpen: !state.isMobileMenuOpen,
      }

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

    case 'USE_MODAL':
      const modalRouteProgress = state.modalRouteProgress + 1
      return {
        ...state,
        modalRouteProgress,
      }

    case 'CLOSE_MODAL':
      return {
        ...state,
        modalRouteProgress: 0,
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

  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MENU' })
  }

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
    dispatch({ type: 'USE_MODAL' })
  }

  const closeModal = () => {
    navigate(-state.modalRouteProgress)
    dispatch({ type: 'CLOSE_MODAL' })
  }

  const events = {
    toggleMobileMenu,
    selectCrypto,
    clearSelectedCrypto,
    selectOwnedCryptoDetail,
    selectCurrentTransaction,
    closeModal,
    openModal,
  }

  return { state, events }
}
