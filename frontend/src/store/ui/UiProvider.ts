import { IUiDispatch, IUiState, useUiActions } from './UiContext'
import makeStore from '../makeStore'

export const {
  Provider: UiProvider,
  useState: useUiState,
  useDispatch: useUiDispatch,
} = makeStore<IUiState, IUiDispatch>(useUiActions)
