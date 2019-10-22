import http from "./http.service";
import { Product } from "./products.service";

async function fetchCartStatus() {
  const { data } = await http.get<CartContext>("/bucket/pending");
  return data;
}

async function fetchProductsFromCart(url: string) {
  const { data } = await http.get<ProductInCart[]>(url.slice(3));
  return data;
}

async function addToCart(params: SaveToCartPaylod) {
  const { data } = await http.post<ProductMetadata>(`bucket/${params.bucketId}/bucket_product`, params);
  return data;
}

async function updateQuantity({
  etag, bucketId, productId, quantity, url,
}: SaveQuantityPayload): Promise<SaveQuantityResponse> {
  const headers = {
    "If-Match": `"${etag}"`,

  };
  if (quantity) {
    const response = await http.post(url.slice(3), {
      bucketId,
      productId,
      quantity,
    }, { headers });

    return {
      etag: response.headers.etag.slice(1, -1),
      quantity,
      productId,
    };
  }
  await http.delete(url.slice(3), { headers });

  return {
    productId,
    quantity: 0,
  };
}

async function sendOrder(model: OrderDetailsPayload) {
  const { data } = await http.post<OrderDetailsResponse>("/order_details", model);
  return data;
}

async function initLiqpay(url: string) {
  const { data } = await http.get<LiqpayResponse>(url.slice(3));
  return data;
}

const cartService = {
  sendOrder,
  initLiqpay,
  fetchCartStatus,
  fetchProductsFromCart,
  updateQuantity,
  addToCart,
};


class InfoModel {
  fullName = "";
  city = "";
  phoneNumber = "";
  email = "";
}

class DeliveryModel {
  deliveryType: "post" | "courier" = "post";
  postOfficeNumber = "";
  street = "";
  number = "";
  extraInfo = "";
}

type PayType = "CashPaymentType" | "LiqPayPaymentType";

class PayModel {
  type: PayType = "CashPaymentType";
  faceValue = "";
}

type CartContext = {
  bucketStatus: string;
  bucketProductUrl: string;
  created: number;
  etag: string;
  orderDetailsUrl: string;
  updated: number;
  url: string;
  id: string;
  bucketProductViewUrl: string;
};

type ProductMetadata = {
  productId: string;
  bucketId: string;
  quantity: number;
  url: string;
  etag: string;
  created: number;
  updated: number;
  id: string;
};

type ProductInCart = {
  product: Product;
  bucketProduct: ProductMetadata;
};

type FullProductModel = Product & { quantity: number; totalAmount: number };

type SaveToCartPaylod = {
  quantity: number;
  bucketId: string;
  productId: string;
};

type SaveQuantityPayload = {
  etag: string;
  url: string;
  quantity: number;
  productId: string;
  bucketId: string;
};

type SaveQuantityResponse = {
  etag?: string;
  quantity: number;
  productId: string;
};

type CheckoutModel = InfoModel & DeliveryModel & PayModel;

type NovaPoshtaDeliveryType = {
  city: string;
  postOfficeNumber: string;
};

type DeliveryTyAddress = {
  city: string;
  street: string;
  number: string;
  extraInfo: string;
};

type Delivery = NovaPoshtaDeliveryType | DeliveryTyAddress;

type OrderDetailsPayload = {
  fullname: string;
  phoneNumber: string;
  email: string;
  bucketId: string;
  deliveryType: {
    [key: string]: Delivery;
  }
  paymentType: {
    [key: string]: any;
  },
};

type OrderDetailsResponse = {
  bucketId: string;
  created: number;
  deliveryType: Delivery;
  email: string;
  etag: string;
  fullname: string;
  id: string;
  liqpayDetailsUrl: string;
  paymentType: { [key: string]: {} }
  phoneNumber: string;
  updated: number;
  url: string;
};

type LiqpayResponse = {
  created: number;
  data: string;
  etag: string;
  id: string;
  liqpayResponse: null
  orderDetailsId: string;
  signature: string;
  status: string;
  updated: number;
  url: string;
};

export {
  LiqpayResponse,
  OrderDetailsResponse,
  OrderDetailsPayload,
  CheckoutModel,
  PayModel,
  InfoModel,
  DeliveryModel,
  CartContext,
  SaveToCartPaylod,
  SaveQuantityResponse,
  SaveQuantityPayload,
  ProductMetadata,
  ProductInCart,
  FullProductModel,
  cartService,
  PayType,
};
