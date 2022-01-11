import { useReducer } from 'react'
import { ITransaction } from 'finpok-core/domain'
import { produce } from 'immer'

export interface IUiState {
  isMobileMenuOpen: boolean
  modal: string | null

  portfolio: {
    isPortfolioCryptoDetailSection: boolean
    currentOwnedCrypto: string | null
    currentCrypto: string | null
    currentTransaction: ITransaction | null
  }
}

export interface IUiDispatch {
  toggleMobileMenu: () => void
  openModal: (section: string) => void
  closeModal: () => void
  selectCrypto: (cryptoSymbol: string) => void
  clearSelectedAsset: () => void
  openOwnedCryptoDetail: (ownedCrypto: string) => void
  closeOwnedCryptoDetail: () => void
  selectCurrentTransaction: (transaction: ITransaction) => void
}

// initial state
const initialState: IUiState = {
  isMobileMenuOpen: false,
  modal: null,

  portfolio: {
    isPortfolioCryptoDetailSection: false,
    currentCrypto: null,
    currentOwnedCrypto: null,
    currentTransaction: null,
  },
}

// try {
//   initialState = JSON.parse(localStorage.getItem('ui') || '') || initialState
// } catch (error) {}

// reducer
// eslint-disable-next-line
const UiReducer = (state: IUiState, event: { type: string; payload?: any }): IUiState => {
  switch (event.type) {
    case 'TOGGLE_MENU':
      return {
        ...state,
        isMobileMenuOpen: !state.isMobileMenuOpen,
      }

    case 'OPEN_MODAL':
      return {
        ...state,
        modal: event.payload,
      }

    case 'CLOSE_MODAL':
      return produce(state, (draft) => {
        draft.modal = null
      })

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

    case 'OPEN_OWNED_CRYPTO_DETAIL':
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          isPortfolioCryptoDetailSection: true,
        },
      }

    case 'CLOSE_TRANSACTIONS_DETAIL':
      return {
        ...state,
        portfolio: {
          ...state.portfolio,
          isPortfolioCryptoDetailSection: false,
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

  const toggleMobileMenu = () => {
    dispatch({ type: 'TOGGLE_MENU' })
  }

  const openModal = (section: string) => {
    dispatch({ type: 'OPEN_MODAL', payload: section })
  }

  const closeModal = () => {
    dispatch({ type: 'CLOSE_MODAL' })
  }

  const selectCrypto = (cryptoSymbol: string) => {
    dispatch({ type: 'SELECT_ASSET_TO_ADD', payload: cryptoSymbol })
  }

  const clearSelectedAsset = () => {
    dispatch({ type: 'CLEAR_SELECTED_ASSET' })
  }

  const openOwnedCryptoDetail = (ownedCrypto: string) => {
    dispatch({ type: 'OPEN_OWNED_CRYPTO_DETAIL' })
    dispatch({ type: 'SELECT_OWNED_CRYPTO', payload: ownedCrypto })
  }

  const closeOwnedCryptoDetail = () => {
    dispatch({ type: 'CLOSE_TRANSACTIONS_DETAIL' })
    dispatch({ type: 'SELECT_OWNED_CRYPTO', payload: null })
  }

  const selectCurrentTransaction = (transaction: ITransaction) => {
    dispatch({ type: 'SELECT_SINGLE_TRANSACTION', payload: transaction })
  }

  const events = {
    toggleMobileMenu,
    openModal,
    closeModal,
    selectCrypto,
    clearSelectedAsset,
    openOwnedCryptoDetail,
    closeOwnedCryptoDetail,
    selectCurrentTransaction,
  }

  return { state, events }
}
