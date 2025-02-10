import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    name: '',
    email: '',
    bio: '',
    userName:"",
    twitter:"",
    facebook:"",
    instagram:""
}

export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

      increment: (state, { payload }) => {
        // console.log("payload",payload)
        // Redux Toolkit allows us to write "mutating" logic in reducers. It
        // doesn't actually mutate the state because it uses the immer library,
        // which detects changes to a "draft state" and produces a brand new
        // immutable state based off those changes
        (state.name = payload?.name),
          (state.email = payload?.email),
          (state.bio = payload?.bio);
          (state.userName = payload?.userName),
          (state.twitter = payload?.socialMedia?.tw),
          (state.facebook = payload?.socialMedia?.fb);
          (state.instagram = payload?.socialMedia?.inst);
      },

    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { increment, decrement, incrementByAmount } = counterSlice.actions

export default counterSlice.reducer