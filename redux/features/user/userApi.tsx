import { apiSlice } from "../api/apiSlice";

export const userApi = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        updateAvatar: builder.mutation({
            query: ({ avatar }) => ({
                url: `update-user-profile`,
                method: "PUT",
                body: { avatar },
                credentials: "include" as const ,
            }),
        }),
    }),
    overrideExisting: true,
})

export const { useUpdateAvatarMutation } = userApi;