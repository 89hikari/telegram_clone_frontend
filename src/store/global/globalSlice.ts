import { createSlice } from '@reduxjs/toolkit';
import { IUser } from './models';
import { authentificate, signup } from './api';
import { parseJwt } from '../../utils/parseToken';

export interface IGlobal {
    user: IUser,
    token: string,
    error: boolean,
    error_message: string,
}

const initialState: IGlobal = {
    user: {
        email: '',
        name: '',
        id: NaN,
        gender: "male"
    },
    token: localStorage.getItem("TELEGRAM_CLONE_TOKEN") || '',
    error: false,
    error_message: ''
}

export const globalSlice = createSlice({
    name: 'global',
    initialState,
    reducers: {
        clearData: (state) => {
            state.user = { ...initialState.user };
            state.token = '';
            localStorage.setItem("TELEGRAM_CLONE_TOKEN", '');
        },
        setUserDataFromToken: (state) => {
            state.user = { ...parseJwt(state.token) };
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(authentificate.pending, (state) => {
                state.error = false;
                state.error_message = '';
            })
            .addCase(authentificate.rejected, (state, action) => {
                state.error = true;
                if (action.error.message?.includes("401"))
                    state.error_message = 'Incorrect credentials, try again';
                else
                    state.error_message = `${action.error.code} - ${action.error.message}`;
            })
            .addCase(authentificate.fulfilled, (state, action) => {
                state.error = false;
                state.error_message = '';
                state.token = action.payload.token;
                state.user = { ...action.payload.user };
            })
            .addCase(signup.pending, (state) => {
                state.error = false;
                state.error_message = '';
            })
            .addCase(signup.rejected, (state, action) => {
                state.error = true;
                state.error_message = `${action.error.code} - ${action.error.message}`;
            })
            .addCase(signup.fulfilled, (state, action) => {
                state.error = false;
                state.error_message = '';
                state.token = action.payload.token;
                state.user = { ...action.payload.user };
            })
    }
})

export const {
    clearData,
    setUserDataFromToken
} = globalSlice.actions;

export default globalSlice.reducer;