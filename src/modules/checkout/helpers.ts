import { CheckoutModel } from "@/services/cart.service";

function toAddressDeliveryType(model: CheckoutModel) {
  return {
    type: "DeliveryToAddressType",
    city: model.city,
    street: model.street,
    number: model.number,
    extraInfo: model.extraInfo,
  };
}

function toNovaPoshtaDeliveryType(model: CheckoutModel) {
  return {
    type: "NovaPoshtaDeliveryType",
    city: model.city,
    postOfficeNumber: model.postOfficeNumber,
  };
}


function cashPayment(payload: CheckoutModel) {
  return {
    type: "CashPaymentType",
    amount: payload.faceValue || "0",
  };
}

function cardPayment() {
  return {
    type: "LiqPayPaymentType",
  };
}

export {
  toAddressDeliveryType,
  toNovaPoshtaDeliveryType,
  cashPayment,
  cardPayment,
};
