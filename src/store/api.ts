import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Shop, Product, Order, CreateOrderDto } from "../types/types";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000",
  }), // Твій бекенд
  endpoints: (builder) => ({
    getShops: builder.query<Shop[], void>({
      query: () => "/shops",
    }),
    getProductsByShop: builder.query<Product[], number>({
      query: (shopId) => `shops/${shopId}/products`,
    }),
    getOrders: builder.query<Order[], void>({
      query: () => "/orders",
    }),
    createOrder: builder.mutation<Order, CreateOrderDto>({
      query: (newOrder) => ({
        url: "/orders",
        method: "POST",
        body: newOrder,
      }),
    }),
    getOrderHistory: builder.query<Order[], { email: string; phone: string }>({
      query: ({ email, phone }) =>
        `orders/history?email=${email}&phone=${phone}`,
    }),
  }),
});

export const {
  useGetShopsQuery,
  useGetProductsByShopQuery,
  useGetOrdersQuery,
  useCreateOrderMutation,
  useLazyGetOrderHistoryQuery,
} = api;
