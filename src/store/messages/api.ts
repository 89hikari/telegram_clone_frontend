import { createAsyncThunk } from '@reduxjs/toolkit'
import { api, createBaseUrl } from '../../api'
import { RootState } from '..';

export const getAllMessagesById = createAsyncThunk<any, any, { state: RootState }>(
    "messages/getAllMessagesById",
    async ({ id }: { id: number }, { getState }) => {
        const rootState = getState();
        const response = api.get(createBaseUrl('messages', id.toString()), {
            headers: {
                Authorization: `Bearer ${rootState.global.token}`
            }
        });
        const data = (await response).data;
        return data;
    }
);

// export const signup = createAsyncThunk(
//     "auth/signup",
//     async ({ email, password, name, gender }: { email: string, password: string, name: string, gender: "male" | "female" }) => {
//         const response = api.post(createBaseUrl('auth', 'signup'), {
//             email: email,
//             password: password,
//             name: name,
//             gender: gender
//         });
//         const data = (await response).data;
//         return data;
//     }
// );
