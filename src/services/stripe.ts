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

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // ✅ Define the type for checkout session data
// interface CheckoutSessionData {
//   items: Array<{
//     mongoID: string;
//     name: string;
//     description?: string;
//     price: number;
//     quantity: number;
//     images?: any[];
//   }>;
//   customerEmail: string;
//   customerName: string;
//   selectedCountry?: string; // ✅ Add this
//   shippingType?: string;
//   shippingRate?: number;
//   metadata?: any;
// }

// // ✅ Define the response type
// interface CheckoutSessionResponse {
//   success: boolean;
//   sessionId: string;
//   url: string;
//   message?: string;
// }

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
//     // ✅ Updated with proper types
//     createCheckoutSession: builder.mutation<CheckoutSessionResponse, CheckoutSessionData>({
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

// import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// // ✅ Fixed retrieveCheckoutSession function with auth
// export const retrieveCheckoutSession = async (sessionId: string): Promise<any> => {
//   try {
//     // ✅ Get token from localStorage
//     const token = localStorage.getItem('agstampToken');
    
//     const headers: HeadersInit = {
//       "Content-Type": "application/json",
//     };
    
//     // ✅ Add Authorization header if token exists
//     if (token) {
//       headers['Authorization'] = `Bearer ${token}`;
//     }
    
//     const response = await fetch(
//       `${import.meta.env.VITE_BACKEND_URL}/api/v1/stripe/verify-session/${sessionId}`, 
//       {
//         method: "GET",
//         headers: headers,
//         credentials: "include"
//       }
//     );

//     if (!response.ok) {
//       const errorData = await response.json();
//       throw new Error(errorData.message || "Failed to retrieve checkout session");
//     }

//     const session = await response.json();
//     return session;
//   } catch (error) {
//     console.error("Error retrieving checkout session:", error);
//     throw error;
//   }
// };



// // ✅ Define the type for checkout session data
// interface CheckoutSessionData {
//   items: Array<{
//     mongoID: string;
//     name: string;
//     description?: string;
//     price: number;
//     quantity: number;
//     images?: any[];
//   }>;
//   customerEmail: string;
//   customerName: string;
//   selectedCountry?: string;
//   shippingType?: string;
//   shippingRate?: number;
//   metadata?: any;
// }

// // ✅ Define the response type
// interface CheckoutSessionResponse {
//   success: boolean;
//   sessionId: string;
//   url: string;
//   message?: string;
// }

// export const stripeApi = createApi({
//   reducerPath: 'stripeApi',
//   baseQuery: fetchBaseQuery({ 
//     baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
//     credentials: 'include',
//     prepareHeaders: (headers) => {
//       // ✅ FIXED: Use correct token key 'agstampToken' instead of 'token'
//       const token = localStorage.getItem('agstampToken');
//       if (token) {
//         headers.set('Authorization', `Bearer ${token}`);
//       }
//       return headers;
//     }
//   }),
//   endpoints: (builder) => ({
//     createCheckoutSession: builder.mutation<CheckoutSessionResponse, CheckoutSessionData>({
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

import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// ✅ Define types
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
  selectedCountry?: string;
  shippingType?: string;
  shippingRate?: number;
  metadata?: any;
}

interface CheckoutSessionResponse {
  success: boolean;
  sessionId: string;
  url: string;
  message?: string;
}

interface GuestOrderTrackResponse {
  success: boolean;
  order?: any;
  message?: string;
}

// ✅ Retrieve session for AUTHENTICATED users
export const retrieveCheckoutSession = async (sessionId: string): Promise<any> => {
  const token = localStorage.getItem('agstampToken');
  const headers: HeadersInit = { "Content-Type": "application/json" };
  if (token) headers['Authorization'] = `Bearer ${token}`;
  
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/stripe/verify-session/${sessionId}`, 
    { method: "GET", headers, credentials: "include" }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to retrieve checkout session");
  }
  return response.json();
};

// ✅ Retrieve session for GUEST users (no auth)
export const retrieveGuestCheckoutSession = async (sessionId: string): Promise<any> => {
  const response = await fetch(
    `${import.meta.env.VITE_BACKEND_URL}/api/v1/stripe/guest/verify-session/${sessionId}`, 
    { method: "GET", headers: { "Content-Type": "application/json" } }
  );

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.message || "Failed to retrieve guest checkout session");
  }
  return response.json();
};

export const stripeApi = createApi({
  reducerPath: 'stripeApi',
  baseQuery: fetchBaseQuery({ 
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/api/v1`,
    credentials: 'include',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('agstampToken');
      if (token) headers.set('Authorization', `Bearer ${token}`);
      return headers;
    }
  }),
  endpoints: (builder) => ({
    // ========== AUTHENTICATED USER ENDPOINTS ==========
    createCheckoutSession: builder.mutation<CheckoutSessionResponse, CheckoutSessionData>({
      query: (data) => ({
        url: '/stripe/create-checkout-session',
        method: 'POST',
        body: data
      })
    }),
    verifyCheckoutSession: builder.query({
      query: (sessionId) => `/stripe/verify-session/${sessionId}`
    }),
    getUserOrders: builder.query({
      query: () => '/stripe/orders'
    }),

    // ========== GUEST CHECKOUT ENDPOINTS ==========
    createGuestCheckoutSession: builder.mutation<CheckoutSessionResponse, CheckoutSessionData>({
      query: (data) => ({
        url: '/stripe/guest/create-checkout-session',
        method: 'POST',
        body: data
      })
    }),
    verifyGuestCheckoutSession: builder.query({
      query: (sessionId) => `/stripe/guest/verify-session/${sessionId}`
    }),
    trackGuestOrder: builder.mutation<GuestOrderTrackResponse, { email: string; orderId: string }>({
      query: (data) => ({
        url: '/stripe/guest/track-order',
        method: 'POST',
        body: data
      })
    })
  })
});

export const { 
  useCreateCheckoutSessionMutation, 
  useVerifyCheckoutSessionQuery,
  useGetUserOrdersQuery,
  // ✅ NEW Guest exports
  useCreateGuestCheckoutSessionMutation,
  useVerifyGuestCheckoutSessionQuery,
  useTrackGuestOrderMutation
} = stripeApi;