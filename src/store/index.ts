import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import globalSlice from "./global/globalSlice";
import messagesSlice from "./messages/messagesSlice";

export const store = configureStore({
    reducer: {
        global: globalSlice,
        messages: messagesSlice
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;