import { apiSlice } from "../api/apiSlice";

export const analyticsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getCoursesAnalytics: builder.query({
      query: () => ({
        url: "get-course-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),

    getOrdersAnalytics: builder.query({
      query: () => ({
        url: "get-order-analytics",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
  }),
  overrideExisting: true,
});

export const { useGetCoursesAnalyticsQuery, useGetOrdersAnalyticsQuery } = analyticsApi;
