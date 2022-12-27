import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from ".";

interface User {
  id: string;
  name: string;
}

interface UserState {
  data: User;
}

const initialState: UserState = {
  data: { id: "", name: "" },
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserData: (state, action: PayloadAction<User>) => {
      state.data = action.payload;
    },
  },
});

export const selectUserDomain = (state: RootState) => state.user;

export const selectUserData = (state: RootState) =>
  selectUserDomain(state).data;

export const { setUserData } = userSlice.actions;

export default userSlice.reducer;
