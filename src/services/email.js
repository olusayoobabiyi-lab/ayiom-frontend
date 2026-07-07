import api from "./api";
import { API_ENDPOINTS } from "@/constants/api";

export const submitContact = async (payload) => {
  const { data } = await api.post(API_ENDPOINTS.CONTACT, payload);
  return data;
};