import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { Category } from '../../types';

export const adminApi = createApi({
  reducerPath: 'adminApi',
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_BACKEND_URL,
    credentials: "include"
  }),
  keepUnusedDataFor: 0, // disables caching globally
  endpoints: (build) => ({
    allStamps: build.query<StampResponse, void>({
      query: () => "/api/v1/admin/getallstamp",
      keepUnusedDataFor: 0, // disable cache for this query
    }),
    singleStamps: build.query<SingleStampResponse, string>({
      query: (id) => `/api/v1/admin/getstamp/${id}`,
      keepUnusedDataFor: 0,
    }),
    deleteStamp: build.mutation<StampResponse, string>({
      query: (id) => ({
        url: `/api/v1/admin/deleteStamp/${id}`,
        method: 'DELETE',
      }),
    }),
    getAllCarousels: build.query<{Carousels:Carousel[]},void>({
      query: () => `api/v1/admin/getallcarousel`,
    }),
    deleteCarousel: build.mutation({
      query: (id) => ({
        url: `api/v1/admin/deletecarousel/${id}`,
        method: "DELETE",
      }),
    }),
    getAllSubscribers: build.query<SubscriberResponse,void>({
      query: () => `api/v1/admin/getallsubscribers`,
    }),
    sendMailToSubscribers: build.mutation<{ success:boolean, message:string },{selectedSubscribers:string[],subject:string,message:string}>({
      query: (data) => ({
        url: `api/v1/admin/sendmailtosubscribers`,
        method: "POST",
        body:data
      }),
    }),
    getAllUsersOrder: build.query<{success:boolean, orders:Order50[]},void>({
      query: () => `api/v1/admin/usersallorders`,
    }),
    updateOrder: build.mutation<{success:boolean, orders:Order50[]}, {id:string,status:string} >({
      query: ({id,status}) => ({
        url: `api/v1/admin/updateOrder`,
        method: "PATCH",
        body:{id,status}
      }),
    }),
    getDashBoardData: build.query<OrderChartResponse,void>({
      query: () => `api/v1/admin/dashBoardData`,
    }),
    getAllFeedback: build.query<ContactData,void>({
      query: () => `api/v1/admin/all/feedback`,
    }),
    // 🔹 CATEGORY ENDPOINTS
    getAllCategories: build.query<Category[], void>({
      query: () => `api/v1/admin/getcategories`,
    }),
    addCategory: build.mutation<{_id:string, name:string}, {name:string}>({
      query: (data) => ({
        url: `/api/v1/admin/addcategories`,
        method: "POST",
        body: data,
      }),
    }),
    updateCategory: build.mutation<{_id:string, name:string}, {id:string, name:string}>({
      query: ({ id, name }) => ({
        url: `/api/v1/admin/updatecategory/${id}`,
        method: "PUT",
        body: { name },
      }),
    }),
    deleteCategory: build.mutation<{ success:boolean }, string>({
      query: (id) => ({
        url: `/api/v1/admin/deletecategory/${id}`,
        method: "DELETE",
      }),
    }),
    getShippingRates: build.query<{ success: boolean; rates: { type: string; price: number }[] }, void>({
      query: () => `/api/v1/admin/shipping-rates`,
    }),
    updateShippingRate: build.mutation<{ success: boolean; message: string }, { type: string; price: number }>({
      query: () => ({
        url: `/api/v1/admin/shipping-rates`,
        method: "PATCH",
      }),
    }),
  }),
});

export const {
  useAllStampsQuery,
  useDeleteStampMutation,
  useSingleStampsQuery,
  useGetAllCarouselsQuery,
  useDeleteCarouselMutation,
  useGetAllSubscribersQuery,
  useSendMailToSubscribersMutation,
  useGetAllUsersOrderQuery,
  useUpdateOrderMutation,
  useGetDashBoardDataQuery,
  useGetAllFeedbackQuery,
   // 🔹 Category hooks
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useGetShippingRatesQuery,
  useUpdateShippingRateMutation,
} = adminApi;

export default adminApi;

