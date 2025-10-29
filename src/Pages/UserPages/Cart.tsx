// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector } from "react-redux";
// // import { RootState } from "../../Redux/Store";
// // import { useDispatch } from "react-redux";
// // import { useUpdateCartItemMutation,useRemoveCartItemMutation, useRemoveAllCartItemMutation } from "../../Redux/Api/userApi";
// // import { addToCartAction } from "../../Redux/Reducer/cartSlice";
// // import { toast } from "react-toastify";
// // import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

// // const Cart: React.FC = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();
// //   const [shippingOption, setShippingOption] = useState<string>("");
// //   const [shippingCost, setShippingCost] = useState<number>(0);
// //   const [shippingError, setShippingError] = useState<string>("");
// //   const [UpdateCartItem,{isLoading:l1}] = useUpdateCartItemMutation();
// //   const [removeCartItem,{isLoading:l2}] = useRemoveCartItemMutation();
// //   const [removeAllCartItem,{isLoading:l3}] = useRemoveAllCartItemMutation();
// //   const [clickedButton,setClickedButton] = useState<string>("");
// //   const { cart } = useSelector<RootState,CartState>((state) => state.cartSlice);

// //   // Calculate subtotal
// //   const subtotal = cart ? cart?.items.reduce((sum: number, item: any) => sum + item.stamp.price * item.quantity,0) : 0 ;

// //   const total = subtotal + shippingCost;

// //   const handleShippingChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// //     const option = e.target.value;
// //     setShippingOption(option);
// //     setShippingError("");
// //     dispatch(addToCartAction({CartData:cart!,ShippingType:option}));
// //     switch (option) {
// //       case "us":
// //         setShippingCost(5);
// //         break;
// //       case "worldwide":
// //         setShippingCost(25);
// //         break;
// //       default:
// //         setShippingCost(0);
// //     }
// //   };

// //   const handleCheckout = () => {
// //     if (!shippingOption) {
// //       setShippingError("Please select a shipping option");
// //       return;
// //     }
// //     navigate("/paymentmethod", { state: { cart, total, shippingOption } });
// //   };

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8">
// //       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

// //       {(cart?.items.length === 0 || cart?.items == null) ? (
// //         <div className="text-center">
// //           <p className="text-gray-600">Your cart is empty.</p>
// //         </div>
// //       ) : (
// //         <div>
// //           {( l2 || l3 ) && <FullscreenLoader/>}
// //           {cart?.items.map((item) => (
// //             <div key={item._id} className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4">
// //               <img
// //                 src={item.stamp.images[0]?.publicUrl}
// //                 alt={item.stamp.name}
// //                 className="w-24 h-24 object-contain rounded-lg border border-gray-300"
// //               />

// //               <div className="flex-1">
// //                 <h2 className="text-lg font-semibold">{item.stamp.name}</h2>
// //                 <p className="mb-1 sm:mb-2">Price: ${item.stamp.price.toFixed(2)}</p>
// //                 <p className="mb-1 sm:mb-2 font-bold">Total: ${(item.stamp.price * item.quantity).toFixed(2)}</p>

// //                 <div className="flex items-center space-x-2">
// //                   <button
// //                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
// //                     onClick={async()=>{
// //                       setClickedButton(item.stamp._id);
// //                       const stamp = await UpdateCartItem({stampId:item.stamp._id,delta:-1});
// //                       if(stamp.data)
// //                         dispatch(addToCartAction({CartData:stamp.data!,ShippingType:shippingOption}));
                        
// //                        if (stamp.error) {
// //                             const errorMessage = (stamp.error as { data?: { message?: string } })?.data?.message || "Something went wrong";
// //                             toast.error(errorMessage);
// //                           }
// //                     }}
// //                   >
// //                     -
// //                   </button>
// //                   {(l1 && (clickedButton == item.stamp._id)) ? <TinyLoader/> : <span className="text-lg">{item.quantity}</span>}
// //                   <button
// //                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200 disabled:bg-gray-300"
// //                     disabled = {item.quantity == item.stamp.stock}
// //                     onClick={async()=>{
// //                       setClickedButton(item.stamp._id);
// //                       const stamp = await UpdateCartItem({stampId:item.stamp._id,delta:1});
// //                       if(stamp.data){
// //                         dispatch(addToCartAction({CartData:stamp.data!,ShippingType:shippingOption}));
// //                       }


// //                       if (stamp.error) {
// //                         const errorMessage = (stamp.error as { data?: { message?: string } })?.data?.message || "Something went wrong";
// //                         toast.error(errorMessage);
// //                       }
// //                     }}
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //               </div>

// //               <button
// //                 className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
// //                 onClick={async () => {
// //                   const stamp = await removeCartItem(item.stamp._id);
// //                   if(stamp.data){
// //                     dispatch(addToCartAction({CartData:stamp.data!,ShippingType:shippingOption}));
// //                     toast.success(`${item.stamp.name} is removed from cart`);
// //                   }

// //                   if (stamp.error) {
// //                     const errorMessage = (stamp.error as { data?: { message?: string } })?.data?.message || "Something went wrong";
// //                     toast.error(errorMessage);
// //                   }
// //                 }}
// //               >
// //                 Remove
// //               </button>
// //             </div>
// //           ))}

// //           {/* Shipping Options Section */}
// //           <div className="mt-6 p-4 bg-white shadow-md rounded-lg">
// //             <h2 className="text-lg font-semibold mb-3">
// //               Shipping Options <span className="text-red-500">*</span>
// //             </h2>
// //             <select
// //               value={shippingOption}
// //               onChange={handleShippingChange}
// //               className={`ml-2 p-1 border ${shippingError ? "border-red-500" : "border-gray-300"} rounded-md`}
// //               required
// //             >
// //               <option value="">Select Shipping Option</option>
// //               <option value="us">US Shipping: $5</option>
// //               <option value="worldwide">Worldwide Shipping: $25</option>
// //             </select>
// //             {shippingError && <p className="text-red-500 text-sm mt-1">{shippingError}</p>}
// //           </div>

// //           {/* Total & Buttons Section */}
// //           <div className="mt-4 sm:mt-6 p-4 bg-white shadow-md rounded-lg">
// //             <div className="mb-2">
// //               <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
// //               <p className="text-gray-600">Shipping: ${shippingCost.toFixed(2)}</p>
// //               <h2 className="text-lg sm:text-xl font-bold mt-2">Total: ${total.toFixed(2)}</h2>
// //             </div>

// //             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
// //               <button
// //                 className={`bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 ${!shippingOption ? "opacity-50 cursor-not-allowed" : ""}`}
// //                 onClick={handleCheckout}
// //                 disabled={!shippingOption}
// //               >
// //                 Checkout
// //               </button>
// //               <button
// //                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
// //                 onClick={async()=>{
// //                   const res = await removeAllCartItem(cart?._id as string);
// //                   if(res.data){
// //                     dispatch(addToCartAction(null));
// //                   }

// //                   if (res.error) {
// //                     const errorMessage = (res.error as { data?: { message?: string } })?.data?.message || "Something went wrong";
// //                     toast.error(errorMessage);
// //                   }
// //                 }}
// //               >
// //                 Clear Cart
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div className="mt-6 flex justify-center">
// //         <button
// //           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
// //           onClick={() => navigate("/retail-sales")}
// //         >
// //           Continue Shopping
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Cart;


// // const TinyLoader = () => (
// //   <div className="w-3 h-3 border-[2px] border-t-transparent border-r-blue-500 border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>
// // );

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import { RootState } from "../../Redux/Store";
// // import {
// //   useUpdateCartItemMutation,
// //   useRemoveCartItemMutation,
// //   useRemoveAllCartItemMutation,
// //   useGetShippingRatesQuery
// // } from "../../Redux/Api/userApi";
// // import { addToCartAction } from "../../Redux/Reducer/cartSlice";
// // import { toast } from "react-toastify";
// // import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

// // const Cart: React.FC = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch();

// //   const [UpdateCartItem, { isLoading: l1 }] = useUpdateCartItemMutation();
// //   const [selectedShipping, setSelectedShipping] = useState<string>("domestic");
// //   const [removeCartItem, { isLoading: l2 }] = useRemoveCartItemMutation();
// //   const { data: shippingRatesData, isLoading: shippingLoading } = useGetShippingRatesQuery();
// //   console.log("Shipping Rates Data:", shippingRatesData);

// //   const [removeAllCartItem, { isLoading: l3 }] = useRemoveAllCartItemMutation();
// //   const [clickedButton, setClickedButton] = useState<string>("");
// //   const { cart } = useSelector<RootState, CartState>((state) => state.cartSlice);
  


// //   // Calculate subtotal directly from items
// //   const subtotal = cart
// //     ? cart.items.reduce(
// //         (sum: number, item: any) => sum + item.stamp.price * item.quantity,
// //         0
// //       )
// //     : 0;

// //   // Total will now be handled by Stripe (including shipping)
// //   const shippingRate =
// //   selectedShipping === "domestic"
// //     ? shippingRatesData?.usPrice || 0
// //     : shippingRatesData?.internationalPrice || 0;


// //   const total = subtotal + shippingRate;


// //   const handleCheckout = () => {
// //     if (!cart || cart.items.length === 0) {
// //       toast.error("Your cart is empty!");
// //       return;
// //     }

// //     // Just send cartId and subtotal to next page — Stripe will calculate shipping
// //     navigate("/paymentmethod", {
// //   state: { cartId: cart._id, subtotal, shippingType: selectedShipping, shippingRate },
// // });

// //   };

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8">
// //       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

// //       {!cart || cart.items.length === 0 ? (
// //         <div className="text-center">
// //           <p className="text-gray-600">Your cart is empty.</p>
// //         </div>
// //       ) : (
// //         <div>
// //           {(l2 || l3) && <FullscreenLoader />}

// //           {cart.items.map((item) => (
// //             <div
// //               key={item._id}
// //               className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4"
// //             >
// //               <img
// //                 src={item.stamp.images[0]?.publicUrl}
// //                 alt={item.stamp.name}
// //                 className="w-24 h-24 object-contain rounded-lg border border-gray-300"
// //               />

// //               <div className="flex-1">
// //                 <h2 className="text-lg font-semibold">{item.stamp.name}</h2>
// //                 <p className="mb-1 sm:mb-2">Price: ${item.stamp.price.toFixed(2)}</p>
// //                 <p className="mb-1 sm:mb-2 font-bold">
// //                   Total: ${(item.stamp.price * item.quantity).toFixed(2)}
// //                 </p>

// //                 <div className="flex items-center space-x-2">
// //                   <button
// //                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
// //                     onClick={async () => {
// //                       setClickedButton(item.stamp._id);
// //                       const stamp = await UpdateCartItem({
// //                         stampId: item.stamp._id,
// //                         delta: -1,
// //                       });

// //                       if (stamp.data)
// //                         dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));

// //                       if (stamp.error) {
// //                         const errorMessage =
// //                           (stamp.error as { data?: { message?: string } })?.data
// //                             ?.message || "Something went wrong";
// //                         toast.error(errorMessage);
// //                       }
// //                     }}
// //                   >
// //                     -
// //                   </button>
// //                   {l1 && clickedButton === item.stamp._id ? (
// //                     <TinyLoader />
// //                   ) : (
// //                     <span className="text-lg">{item.quantity}</span>
// //                   )}
// //                   <button
// //                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200 disabled:bg-gray-300"
// //                     disabled={item.quantity === item.stamp.stock}
// //                     onClick={async () => {
// //                       setClickedButton(item.stamp._id);
// //                       const stamp = await UpdateCartItem({
// //                         stampId: item.stamp._id,
// //                         delta: 1,
// //                       });

// //                       if (stamp.data) {
// //                         dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));
// //                       }

// //                       if (stamp.error) {
// //                         const errorMessage =
// //                           (stamp.error as { data?: { message?: string } })?.data
// //                             ?.message || "Something went wrong";
// //                         toast.error(errorMessage);
// //                       }
// //                     }}
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //               </div>

// //               <button
// //                 className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
// //                 onClick={async () => {
// //                   const stamp = await removeCartItem(item.stamp._id);
// //                   if (stamp.data) {
// //                     dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));
// //                     toast.success(`${item.stamp.name} removed from cart`);
// //                   }

// //                   if (stamp.error) {
// //                     const errorMessage =
// //                       (stamp.error as { data?: { message?: string } })?.data
// //                         ?.message || "Something went wrong";
// //                     toast.error(errorMessage);
// //                   }
// //                 }}
// //               >
// //                 Remove
// //               </button>
// //             </div>
// //           ))}

// //           {/* Shipping Options */}
// // <div className="mt-4">
// //   <h3 className="font-semibold mb-2">Shipping:</h3>

// //   {shippingLoading ? (
// //     <p>Loading shipping options...</p>
// //   ) : (
// //     <div className="flex flex-col space-y-2">
// //   {shippingRatesData && (
// //     <>
// //       <label className="flex items-center space-x-2">
// //         <input
// //           type="radio"
// //           name="shipping"
// //           value="domestic"
// //           checked={selectedShipping === "domestic"}
// //           onChange={() => setSelectedShipping("domestic")}
// //         />
// //         <span>
// //           US Shipping — ${shippingRatesData.usPrice.toFixed(2)}
// //         </span>
// //       </label>
// //       <label className="flex items-center space-x-2">
// //         <input
// //           type="radio"
// //           name="shipping"
// //           value="international"
// //           checked={selectedShipping === "international"}
// //           onChange={() => setSelectedShipping("international")}
// //         />
// //         <span>
// //           International Shipping — ${shippingRatesData.internationalPrice.toFixed(2)}
// //         </span>
// //       </label>
// //     </>
// //   )}
// // </div>
// //   )}
// // </div>


// //           {/* Totals */}
// //           <div className="mt-4 sm:mt-6 p-4 bg-white shadow-md rounded-lg">
// //             <div className="mb-2">
// //               <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
// //               <h2 className="text-lg sm:text-xl font-bold mt-2">
// //                 Total: ${total.toFixed(2)}
// //               </h2>
// //             </div>

// //             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
// //               <button
// //                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
// //                 onClick={handleCheckout}
// //               >
// //                 Checkout
// //               </button>
// //               <button
// //                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
// //                 onClick={async () => {
// //                   const res = await removeAllCartItem(cart._id as string);
// //                   if (res.data) {
// //                     dispatch(addToCartAction(null));
// //                   }

// //                   if (res.error) {
// //                     const errorMessage =
// //                       (res.error as { data?: { message?: string } })?.data
// //                         ?.message || "Something went wrong";
// //                     toast.error(errorMessage);
// //                   }
// //                 }}
// //               >
// //                 Clear Cart
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div className="mt-6 flex justify-center">
// //         <button
// //           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
// //           onClick={() => navigate("/retail-sales")}
// //         >
// //           Continue Shopping
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Cart;

// // const TinyLoader = () => (
// //   <div className="w-3 h-3 border-[2px] border-t-transparent border-r-blue-500 border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>
// // );

// // import React, { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useSelector, useDispatch } from "react-redux";
// // import { RootState } from "../../Redux/Store";
// // import {
// //   useUpdateCartItemMutation,
// //   useRemoveCartItemMutation,
// //   useRemoveAllCartItemMutation,
// //   useGetShippingRatesQuery,
// // } from "../../Redux/Api/userApi";
// // import { addToCartAction, updateSelectedCountry } from "../../Redux/Reducer/cartSlice";
// // import { toast } from "react-toastify";
// // import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
// // import { useGetAllCountriesQuery } from "../../Redux/Api/adminApi";

// // const Cart: React.FC = () => {
// //   const navigate = useNavigate();
// //   const dispatch = useDispatch(); 

// //   const [UpdateCartItem, { isLoading: l1 }] = useUpdateCartItemMutation();
// //   const [removeCartItem, { isLoading: l2 }] = useRemoveCartItemMutation();
// //   const [removeAllCartItem, { isLoading: l3 }] = useRemoveAllCartItemMutation();
// //   const { data: shippingRatesData, isLoading: shippingLoading } = useGetShippingRatesQuery();
// //   const [clickedButton, setClickedButton] = useState<string>("");

// //   const { cart } = useSelector((state: RootState) => state.cartSlice as any);


// //   // Default selections
// //   const [selectedShipping, setSelectedShipping] = useState<string>("domestic");
// //   const [selectedCountry, setSelectedCountry] = useState<string>("US");
// //   const { data: countriesData, isLoading: countriesLoading } = useGetAllCountriesQuery();

// //    // 👇 CREATE A HANDLER TO UPDATE BOTH LOCAL AND GLOBAL STATE
// //   const handleCountryChange = (countryCode: string) => {
// //     setSelectedCountry(countryCode); // Update local state for the UI
// //     dispatch(updateSelectedCountry(countryCode)); // Update global Redux store
// //   };

  
// //   // Calculate subtotal
// //   const subtotal = cart
// //     ? cart.items.reduce(
// //         (sum: number, item: any) => sum + item.stamp.price * item.quantity,
// //         0
// //       )
// //     : 0;

// //   // Determine shipping rate based on selection
// //   const shippingRate =
// //     selectedShipping === "domestic"
// //     ? shippingRatesData?.usPrice || 0
// //     : shippingRatesData?.internationalPrice || 0;

// //   const total = subtotal + shippingRate;

// //   const handleCheckout = () => {
// //     if (!cart || cart.items.length === 0) {
// //       toast.error("Your cart is empty!");
// //       return;
// //     }

// //     // ✅ Add validation for country selection
// //   if (!selectedCountry) {
// //     toast.error("Please select a country!");
// //     return;
// //   }
  
// //     navigate("/paymentmethod", {
// //       state: {
// //         cartId: cart._id,
// //         subtotal,
// //         shippingType: selectedShipping,
// //         shippingRate,
// //         country: selectedCountry, // ✅ Send selected country to Stripe/payment
// //       },
// //     });
// //   };

// //   return (
// //     <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8">
// //       <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6">Shopping Cart</h1>

// //       {!cart || cart.items.length === 0 ? (
// //         <div className="text-center">
// //           <p className="text-gray-600">Your cart is empty.</p>
// //         </div>
// //       ) : (
// //         <div>
// //           {(l2 || l3) && <FullscreenLoader />}

// //           {cart.items.map((item: any) => (
// //             <div
// //               key={item._id}
// //               className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4"
// //             >
// //               <img
// //                 src={item.stamp.images[0]?.publicUrl}
// //                 alt={item.stamp.name}
// //                 className="w-24 h-24 object-contain rounded-lg border border-gray-300"
// //               />

// //               <div className="flex-1">
// //                 <h2 className="text-lg font-semibold">{item.stamp.name}</h2>
// //                 <p className="mb-1 sm:mb-2">Price: ${item.stamp.price.toFixed(2)}</p>
// //                 <p className="mb-1 sm:mb-2 font-bold">
// //                   Total: ${(item.stamp.price * item.quantity).toFixed(2)}
// //                 </p>

// //                 <div className="flex items-center space-x-2">
// //                   <button
// //                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200"
// //                     onClick={async () => {
// //                       setClickedButton(item.stamp._id);
// //                       const stamp = await UpdateCartItem({
// //                         stampId: item.stamp._id,
// //                         delta: -1,
// //                       });

// //                       if (stamp.data)
// //                         dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));

// //                       if (stamp.error) {
// //                         const errorMessage =
// //                           (stamp.error as { data?: { message?: string } })?.data
// //                             ?.message || "Something went wrong";
// //                         toast.error(errorMessage);
// //                       }
// //                     }}
// //                   >
// //                     -
// //                   </button>
// //                   {l1 && clickedButton === item.stamp._id ? (
// //                     <TinyLoader />
// //                   ) : (
// //                     <span className="text-lg">{item.quantity}</span>
// //                   )}
// //                   <button
// //                     className="px-3 py-1 border border-gray-500 rounded hover:bg-gray-200 disabled:bg-gray-300"
// //                     disabled={item.quantity === item.stamp.stock}
// //                     onClick={async () => {
// //                       setClickedButton(item.stamp._id);
// //                       const stamp = await UpdateCartItem({
// //                         stampId: item.stamp._id,
// //                         delta: 1,
// //                       });

// //                       if (stamp.data) {
// //                         dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));
// //                       }

// //                       if (stamp.error) {
// //                         const errorMessage =
// //                           (stamp.error as { data?: { message?: string } })?.data
// //                             ?.message || "Something went wrong";
// //                         toast.error(errorMessage);
// //                       }
// //                     }}
// //                   >
// //                     +
// //                   </button>
// //                 </div>
// //               </div>

// //               <button
// //                 className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
// //                 onClick={async () => {
// //                   const stamp = await removeCartItem(item.stamp._id);
// //                   if (stamp.data) {
// //                     dispatch(addToCartAction({ CartData: stamp.data!, ShippingType: "" }));
// //                     toast.success(`${item.stamp.name} removed from cart`);
// //                   }

// //                   if (stamp.error) {
// //                     const errorMessage =
// //                       (stamp.error as { data?: { message?: string } })?.data
// //                         ?.message || "Something went wrong";
// //                     toast.error(errorMessage);
// //                   }
// //                 }}
// //               >
// //                 Remove
// //               </button>
// //             </div>
// //           ))}

// //           {/* COUNTRY SELECTION */}
// //           <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
// //             <h3 className="font-semibold mb-2">Select Country:</h3>

// //             {countriesLoading ? (
// //   <p>Loading countries...</p>
// // ) : (countriesData?.countries?.length ?? 0) > 0 ? (
// //   <select
// //     value={selectedCountry}
// //     onChange={(e) => handleCountryChange(e.target.value)}
// //     className="border rounded-lg px-3 py-2 w-full sm:w-1/3"
// //   >
// //     {/* ✅ Add placeholder option */}
// //       <option value="" disabled>
// //         -- Select a Country --
// //       </option>
// //     {countriesData?.countries?.map((country) => (
// //       <option key={country._id} value={country.code}>
// //         {country.name} ({country.code})
// //       </option>
// //     ))}
// //   </select>
// // ) : (
// //   <p>No countries available</p>
// // )}

// //           </div>

          

// //           {/* Shipping Options */}
// //           <div className="mt-4">
// //           <h3 className="font-semibold mb-2">Shipping:</h3>

// //           {shippingLoading ? (
// //             <p>Loading shipping options...</p>
// //             ) : (
// //               shippingRatesData && (
// //                 <div className="flex flex-col space-y-2">
// //                 <label className="flex items-center space-x-2">
// //                   <input
// //                     type="radio"
// //                     name="shipping"
// //                     value="domestic"
// //                     checked={selectedShipping === "domestic"}
// //                     onChange={() => setSelectedShipping("domestic")}
// //                   />
// //                   <span>
// //                     US Shipping — ${shippingRatesData.usPrice.toFixed(2)}
// //                   </span>
// //                 </label>

// //                 <label className="flex items-center space-x-2">
// //                   <input
// //                     type="radio"
// //                     name="shipping"
// //                     value="international"
// //                     checked={selectedShipping === "international"}
// //                     onChange={() => setSelectedShipping("international")}
// //                   />
// //                   <span>
// //                     International Shipping — ${shippingRatesData.internationalPrice.toFixed(2)}
// //                   </span>
// //                 </label>
// //               </div>
// //             )
// //           )}
// //         </div>
// //           {/* Totals */}
// //           <div className="mt-4 sm:mt-6 p-4 bg-white shadow-md rounded-lg">
// //             <div className="mb-2">
// //               <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
// //               <h2 className="text-lg sm:text-xl font-bold mt-2">
// //                 Total: ${total.toFixed(2)}
// //               </h2>
// //             </div>

// //             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-4">
// //               <button
// //                 className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
// //                 onClick={handleCheckout}
// //               >
// //                 Checkout
// //               </button>
// //               <button
// //                 className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
// //                 onClick={async () => {
// //                   const res = await removeAllCartItem(cart._id as string);
// //                   if (res.data) {
// //                     dispatch(addToCartAction(null));
// //                   }

// //                   if (res.error) {
// //                     const errorMessage =
// //                       (res.error as { data?: { message?: string } })?.data
// //                         ?.message || "Something went wrong";
// //                     toast.error(errorMessage);
// //                   }
// //                 }}
// //               >
// //                 Clear Cart
// //               </button>
// //             </div>
// //           </div>
// //         </div>
// //       )}

// //       <div className="mt-6 flex justify-center">
// //         <button
// //           className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
// //           onClick={() => navigate("/retail-sales")}
// //         >
// //           Continue Shopping
// //         </button>
// //       </div>
// //     </div>
// //   );
// // };

// // export default Cart;

// // const TinyLoader = () => (
// //   <div className="w-3 h-3 border-[2px] border-t-transparent border-r-blue-500 border-b-transparent border-l-blue-500 rounded-full animate-spin"></div>
// // );

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../Redux/Store";
// import {
//   useUpdateCartItemMutation,
//   useRemoveCartItemMutation,
//   useRemoveAllCartItemMutation,
//   useGetShippingRatesQuery,
// } from "../../Redux/Api/userApi";
// import { 
//   addToCartAction, 
//   updateSelectedCountry,
//   updateShippingRate // ✅ Import new action
// } from "../../Redux/Reducer/cartSlice";
// import { toast } from "react-toastify";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
// import { useGetAllCountriesQuery } from "../../Redux/Api/adminApi";

// const Cart: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch(); 

//   const [UpdateCartItem, { isLoading: l1 }] = useUpdateCartItemMutation();
//   const [removeCartItem, { isLoading: l2 }] = useRemoveCartItemMutation();
//   const [removeAllCartItem, { isLoading: l3 }] = useRemoveAllCartItemMutation();
//   const { data: shippingRatesData, isLoading: shippingLoading } = useGetShippingRatesQuery();
//   const [clickedButton, setClickedButton] = useState<string>("");

//   const { cart } = useSelector((state: RootState) => state.cartSlice as any);

//   // Default selections
//   const [selectedShipping, setSelectedShipping] = useState<string>("domestic");
//   const [selectedCountry, setSelectedCountry] = useState<string>("US");
//   const { data: countriesData, isLoading: countriesLoading } = useGetAllCountriesQuery();

//   // ✅ Handler to update country in both local and Redux state
//   const handleCountryChange = (countryCode: string) => {
//     setSelectedCountry(countryCode);
//     dispatch(updateSelectedCountry(countryCode));
//   };

//   // ✅ Handler to update shipping type and rate
//   const handleShippingChange = (shippingType: "domestic" | "international") => {
//     setSelectedShipping(shippingType);
    
//     // Calculate the rate based on selection
//     const rate = shippingType === "domestic"
//       ? shippingRatesData?.usPrice || 0
//       : shippingRatesData?.internationalPrice || 0;
    
//     // Update Redux with the new rate
//     dispatch(updateShippingRate(rate));
//   };

//   // Calculate subtotal
//   const subtotal = cart
//     ? cart.items.reduce(
//         (sum: number, item: any) => sum + item.stamp.price * item.quantity,
//         0
//       )
//     : 0;

//   // Determine shipping rate based on selection
//   const shippingRate =
//     selectedShipping === "domestic"
//       ? shippingRatesData?.usPrice || 0
//       : shippingRatesData?.internationalPrice || 0;

//   const total = subtotal + shippingRate;

//   // ✅ Update Redux whenever shippingRate changes
//   useEffect(() => {
//     if (shippingRate > 0) {
//       dispatch(updateShippingRate(shippingRate));
//     }
//   }, [shippingRate, dispatch]);

//   // ✅ Initialize shipping rate when data loads
//   useEffect(() => {
//     if (shippingRatesData && selectedShipping === "domestic") {
//       dispatch(updateShippingRate(shippingRatesData.usPrice));
//     } else if (shippingRatesData && selectedShipping === "international") {
//       dispatch(updateShippingRate(shippingRatesData.internationalPrice));
//     }
//   }, [shippingRatesData, selectedShipping, dispatch]);

//   const handleCheckout = () => {
//     if (!cart || cart.items.length === 0) {
//       toast.error("Your cart is empty!");
//       return;
//     }

//     if (!selectedCountry) {
//       toast.error("Please select a country!");
//       return;
//     }

//     // ✅ Validate shipping rate is loaded
//     if (!shippingRate || shippingRate === 0) {
//       toast.error("Please wait for shipping rates to load");
//       return;
//     }

//     // ✅ Update Redux one final time before navigation
//     dispatch(updateShippingRate(shippingRate));
//     dispatch(updateSelectedCountry(selectedCountry));

//     // Navigate to payment method (Redux will have all the data)
//     navigate("/paymentmethod");
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

//           {cart.items.map((item: any) => (
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

//           {/* COUNTRY SELECTION */}
//           <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-2">Select Country:</h3>

//             {countriesLoading ? (
//               <p>Loading countries...</p>
//             ) : (countriesData?.countries?.length ?? 0) > 0 ? (
//               <select
//                 value={selectedCountry}
//                 onChange={(e) => handleCountryChange(e.target.value)}
//                 className="border rounded-lg px-3 py-2 w-full sm:w-1/3"
//               >
//                 <option value="" disabled>
//                   -- Select a Country --
//                 </option>
//                 {countriesData?.countries?.map((country) => (
//                   <option key={country._id} value={country.code}>
//                     {country.name} ({country.code})
//                   </option>
//                 ))}
//               </select>
//             ) : (
//               <p>No countries available</p>
//             )}
//           </div>

//           {/* Shipping Options */}
//           <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-2">Shipping:</h3>

//             {shippingLoading ? (
//               <p>Loading shipping options...</p>
//             ) : shippingRatesData ? (
//               <div className="flex flex-col space-y-2">
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="shipping"
//                     value="domestic"
//                     checked={selectedShipping === "domestic"}
//                     onChange={() => handleShippingChange("domestic")} // ✅ Use new handler
//                   />
//                   <span>
//                     US Shipping — ${shippingRatesData.usPrice.toFixed(2)}
//                   </span>
//                 </label>

//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="shipping"
//                     value="international"
//                     checked={selectedShipping === "international"}
//                     onChange={() => handleShippingChange("international")} // ✅ Use new handler
//                   />
//                   <span>
//                     International Shipping — ${shippingRatesData.internationalPrice.toFixed(2)}
//                   </span>
//                 </label>
//               </div>
//             ) : (
//               <p>Unable to load shipping rates</p>
//             )}
//           </div>

//           {/* Totals */}
//           <div className="mt-4 sm:mt-6 p-4 bg-white shadow-md rounded-lg">
//             <div className="mb-2">
//               <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
//               <p className="text-gray-600">Shipping: ${shippingRate.toFixed(2)}</p>
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

// import React, { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../Redux/Store";
// import {
//   useUpdateCartItemMutation,
//   useRemoveCartItemMutation,
//   useRemoveAllCartItemMutation,
//   useGetShippingRatesQuery,
// } from "../../Redux/Api/userApi";
// import { 
//   addToCartAction, 
//   updateSelectedCountry,
//   updateShippingRate
// } from "../../Redux/Reducer/cartSlice";
// import { toast } from "react-toastify";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
// import { useCountries } from 'react-select-country-list';

// const Cart: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Get countries from the library
//   const countries = useCountries();

//   const [UpdateCartItem, { isLoading: l1 }] = useUpdateCartItemMutation();
//   const [removeCartItem, { isLoading: l2 }] = useRemoveCartItemMutation();
//   const [removeAllCartItem, { isLoading: l3 }] = useRemoveAllCartItemMutation();
//   const { data: shippingRatesData, isLoading: shippingLoading } = useGetShippingRatesQuery();
//   const [clickedButton, setClickedButton] = useState<string>("");

//   const { cart } = useSelector((state: RootState) => state.cartSlice as any);

//   // Default selections
//   const [selectedShipping, setSelectedShipping] = useState<string>("domestic");
//   const [selectedCountry, setSelectedCountry] = useState<string>("US");

//   // Handler to update country in both local and Redux state
//   const handleCountryChange = (countryCode: string) => {
//     setSelectedCountry(countryCode);
//     dispatch(updateSelectedCountry(countryCode));
//   };

//   // Handler to update shipping type and rate
//   const handleShippingChange = (shippingType: "domestic" | "international") => {
//     setSelectedShipping(shippingType);
    
//     // Calculate the rate based on selection
//     const rate = shippingType === "domestic"
//       ? shippingRatesData?.usPrice || 0
//       : shippingRatesData?.internationalPrice || 0;
    
//     // Update Redux with the new rate
//     dispatch(updateShippingRate(rate));
//   };

//   // Calculate subtotal
//   const subtotal = cart
//     ? cart.items.reduce(
//         (sum: number, item: any) => sum + item.stamp.price * item.quantity,
//         0
//       )
//     : 0;

//   // Determine shipping rate based on selection
//   const shippingRate =
//     selectedShipping === "domestic"
//       ? shippingRatesData?.usPrice || 0
//       : shippingRatesData?.internationalPrice || 0;

//   const total = subtotal + shippingRate;

//   // Update Redux whenever shippingRate changes
//   useEffect(() => {
//     if (shippingRate > 0) {
//       dispatch(updateShippingRate(shippingRate));
//     }
//   }, [shippingRate, dispatch]);

//   // Initialize shipping rate when data loads
//   useEffect(() => {
//     if (shippingRatesData && selectedShipping === "domestic") {
//       dispatch(updateShippingRate(shippingRatesData.usPrice));
//     } else if (shippingRatesData && selectedShipping === "international") {
//       dispatch(updateShippingRate(shippingRatesData.internationalPrice));
//     }
//   }, [shippingRatesData, selectedShipping, dispatch]);

//   const handleCheckout = () => {
//     if (!cart || cart.items.length === 0) {
//       toast.error("Your cart is empty!");
//       return;
//     }

//     if (!selectedCountry) {
//       toast.error("Please select a country!");
//       return;
//     }

//     // Validate shipping rate is loaded
//     if (!shippingRate || shippingRate === 0) {
//       toast.error("Please wait for shipping rates to load");
//       return;
//     }

//     // Update Redux one final time before navigation
//     dispatch(updateShippingRate(shippingRate));
//     dispatch(updateSelectedCountry(selectedCountry));

//     // Navigate to payment method (Redux will have all the data)
//     navigate("/paymentmethod");
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

//           {cart.items.map((item: any) => (
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

//           {/* COUNTRY SELECTION */}
//           <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-2">Select Country:</h3>
//             <select
//               value={selectedCountry}
//               onChange={(e) => handleCountryChange(e.target.value)}
//               className="border rounded-lg px-3 py-2 w-full sm:w-1/2"
//             >
//               <option value="" disabled>
//                 -- Select a Country --
//               </option>
//               {countries.map((country) => (
//                 <option key={country.value} value={country.value}>
//                   {country.label}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Shipping Options */}
//           <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-2">Shipping:</h3>

//             {shippingLoading ? (
//               <p>Loading shipping options...</p>
//             ) : shippingRatesData ? (
//               <div className="flex flex-col space-y-2">
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="shipping"
//                     value="domestic"
//                     checked={selectedShipping === "domestic"}
//                     onChange={() => handleShippingChange("domestic")}
//                   />
//                   <span>
//                     US Shipping — ${shippingRatesData.usPrice.toFixed(2)}
//                   </span>
//                 </label>

//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="shipping"
//                     value="international"
//                     checked={selectedShipping === "international"}
//                     onChange={() => handleShippingChange("international")}
//                   />
//                   <span>
//                     International Shipping — ${shippingRatesData.internationalPrice.toFixed(2)}
//                   </span>
//                 </label>
//               </div>
//             ) : (
//               <p>Unable to load shipping rates</p>
//             )}
//           </div>

//           {/* Totals */}
//           <div className="mt-4 sm:mt-6 p-4 bg-white shadow-md rounded-lg">
//             <div className="mb-2">
//               <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
//               <p className="text-gray-600">Shipping: ${shippingRate.toFixed(2)}</p>
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

// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../Redux/Store";
// import {
//   useUpdateCartItemMutation,
//   useRemoveCartItemMutation,
//   useRemoveAllCartItemMutation,
//   useGetShippingRatesQuery,
// } from "../../Redux/Api/userApi";
// import { 
//   addToCartAction, 
//   updateSelectedCountry,
//   updateShippingRate
// } from "../../Redux/Reducer/cartSlice";
// import { toast } from "react-toastify";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
// import countries from 'world-countries';

// const Cart: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Sort and format countries for the dropdown
//   const sortedCountries = useMemo(() => {
//     return countries
//       .map(country => ({
//         code: country.cca2, // 2-letter ISO code (US, GB, IN, etc.)
//         name: country.name.common,
//         flag: country.flag
//       }))
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, []);

//   const [UpdateCartItem, { isLoading: l1 }] = useUpdateCartItemMutation();
//   const [removeCartItem, { isLoading: l2 }] = useRemoveCartItemMutation();
//   const [removeAllCartItem, { isLoading: l3 }] = useRemoveAllCartItemMutation();
//   const { data: shippingRatesData, isLoading: shippingLoading } = useGetShippingRatesQuery();
//   const [clickedButton, setClickedButton] = useState<string>("");

//   const { cart } = useSelector((state: RootState) => state.cartSlice as any);

//   // Default selections
//   const [selectedShipping, setSelectedShipping] = useState<string>("domestic");
//   const [selectedCountry, setSelectedCountry] = useState<string>("US");

//   // Handler to update country in both local and Redux state
//   const handleCountryChange = (countryCode: string) => {
//     setSelectedCountry(countryCode);
//     dispatch(updateSelectedCountry(countryCode));
//   };

//   // Handler to update shipping type and rate
//   const handleShippingChange = (shippingType: "domestic" | "international") => {
//     setSelectedShipping(shippingType);
    
//     // Calculate the rate based on selection
//     const rate = shippingType === "domestic"
//       ? shippingRatesData?.usPrice || 0
//       : shippingRatesData?.internationalPrice || 0;
    
//     // Update Redux with the new rate
//     dispatch(updateShippingRate(rate));
//   };

//   // Calculate subtotal
//   const subtotal = cart
//     ? cart.items.reduce(
//         (sum: number, item: any) => sum + item.stamp.price * item.quantity,
//         0
//       )
//     : 0;

//   // Determine shipping rate based on selection
//   const shippingRate =
//     selectedShipping === "domestic"
//       ? shippingRatesData?.usPrice || 0
//       : shippingRatesData?.internationalPrice || 0;

//   const total = subtotal + shippingRate;

//   // Update Redux whenever shippingRate changes
//   useEffect(() => {
//     if (shippingRate > 0) {
//       dispatch(updateShippingRate(shippingRate));
//     }
//   }, [shippingRate, dispatch]);

//   // Initialize shipping rate when data loads
//   useEffect(() => {
//     if (shippingRatesData && selectedShipping === "domestic") {
//       dispatch(updateShippingRate(shippingRatesData.usPrice));
//     } else if (shippingRatesData && selectedShipping === "international") {
//       dispatch(updateShippingRate(shippingRatesData.internationalPrice));
//     }
//   }, [shippingRatesData, selectedShipping, dispatch]);

//   const handleCheckout = () => {
//     if (!cart || cart.items.length === 0) {
//       toast.error("Your cart is empty!");
//       return;
//     }

//     if (!selectedCountry) {
//       toast.error("Please select a country!");
//       return;
//     }

//     // Validate shipping rate is loaded
//     if (!shippingRate || shippingRate === 0) {
//       toast.error("Please wait for shipping rates to load");
//       return;
//     }

//     // Update Redux one final time before navigation
//     dispatch(updateShippingRate(shippingRate));
//     dispatch(updateSelectedCountry(selectedCountry));

//     // Navigate to payment method (Redux will have all the data)
//     navigate("/paymentmethod");
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

//           {cart.items.map((item: any) => (
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

//           {/* COUNTRY SELECTION */}
//           <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-2">Select Country:</h3>
//             <select
//               value={selectedCountry}
//               onChange={(e) => handleCountryChange(e.target.value)}
//               className="border rounded-lg px-3 py-2 w-full sm:w-1/2"
//             >
//               <option value="" disabled>
//                 -- Select a Country --
//               </option>
//               {sortedCountries.map((country) => (
//                 <option key={country.code} value={country.code}>
//                   {country.flag} {country.name}
//                 </option>
//               ))}
//             </select>
//           </div>

//           {/* Shipping Options */}
//           <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-2">Shipping:</h3>

//             {shippingLoading ? (
//               <p>Loading shipping options...</p>
//             ) : shippingRatesData ? (
//               <div className="flex flex-col space-y-2">
//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="shipping"
//                     value="domestic"
//                     checked={selectedShipping === "domestic"}
//                     onChange={() => handleShippingChange("domestic")}
//                   />
//                   <span>
//                     US Shipping — ${shippingRatesData.usPrice.toFixed(2)}
//                   </span>
//                 </label>

//                 <label className="flex items-center space-x-2 cursor-pointer">
//                   <input
//                     type="radio"
//                     name="shipping"
//                     value="international"
//                     checked={selectedShipping === "international"}
//                     onChange={() => handleShippingChange("international")}
//                   />
//                   <span>
//                     International Shipping — ${shippingRatesData.internationalPrice.toFixed(2)}
//                   </span>
//                 </label>
//               </div>
//             ) : (
//               <p>Unable to load shipping rates</p>
//             )}
//           </div>

//           {/* Totals */}
//           <div className="mt-4 sm:mt-6 p-4 bg-white shadow-md rounded-lg">
//             <div className="mb-2">
//               <p className="text-gray-600">Subtotal: ${subtotal.toFixed(2)}</p>
//               <p className="text-gray-600">Shipping: ${shippingRate.toFixed(2)}</p>
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

// import React, { useState, useEffect, useMemo } from "react";
// import { useNavigate } from "react-router-dom";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../Redux/Store";
// import {
//   useUpdateCartItemMutation,
//   useRemoveCartItemMutation,
//   useRemoveAllCartItemMutation,
//   useGetShippingRatesQuery,
// } from "../../Redux/Api/userApi";
// import { 
//   addToCartAction, 
//   updateSelectedCountry,
//   updateShippingRate
// } from "../../Redux/Reducer/cartSlice";
// import { toast } from "react-toastify";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
// import countries from 'world-countries';

// const Cart: React.FC = () => {
//   const navigate = useNavigate();
//   const dispatch = useDispatch();
  
//   // Sort and format countries for the dropdown
//   const sortedCountries = useMemo(() => {
//     return countries
//       .map(country => ({
//         code: country.cca2, // 2-letter ISO code (US, GB, IN, etc.)
//         name: country.name.common,
//         flag: country.flag
//       }))
//       .sort((a, b) => a.name.localeCompare(b.name));
//   }, []);

//   const [UpdateCartItem, { isLoading: l1 }] = useUpdateCartItemMutation();
//   const [removeCartItem, { isLoading: l2 }] = useRemoveCartItemMutation();
//   const [removeAllCartItem, { isLoading: l3 }] = useRemoveAllCartItemMutation();
//   const { data: shippingRatesData, isLoading: shippingLoading } = useGetShippingRatesQuery();
//   const [clickedButton, setClickedButton] = useState<string>("");

//   const { cart } = useSelector((state: RootState) => state.cartSlice as any);

//   // Default selections
//   const [selectedShipping, setSelectedShipping] = useState<string>("domestic");
//   const [selectedCountry, setSelectedCountry] = useState<string>("US");

//   // Handler to update country in both local and Redux state
//   const handleCountryChange = (countryCode: string) => {
//     setSelectedCountry(countryCode);
//     dispatch(updateSelectedCountry(countryCode));
//   };

//   // Handler to update shipping type and rate
//   const handleShippingChange = (shippingType: "domestic" | "international") => {
//     setSelectedShipping(shippingType);
    
//     // Calculate the rate based on selection
//     const rate = shippingType === "domestic"
//       ? shippingRatesData?.usPrice || 0
//       : shippingRatesData?.internationalPrice || 0;
    
//     // Update Redux with the new rate
//     dispatch(updateShippingRate(rate));
//   };

//   // Calculate subtotal
//   const subtotal = cart
//     ? cart.items.reduce(
//         (sum: number, item: any) => sum + item.stamp.price * item.quantity,
//         0
//       )
//     : 0;

//   // Determine shipping rate based on selection
//   const shippingRate =
//     selectedShipping === "domestic"
//       ? shippingRatesData?.usPrice || 0
//       : shippingRatesData?.internationalPrice || 0;

//   const total = subtotal + shippingRate;

//   // Update Redux whenever shippingRate changes
//   useEffect(() => {
//     if (shippingRate > 0) {
//       dispatch(updateShippingRate(shippingRate));
//     }
//   }, [shippingRate, dispatch]);

//   // Initialize shipping rate when data loads
//   useEffect(() => {
//     if (shippingRatesData && selectedShipping === "domestic") {
//       dispatch(updateShippingRate(shippingRatesData.usPrice));
//     } else if (shippingRatesData && selectedShipping === "international") {
//       dispatch(updateShippingRate(shippingRatesData.internationalPrice));
//     }
//   }, [shippingRatesData, selectedShipping, dispatch]);

//   const handleCheckout = () => {
//     if (!cart || cart.items.length === 0) {
//       toast.error("Your cart is empty!");
//       return;
//     }

//     if (!selectedCountry) {
//       toast.error("Please select a country!");
//       return;
//     }

//     // Validate shipping rate is loaded
//     if (!shippingRate || shippingRate === 0) {
//       toast.error("Please wait for shipping rates to load");
//       return;
//     }

//     // Update Redux one final time before navigation
//     dispatch(updateShippingRate(shippingRate));
//     dispatch(updateSelectedCountry(selectedCountry));

//     // Navigate to payment method (Redux will have all the data)
//     navigate("/paymentmethod");
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

//           {cart.items.map((item: any) => (
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

//           {/* COUNTRY SELECTION */}
//           <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-3 text-gray-700">
//               Select Shipping Country: <span className="text-red-500">*</span>
//             </h3>
//             <div className="relative">
//               <style>
//                 {`
//                   .country-select option:checked {
//                     background-color: #3B82F6;
//                     color: white;
//                   }
//                   .country-select::-webkit-scrollbar {
//                     width: 8px;
//                   }
//                   .country-select::-webkit-scrollbar-track {
//                     background: #F7FAFC;
//                     border-radius: 4px;
//                   }
//                   .country-select::-webkit-scrollbar-thumb {
//                     background: #CBD5E0;
//                     border-radius: 4px;
//                   }
//                   .country-select::-webkit-scrollbar-thumb:hover {
//                     background: #A0AEC0;
//                   }
//                 `}
//               </style>
//               <select
//                 value={selectedCountry}
//                 onChange={(e) => handleCountryChange(e.target.value)}
//                 size={6}
//                 className="country-select w-full sm:w-2/3 px-4 py-2 text-base border-2 border-gray-300 rounded-lg 
//                          bg-white cursor-pointer overflow-y-auto
//                          focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
//                          hover:border-gray-400 transition-all
//                          text-gray-700 font-medium"
//                 style={{
//                   scrollbarWidth: 'thin',
//                   scrollbarColor: '#CBD5E0 #F7FAFC'
//                 }}
//               >
//                 <option value="" disabled className="text-gray-400 font-semibold bg-gray-50">
//                   -- Select a Country --
//                 </option>
//                 {sortedCountries.map((country) => (
//                   <option 
//                     key={country.code} 
//                     value={country.code} 
//                     className="py-2 px-2 text-gray-800 hover:bg-blue-50 cursor-pointer"
//                   >
//                     {country.flag} {country.name}
//                   </option>
//                 ))}
//               </select>
//             </div>
//             <p className="text-xs text-gray-500 mt-2">
//               Please select the country where your order will be shipped
//             </p>
//           </div>

//           {/* Shipping Options */}
//           <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
//             <h3 className="font-semibold mb-3 text-gray-700">
//               Shipping Method: <span className="text-red-500">*</span>
//             </h3>

//             {shippingLoading ? (
//               <p className="text-gray-600">Loading shipping options...</p>
//             ) : shippingRatesData ? (
//               <div className="flex flex-col space-y-3">
//                 <label 
//                   className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all
//                     ${selectedShipping === "domestic" 
//                       ? "border-blue-500 bg-blue-50" 
//                       : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
//                     }`}
//                 >
//                   <input
//                     type="radio"
//                     name="shipping"
//                     value="domestic"
//                     checked={selectedShipping === "domestic"}
//                     onChange={() => handleShippingChange("domestic")}
//                     className="w-5 h-5 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500"
//                   />
//                   <div className="flex-1 flex justify-between items-center">
//                     <span className="font-medium text-gray-800">🇺🇸 US Shipping</span>
//                     <span className="font-bold text-lg text-gray-900">
//                       ${shippingRatesData.usPrice.toFixed(2)}
//                     </span>
//                   </div>
//                 </label>

//                 <label 
//                   className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all
//                     ${selectedShipping === "international" 
//                       ? "border-blue-500 bg-blue-50" 
//                       : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
//                     }`}
//                 >
//                   <input
//                     type="radio"
//                     name="shipping"
//                     value="international"
//                     checked={selectedShipping === "international"}
//                     onChange={() => handleShippingChange("international")}
//                     className="w-5 h-5 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500"
//                   />
//                   <div className="flex-1 flex justify-between items-center">
//                     <span className="font-medium text-gray-800">🌍 International Shipping</span>
//                     <span className="font-bold text-lg text-gray-900">
//                       ${shippingRatesData.internationalPrice.toFixed(2)}
//                     </span>
//                   </div>
//                 </label>
//               </div>
//             ) : (
//               <p className="text-red-500">Unable to load shipping rates</p>
//             )}
//           </div>

//           {/* Totals */}
//           <div className="mt-4 sm:mt-6 p-6 bg-white shadow-md rounded-lg border-2 border-gray-200">
//             <div className="space-y-2">
//               <div className="flex justify-between items-center text-gray-700">
//                 <span className="text-base">Subtotal:</span>
//                 <span className="text-base font-semibold">${subtotal.toFixed(2)}</span>
//               </div>
//               <div className="flex justify-between items-center text-gray-700">
//                 <span className="text-base">Shipping:</span>
//                 <span className="text-base font-semibold">${shippingRate.toFixed(2)}</span>
//               </div>
//               <div className="border-t-2 border-gray-300 pt-3 mt-3">
//                 <div className="flex justify-between items-center">
//                   <span className="text-xl font-bold text-gray-900">Total:</span>
//                   <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
//                 </div>
//               </div>
//             </div>

//             <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
//               <button
//                 className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 
//                          font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
//                 onClick={handleCheckout}
//               >
//                 Proceed to Checkout
//               </button>
//               <button
//                 className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 
//                          font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
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
//           className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
//                    font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
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

import React, { useState, useEffect, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Store";
import {
  useUpdateCartItemMutation,
  useRemoveCartItemMutation,
  useRemoveAllCartItemMutation,
  useGetShippingRatesQuery,
} from "../../Redux/Api/userApi";
import { 
  addToCartAction, 
  updateSelectedCountry,
  updateShippingRate
} from "../../Redux/Reducer/cartSlice";
import { toast } from "react-toastify";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
import countries from 'world-countries';

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // Sort and format countries for the dropdown
  const sortedCountries = useMemo(() => {
    return countries
      .map(country => ({
        code: country.cca2, // 2-letter ISO code (US, GB, IN, etc.)
        name: country.name.common,
        flag: country.flag
      }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState<boolean>(false);

  const [UpdateCartItem, { isLoading: l1 }] = useUpdateCartItemMutation();
  const [removeCartItem, { isLoading: l2 }] = useRemoveCartItemMutation();
  const [removeAllCartItem, { isLoading: l3 }] = useRemoveAllCartItemMutation();
  const { data: shippingRatesData, isLoading: shippingLoading } = useGetShippingRatesQuery();
  const [clickedButton, setClickedButton] = useState<string>("");

  const { cart } = useSelector((state: RootState) => state.cartSlice as any);

  // Default selections
  const [selectedShipping, setSelectedShipping] = useState<string>("domestic");
  const [selectedCountry, setSelectedCountry] = useState<string>("US");

  // Handler to update country in both local and Redux state
  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    dispatch(updateSelectedCountry(countryCode));
    
    // Auto-select shipping based on country
    if (countryCode === "US") {
      setSelectedShipping("domestic");
      const rate = shippingRatesData?.usPrice || 0;
      dispatch(updateShippingRate(rate));
    } else {
      // If not US, automatically select international shipping
      setSelectedShipping("international");
      const rate = shippingRatesData?.internationalPrice || 0;
      dispatch(updateShippingRate(rate));
    }
  };

  // Handler to update shipping type and rate
  const handleShippingChange = (shippingType: "domestic" | "international") => {
    setSelectedShipping(shippingType);
    
    // Calculate the rate based on selection
    const rate = shippingType === "domestic"
      ? shippingRatesData?.usPrice || 0
      : shippingRatesData?.internationalPrice || 0;
    
    // Update Redux with the new rate
    dispatch(updateShippingRate(rate));
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

  // Update Redux whenever shippingRate changes
  useEffect(() => {
    if (shippingRate > 0) {
      dispatch(updateShippingRate(shippingRate));
    }
  }, [shippingRate, dispatch]);

  // Initialize shipping rate when data loads
  useEffect(() => {
    if (shippingRatesData && selectedShipping === "domestic") {
      dispatch(updateShippingRate(shippingRatesData.usPrice));
    } else if (shippingRatesData && selectedShipping === "international") {
      dispatch(updateShippingRate(shippingRatesData.internationalPrice));
    }
  }, [shippingRatesData, selectedShipping, dispatch]);

  const handleCheckout = () => {
    if (!cart || cart.items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }

    if (!selectedCountry) {
      toast.error("Please select a country!");
      return;
    }

    // Validate shipping rate is loaded
    if (!shippingRate || shippingRate === 0) {
      toast.error("Please wait for shipping rates to load");
      return;
    }

    // Update Redux one final time before navigation
    dispatch(updateShippingRate(shippingRate));
    dispatch(updateSelectedCountry(selectedCountry));

    // Navigate to payment method (Redux will have all the data)
    navigate("/paymentmethod");
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
            <h3 className="font-semibold mb-3 text-gray-700">
              Select Shipping Country: <span className="text-red-500">*</span>
            </h3>
            <div className="relative">
              <style>
                {`
                  .country-select option:checked {
                    background-color: #3B82F6;
                    color: white;
                  }
                  .country-select::-webkit-scrollbar {
                    width: 8px;
                  }
                  .country-select::-webkit-scrollbar-track {
                    background: #F7FAFC;
                    border-radius: 4px;
                  }
                  .country-select::-webkit-scrollbar-thumb {
                    background: #CBD5E0;
                    border-radius: 4px;
                  }
                  .country-select::-webkit-scrollbar-thumb:hover {
                    background: #A0AEC0;
                  }
                `}
              </style>
              <select
                value={selectedCountry}
                onChange={(e) => handleCountryChange(e.target.value)}
                onFocus={() => setIsCountryDropdownOpen(true)}
                onBlur={() => setIsCountryDropdownOpen(false)}
                size={isCountryDropdownOpen ? 6 : 1}
                className="country-select w-full sm:w-2/3 px-4 py-3 text-base border-2 border-gray-300 rounded-lg 
                         bg-white cursor-pointer
                         focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200 
                         hover:border-gray-400 transition-all
                         text-gray-700 font-medium"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#CBD5E0 #F7FAFC',
                  backgroundImage: !isCountryDropdownOpen ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 24 24' stroke='%236b7280'%3E%3Cpath stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='M19 9l-7 7-7-7'%3E%3C/path%3E%3C/svg%3E")` : 'none',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'right 0.75rem center',
                  backgroundSize: '1.5em 1.5em',
                  paddingRight: '2.5rem',
                  overflow: isCountryDropdownOpen ? 'auto' : 'hidden'
                }}
              >
                <option value="" disabled className="text-gray-400 font-semibold bg-gray-50">
                  -- Select a Country --
                </option>
                {sortedCountries.map((country) => (
                  <option 
                    key={country.code} 
                    value={country.code} 
                    className="py-2 px-2 text-gray-800 hover:bg-blue-50 cursor-pointer"
                  >
                    {country.flag} {country.name}
                  </option>
                ))}
              </select>
            </div>
            <p className="text-xs text-gray-500 mt-2">
              Please select the country where your order will be shipped
            </p>
          </div>

          {/* Shipping Options */}
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-3 text-gray-700">
              Shipping Method: <span className="text-red-500">*</span>
            </h3>

            {shippingLoading ? (
              <p className="text-gray-600">Loading shipping options...</p>
            ) : shippingRatesData ? (
              <div className="flex flex-col space-y-3">
                <label 
                  className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${selectedCountry !== "US" 
                      ? "opacity-50 cursor-not-allowed bg-gray-100 border-gray-200" 
                      : selectedShipping === "domestic" 
                        ? "border-blue-500 bg-blue-50" 
                        : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
                    }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="domestic"
                    checked={selectedShipping === "domestic"}
                    onChange={() => handleShippingChange("domestic")}
                    disabled={selectedCountry !== "US"}
                    className="w-5 h-5 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500 disabled:cursor-not-allowed"
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <div>
                      <span className="font-medium text-gray-800">🇺🇸 US Shipping</span>
                      {selectedCountry !== "US" && (
                        <span className="block text-xs text-gray-500 mt-1">
                          (Only available for US addresses)
                        </span>
                      )}
                    </div>
                    <span className="font-bold text-lg text-gray-900">
                      ${shippingRatesData.usPrice.toFixed(2)}
                    </span>
                  </div>
                </label>

                <label 
                  className={`flex items-center space-x-3 p-4 border-2 rounded-lg cursor-pointer transition-all
                    ${selectedShipping === "international" 
                      ? "border-blue-500 bg-blue-50" 
                      : "border-gray-300 bg-white hover:bg-gray-50 hover:border-gray-400"
                    }`}
                >
                  <input
                    type="radio"
                    name="shipping"
                    value="international"
                    checked={selectedShipping === "international"}
                    onChange={() => handleShippingChange("international")}
                    className="w-5 h-5 text-blue-600 cursor-pointer focus:ring-2 focus:ring-blue-500"
                  />
                  <div className="flex-1 flex justify-between items-center">
                    <span className="font-medium text-gray-800">🌍 International Shipping</span>
                    <span className="font-bold text-lg text-gray-900">
                      ${shippingRatesData.internationalPrice.toFixed(2)}
                    </span>
                  </div>
                </label>
              </div>
            ) : (
              <p className="text-red-500">Unable to load shipping rates</p>
            )}
          </div>

          {/* Totals */}
          <div className="mt-4 sm:mt-6 p-6 bg-white shadow-md rounded-lg border-2 border-gray-200">
            <div className="space-y-2">
              <div className="flex justify-between items-center text-gray-700">
                <span className="text-base">Subtotal:</span>
                <span className="text-base font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-gray-700">
                <span className="text-base">Shipping:</span>
                <span className="text-base font-semibold">${shippingRate.toFixed(2)}</span>
              </div>
              <div className="border-t-2 border-gray-300 pt-3 mt-3">
                <div className="flex justify-between items-center">
                  <span className="text-xl font-bold text-gray-900">Total:</span>
                  <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 mt-6">
              <button
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 
                         font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
                onClick={handleCheckout}
              >
                Proceed to Checkout
              </button>
              <button
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 
                         font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
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
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 
                   font-semibold text-lg transition-colors shadow-md hover:shadow-lg"
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