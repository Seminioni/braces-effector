import {
  createEffect, createEvent, sample, forward,
} from "effector";

import { $loginModel, $roles, $isAdmin } from "./store";
import { updatedToken, resetToken } from "@/core/session";
import createFormHandler from "@/core/create-form-handler";
import authService, { Auth, LoginModel } from "@/services/auth.service";

const fxLogin = createEffect<string, Auth>("auth: login user", {
  handler: async (token) => {
    const response = authService.getPrimaryToken({
      headers: {
        Authorization: `Basic ${token}`,
      },
    });

    return response;
  },
});

const fxValidate = createEffect<void, number>("check token validate", {
  handler: authService.validate,
});

const resetRoles = createEvent();
const submittedForm = createEvent("auth: submit form");
const updatedLoginModel = createFormHandler($loginModel);

$loginModel.on(fxLogin.done, () => new LoginModel());
$roles
  .on(fxLogin.done, (_, { result }) => result.roles)
  .reset(resetRoles);

sample({
  source: $loginModel,
  clock: submittedForm,
  fn: ({ email, password }) => btoa(`${email}:${password}`),
  target: fxLogin,
});

forward({
  from: fxValidate.fail,
  to: resetToken,
});

forward({
  from: fxLogin.done.map(({ result }) => ({
    publicKey: result.publicKey,
    secret: result.secret,
  })),
  to: updatedToken,
});
export {
  updatedLoginModel,
  submittedForm,
  fxValidate,
  fxLogin,
  resetRoles,

  $loginModel,
  $isAdmin,
};
