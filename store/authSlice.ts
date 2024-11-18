import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  profile: any | null;
}

const initialState: AuthState = {
  token: null,
  profile: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setToken: (state, action: PayloadAction<string | null>) => {
      state.token = action.payload;
    },
    setProfile: (state, action: PayloadAction<any>) => {
      state.profile = action.payload;
    },
    clearAuth: (state) => {
      state.token = null;
      state.profile = null;
    },
  },
});

export const { setToken, setProfile, clearAuth } = authSlice.actions;
export default authSlice.reducer;
