import { createSlice } from '@reduxjs/toolkit';
import { IMessages } from './models';
import { getSidebarLastMessages, getAllMessagesById, sendMessage, getPeerInfo } from './api';

const initialState: IMessages = {
    sidebar: [],
    currentMessages: [],
    peerInfo: {
        email: "",
        id: NaN,
        name: ""
    },
    error: false,
    error_message: ''
}

const convertDate = (date: string): string => {
    try {
        return date.split("T")[1].split(":").slice(0, 2).join(":");
    } catch (error) {
        return '';
    }
}

export const messagesSlice = createSlice({
    name: 'messages',
    initialState,
    reducers: {
        catchMessageFromSocket: (state, action) => {
            const date: string = convertDate(action.payload.createdAt);
            state.currentMessages = [...state.currentMessages, {
                id: NaN,
                message: action.payload.message,
                receiverId: action.payload.receiverId,
                senderId: action.payload.senderId,
                createdFormatDate: date
            }];

            const sidebarIndex = state.sidebar
                .findIndex(elem =>
                    (elem.receiverId === action.payload.receiverId
                        && elem.senderId === action.payload.senderId)
                    || (elem.receiverId === action.payload.senderId
                        && elem.senderId === action.payload.receiverId));

            if (sidebarIndex === -1) return;

            const sidebarElem = state.sidebar[sidebarIndex];
            state.sidebar.splice(sidebarIndex, 1);
            state.sidebar = [{
                id: NaN,
                createdFormatDate: date,
                message: action.payload.message,
                receiverId: action.payload.receiverId,
                senderId: action.payload.senderId,
                sender: sidebarElem?.sender?.id ? sidebarElem.sender : {
                    id: NaN,
                    name: ''
                },
                receiver: sidebarElem?.receiver?.id ? sidebarElem.receiver : {
                    id: NaN,
                    name: ''
                },
            }, ...state.sidebar];
        },
        catchNonExistendMessageFromSocket: (state, action) => {
            const date: string = convertDate(action.payload.createdAt);
            const sidebarIndex = state.sidebar
                .findIndex(elem =>
                    (elem.receiverId === action.payload.receiverId
                        && elem.senderId === action.payload.senderId)
                    || (elem.receiverId === action.payload.senderId
                        && elem.senderId === action.payload.receiverId));

            if (sidebarIndex === -1) {
                state.sidebar = [{
                    id: NaN,
                    createdFormatDate: date,
                    message: action.payload.message,
                    receiverId: action.payload.receiverId,
                    senderId: action.payload.senderId,
                    sender: action.payload.sender,
                    receiver: action.payload.receiver
                }, ...state.sidebar];
            };
        }
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
            .addCase(sendMessage.fulfilled, (state) => {
                state.error = false;
                state.error_message = '';
            })
            .addCase(getPeerInfo.pending, (state) => {
                state.error = false;
                state.error_message = '';
            })
            .addCase(getPeerInfo.rejected, (state, action) => {
                state.error = true;
                if (action.error.message?.includes("401"))
                    state.error_message = 'Incorrect credentials, try again';
                else
                    state.error_message = `${action.error.code} - ${action.error.message}`;
            })
            .addCase(getPeerInfo.fulfilled, (state, action) => {
                state.error = false;
                state.error_message = '';
                state.peerInfo = action.payload;
            })
    }
})

export const {
    catchMessageFromSocket,
    catchNonExistendMessageFromSocket
} = messagesSlice.actions;

export default messagesSlice.reducer;