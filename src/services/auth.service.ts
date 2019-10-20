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
};

export {
  Auth,
  Keys,
};

export default authService;
