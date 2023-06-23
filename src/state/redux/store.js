import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projects/projectSlice";
import utilityProviderReducer from "./projects/utilityProviderSlice";

export const store = configureStore({
    reducer: {
        projects: projectReducer,
        utilityProviders: utilityProviderReducer,
    }
})