import { IUiDispatch, IUiState, useUiActions } from './ui-context'
import makeStore from '../make-store'

export const {
  Provider: UiProvider,
  useState: useUiState,
  useDispatch: useUiDispatch,
} = makeStore<IUiState, IUiDispatch>(useUiActions)
