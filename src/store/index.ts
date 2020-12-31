import { combineReducers, configureStore } from '@reduxjs/toolkit'
import { useSelector as nativeSelector, TypedUseSelectorHook } from 'react-redux'
import { modalSlice } from './modal'
import { userSlice } from './user'

const rootReducer = combineReducers({
  [userSlice.name]: userSlice.reducer,
  [modalSlice.name]: modalSlice.reducer
})

export const store = configureStore({
  reducer: rootReducer
})

export type RootState = ReturnType<typeof rootReducer>
export const useSelector: TypedUseSelectorHook<RootState> = nativeSelector