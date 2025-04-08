import { createAsyncThunk } from "@reduxjs/toolkit";
import { api } from "../../api";

export const authentificate = createAsyncThunk(
  "auth/login",
  async ({ name, password }: { name: string; password: string }) => {
    const response = api.post("/auth/login", {
      name,
      password,
    });
    const data = (await response).data;
    return data;
  }
);

export const signup = createAsyncThunk(
  "auth/signup",
  async ({
    email,
    password,
    name,
    gender,
  }: {
    email: string;
    password: string;
    name: string;
    gender: "male" | "female";
  }) => {
    const response = api.post("auth/signup", {
      email: email,
      password: password,
      name: name,
      gender: gender,
    });
    const data = (await response).data;
    return data;
  }
);
