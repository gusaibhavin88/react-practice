import { api } from "./api";

export const listEventRequest = (formdata, config) =>
  api.get(`/event/list${formdata}`, config);

export const addEventRequest = (formdata, config) =>
  api.post("/event/create", formdata, config);

export const getEventRequest = (formdata, config) =>
  api.get(`/event/get/${formdata?.id}`, formdata, config);
