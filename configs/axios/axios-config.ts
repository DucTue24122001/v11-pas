import { getCookie } from "@/helpers/functions";
import axios, { AxiosResponse } from "axios";

axios.defaults.baseURL =
  process.env.NEXT_PUBLIC_DOMAIN || "https://localhost:5000/";

const responseBody = <T>(response: AxiosResponse<T>) => response.data;

axios.interceptors.request.use(async (config) => {
  if (config && typeof window !== "undefined") {
    const token = localStorage.getItem("token");
    const language = getCookie("NEXT_LOCALE")
    config.headers["Content-Type"] = "application/json";
    if (token) {
      config.headers["Authorization"] = "Bearer " + token;
    }
    if (language) {
      config.headers["Accept-Language"] = language.toUpperCase();
    } else {
      config.headers["Accept-Language"] = "";
    }
  }
  return config;
});

const request = {
  get: <T>(url: string) => axios.get<T>(url).then(responseBody),
  post: <T>(url: string, body: {}, params?: {}) =>
    axios.post<T>(url, body, params).then(responseBody),
  put: <T>(url: string, body: {}) => axios.put<T>(url, body).then(responseBody),
  delete: <T>(url: string) => axios.delete<T>(url).then(responseBody),
};

export default request;