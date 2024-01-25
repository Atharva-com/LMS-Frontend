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
  }),
});

export const { useGetAllOrderQuery } = orderApi