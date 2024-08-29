import {createSlice} from "@reduxjs/toolkit";

const initialState = {
  name: "",
  email: "",
}

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    updateName(state, action) {
      state.name = action.payload;
    },
    updateEmail(state, action) {
      state.email = action.payload;
    },
    updateUser(state, action) {
      state.name = action.payload.name;
      state.email = action.payload.email;
    }
  }
});

export const {updateName, updateEmail, updateUser} = userSlice.actions;

export default userSlice.reducer;