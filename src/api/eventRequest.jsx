import { api } from "./api";

export const listEventRequest = (formdata, config) =>
  api.get(`/event/list${formdata}`, config);
