import { configureStore,  } from "@reduxjs/toolkit";
import { apiSlice } from "../features/api/apiSlice";

export const store = configureStore({
    reducer: {
        // For take dynamically reducerPath
        [apiSlice.reducerPath] : apiSlice.reducer,
    },
    middleware:(getDefaultMiddlewares)=> getDefaultMiddlewares().concat(apiSlice.middleware)
});
