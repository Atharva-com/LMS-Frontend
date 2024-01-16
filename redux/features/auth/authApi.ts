import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

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
        
        })
    }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;