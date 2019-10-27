import { createStore } from "effector";
import { LoginModel, Roles } from "@/services/auth.service";
import { createDomain } from "@/core/local-storage";

const rolesDomain = createDomain("roles");

const $loginModel = createStore(new LoginModel());
const $roles = rolesDomain.store<Roles>(["GUEST"]);

export {
  $loginModel,
  $roles,
};
