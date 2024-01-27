import { apiSlice } from "../api/apiSlice";

export const orderApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllOrder: builder.query({
      query: () => ({
        url: `get-orders`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getStripePublishableKey: builder.query({
      query: () => ({
        url: `payment/stripepublishalblekey`,
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    createPaymentIntent: builder.mutation({
      query: (amount) => ({
        url: `payment`,
        method: "POST",
        body: {amount},
        credentials: "include" as const,
      }),
    }),

    createOrder: builder.mutation({
      query: ({courseId, payment_Info}) => ({
        url: `create-order`,
        method: "POST",
        body: {
          courseId,
          payment_Info
        },
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetAllOrderQuery, useCreateOrderMutation, useGetStripePublishableKeyQuery, useCreatePaymentIntentMutation } = orderApi