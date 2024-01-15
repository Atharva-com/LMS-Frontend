"use client"

import { configureStore } from "@reduxjs/toolkit"
import { apiSlice } from "./features/api/apiSlice"

export const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    devTools: false, // so that nobody can use brower inspect of redux to see our state management
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }).concat(apiSlice.middleware),
})