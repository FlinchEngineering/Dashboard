import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import firebase from 'firebase'
import AuthService from '../services/AuthService'

type User = Partial<firebase.UserInfo>

const initState: User = {
  displayName: '',
  email: '',
  phoneNumber: '',
  photoURL: '',
  uid: ''
}

export const { actions, ...userSlice } = createSlice({
  name: 'user',
  initialState: initState,
  reducers: {
    getUser (
      state,
      {payload}: PayloadAction<User>
    ) {
      return {
        ...state,
        ...payload
      }
    },
    clear (
      state
    ) {
      return state
    }
  }
})

const login = (email:string,pass:string,setError?:any) => async (dispatch:Dispatch) => {
  const user = await AuthService.login(email,pass,setError)
  !!user?.uid && dispatch(userActions.getUser(user))
}

export const userActions = {
  ...actions,
  login
} 