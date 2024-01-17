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

        editProfile: builder.mutation({
            query: ({ name }) => ({
                url: `update-user-info`,
                method: "PUT",
                body: { name },
                credentials: "include" as const ,
            }),
        }),
    }),
    overrideExisting: true,
})

export const { useUpdateAvatarMutation, useEditProfileMutation } = userApi;