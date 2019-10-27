import axios, { AxiosRequestConfig } from "axios";

import { updatedToken } from "@/core/session";

const baseURL = process.env.VUE_APP_API_BASE_URL || `http://localhost:${process.env.PORT}`;
const AUTH_URL = "/api_keys/";
const CHECK_URL = "/api_keys/check";
const FULL_AUTH_URL = `${process.env.VUE_APP_API_BASE_URL}${AUTH_URL}`;
const FULL_CHECK_URL = `${process.env.VUE_APP_API_BASE_URL}${CHECK_URL}`;

const BLACK_LIST_URLS = [FULL_AUTH_URL, FULL_CHECK_URL];

const instance = axios.create({
  baseURL,
  withCredentials: false,
  timeout: 60 * 1000,
});

instance.interceptors.request.use((axiosConfig) => {
  const config = {
    ...axiosConfig,
  };

  const base64 = localStorage.getItem("session");

  if (config.url === AUTH_URL || !base64) {
    return axiosConfig;
  }

  config.headers.Authorization = `Basic ${base64.slice(1, -1)}`;
  return config;
});

instance.interceptors.response.use(
  response => response,
  async (error) => {
    if (
      error.response && error.response.status === 401
      && !BLACK_LIST_URLS.includes(error.response.config.url)
    ) {
      try {
        const { data } = await instance.get<Auth>("/api_keys/guest");

        updatedToken({
          publicKey: data.publicKey,
          secret: data.secret,
        });

        const newRequest: AxiosRequestConfig = {
          ...error.config,
          headers: {
            Authorization: btoa(`${data.publicKey}:${data.secret}`),
          },
        };

        return instance(newRequest);
      } catch (ex) {
        throw Promise.reject(ex);
      }
    }
    return Promise.reject(error);
  },
);

type Roles = ["GUEST" | "ADMIN" | "CLIENT"];
type Keys = {
  publicKey: string;
  secret: string;
};
type Auth = Keys & {
  roles: Roles
};

export default instance;
