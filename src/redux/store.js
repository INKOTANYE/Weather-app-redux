import { configureStore } from "@reduxjs/toolkit";
import citiesSlice from "./cities/citiesSlice"

export const store = configureStore({
    reducer: {
        cities: citiesSlice
    }
})