import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
// Define a service using a base URL and expected endpoint
console.log("import.meta.env.VITE_BACKEND_URL:",import.meta.env.VITE_BACKEND_URL);
export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BACKEND_URL,credentials:"include" }),
  endpoints: (build) => ({
    userRegister: build.mutation<RegisterResponse,UserRegister>({
        query: (user) => ({
        url: "/api/v1/user/register",
        method: 'POST',
        body: user,
        }),
    }),
    UserLogin:build.mutation<RegisterResponse,UserLogin>({
      query: (user) => ({
      url: "/api/v1/user/login",
      method: 'POST',
      body: user,
      }),
    }),
    UserInfo:build.query<RegisterResponse,void>({
      query: () => "/api/v1/user/info"
    }),
    userAllStamps: build.query<StampResponse, void>({
      query: () => "/api/v1/user/allproducts",
      keepUnusedDataFor: 0, // disable cache for this query
    }),
    getWaveImg: build.query<UploadPhotoResponse, void>({
      query: () => "/api/v1/user/waveimg",
    }),
    addToCart:build.mutation<CartData,{stampId:string, quantity:number}>({
      query: (data) => ({
      url: "/api/v1/user/cartmanagment",
      method: 'POST',
      body: data,
      }),
    }),
    userCartItem: build.query<CartData, void>({
      query: () => "/api/v1/user/getcartitem",
    }),
    UpdateCartItem:build.mutation<CartData,{stampId:string, delta:number}>({
      query: (data) => ({
      url: "/api/v1/user/updatecart",
      method: 'POST',
      body: data,
      }),
    }),
    removeCartItem: build.mutation<CartData, string>({
      query: (id) => `/api/v1/user/removeitem/${id}`,
    }),
    removeAllCartItem : build.mutation<{cart:null}, string>({
      query: (id) => `/api/v1/user/removeAllitem/${id}`,
    }),
    subscribeMailService : build.mutation<{message:string},{email:string}>({
      query: (email) => ({
        url: "/api/v1/user/subscribeMailService",
        method: 'POST',
        body: email,
        }),
    }),
    userOrder: build.query<{success: boolean, orders:OrderResponse[]},void>({
      query: () => "/api/v1/user/orders",
    }),
    contactus : build.mutation<{message:string},{ name: string, email: string, subject: string, message: string }>({
      query: (param) => ({
        url: "/api/v1/user/contact/us",
        method: 'POST',
        body: param,
        }),
    }),
    getAllCategories: build.query<{_id:string,name:string}[],void>({
      query: () => "/api/v1/user/allcategories",
    }),
  }),
})

export const { useUserRegisterMutation,useUserLoginMutation,useUserInfoQuery,useUserAllStampsQuery,useGetWaveImgQuery,useAddToCartMutation,useUserCartItemQuery,useUpdateCartItemMutation,useRemoveCartItemMutation,useRemoveAllCartItemMutation,useSubscribeMailServiceMutation,useUserOrderQuery,useContactusMutation,useGetAllCategoriesQuery } = userApi;

