import { api, createBaseUrl } from "@/api";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { RootState } from "..";

export const getAllMessagesById = createAsyncThunk<
  any,
  any,
  { state: RootState }
>(
  "messages/getAllMessagesById",
  async ({ id }: { id: number }, { getState }) => {
    const rootState = getState();
    const response = api.get(createBaseUrl("messages", id.toString()), {
      headers: {
        Authorization: `Bearer ${rootState.global.token}`,
      },
    });
    const data = (await response).data;
    return data;
  }
);

export const getSidebarLastMessages = createAsyncThunk<
  any,
  any,
  { state: RootState }
>("messages/getSidebarLastMessages", async (_, { getState }) => {
  const rootState = getState();
  const response = api.get(createBaseUrl("messages"), {
    headers: {
      Authorization: `Bearer ${rootState.global.token}`,
    },
  });
  const data = (await response).data;
  return data;
});

export const sendMessage = createAsyncThunk<any, any, { state: RootState }>(
  "messages/sendMessage",
  async (
    { message, receiverId }: { message: string; receiverId: number },
    { getState }
  ) => {
    const rootState = getState();
    const response = api.post(
      createBaseUrl("messages"),
      {
        message: message,
        receiverId: receiverId,
      },
      {
        headers: {
          Authorization: `Bearer ${rootState.global.token}`,
        },
      }
    );
    const data = (await response).data;
    return data;
  }
);

export const getPeerInfo = createAsyncThunk<any, any, { state: RootState }>(
  "messages/getPeerInfo",
  async ({ id }: { id: number }, { getState }) => {
    const rootState = getState();
    const response = api.get(createBaseUrl("users", id.toString()), {
      headers: {
        Authorization: `Bearer ${rootState.global.token}`,
      },
    });
    const data = (await response).data;
    return data;
  }
);
