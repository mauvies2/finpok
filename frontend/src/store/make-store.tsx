import { createContext, ReactNode, useContext } from 'react'

interface ProviderProps {
  children: ReactNode
}

export default function makeStore<T, K>(useEvents: () => { state: T; events: K }) {
  const State = createContext<T>({} as T)
  const Dispatch = createContext<K>({} as K)

  const Provider = ({ children }: ProviderProps) => {
    const { state, events } = useEvents()

    return (
      <State.Provider value={state}>
        <Dispatch.Provider value={events}>{children}</Dispatch.Provider>
      </State.Provider>
    )
  }

  const useState = (): T => {
    const context = useContext(State)

    if (context === undefined) {
      throw new Error('useState must be used within a Provider')
    }

    return context
  }

  const useDispatch = (): K => {
    const context = useContext(Dispatch)

    if (context === undefined) {
      throw new Error('useDispatch must be used within a Provider')
    }

    return context
  }

  return { Provider, useState, useDispatch }
}
