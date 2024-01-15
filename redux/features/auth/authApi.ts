import { apiSlice } from "../api/apiSlice";
import { userRegistration } from "./authSlice";

type RegistrationResponse = {
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
                    dispatch(userRegistration({
                        // message: result.data.message,
                        activationToken: result.data.activationToken,
                    }));
                } catch (error: any) {
                    return console.log(error);
                }
            }
        }),

        activation: build.mutation<ActivationData, { activation_token: string, activation_code: string }>({
            query: ({activation_token, activation_code}) => ({
                url: "activate-user",
                method: "POST",
                body: {activation_token, activation_code},
            }),
        
        })
    }),
});

export const { useRegisterMutation, useActivationMutation } = authApi;