import { api } from "./api";

export const registerUserRequest = (formdata, config) =>
  api.post("/auth/register", formdata, config);
export const logInUserRequest = (formdata, config) =>
  api.post("/auth/login", formdata, config);
