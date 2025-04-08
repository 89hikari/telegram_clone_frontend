import axios from "axios";
import { stringify } from "qs";

export const api = axios.create({
  baseURL: "/api",
  paramsSerializer: {
    serialize: (params) => stringify(params, { arrayFormat: "brackets" }),
  },
});
