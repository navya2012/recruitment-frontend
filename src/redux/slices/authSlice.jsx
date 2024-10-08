import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  userData: {},
  profileImage:[],
  error: null
}

const authSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      return {
       ...state,
        userData: action.payload.loginDetails,
        error:null
      }
    },  
    setAddProfileImage: (state, action) => {
     const index = state.profileImage.findIndex((image) => image._id === action.payload._id);
     if (index !== -1) {
         state.profileImage[index] = action.payload;
     }else{
        state.profileImage.push(action.payload)
     }
     state.error = null;
    },
    setAllUsersImages: (state, action) => {
       return {
         ...state,
         profileImage: action.payload,
         error: null
       };
     },   
    logout: (state) => {
      state.userData = {};
      state.error = null;
      localStorage.removeItem('loginToken');
      localStorage.removeItem('userDetails')
      localStorage.removeItem('passwordToken')
    },
    clearError: (state) => {
      state.error = null;
    },

  },
})

export const {
  loginSuccess,
  setAddProfileImage,
  setAllUsersImages,
  logout,
  clearError
}
  = authSlice.actions

export default authSlice.reducer