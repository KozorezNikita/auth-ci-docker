import axios from "axios";
import { getToken } from "@/utils/auth";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});

apiClient.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//  http://localhost:5000
//  https://jsonplaceholder.typicode.com