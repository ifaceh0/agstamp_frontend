import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
    success: false,
    cart: null,
    loading: true,
    ShippingType:""
};

// Create Slice
const cartSlice = createSlice({
    name: "cartSlice",
    initialState,
    reducers: {
        addToCartAction:(state,action:PayloadAction<{CartData:CartData,ShippingType:string} | null>)=>{
            state.cart = action.payload?.CartData || null;
            state.loading = false;
            state.success = true;
            state.ShippingType = action.payload?.ShippingType || ""
        },
        setCartLording:(state,action:PayloadAction<boolean>)=>{
            state.loading = action.payload;
        }
    },
});

// Export actions & reducer
export const {addToCartAction,setCartLording} = cartSlice.actions;
export default cartSlice;
