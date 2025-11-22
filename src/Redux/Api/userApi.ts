// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// // In your types file
// export interface RegisterResponse {
//   success: boolean;
//   message: string;
//   user: User;
//   token?: string; // ✅ Add this line
// }

// // Login returns user AND token
// export interface LoginResponse {
//   success: boolean;
//   message: string;
//   user: {
//     _id: string;
//     firstname: string;
//     lastname: string;
//     username: string;
//     email: string;
//   };
//   token: string; // ✅ Required for login
// }
// // Define the correct interface for the shipping rates response
// // interface ShippingRatesResponse {
// //   success: boolean;
// //   usPrice: number;
// //   internationalPrice: number;
// // }
// // // Define a service using a base URL and expected endpoint
// // console.log("import.meta.env.VITE_BACKEND_URL:",import.meta.env.VITE_BACKEND_URL);
// // export const userApi = createApi({
// //   reducerPath: 'userApi',
// //   baseQuery: fetchBaseQuery({ baseUrl:"https://agstamp-backend.onrender.com",credentials:"include" }),
// //   endpoints: (build) => ({
// //     userRegister: build.mutation<RegisterResponse,UserRegister>({
// //         query: (user) => ({
// //         url: "/api/v1/user/register",
// //         method: 'POST',
// //         body: user,
// //         }),
// //     }),
// //     UserLogin:build.mutation<RegisterResponse,UserLogin>({
// //       query: (user) => ({
// //       url: "/api/v1/user/login",
// //       method: 'POST',
// //       body: user,
// //       headers: {
// //       "Content-Type": "application/json",
// //       },
// //       }),
// //     }),
// //     UserInfo:build.query<RegisterResponse,void>({
// //       query: () => "/api/v1/user/info"
// //     }),
// //     userAllStamps: build.query<StampResponse, void>({
// //       query: () => "/api/v1/user/allproducts",
// //       keepUnusedDataFor: 0, // disable cache for this query
// //     }),
// //     getWaveImg: build.query<UploadPhotoResponse, void>({
// //       query: () => "/api/v1/user/waveimg",
// //     }),
// //     addToCart:build.mutation<CartData,{stampId:string, quantity:number}>({
// //       query: (data) => ({
// //       url: "/api/v1/user/cartmanagment",
// //       method: 'POST',
// //       body: data,
// //       }),
// //     }),
// //     userCartItem: build.query<CartData, void>({
// //       query: () => "/api/v1/user/getcartitem",
// //     }),
// //     UpdateCartItem:build.mutation<CartData,{stampId:string, delta:number}>({
// //       query: (data) => ({
// //       url: "/api/v1/user/updatecart",
// //       method: 'POST',
// //       body: data,
// //       }),
// //     }),
// //     removeCartItem: build.mutation<CartData, string>({
// //       query: (id) => `/api/v1/user/removeitem/${id}`,
// //     }),
// //     removeAllCartItem : build.mutation<{cart:null}, string>({
// //       query: (id) => `/api/v1/user/removeAllitem/${id}`,
// //     }),
// //     subscribeMailService : build.mutation<{message:string},{email:string}>({
// //       query: (email) => ({
// //         url: "/api/v1/user/subscribeMailService",
// //         method: 'POST',
// //         body: email,
// //         }),
// //     }),
// //     userOrder: build.query<{success: boolean, orders:OrderResponse[]},void>({
// //       query: () => "/api/v1/user/orders",
// //     }),
// //     contactus : build.mutation<{message:string},{ name: string, email: string, subject: string, message: string }>({
// //       query: (param) => ({
// //         url: "/api/v1/user/contact/us",
// //         method: 'POST',
// //         body: param,
// //         }),
// //     }),
// //     getAllCategories: build.query<{_id:string,name:string}[],void>({
// //       query: () => "/api/v1/user/allcategories",
// //     }),
// //     getShippingRates: build.query<ShippingRatesResponse, void>({
// //         query: () => "/api/v1/user/shipping-prices",
// //     }),
// //   }),
// // })

// // export const { useUserRegisterMutation,useUserLoginMutation,useUserInfoQuery,useUserAllStampsQuery,useGetWaveImgQuery,useAddToCartMutation,useUserCartItemQuery,useUpdateCartItemMutation,useRemoveCartItemMutation,useRemoveAllCartItemMutation,useSubscribeMailServiceMutation,useUserOrderQuery,useContactusMutation,useGetAllCategoriesQuery,useGetShippingRatesQuery } = userApi;

// interface ShippingRatesResponse {
//   success: boolean;
//   usPrice: number;
//   internationalPrice: number;
// }

// console.log("BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

// export const userApi = createApi({
//   reducerPath: 'userApi',
//   baseQuery: fetchBaseQuery({ 
//     baseUrl: import.meta.env.VITE_BACKEND_URL, // ✅ Use environment variable
//     credentials: "include", // ✅ Send cookies
//     prepareHeaders: (headers) => {
//       // ✅ CRITICAL: Add Authorization header as fallback
//       const token = localStorage.getItem('agstampToken');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     },
//   }),
//   endpoints: (build) => ({
//     userRegister: build.mutation<RegisterResponse, UserRegister>({
//       query: (user) => ({
//         url: "/api/v1/user/register",
//         method: 'POST',
//         body: user,
//       }),
//     }),
    
//     // ✅ FIXED: Login with token handling
//     UserLogin: build.mutation<RegisterResponse, UserLogin>({
//       query: (user) => ({
//         url: "/api/v1/user/login",
//         method: 'POST',
//         body: user,
//       }),
//       // ✅ Store token after successful login
//       async onQueryStarted(_arg, { queryFulfilled }) {
//         try {
//           const { data } = await queryFulfilled;
//           if (data.token) {
//             localStorage.setItem('agstampToken', data.token);
//             console.log('✅ Token saved to localStorage');
//           }
//         } catch (error) {
//           console.error('❌ Login failed:', error);
//         }
//       },
//     }),
    
//     // ✅ NEW: Logout mutation
//     UserLogout: build.mutation<{ success: boolean; message: string }, void>({
//       query: () => ({
//         url: "/api/v1/user/logout",
//         method: 'POST',
//       }),
//       // ✅ Clear token after logout
//       async onQueryStarted(_arg, { queryFulfilled }) {
//         try {
//           await queryFulfilled;
//           localStorage.removeItem('agstampToken');
//           console.log('✅ Token cleared from localStorage');
//         } catch (error) {
//           console.error('❌ Logout error:', error);
//           // Clear token even if logout fails
//           localStorage.removeItem('agstampToken');
//         }
//       },
//     }),
    
//     UserInfo: build.query<RegisterResponse, void>({
//       query: () => "/api/v1/user/info"
//     }),
    
//     userAllStamps: build.query<StampResponse, void>({
//       query: () => "/api/v1/user/allproducts",
//       keepUnusedDataFor: 0,
//     }),
    
//     getWaveImg: build.query<UploadPhotoResponse, void>({
//       query: () => "/api/v1/user/waveimg",
//     }),
    
//     addToCart: build.mutation<CartData, { stampId: string, quantity: number }>({
//       query: (data) => ({
//         url: "/api/v1/user/cartmanagment",
//         method: 'POST',
//         body: data,
//       }),
//     }),
    
//     userCartItem: build.query<CartData, void>({
//       query: () => "/api/v1/user/getcartitem",
//     }),
    
//     UpdateCartItem: build.mutation<CartData, { stampId: string, delta: number }>({
//       query: (data) => ({
//         url: "/api/v1/user/updatecart",
//         method: 'POST',
//         body: data,
//       }),
//     }),
    
//     removeCartItem: build.mutation<CartData, string>({
//   query: (stampId) => ({
//     url: `/api/v1/user/removeitem/${stampId}`,
//     method: 'DELETE',  // ✅ CRITICAL: Must specify DELETE
//   }),
// }),
    
//     // ✅ FIXED: removeAllCartItem - Add DELETE method
// removeAllCartItem: build.mutation<{ cart: null }, string>({
//   query: (id) => ({
//     url: `/api/v1/user/removeAllitem/${id}`,
//     method: 'DELETE',  // ✅ CRITICAL: Must specify DELETE
//   }),
// }),
//     subscribeMailService: build.mutation<{ message: string }, { email: string }>({
//       query: (email) => ({
//         url: "/api/v1/user/subscribeMailService",
//         method: 'POST',
//         body: email,
//       }),
//     }),
    
//     userOrder: build.query<{ success: boolean, orders: OrderResponse[] }, void>({
//       query: () => "/api/v1/user/orders",
//     }),
    
//     contactus: build.mutation<{ message: string }, { name: string, email: string, subject: string, message: string }>({
//       query: (param) => ({
//         url: "/api/v1/user/contact/us",
//         method: 'POST',
//         body: param,
//       }),
//     }),
    
//     getAllCategories: build.query<{ _id: string, name: string }[], void>({
//       query: () => "/api/v1/user/allcategories",
//     }),
    
//     getShippingRates: build.query<ShippingRatesResponse, void>({
//       query: () => "/api/v1/user/shipping-prices",
//     }),
//   }),
// });

// export const { 
//   useUserRegisterMutation,
//   useUserLoginMutation,
//   useUserLogoutMutation, // ✅ NEW export
//   useUserInfoQuery,
//   useUserAllStampsQuery,
//   useGetWaveImgQuery,
//   useAddToCartMutation,
//   useUserCartItemQuery,
//   useUpdateCartItemMutation,
//   useRemoveCartItemMutation,
//   useRemoveAllCartItemMutation,
//   useSubscribeMailServiceMutation,
//   useUserOrderQuery,
//   useContactusMutation,
//   useGetAllCategoriesQuery,
//   useGetShippingRatesQuery 
// } = userApi;

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export interface RegisterResponse {
  success: boolean;
  message: string;
  user: User;
  token?: string;
}

export interface LoginResponse {
  success: boolean;
  message: string;
  user: {
    _id: string;
    firstname: string;
    lastname: string;
    username: string;
    email: string;
  };
  token: string;
}

interface ShippingRatesResponse {
  success: boolean;
  usPrice: number;
  internationalPrice: number;
}

console.log("BACKEND_URL:", import.meta.env.VITE_BACKEND_URL);

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include",
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('agstampToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (build) => ({
    userRegister: build.mutation<RegisterResponse, UserRegister>({
      query: (user) => ({
        url: "/api/v1/user/register",
        method: 'POST',
        body: user,
      }),
    }),
    
    UserLogin: build.mutation<RegisterResponse, UserLogin>({
      query: (user) => ({
        url: "/api/v1/user/login",
        method: 'POST',
        body: user,
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          const { data } = await queryFulfilled;
          if (data.token) {
            localStorage.setItem('agstampToken', data.token);
            console.log('✅ Token saved to localStorage');
          }
        } catch (error) {
          console.error('❌ Login failed:', error);
        }
      },
    }),
    
    UserLogout: build.mutation<{ success: boolean; message: string }, void>({
      query: () => ({
        url: "/api/v1/user/logout",
        method: 'POST',
      }),
      async onQueryStarted(_arg, { queryFulfilled }) {
        try {
          await queryFulfilled;
          localStorage.removeItem('agstampToken');
          console.log('✅ Token cleared from localStorage');
        } catch (error) {
          console.error('❌ Logout error:', error);
          localStorage.removeItem('agstampToken');
        }
      },
    }),
    
    UserInfo: build.query<RegisterResponse, void>({
      query: () => "/api/v1/user/info"
    }),
    
    userAllStamps: build.query<StampResponse, void>({
      query: () => "/api/v1/user/allproducts",
      keepUnusedDataFor: 0,
    }),
    
    // ✅ NEW: Get single stamp details (USER route, not admin)
    getSingleStamp: build.query<StampResponse, string>({
      query: (stampId) => `/api/v1/user/product/${stampId}`,
    }),
    
    getWaveImg: build.query<UploadPhotoResponse, void>({
      query: () => "/api/v1/user/waveimg",
    }),

    // ✅ NEW: Get public carousels (no auth required)
    getPublicCarousels: build.query<{ success: boolean; Carousels: Carousel[] }, void>({
      query: () => "/api/v1/user/carousels",
    }),
    
    addToCart: build.mutation<CartData, { stampId: string, quantity: number }>({
      query: (data) => ({
        url: "/api/v1/user/cartmanagment",
        method: 'POST',
        body: data,
      }),
    }),
    
    userCartItem: build.query<CartData, void>({
      query: () => "/api/v1/user/getcartitem",
    }),
    
    UpdateCartItem: build.mutation<CartData, { stampId: string, delta: number }>({
      query: (data) => ({
        url: "/api/v1/user/updatecart",
        method: 'POST',
        body: data,
      }),
    }),
    
    removeCartItem: build.mutation<CartData, string>({
      query: (stampId) => ({
        url: `/api/v1/user/removeitem/${stampId}`,
        method: 'DELETE',
      }),
    }),
    
    removeAllCartItem: build.mutation<{ cart: null }, string>({
      query: (id) => ({
        url: `/api/v1/user/removeAllitem/${id}`,
        method: 'DELETE',
      }),
    }),
    
    subscribeMailService: build.mutation<{ message: string }, { email: string }>({
      query: (email) => ({
        url: "/api/v1/user/subscribeMailService",
        method: 'POST',
        body: email,
      }),
    }),
    
    userOrder: build.query<{ success: boolean, orders: OrderResponse[] }, void>({
      query: () => "/api/v1/user/orders",
    }),
    
    contactus: build.mutation<{ message: string }, { name: string, email: string, subject: string, message: string }>({
      query: (param) => ({
        url: "/api/v1/user/contact/us",
        method: 'POST',
        body: param,
      }),
    }),
    
    getAllCategories: build.query<{ _id: string, name: string }[], void>({
      query: () => "/api/v1/user/allcategories",
    }),
    
    getShippingRates: build.query<ShippingRatesResponse, void>({
      query: () => "/api/v1/user/shipping-prices",
    }),
  }),
});

export const { 
  useUserRegisterMutation,
  useUserLoginMutation,
  useUserLogoutMutation,
  useUserInfoQuery,
  useUserAllStampsQuery,
  useGetSingleStampQuery, // ✅ NEW export
  useGetWaveImgQuery,
  useGetPublicCarouselsQuery, // ✅ NEW export
  useAddToCartMutation,
  useUserCartItemQuery,
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useRemoveAllCartItemMutation,
  useSubscribeMailServiceMutation,
  useUserOrderQuery,
  useContactusMutation,
  useGetAllCategoriesQuery,
  useGetShippingRatesQuery 
} = userApi;