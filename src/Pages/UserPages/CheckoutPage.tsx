// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Lock } from "lucide-react"; // Import Lock icon

// const CheckoutPage: React.FC = () => {
//   const navigate = useNavigate();
//   const [isLoading, setIsLoading] = useState(false);
//   const [shippingAddress, setShippingAddress] = useState({
//     name: "",
//     email: "",
//     phone: "",
//     addressLine1: "",
//     addressLine2: "",
//     city: "",
//     state: "",
//     zipCode: "",
//   });

//   const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setShippingAddress({ ...shippingAddress, [e.target.id]: e.target.value });
//   };

//   const handleProceedToPayment = () => {
//     setIsLoading(true);
//     setTimeout(() => {
//       navigate("/checkout");
//       setIsLoading(false);
//     }, 2000);
//   };

//   const hasProducts = true; // Mock check for products in cart
//   const cartTotal = 99.99; // Replace this with real cart total from context/state

//   return (
//     <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
//       <div className="max-w-2xl mx-auto">
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-8"
//         >
//           <svg
//             className="h-5 w-5 mr-2"
//             fill="none"
//             stroke="currentColor"
//             viewBox="0 0 24 24"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M15 19l-7-7 7-7"
//             />
//           </svg>
//           Back to Cart
//         </button>

//         <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
//           <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
//             Checkout Details
//           </h1>

//           {/* Contact Information */}
//           <div className="mb-10">
//             <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">
//               Contact Information
//             </h2>
//             <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//               <div>
//                 <label
//                   htmlFor="name"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Full Name
//                 </label>
//                 <input
//                   type="text"
//                   id="name"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="John Doe"
//                   onChange={handleAddressChange}
//                   value={shippingAddress.name}
//                 />
//               </div>

//               <div>
//                 <label
//                   htmlFor="email"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Email Address
//                 </label>
//                 <input
//                   type="email"
//                   id="email"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="john.doe@example.com"
//                   onChange={handleAddressChange}
//                   value={shippingAddress.email}
//                 />
//               </div>

//               <div className="sm:col-span-2">
//                 <label
//                   htmlFor="phone"
//                   className="block text-sm font-medium text-gray-700 mb-2"
//                 >
//                   Phone Number
//                 </label>
//                 <input
//                   type="tel"
//                   id="phone"
//                   className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                   placeholder="(555) 123-4567"
//                   onChange={handleAddressChange}
//                   value={shippingAddress.phone}
//                 />
//               </div>
//             </div>
//           </div>

//           {/* Shipping Address */}
//           {hasProducts && (
//             <div className="mb-10">
//               <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">
//                 Shipping Address
//               </h2>
//               <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
//                 <div className="sm:col-span-2">
//                   <label
//                     htmlFor="addressLine1"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     Street Address
//                   </label>
//                   <input
//                     type="text"
//                     id="addressLine1"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="123 Main St"
//                     onChange={handleAddressChange}
//                     value={shippingAddress.addressLine1}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="city"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     City
//                   </label>
//                   <input
//                     type="text"
//                     id="city"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="New York"
//                     onChange={handleAddressChange}
//                     value={shippingAddress.city}
//                   />
//                 </div>

//                 <div>
//                   <label
//                     htmlFor="zipCode"
//                     className="block text-sm font-medium text-gray-700 mb-2"
//                   >
//                     ZIP/Postal Code
//                   </label>
//                   <input
//                     type="text"
//                     id="zipCode"
//                     className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
//                     placeholder="10001"
//                     onChange={handleAddressChange}
//                     value={shippingAddress.zipCode}
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Payment Button */}
//           <div className="mt-10 border-t pt-8">
//             <button
//               onClick={handleProceedToPayment}
//               disabled={isLoading}
//               className={`w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
//                 isLoading ? "opacity-75 cursor-not-allowed" : ""
//               }`}
//             >
//               {isLoading ? (
//                 <>
//                   <svg
//                     className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
//                     xmlns="http://www.w3.org/2000/svg"
//                     fill="none"
//                     viewBox="0 0 24 24"
//                   >
//                     <circle
//                       className="opacity-25"
//                       cx="12"
//                       cy="12"
//                       r="10"
//                       stroke="currentColor"
//                       strokeWidth="4"
//                     ></circle>
//                   </svg>
//                   Processing...
//                 </>
//               ) : (
//                 <>
//                   <Lock className="w-5 h-5 mr-2" />
//                   Pay Securely ${cartTotal.toFixed(2)}
//                 </>
//               )}
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default CheckoutPage;




// Note: The above code assumes you have a backend API endpoint `/api/create-checkout-session`
// that handles the creation of the Stripe checkout session. You will need to implement this endpoint in your backend.
// The `cartTotal` variable is a placeholder and should be replaced with the actual cart total from your application's state or context.
// 
import type React from "react"
import { useState, useEffect } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { Lock } from "lucide-react"
import { useCreateCheckoutSessionMutation } from "../../services/stripe"
import { useSelector } from "react-redux"
import { RootState } from "../../Redux/Store"

const CheckoutPage: React.FC = () => {
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = useState(false)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [cartTotal, setCartTotal] = useState(0)

  const [createCheckoutSession] = useCreateCheckoutSessionMutation()
  const { cart } = useSelector<RootState, CartState>((state) => state.cartSlice)

  const [shippingAddress, setShippingAddress] = useState({
    name: "",
    email: "",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
  })

  const location = useLocation()
  const { shippingType, shippingRate } = location.state || {}

  useEffect(() => {
    const items = cart?.items || []
    setCartItems(items)

    // Include shipping rate in total
    const total = items.reduce(
      (sum: number, item: CartItem) => sum + item.stamp.price * item.quantity,
      0
    )
    setCartTotal(total + (shippingRate || 0))
  }, [cart, shippingRate])

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShippingAddress({ ...shippingAddress, [e.target.id]: e.target.value })
  }

  const handleProceedToPayment = async () => {
    try {
      setIsLoading(true)

      if (
        !shippingAddress.name ||
        !shippingAddress.email ||
        !shippingAddress.phone ||
        !shippingAddress.addressLine1 ||
        !shippingAddress.city ||
        !shippingAddress.state ||
        !shippingAddress.zipCode
      ) {
        alert("Please fill in all required fields")
        setIsLoading(false)
        return
      }

      const response = await createCheckoutSession({
        items: cartItems.map((item) => ({
          mongoID: item.stamp._id,
          name: item.stamp.name,
          description: item.stamp.description || "",
          price: item.stamp.price,
          quantity: item.quantity,
          images: item.stamp.images || [],
        })),
        customerEmail: shippingAddress.email,
        customerName: shippingAddress.name,
        shippingAddress: {
          name: shippingAddress.name,
          line1: shippingAddress.addressLine1,
          line2: shippingAddress.addressLine2 || "",
          city: shippingAddress.city,
          state: shippingAddress.state,
          postal_code: shippingAddress.zipCode,
          country: "US",
        },
        metadata: {
          products: JSON.stringify(
            cartItems.map((item) => ({
              mongoID: item.stamp._id,
              quantity: item.quantity,
            }))
          ),
          shippingType: shippingType || "domestic",
          shippingRate: shippingRate?.toString() || "0",
        },
        shippingAmount: shippingRate || 0,
      }).unwrap()

      if (response.success && response.url) {
        window.location.href = response.url
      } else {
        throw new Error(response.message || "Failed to create checkout session")
      }
    } catch (error) {
      console.error("Error creating checkout session:", error)
      alert("There was an error processing your payment. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleAutoFill = () => {
    setShippingAddress({
      name: "John Doe",
      email: "john.doe@example.com",
      phone: "555-123-4567",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
    })
  }

  const hasProducts = cartItems.length > 0

  if (!hasProducts) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
          <p className="text-gray-600 mb-8">Add some products to your cart before checking out.</p>
          <button
            onClick={() => navigate("/products")}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
          >
            Browse Products
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cart
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 lg:p-10">
          <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">Checkout Details</h1>

          {/* Order Summary */}
          <div className="mb-10">
            <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Order Summary</h2>
            <div className="space-y-4">
              {cartItems.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="flex items-center">
                    {item.stamp.images && (
                      <img
                        src={item.stamp.images[0].publicUrl || "/placeholder.svg"}
                        alt={item.stamp.name}
                        className="w-16 h-16 object-cover rounded-md mr-4"
                      />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{item.stamp.name}</h3>
                      <p className="text-gray-500">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium text-gray-900">
                    ${(item.stamp.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              ))}
              <div className="border-t pt-4 mt-4 space-y-2">
                {/* Shipping Line */}
                <div className="flex justify-between text-gray-700">
                  <p>Shipping ({shippingType || "domestic"})</p>
                  <p>${(shippingRate || 0).toFixed(2)}</p>
                </div>

                <div className="flex justify-between font-bold text-lg">
                  <p>Total</p>
                  <p>${cartTotal.toFixed(2)}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Shipping Address Form */}
          <div className="mb-10">
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-900 mb-6 border-b pb-4">Shipping Address</h2>
              <button onClick={handleAutoFill} className="text-sm text-indigo-600 hover:text-indigo-800">
                Auto-fill for demo
              </button>
            </div>

            <div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
              <div className="sm:col-span-2">
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                  Full Name *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="name"
                    value={shippingAddress.name}
                    onChange={handleAddressChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email Address *
                </label>
                <div className="mt-1">
                  <input
                    type="email"
                    id="email"
                    value={shippingAddress.email}
                    onChange={handleAddressChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Phone Number *
                </label>
                <div className="mt-1">
                  <input
                    type="tel"
                    id="phone"
                    value={shippingAddress.phone}
                    onChange={handleAddressChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="addressLine1" className="block text-sm font-medium text-gray-700">
                  Address Line 1 *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="addressLine1"
                    value={shippingAddress.addressLine1}
                    onChange={handleAddressChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="addressLine2" className="block text-sm font-medium text-gray-700">
                  Address Line 2 (Optional)
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="addressLine2"
                    value={shippingAddress.addressLine2}
                    onChange={handleAddressChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="city" className="block text-sm font-medium text-gray-700">
                  City *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="city"
                    value={shippingAddress.city}
                    onChange={handleAddressChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
              </div>

              <div>
                <label htmlFor="state" className="block text-sm font-medium text-gray-700">
                  State/Province *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="state"
                    value={shippingAddress.state}
                    onChange={handleAddressChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
              </div>

              <div className="sm:col-span-2">
                <label htmlFor="zipCode" className="block text-sm font-medium text-gray-700">
                  ZIP / Postal Code *
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="zipCode"
                    value={shippingAddress.zipCode}
                    onChange={handleAddressChange}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm p-2 border"
                    required
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Payment Button */}
          <div className="mt-10 border-t pt-8">
            <button
              onClick={handleProceedToPayment}
              disabled={isLoading}
              className={`w-full flex items-center justify-center px-6 py-4 border border-transparent rounded-xl text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ${
                isLoading ? "opacity-75 cursor-not-allowed" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Lock className="w-5 h-5 mr-2" />
                  Pay Securely ${cartTotal.toFixed(2)}
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CheckoutPage
