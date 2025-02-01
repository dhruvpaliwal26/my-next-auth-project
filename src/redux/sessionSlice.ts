import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface SessionState {
    user: null | { name: string; email: string };
    expires: string | null;
}

const initialState: SessionState = {
    user: null,
    expires: null
};

const sessionSlice = createSlice({
    name: "session",
    initialState,
    reducers: {
        setSession: (state, action: PayloadAction<{ user: any; expires: string }>) => {
            state.user = action.payload.user;
            state.expires = action.payload.expires;
        },
        clearSession: () => initialState, // all Redux session reset krne ke liye
    },
});

export const { setSession, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;
