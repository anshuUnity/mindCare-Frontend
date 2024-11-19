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
    updateProfile: (state, action: PayloadAction<any>) => {
      if (state.profile) {
        state.profile = {
          ...state.profile,
          ...action.payload,
        };
      }
    },
    logout: (state) => { // Renamed clearAuth to logout for clarity
      state.token = null;
      state.profile = null;
    },
  },
});

export const { setToken, setProfile, updateProfile, logout } = authSlice.actions; // Exporting logout instead of clearAuth
export default authSlice.reducer;
