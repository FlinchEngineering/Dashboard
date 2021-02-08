import { createSlice, PayloadAction, Dispatch } from '@reduxjs/toolkit'
import AuthService from '../services/AuthService'
import StoreService from '../services/StoreService'
import { UserAuthInfo } from '../types'

const initState: UserAuthInfo = {
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
      {payload}: PayloadAction<UserAuthInfo>
    ) {
      return {
        ...state,
        ...payload
      }
    },
    clear () {
      return initState
    }
  }
})

const login = (
  email:string,
  pass:string,
  callback?:()=>void,
  setError?:any
) => async (
  dispatch:Dispatch
) => {
  const user = await AuthService.login(email,pass,setError)
  !!user?.uid && dispatch(actions.getUser(user))
  !!user?.uid && StoreService.save('user',user)
  callback&&callback()
}

const logout = () => async (dispatch:Dispatch) => {
  const deleted = StoreService.delete('user')
  deleted && dispatch(actions.clear())
}

export const userActions = {
  ...actions,
  login,
  logout
} 