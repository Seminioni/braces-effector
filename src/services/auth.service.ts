import { AxiosRequestConfig } from "axios";
import http from "./http.service";

const url = "/api_keys";

async function validate() {
  const { data } = await http.get<number>(`${url}/check`);
  return data;
}

async function getToken() {
  const { data } = await http.get<Auth>(`${url}/guest`);
  return data;
}

async function getPrimaryToken(config?: AxiosRequestConfig) {
  const { data } = await http.post<Auth>(`${url}/`, undefined, config);
  return data;
}

class LoginModel {
  email = ""
  password = ""
}

type Roles = ["GUEST" | "ADMIN" | "CLIENT"];
type Keys = {
  publicKey: string;
  secret: string;
};
type Auth = Keys & {
  roles: Roles
};

const authService = {
  validate,
  getToken,
  getPrimaryToken,
};

export {
  Auth,
  Keys,
  LoginModel,
  Roles,
};

export default authService;
