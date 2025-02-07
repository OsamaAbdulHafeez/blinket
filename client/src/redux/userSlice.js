import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  _id: "",
  name:"",
  email:""
}


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
      setUserDetails: (state,action) => {
        state = { ...action.payload }
      },
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setUserDetails } = userSlice.actions
  
  export default userSlice.reducer