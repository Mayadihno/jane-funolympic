// userSlice.js
import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userData: null,
    phoneUser: null,
  },
  reducers: {
    setUserData: (state, action) => {
      // Convert timestamp to Date object
      const userDataWithDate = {
        ...action.payload,
        timestamp: action.payload.timestamp?.toDate(),
      };
      state.userData = userDataWithDate;
    },
    setPhoneUser: (state, action) => {
      state.phoneUser = action.payload;
    },
    clearUserData: (state) => {
      state.userData = null;
      state.phoneUser = null;
    },
  },
});

export const { setUserData, clearUserData, setPhoneUser } = userSlice.actions;

export const selectUserData = (state) => state.user.userData;
export const selectPhoneUser = (state) => state.user.phoneUser;

export default userSlice.reducer;
