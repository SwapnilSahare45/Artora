import { api } from "./api";

// PLace an order
export const placeOrderService = async (artworkId, quantity, shippingAddress, paymentMethod, paymentDetails) => {
  const body = { artwork: artworkId, quantity, shippingAddress, paymentMethod, paymentDetails, };

  return await api.post("orders", body);
};

// Get an orders
export const getOrdersService = async () => {
  return await api.get("orders/my");
};

// Get an order
export const getOrderService = async (id) => {
  return await api.get(`orders/${id}`);
};