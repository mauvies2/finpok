import produce from 'immer'
import { useReducer } from 'react'
import { LoginCredentials, IUserSession } from 'finpok-core/domain'
import { auth } from 'finpok/services/AuthService'

export interface IAuthState {
  authUser: IUserSession | null
  isLoggedIn: boolean
  error: string
}

export interface IAuthDispatch {
  login: (credentials: LoginCredentials) => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  clearAuthErrors: () => void
}

// initial state
let initialState = {
  authUser: null,
  isLoggedIn: false,
  error: '',
}

try {
  const authLocalStorageState = localStorage.getItem('auth')
  if (authLocalStorageState && typeof authLocalStorageState === 'string') {
    initialState = JSON.parse(authLocalStorageState)
    initialState.error = ''
  }
} catch (error) {
  console.log(error)
}

// reducer
// eslint-disable-next-line
const AuthReducer = (state: IAuthState, event: { type: string; payload?: any }) => {
  switch (event.type) {
    case 'LOGIN_SUCCESS':
      return produce(state, (draft) => {
        draft.isLoggedIn = true
        draft.authUser = event.payload
      })

    case 'AUTH_USER':
      return produce(state, (draft) => {
        draft.isLoggedIn = event.payload
      })

    case 'AUTH_ERROR':
      return produce(state, (draft) => {
        draft.authUser = null
        draft.isLoggedIn = false
        draft.error = event.payload.error
      })

    case 'ERROR':
      return produce(state, (draft) => {
        draft.error = event.payload.error
      })

    case 'LOGOUT':
      return produce(state, (draft) => {
        draft.authUser = null
        draft.isLoggedIn = false
        draft.error = ''
      })

    case 'CLEAR_ERRORS':
      return produce(state, (draft) => {
        draft.error = ''
      })

    default:
      return state
  }
}

// eslint-disable-next-line
const reducer = (state: IAuthState, event: { type: string; payload?: any }) => {
  const newState = AuthReducer(state, event)
  localStorage.setItem('auth', JSON.stringify(newState))
  return newState
}

// events
export const useAuthActions = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async (credentials: LoginCredentials) => {
    try {
      const authUser = await auth.login(credentials)
      dispatch({ type: 'LOGIN_SUCCESS', payload: authUser })
    } catch (e) {
      dispatch({ type: 'AUTH_ERROR', payload: { error: e } })
    }
  }

  const logout = () => {
    auth.logout()
    dispatch({ type: 'LOGOUT' })
  }

  const checkAuth = async () => {
    try {
      const authUser = await auth.isLoggedIn()
      dispatch({ type: 'AUTH_USER', payload: authUser })
    } catch (e) {
      dispatch({ type: 'AUTH_ERROR', payload: { error: e } })
    }
  }

  const clearAuthErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }

  const events = {
    login,
    logout,
    checkAuth,
    clearAuthErrors,
  }

  return { state, events }
}
