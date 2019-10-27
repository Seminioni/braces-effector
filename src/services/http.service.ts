import axios, { AxiosRequestConfig } from "axios";

import { updatedToken } from "@/core/session";

const baseURL = process.env.VUE_APP_API_BASE_URL || `http://localhost:${process.env.PORT}`;

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

  if (!base64) {
    return axiosConfig;
  }

  config.headers.Authorization = `Basic ${base64.slice(1, -1)}`;
  return config;
});

instance.interceptors.response.use(
  response => response,
  async (error) => {
    if (error.response && error.response.status === 401) {
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
