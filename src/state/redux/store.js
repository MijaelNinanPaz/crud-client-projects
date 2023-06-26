import { configureStore } from "@reduxjs/toolkit";
import projectReducer from "./projects/projectSlice";
import utilityProviderReducer from "./projects/utilityProviderSlice";
import pageSwitcherReducer from "./pageSwitcher/pageSwitcherSlice";

export const store = configureStore({
    reducer: {
        projects: projectReducer,
        utilityProviders: utilityProviderReducer,
        pageSwitcher: pageSwitcherReducer,
    }
})