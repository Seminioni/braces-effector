import { createApi, restore } from "effector";
import { createDomain, createEvent } from "./local-storage";

const domain = createDomain("session");

const deviceChecked = createEvent<boolean>("deviceChecked");

const $token = domain.store("");
const $isMobile = restore(deviceChecked, false);

const { updatedToken } = createApi($token, {
  updatedToken: (_, payload: { secret: string; publicKey: string }) => btoa(`${payload.publicKey}:${payload.secret}`),
});

export {
  $token,
  updatedToken,

  $isMobile,
  deviceChecked,
};
