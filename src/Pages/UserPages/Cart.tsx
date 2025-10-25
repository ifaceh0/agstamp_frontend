// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { RootState } from "../../Redux/Store";
// import { useDispatch } from "react-redux";
// import { useUpdateCartItemMutation,useRemoveCartItemMutation, useRemoveAllCartItemMutation } from "../../Redux/Api/userApi";
// import { addToCartAction } from "../../Redux/Reducer/cartSlice";
// import { toast } from "react-toastify";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

// const Cart: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
//   const [shippingOption, setShippingOption] = useState<string>("");
//   const [shippingCost, setShippingCost] = useState<number>(0);
//   const [shippingError, setShippingError] = useState<string>("");
//   const [UpdateCartItem,{isLoading:l1}] = useUpdateCartItemMutation();
//   const [removeCartItem,{isLoading:l2}] = useRemoveCartItemMutation();
//   const [removeAllCartItem,{isLoading:l3}] = useRemoveAllCartItemMutation();
//   const [clickedButton,setClickedButton] = useState<string>("");
//   const { cart } = useSelector<RootState,CartState>((state) => state.cartSlice);

//   // Calculate subtotal
//   const subtotal = cart ? cart?.items.reduce((sum: number, item: any) => sum + item.stamp.price * item.quantity,0) : 0 ;

//   const total = subtotal + shippingCost;

//   const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
//     const option = e.target.value;
//     setShippingOption(option);
//     setShippingError("");
//     dispatch(addToCartAction({CartData:cart!,ShippingType:option}));
//     switch (option) {
//       case "us":
//         setShippingCost(5);
//         break;
//       case "worldwide":
//         setShippingCost(25);
//         break;
//       default:
//         setShippingCost(0);
//     }
//   };

//   const handleCheckout = () => {
//     if (!shippingOption) {
//       setShippingError("Please select a shipping option");
//       return;
//     }
//     navigate("/paymentmethod", { state: { cart, total, shippingOption } });
//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8">
//       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

//       {(cart?.items.length === 0 || cart?.items == null) ? (
//         <div className="text-center">
//           <p className="text-gray-600">Your cart is empty.</p>
//         </div>
//       ) : (
//         <div>
//           {( l2 || l3 ) && <FullscreenLoader/>}
//           {cart?.items.map((item) => (
//             <div key={item._id} className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
//               <img
//                 src={item.stamp.images[0]?.publicUrl}
//                 alt={item.stamp.name}
//                 className="w-24 h-24 object-contain rounded-lg border border-gray-300"
//               />

//               <div className="flex-1">
//                 <h2 className="text-lg font-semibold">{item.stamp.name}</h2>
//                 <p className="mb-1 sm:mb-2">Price: ${item.stamp.price.toFixed(2)}</p>
//                 <p className="mb-1 sm:mb-2 font-bold">Total: ${(item.stamp.price * item.quantity).toFixed(2)}</p>

//                 <div className="flex items-center space-x-2">
//                   <button
//                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
//                     onClick={async()=>{
//                       setClickedButton(item.stamp._id);
//                       const stamp = await UpdateCartItem({stampId:item.stamp._id,delta:-1});
//                       if(stamp.data)
//                         dispatch(addToCartAction({CartData:stamp.data!,ShippingType:shippingOption}));
                        
//                        if (stamp.error) {
//                             const errorMessage = (stamp.error as { data?: { message?: string } })?.data?.message || "Something went wrong";
//                             toast.error(errorMessage);
//                           }
//                     }}
//                   >
//                     -
//                   </button>
//                   {(l1 && (clickedButton == item.stamp._id)) ? <TinyLoader/> : <span className="text-lg">{item.quantity}</span>}
//                   <button
//                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200 disabled:bg-gray-300"
//                     disabled = {item.quantity == item.stamp.stock}
//                     onClick={async()=>{
//                       setClickedButton(item.stamp._id);
//                       const stamp = await UpdateCartItem({stampId:item.stamp._id,delta:1});
//                       if(stamp.data){
//                         dispatch(addToCartAction({CartData:stamp.data!,ShippingType:shippingOption}));
//                       }


//                       if (stamp.error) {
//                         const errorMessage = (stamp.error as { data?: { message?: string } })?.data?.message || "Something went wrong";
//                         toast.error(errorMessage);
//                       }
//                     }}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <button
//                 className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
//                 onClick={async () => {
//                   const stamp = await removeCartItem(item.stamp._id);
//                   if(stamp.data){
//                     dispatch(addToCartAction({CartData:stamp.data!,ShippingType:shippingOption}));
//                     toast.success(`${item.stamp.name} is removed from cart`);
//                   }

//                   if (stamp.error) {
//                     const errorMessage = (stamp.error as { data?: { message?: string } })?.data?.message || "Something went wrong";
//                     toast.error(errorMessage);
//                   }
//                 }}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           {/* Shipping Options Section */}
//           <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
//             <h2 className="text-lg font-semibold mb-3">
//               Shipping Options <span className="text-red-500">*</span>
//             </h2>
//             <select
//               value={shippingOption}
//               onChange={handleShippingChange}
//               className={`ml-2 p-1 border ${shippingError ? "border-red-500" : "border-gray-300"} rounded-md`}
//               required
//             >
//               <option value="">Select Shipping Option</option>
//               <option value="us">US Shipping: $5</option>
//               <option value="worldwide">Worldwide Shipping: $25</option>
//             </select>
//             {shippingError && <p className="text-red-500 text-sm mt-1">{shippingError}</p>}
//           </div>

//           {/* Total & Buttons Section */}
//           <div className="mt-4 sm:mt-6 p-4 bg-white shadow-md rounded-lg">
//             <div className="mb-2">
//               <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
//               <p className="text-gray-600">Shipping: ${shippingCost.toFixed(2)}</p>
//               <h2 className="text-lg sm:text-xl font-bold mt-2">Total: ${total.toFixed(2)}</h2>
//             </div>

//             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
//               <button
//                 className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ${!shippingOption ? "opacity-50 cursor-not-allowed" : ""}`}
//                 onClick={handleCheckout}
//                 disabled={!shippingOption}
//               >
//                 Checkout
//               </button>
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//                 onClick={async()=>{
//                   const res = await removeAllCartItem(cart?._id as string);
//                   if(res.data){
//                     dispatch(addToCartAction(null));
//                   }

//                   if (res.error) {
//                     const errorMessage = (res.error as { data?: { message?: string } })?.data?.message || "Something went wrong";
//                     toast.error(errorMessage);
//                   }
//                 }}
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 flex justify-center">
//         <button
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           onClick={() => navigate("/retail-sales")}
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;


// const TinyLoader = () => (
//   <div className="w-3 h-3 border-[2px] border-t-transparent border-r-blue-500 border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>
// );

// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../Redux/Store";
// import {
//   useUpdateCartItemMutation,
//   useRemoveCartItemMutation,
//   useRemoveAllCartItemMutation,
//   useGetShippingRatesQuery
// } from "../../Redux/Api/userApi";
// import { addToCartAction } from "../../Redux/Reducer/cartSlice";
// import { toast } from "react-toastify";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

// const Cart: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();

//   const [UpdateCartItem, { isLoading: l1 }] = useUpdateCartItemMutation();
//   const [selectedShipping, setSelectedShipping] = useState<string>("domestic");
//   const [removeCartItem, { isLoading: l2 }] = useRemoveCartItemMutation();
//   const { data: shippingRatesData, isLoading: shippingLoading } = useGetShippingRatesQuery();
//   console.log("Shipping Rates Data:", shippingRatesData);

//   const [removeAllCartItem, { isLoading: l3 }] = useRemoveAllCartItemMutation();
//   const [clickedButton, setClickedButton] = useState<string>("");
//   const { cart } = useSelector<RootState, CartState>((state) => state.cartSlice);
  


//   // Calculate subtotal directly from items
//   const subtotal = cart
//     ? cart.items.reduce(
//         (sum: number, item: any) => sum + item.stamp.price * item.quantity,
//         0
//       )
//     : 0;

//   // Total will now be handled by Stripe (including shipping)
//   const shippingRate =
//   selectedShipping === "domestic"
//     ? shippingRatesData?.usPrice || 0
//     : shippingRatesData?.internationalPrice || 0;


//   const total = subtotal + shippingRate;


//   const handleCheckout = () => {
//     if (!cart || cart.items.length === 0) {
//       toast.error("Your cart is empty!");
//       return;
//     }

//     // Just send cartId and subtotal to next page — Stripe will calculate shipping
//     navigate("/paymentmethod", {
//   state: { cartId: cart._id, subtotal, shippingType: selectedShipping, shippingRate },
// });

//   };

//   return (
//     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8">
//       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

//       {!cart || cart.items.length === 0 ? (
//         <div className="text-center">
//           <p className="text-gray-600">Your cart is empty.</p>
//         </div>
//       ) : (
//         <div>
//           {(l2 || l3) && <FullscreenLoader />}

//           {cart.items.map((item) => (
//             <div
//               key={item._id}
//               className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4"
//             >
//               <img
//                 src={item.stamp.images[0]?.publicUrl}
//                 alt={item.stamp.name}
//                 className="w-24 h-24 object-contain rounded-lg border border-gray-300"
//               />

//               <div className="flex-1">
//                 <h2 className="text-lg font-semibold">{item.stamp.name}</h2>
//                 <p className="mb-1 sm:mb-2">Price: ${item.stamp.price.toFixed(2)}</p>
//                 <p className="mb-1 sm:mb-2 font-bold">
//                   Total: ${(item.stamp.price * item.quantity).toFixed(2)}
//                 </p>

//                 <div className="flex items-center space-x-2">
//                   <button
//                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
//                     onClick={async () => {
//                       setClickedButton(item.stamp._id);
//                       const stamp = await UpdateCartItem({
//                         stampId: item.stamp._id,
//                         delta: -1,
//                       });

//                       if (stamp.data)
//                         dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));

//                       if (stamp.error) {
//                         const errorMessage =
//                           (stamp.error as { data?: { message?: string } })?.data
//                             ?.message || "Something went wrong";
//                         toast.error(errorMessage);
//                       }
//                     }}
//                   >
//                     -
//                   </button>
//                   {l1 && clickedButton === item.stamp._id ? (
//                     <TinyLoader />
//                   ) : (
//                     <span className="text-lg">{item.quantity}</span>
//                   )}
//                   <button
//                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200 disabled:bg-gray-300"
//                     disabled={item.quantity === item.stamp.stock}
//                     onClick={async () => {
//                       setClickedButton(item.stamp._id);
//                       const stamp = await UpdateCartItem({
//                         stampId: item.stamp._id,
//                         delta: 1,
//                       });

//                       if (stamp.data) {
//                         dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));
//                       }

//                       if (stamp.error) {
//                         const errorMessage =
//                           (stamp.error as { data?: { message?: string } })?.data
//                             ?.message || "Something went wrong";
//                         toast.error(errorMessage);
//                       }
//                     }}
//                   >
//                     +
//                   </button>
//                 </div>
//               </div>

//               <button
//                 className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
//                 onClick={async () => {
//                   const stamp = await removeCartItem(item.stamp._id);
//                   if (stamp.data) {
//                     dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));
//                     toast.success(`${item.stamp.name} removed from cart`);
//                   }

//                   if (stamp.error) {
//                     const errorMessage =
//                       (stamp.error as { data?: { message?: string } })?.data
//                         ?.message || "Something went wrong";
//                     toast.error(errorMessage);
//                   }
//                 }}
//               >
//                 Remove
//               </button>
//             </div>
//           ))}

//           {/* Shipping Options */}
// <div className="mt-4">
//   <h3 className="font-semibold mb-2">Shipping:</h3>

//   {shippingLoading ? (
//     <p>Loading shipping options...</p>
//   ) : (
//     <div className="flex flex-col space-y-2">
//   {shippingRatesData && (
//     <>
//       <label className="flex items-center space-x-2">
//         <input
//           type="radio"
//           name="shipping"
//           value="domestic"
//           checked={selectedShipping === "domestic"}
//           onChange={() => setSelectedShipping("domestic")}
//         />
//         <span>
//           US Shipping — ${shippingRatesData.usPrice.toFixed(2)}
//         </span>
//       </label>
//       <label className="flex items-center space-x-2">
//         <input
//           type="radio"
//           name="shipping"
//           value="international"
//           checked={selectedShipping === "international"}
//           onChange={() => setSelectedShipping("international")}
//         />
//         <span>
//           International Shipping — ${shippingRatesData.internationalPrice.toFixed(2)}
//         </span>
//       </label>
//     </>
//   )}
// </div>
//   )}
// </div>


//           {/* Totals */}
//           <div className="mt-4 sm:mt-6 p-4 bg-white shadow-md rounded-lg">
//             <div className="mb-2">
//               <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
//               <h2 className="text-lg sm:text-xl font-bold mt-2">
//                 Total: ${total.toFixed(2)}
//               </h2>
//             </div>

//             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
//               <button
//                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
//                 onClick={handleCheckout}
//               >
//                 Checkout
//               </button>
//               <button
//                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
//                 onClick={async () => {
//                   const res = await removeAllCartItem(cart._id as string);
//                   if (res.data) {
//                     dispatch(addToCartAction(null));
//                   }

//                   if (res.error) {
//                     const errorMessage =
//                       (res.error as { data?: { message?: string } })?.data
//                         ?.message || "Something went wrong";
//                     toast.error(errorMessage);
//                   }
//                 }}
//               >
//                 Clear Cart
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       <div className="mt-6 flex justify-center">
//         <button
//           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
//           onClick={() => navigate("/retail-sales")}
//         >
//           Continue Shopping
//         </button>
//       </div>
//     </div>
//   );
// };

// export default Cart;

// const TinyLoader = () => (
//   <div className="w-3 h-3 border-[2px] border-t-transparent border-r-blue-500 border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>
// );

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Store";
import {
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useRemoveAllCartItemMutation,
  useGetShippingRatesQuery,
} from "../../Redux/Api/userApi";
import { addToCartAction, updateSelectedCountry } from "../../Redux/Reducer/cartSlice";
import { toast } from "react-toastify";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
import { useGetAllCountriesQuery } from "../../Redux/Api/adminApi";

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch(); 

  const [UpdateCartItem, { isLoading: l1 }] = useUpdateCartItemMutation();
  const [removeCartItem, { isLoading: l2 }] = useRemoveCartItemMutation();
  const [removeAllCartItem, { isLoading: l3 }] = useRemoveAllCartItemMutation();
  const { data: shippingRatesData, isLoading: shippingLoading } = useGetShippingRatesQuery();
  const [clickedButton, setClickedButton] = useState<string>("");

  const { cart } = useSelector((state: RootState) => state.cartSlice as any);


  // Default selections
  const [selectedShipping, setSelectedShipping] = useState<string>("domestic");
  const [selectedCountry, setSelectedCountry] = useState<string>("US");
  const { data: countriesData, isLoading: countriesLoading } = useGetAllCountriesQuery();

   // 👇 CREATE A HANDLER TO UPDATE BOTH LOCAL AND GLOBAL STATE
  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode); // Update local state for the UI
    dispatch(updateSelectedCountry(countryCode)); // Update global Redux store
  };

  // Calculate subtotal
  const subtotal = cart
    ? cart.items.reduce(
        (sum: number, item: any) => sum + item.stamp.price * item.quantity,
        0
      )
    : 0;

  // Determine shipping rate based on selection
  const shippingRate =
    selectedShipping === "domestic"
    ? shippingRatesData?.usPrice || 0
    : shippingRatesData?.internationalPrice || 0;

  const total = subtotal + shippingRate;

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    // ✅ Add validation for country selection
  if (!selectedCountry) {
    toast.error("Please select a country!");
    return;
  }
  
    navigate("/paymentmethod", {
      state: {
        cartId: cart._id,
        subtotal,
        shippingType: selectedShipping,
        shippingRate,
        country: selectedCountry, // ✅ Send selected country to Stripe/payment
      },
    });
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8">
      <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

      {!cart || cart.items.length === 0 ? (
        <div className="text-center">
          <p className="text-gray-600">Your cart is empty.</p>
        </div>
      ) : (
        <div>
          {(l2 || l3) && <FullscreenLoader />}

          {cart.items.map((item: any) => (
            <div
              key={item._id}
              className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4"
            >
              <img
                src={item.stamp.images[0]?.publicUrl}
                alt={item.stamp.name}
                className="w-24 h-24 object-contain rounded-lg border border-gray-300"
              />

              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.stamp.name}</h2>
                <p className="mb-1 sm:mb-2">Price: ${item.stamp.price.toFixed(2)}</p>
                <p className="mb-1 sm:mb-2 font-bold">
                  Total: ${(item.stamp.price * item.quantity).toFixed(2)}
                </p>

                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
                    onClick={async () => {
                      setClickedButton(item.stamp._id);
                      const stamp = await UpdateCartItem({
                        stampId: item.stamp._id,
                        delta: -1,
                      });

                      if (stamp.data)
                        dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));

                      if (stamp.error) {
                        const errorMessage =
                          (stamp.error as { data?: { message?: string } })?.data
                            ?.message || "Something went wrong";
                        toast.error(errorMessage);
                      }
                    }}
                  >
                    -
                  </button>
                  {l1 && clickedButton === item.stamp._id ? (
                    <TinyLoader />
                  ) : (
                    <span className="text-lg">{item.quantity}</span>
                  )}
                  <button
                    className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200 disabled:bg-gray-300"
                    disabled={item.quantity === item.stamp.stock}
                    onClick={async () => {
                      setClickedButton(item.stamp._id);
                      const stamp = await UpdateCartItem({
                        stampId: item.stamp._id,
                        delta: 1,
                      });

                      if (stamp.data) {
                        dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));
                      }

                      if (stamp.error) {
                        const errorMessage =
                          (stamp.error as { data?: { message?: string } })?.data
                            ?.message || "Something went wrong";
                        toast.error(errorMessage);
                      }
                    }}
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                onClick={async () => {
                  const stamp = await removeCartItem(item.stamp._id);
                  if (stamp.data) {
                    dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));
                    toast.success(`${item.stamp.name} removed from cart`);
                  }

                  if (stamp.error) {
                    const errorMessage =
                      (stamp.error as { data?: { message?: string } })?.data
                        ?.message || "Something went wrong";
                    toast.error(errorMessage);
                  }
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* COUNTRY SELECTION */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-2">Select Country:</h3>

            {countriesLoading ? (
  <p>Loading countries...</p>
) : (countriesData?.countries?.length ?? 0) > 0 ? (
  <select
    value={selectedCountry}
    onChange={(e) => handleCountryChange(e.target.value)}
    className="border rounded-lg px-3 py-2 w-full sm:w-1/3"
  >
    {/* ✅ Add placeholder option */}
      <option value="" disabled>
        -- Select a Country --
      </option>
    {countriesData?.countries?.map((country) => (
      <option key={country._id} value={country.code}>
        {country.name} ({country.code})
      </option>
    ))}
  </select>
) : (
  <p>No countries available</p>
)}

          </div>

          

          {/* Shipping Options */}
          <div className="mt-4">
          <h3 className="font-semibold mb-2">Shipping:</h3>

          {shippingLoading ? (
            <p>Loading shipping options...</p>
            ) : (
              shippingRatesData && (
                <div className="flex flex-col space-y-2">
                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="shipping"
                    value="domestic"
                    checked={selectedShipping === "domestic"}
                    onChange={() => setSelectedShipping("domestic")}
                  />
                  <span>
                    US Shipping — ${shippingRatesData.usPrice.toFixed(2)}
                  </span>
                </label>

                <label className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="shipping"
                    value="international"
                    checked={selectedShipping === "international"}
                    onChange={() => setSelectedShipping("international")}
                  />
                  <span>
                    International Shipping — ${shippingRatesData.internationalPrice.toFixed(2)}
                  </span>
                </label>
              </div>
            )
          )}
        </div>
          {/* Totals */}
          <div className="mt-4 sm:mt-6 p-4 bg-white shadow-md rounded-lg">
            <div className="mb-2">
              <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
              <h2 className="text-lg sm:text-xl font-bold mt-2">
                Total: ${total.toFixed(2)}
              </h2>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                onClick={handleCheckout}
              >
                Checkout
              </button>
              <button
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                onClick={async () => {
                  const res = await removeAllCartItem(cart._id as string);
                  if (res.data) {
                    dispatch(addToCartAction(null));
                  }

                  if (res.error) {
                    const errorMessage =
                      (res.error as { data?: { message?: string } })?.data
                        ?.message || "Something went wrong";
                    toast.error(errorMessage);
                  }
                }}
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          onClick={() => navigate("/retail-sales")}
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default Cart;

const TinyLoader = () => (
  <div className="w-3 h-3 border-[2px] border-t-transparent border-r-blue-500 border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>
);
