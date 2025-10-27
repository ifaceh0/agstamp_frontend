import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: CartState = {
    success: false,
    cart: null,
    loading: true,
    ShippingType:"",
    shippingRate: 0,
    selectedCountry: "US"
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
        },
        updateSelectedCountry: (state, action: PayloadAction<string>) => {
            state.selectedCountry = action.payload;
            
            // if (state.cart) {
            //     state.cart.selectedCountry = action.payload;
            // }
        },
        // ✅ Add new action for shipping rate
        updateShippingRate: (state, action: PayloadAction<number>) => {
            state.shippingRate = action.payload;
        },
    },
});

// Export actions & reducer
export const {addToCartAction,setCartLording,updateSelectedCountry,updateShippingRate} = cartSlice.actions;//,updateSelectedCountry
export default cartSlice;
