import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000",
});

//  http://localhost:5000
//  https://jsonplaceholder.typicode.com