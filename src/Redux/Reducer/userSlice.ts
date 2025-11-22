import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: UserState = {
    success: false,
    user: undefined,
    loading: false,
};

// Create Slice
const userSlice = createSlice({
    name: "userSlice",
    initialState,
    reducers: {
        setUser: (state, action: PayloadAction<User>) => {
            state.user = action.payload;
            state.success = true;
            state.loading = false;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        clearUser: (state) => {
            state.user = undefined;
            state.success = false;
            state.loading = false;
        },
    },
});

// Export actions & reducer
export const { setUser, setLoading, clearUser } = userSlice.actions;
export default userSlice;
