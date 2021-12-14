import React, { ChangeEvent, useReducer } from 'react'
import { IUserSession } from 'finpok-core/domain'
import { auth } from 'finpok/services/AuthService'

export type AuthCredentials = { email: string; password: string }

export interface IAuthState {
  authUser: IUserSession | null
  isLoggedIn: boolean
  credentials: AuthCredentials
  error: string
}

export interface IAuthDispatch {
  login: () => Promise<void>
  logout: () => void
  checkAuth: () => Promise<void>
  clearErrors: () => void
  updateField: (e: ChangeEvent<HTMLInputElement>) => void
}

// initial state
export let initialState = {
  authUser: null,
  isLoggedIn: false,
  credentials: { email: '', password: '' },
  error: '',
}

try {
  initialState = JSON.parse(localStorage.getItem('auth') || '') || initialState
  initialState.credentials = { email: '', password: '' }
} catch (error) {
  console.log(error)
}

// reducer
const AuthReducer = (state: IAuthState, event: { type: string; payload?: any }) => {
  switch (event.type) {
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isLoggedIn: true,
        authUser: event.payload,
      }

    case 'AUTH_USER':
      return {
        ...state,
        isLoggedIn: event.payload,
      }

    case 'AUTH_ERROR':
      return {
        ...state,
        authUser: null,
        isLoggedIn: false,
        error: event.payload.error as string,
      }

    case 'ERROR':
      return {
        ...state,
        error: event.payload.error as string,
      }

    case 'LOGOUT':
      return {
        ...state,
        authUser: null,
        isLoggedIn: false,
        error: '',
      }

    case 'CLEAR_ERRORS':
      return {
        ...state,
        error: '',
      }

    case 'CLEAR_LOGIN_INPUTS':
      return {
        ...state,
        credentials: { email: '', password: '' },
      }

    case 'UPDATE_FIELD':
      return {
        ...state,
        credentials: {
          ...state.credentials,
          ...event.payload.credentials,
        },
      }

    default:
      return state
  }
}

const reducer = (state: IAuthState, event: { type: string; payload?: any }) => {
  const newState = AuthReducer(state, event)
  localStorage.setItem('auth', JSON.stringify(newState))
  return newState
}

// events
export const useAuthActions = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  const login = async () => {
    try {
      const authUser = await auth.login(state.credentials)
      if (authUser) dispatch({ type: 'LOGIN_SUCCESS', payload: authUser })
    } catch ({ message }) {
      dispatch({ type: 'AUTH_ERROR', payload: { error: message } })
    } finally {
      dispatch({ type: 'CLEAR_LOGIN_INPUTS' })
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
    } catch ({ message }) {
      dispatch({ type: 'AUTH_ERROR', payload: { error: message } })
    }
  }

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    const credentials = { ...state.credentials, [e.target.name]: e.target.value }

    dispatch({ type: 'UPDATE_FIELD', payload: { credentials } })
  }

  const clearErrors = () => {
    dispatch({ type: 'CLEAR_ERRORS' })
  }

  const events = {
    login,
    logout,
    checkAuth,
    clearErrors,
    updateField,
  }

  return { state, events }
}
