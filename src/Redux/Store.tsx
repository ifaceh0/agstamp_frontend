import {configureStore} from "@reduxjs/toolkit";
import { userApi } from "./Api/userApi";
import userSlice from "./Reducer/userSlice";
import adminApi from "./Api/adminApi";
import cartSlice from "./Reducer/cartSlice";
import { stripeApi } from "../services/stripe"
import guestCartSlice from "./Reducer/guestCartSlice"; // ✅ ADD THIS IMPORT

export const store = configureStore({
    reducer:{
        [userApi.reducerPath]:userApi.reducer,
        [userSlice.reducerPath]:userSlice.reducer,
        [adminApi.reducerPath]:adminApi.reducer,
        [cartSlice.reducerPath]:cartSlice.reducer,
        [stripeApi.reducerPath]: stripeApi.reducer,

        guestCart: guestCartSlice, // ✅ ADD THIS LINE
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(userApi.middleware).concat(adminApi.middleware).concat(stripeApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
