import { apiSlice } from "../api/apiSlice";
import { userLoggedIn, userRegistration } from "./authSlice";

type RegistrationResponse = {
    success: boolean
    message: string;
    activationToken: string;
}

type RegistrationData = {}

type ActivationData = {
    activation_token: string;
    activation_code: string;
}

export const authApi = apiSlice.injectEndpoints({
    endpoints: (build) => ({
        register: build.mutation<RegistrationResponse, RegistrationData>({
            query: (data) => ({
                url: "registration",
                method: "POST",
                body: data,
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log(result);
                    dispatch(userRegistration({
                        token: result.data.activationToken,
                    }));
                } catch (error: any) {
                    return console.log(error);
                }
            }
        }),

        activation: build.mutation({
            query: ({activation_Token, activation_Code}) => ({
                url: "activate-user",
                method: "POST",
                body: {activation_Token, activation_Code},
            }),
        
        }),

        login: build.mutation({
            query: ({email, password}) => ({
                url: "login",
                method: "POST",
                body: {email, password},
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log(result);
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));
                } catch (error: any) {
                    return console.log(error);
                }
            }
        }),

        socialAuth: build.mutation({
            query: ({email, name, avatar}) => ({
                url: "social-auth",
                method: "POST",
                body: {email, name, avatar},
                credentials: "include" as const,
            }),
            async onQueryStarted(arg, { dispatch, queryFulfilled }) {
                try {
                    const result = await queryFulfilled;
                    console.log(result);
                    dispatch(userLoggedIn({
                        accessToken: result.data.accessToken,
                        user: result.data.user,
                    }));
                } catch (error: any) {
                    return console.log(error);
                }
            }
        })
    }),
    overrideExisting: true,
});

export const { useRegisterMutation, useActivationMutation, useLoginMutation, useSocialAuthMutation } = authApi;