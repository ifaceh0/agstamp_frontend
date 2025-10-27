// // import { loadStripe } from "@stripe/stripe-js"

// // // Initialize Stripe with your publishable key
// // const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY)

// // // Types for our checkout session
// // interface ShippingAddress {
// //   line1: string
// //   line2?: string
// //   city: string
// //   state: string
// //   postal_code: string
// //   country: string
// // }

// // interface CheckoutSessionParams {
// //   customerEmail: string
// //   customerName: string
// //   shippingAddress: ShippingAddress
// // }

// // // Create a checkout session with Stripe
// // export const createCheckoutSession = async (params: CheckoutSessionParams) => {
// //   try {
// //     // Call your backend API to create a checkout session
// //     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/stripe/create-checkout-session`, {
// //       method: "POST",
// //       headers: {
// //         "Content-Type": "application/json",
// //       },
// //       body: JSON.stringify({
// //         customerEmail: params.customerEmail,
// //         customerName: params.customerName,
// //         shippingAddress: params.shippingAddress,
// //       }),
// //     })

// //     if (!response.ok) {
// //       const errorData = await response.json()
// //       throw new Error(errorData.message || "Failed to create checkout session")
// //     }

// //     const session = await response.json()
// //     return session
// //   } catch (error) {
// //     console.error("Error creating checkout session:", error)
// //     throw error
// //   }
// // }

// // // Retrieve a checkout session
// export const retrieveCheckoutSession = async (sessionId: string):Promise<any> => {
//   try {
//     const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/stripe/verify-session/${sessionId}`, {
//       method: "GET",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       credentials:"include"
//     })

//     if (!response.ok) {
//       const errorData = await response.json()
//       throw new Error(errorData.message || "Failed to retrieve checkout session")
//     }

//     const session = await response.json()
//     return session
//   } catch (error) {
//     console.error("Error retrieving checkout session:", error)
//     throw error
//   }
// }

// // // Get the Stripe instance
// // export const getStripe = () => stripePromise


// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// export const stripeApi = createApi({
//   reducerPath: 'stripeApi',
//   baseQuery: fetchBaseQuery({ 
//     baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//       // Add any auth tokens if needed
//       const token = localStorage.getItem('token');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     }
//   }),
//   endpoints: (builder) => ({
//     createCheckoutSession: builder.mutation({
//       query: (checkoutData) => ({
//         url: '/stripe/create-checkout-session',
//         method: 'POST',
//         body: checkoutData
//       })
//     }),
//     verifyCheckoutSession: builder.query({
//       query: (sessionId) => ({
//         url: `/stripe/verify-session/${sessionId}`,
//         method: 'GET'
//       })
//     }),
//     getUserOrders: builder.query({
//       query: () => '/stripe/orders'
//     })
//   })
// });

// export const { 
//   useCreateCheckoutSessionMutation, 
//   useVerifyCheckoutSessionQuery,
//   useGetUserOrdersQuery
// } = stripeApi;

export const retrieveCheckoutSession = async (sessionId: string):Promise<any> => {
  try {
    const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/stripe/verify-session/${sessionId}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      credentials:"include"
    })

    if (!response.ok) {
      const errorData = await response.json()
      throw new Error(errorData.message || "Failed to retrieve checkout session")
    }

    const session = await response.json()
    return session
  } catch (error) {
    console.error("Error retrieving checkout session:", error)
    throw error
  }
}

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ✅ Define the type for checkout session data
interface CheckoutSessionData {
  items: Array<{
    mongoID: string;
    name: string;
    description?: string;
    price: number;
    quantity: number;
    images?: any[];
  }>;
  customerEmail: string;
  customerName: string;
  selectedCountry?: string; // ✅ Add this
  shippingType?: string;
  shippingRate?: number;
  metadata?: any;
}

// ✅ Define the response type
interface CheckoutSessionResponse {
  success: boolean;
  sessionId: string;
  url: string;
  message?: string;
}

export const stripeApi = createApi({
  reducerPath: 'stripeApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      // Add any auth tokens if needed
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // ✅ Updated with proper types
    createCheckoutSession: builder.mutation<CheckoutSessionResponse, CheckoutSessionData>({
      query: (checkoutData) => ({
        url: '/stripe/create-checkout-session',
        method: 'POST',
        body: checkoutData
      })
    }),
    verifyCheckoutSession: builder.query({
      query: (sessionId) => ({
        url: `/stripe/verify-session/${sessionId}`,
        method: 'GET'
      })
    }),
    getUserOrders: builder.query({
      query: () => '/stripe/orders'
    })
  })
});

export const { 
  useCreateCheckoutSessionMutation, 
  useVerifyCheckoutSessionQuery,
  useGetUserOrdersQuery
} = stripeApi;