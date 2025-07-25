import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
  useGetAllFeedbackQuery
} = adminApi;

export default adminApi;

