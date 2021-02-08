import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { ModalPayload } from '../types'

const initState: ModalPayload = {
  body: null,
  show: false,
  header: ''
}

export const {actions, ...modalSlice} = createSlice({
  name: 'modal',
  initialState: initState,
  reducers: {
    showModal (
      state,
      {payload} : PayloadAction<ModalPayload>
    ) : ModalPayload {
      return {...state, ...payload}
    },
    clearModal () {
      return initState
    }
  }
})

export const modalActions = {
  ...actions,
}