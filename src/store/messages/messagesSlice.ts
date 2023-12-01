import { createSlice } from '@reduxjs/toolkit';
import { IMessages } from './models';
import { getSidebarLastMessages, getAllMessagesById, sendMessage } from './api';

const initialState: IMessages = {
    sidebar: [],
    currentMessages: [],
    error: false,
    error_message: ''
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        // clearData: (state) => {
        //     state.user = { ...initialState.user };
        //     state.token = '';
        //     localStorage.setItem("TELEGRAM_CLONE_TOKEN", '');
        //     console.log(state)
        // },
        // setUserDataFromToken: (state) => {
        //     state.user = { ...parseJwt(state.token) };
        // }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getSidebarLastMessages.pending, (state) => {
                state.error = false;
                state.error_message = '';
            })
            .addCase(getSidebarLastMessages.rejected, (state, action) => {
                state.error = true;
                if (action.error.message?.includes("401"))
                    state.error_message = 'Incorrect credentials, try again';
                else
                    state.error_message = `${action.error.code} - ${action.error.message}`;
            })
            .addCase(getSidebarLastMessages.fulfilled, (state, action) => {
                state.error = false;
                state.error_message = '';
                state.sidebar = action.payload;
            })
            .addCase(getAllMessagesById.pending, (state) => {
                state.error = false;
                state.error_message = '';
            })
            .addCase(getAllMessagesById.rejected, (state, action) => {
                state.error = true;
                if (action.error.message?.includes("401"))
                    state.error_message = 'Incorrect credentials, try again';
                else
                    state.error_message = `${action.error.code} - ${action.error.message}`;
            })
            .addCase(getAllMessagesById.fulfilled, (state, action) => {
                state.error = false;
                state.error_message = '';
                state.currentMessages = action.payload;
            })
            .addCase(sendMessage.pending, (state) => {
                state.error = false;
                state.error_message = '';
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.error = true;
                if (action.error.message?.includes("401"))
                    state.error_message = 'Incorrect credentials, try again';
                else
                    state.error_message = `${action.error.code} - ${action.error.message}`;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.error = false;
                state.error_message = '';
                const date = action.payload.createdAt.split("T")[1].split(":").slice(0, 2).join(":");
                state.currentMessages.push({
                    id: action.payload.id,
                    senderId: action.payload.senderId,
                    message: action.payload.message,
                    receiverId: action.payload.receiverId,
                    createdFormatDate: date
                });
            })
    }
})

// export const {
//     clearData,
//     setUserDataFromToken
// } = globalSlice.actions;

export default messagesSlice.reducer;