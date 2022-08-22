import { FC } from 'react'
import { ProviderProps } from 'react-helmet-async'
import { IAuthDispatch, IAuthState, useAuthActions } from './auth-context'
import makeStore from '../make-store'

const store = makeStore<IAuthState, IAuthDispatch>(useAuthActions)

const AuthProvider = store.Provider as FC<ProviderProps>
const useAuthState = store.useState
const useAuthDispatch = store.useDispatch

export { AuthProvider, useAuthState, useAuthDispatch }
