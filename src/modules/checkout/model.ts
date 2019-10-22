import {
  createApi, Store, createEvent, sample, combine, createEffect, createStore, restore,
} from "effector";

import router from "@/router";
import { createDomain } from "@/core/local-storage";

import {
  InfoModel, DeliveryModel, PayModel, cartService, OrderDetailsResponse, OrderDetailsPayload,
} from "@/services/cart.service";
import {
  toAddressDeliveryType, toNovaPoshtaDeliveryType, cashPayment, cardPayment,
} from "./helpers";

const infoDomain = createDomain("info");
const deliveryDomain = createDomain("delivery");
const payDomain = createDomain("pay");

const stepsDomain = createDomain("stepsDomain");
const currentStepDomain = createDomain("currentStepDomain");

function api<T>(store: Store<T>) {
  const { update } = createApi(store, {
    update: (state, { key, value }: { key: keyof T; value: string}) => ({
      ...state,
      [key]: value,
    }),
  });
  return update;
}

const $infoModel = infoDomain.store(new InfoModel());
const $deliveryModel = deliveryDomain.store(new DeliveryModel());
const $payModel = payDomain.store(new PayModel());

const updatedInfo = api($infoModel);
const updatedDelivery = api($deliveryModel);
const updatedPay = api($payModel);

const confirmOrder = createEvent<string>("confirmOrder");
const fxSendOrder = createEffect<OrderDetailsPayload, OrderDetailsResponse>("fxSendOrder", {
  handler: cartService.sendOrder,
});

const $completedSteps = stepsDomain.store({
  info: false,
  delivery: false,
  pay: false,
});
const $currentStep = currentStepDomain
  .store<keyof State<typeof $completedSteps>>("info");

const { changedStep } = createApi($currentStep, {
  changedStep: (_, step: keyof State<typeof $completedSteps>) => step,
});

const { completedStep } = createApi($completedSteps, {
  completedStep: (state, step: keyof State<typeof $completedSteps>) => ({
    ...state,
    [step]: true,
  }),
});

sample({
  source: combine($infoModel, $deliveryModel, $payModel, (info, delivery, pay) => ({
    ...info,
    ...delivery,
    ...pay,
  })),
  clock: confirmOrder,
  fn: (payload, cartId) => {
    const deliveryType = payload.deliveryType === "courier"
      ? toAddressDeliveryType(payload)
      : toNovaPoshtaDeliveryType(payload);


    const paymentType = payload.type === "CashPaymentType"
      ? cashPayment(payload)
      : cardPayment();

    const { fullName: fullname, phoneNumber, email } = payload;

    return {
      fullname,
      phoneNumber,
      email,
      bucketId: cartId,
      deliveryType: {
        [deliveryType.type]: deliveryType,
      },
      paymentType: {
        [paymentType.type]: paymentType,
      },
    };
  },
  target: fxSendOrder,
});

fxSendOrder.done.watch(async ({ result: details }) => {
  const { liqpayDetailsUrl, paymentType } = details;

  if (paymentType.CashPaymentType) {
    router.push({ name: "CheckoutSuccessPage" });
    return;
  }

  const { data, signature } = await cartService.initLiqpay(liqpayDetailsUrl);

  router.push({
    name: "PaymentRedirectPage",
    params: { data, signature },
  });
});

export {
  $currentStep,
  $infoModel,
  $completedSteps,
  $deliveryModel,
  $payModel,

  changedStep,

  updatedDelivery,
  updatedInfo,
  updatedPay,
  completedStep,
  confirmOrder,
  fxSendOrder,
};
