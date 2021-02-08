import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Celeb } from "../types";

const initialState:Celeb[] = [] 

const { actions, ...celebsSlice } = createSlice({
  name: 'celebs',
  initialState,
  reducers: {
    getAll(
      state,
      {payload}: PayloadAction<Celeb[]>
    ): Celeb[]{
      return payload
    },
    clear() {
      return initialState
    }
  }
})

export const celebsActions = {
  ...actions
}