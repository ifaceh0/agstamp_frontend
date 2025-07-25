// import React from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSingleStampsQuery } from "../../Redux/Api/adminApi";
// import {
//   FiShoppingCart,
//   FiTag,
//   FiPackage,
//   FiDollarSign,
//   FiChevronLeft,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useAddToCartMutation } from "../../Redux/Api/userApi";
// import { useDispatch } from "react-redux";
// import { addToCartAction } from "../../Redux/Reducer/cartSlice";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

// const ProductDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data, isLoading, isError } = useSingleStampsQuery(id || "");
//   const stamp = data?.stamp;
//   const navigate = useNavigate();
//   const [addToCart,{isLoading:load}] = useAddToCartMutation();
//   const dispatch = useDispatch();

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );

//   if (isError || !stamp)
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
//         <div className="bg-red-100 p-4 rounded-full mb-4">
//           <FiPackage className="text-red-500 text-3xl" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">Stamp Not Found</h2>
//         <p className="text-gray-600 mb-6">
//           The stamp you're looking for doesn't exist or may have been removed.
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <FiChevronLeft className="mr-1" /> Back to stamps
//         </button>
//       </div>
//     );

//   const handleAddToCart = async() => {
//     const res = await addToCart({stampId:id as string,quantity:1})
//     if(res.data){
//       dispatch(addToCartAction(res.data as CartData));
//       toast.success(`${data.stamp.name} is added to cart`);
//     }

//     if (res.error) {
//       const errorMessage = (res.error as { data?: { message?: string } })?.data?.message || "Something went wrong";
//       toast.error(errorMessage);
//     }
//   };

//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: true,
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
//       <ToastContainer />
//       {load && <FullscreenLoader/>}
//       <div className="max-w-6xl mx-auto">
//         {/* Back button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
//         >
//           <FiChevronLeft className="mr-1" /> Back to collection
//         </button>

//         {/* Main product card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-2xl shadow-lg overflow-hidden"
//         >
//           <div className="flex flex-col md:flex-row">
//             {/* Image carousel */}
//             <div className="md:w-1/2 w-full p-4 sm:p-6 bg-gray-50">
//               <div className="w-full aspect-w-1 aspect-h-1 md:aspect-[4/3] rounded-xl overflow-hidden">
//                 <Slider {...settings}>
//                   {stamp.images.map((img, index) => (
//                     <div key={index} className="flex items-center justify-center">
//                       <img
//                         src={img.publicUrl}
//                         alt={`${stamp.name} - ${index + 1}`}
//                         className="w-full h-[300px] md:h-[400px] object-contain"
//                       />
//                     </div>
//                   ))}
//                 </Slider>
//               </div>
//             </div>

//             {/* Product details */}
//             <div className="md:w-1/2 w-full p-4 sm:p-8 flex flex-col">
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//                 {stamp.name}
//               </h1>
//               <div className="flex items-center text-gray-500 mb-4">
//                 <FiTag className="mr-2 text-blue-500" />
//                 <span>Collectible Stamp</span>
//               </div>

//               <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
//                 {stamp.description}
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
//                 <div className="bg-blue-50 p-4 rounded-xl">
//                   <div className="flex items-center text-blue-600 mb-1">
//                     <FiDollarSign className="mr-2" />
//                     <span className="font-medium">Price</span>
//                   </div>
//                   <p className="text-xl font-bold text-gray-900">${stamp.price.toFixed(2)}</p>
//                 </div>

//                 <div className={`p-4 rounded-xl ${stamp.stock > 0 ? 'bg-green-50' : 'bg-red-50'}`}>
//                   <div className="flex items-center mb-1">
//                     <FiPackage
//                       className={`mr-2 ${stamp.stock > 0 ? 'text-green-600' : 'text-red-600'}`}
//                     />
//                     <span
//                       className={`font-medium ${stamp.stock > 0 ? 'text-green-600' : 'text-red-600'}`}
//                     >
//                       Stock
//                     </span>
//                   </div>
//                   <p
//                     className={`text-xl font-bold ${
//                       stamp.stock > 0 ? 'text-gray-900' : 'text-red-600'
//                     }`}
//                   >
//                     {stamp.stock > 0 ? `${stamp.stock} available` : 'Out of stock'}
//                   </p>
//                 </div>
//               </div>

//               {/* Action buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleAddToCart}
//                   disabled={stamp.stock <= 0}
//                   className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center transition-all
//                     ${
//                       stamp.stock > 0
//                         ? 'bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl'
//                         : 'bg-gray-200 text-gray-500 cursor-not-allowed'
//                     }`}
//                 >
//                   <FiShoppingCart className="mr-2" />
//                   Add to Cart
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => navigate("/cart")}
//                   className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold flex items-center justify-center transition-colors"
//                 >
//                   View Cart
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;


// import React, { useRef } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import { useSingleStampsQuery } from "../../Redux/Api/adminApi";
// import {
//   FiShoppingCart,
//   FiTag,
//   FiPackage,
//   FiDollarSign,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";
// import { motion } from "framer-motion";
// import { toast, ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Slider, { Settings } from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useAddToCartMutation } from "../../Redux/Api/userApi";
// import { useDispatch } from "react-redux";
// import { addToCartAction } from "../../Redux/Reducer/cartSlice";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

// const ProductDetail: React.FC = () => {
//   const { id } = useParams<{ id: string }>();
//   const { data, isLoading, isError } = useSingleStampsQuery(id || "");
//   const stamp = data?.stamp;
//   const navigate = useNavigate();
//   const [addToCart, { isLoading: load }] = useAddToCartMutation();
//   const dispatch = useDispatch();
//   const sliderRef = useRef<Slider>(null);

//   if (isLoading)
//     return (
//       <div className="flex items-center justify-center min-h-screen">
//         <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );

//   if (isError || !stamp)
//     return (
//       <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
//         <div className="bg-red-100 p-4 rounded-full mb-4">
//           <FiPackage className="text-red-500 text-3xl" />
//         </div>
//         <h2 className="text-2xl font-bold text-gray-800 mb-2">Stamp Not Found</h2>
//         <p className="text-gray-600 mb-6">
//           The stamp you're looking for doesn't exist or may have been removed.
//         </p>
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
//         >
//           <FiChevronLeft className="mr-1" /> Back to stamps
//         </button>
//       </div>
//     );

//   const handleAddToCart = async () => {
//     const res = await addToCart({ stampId: id as string, quantity: 1 });
//     if (res.data) {
//       dispatch(addToCartAction(res.data as CartData));
//       toast.success(`${data.stamp.name} is added to cart`);
//     }

//     if (res.error) {
//       const errorMessage =
//         (res.error as { data?: { message?: string } })?.data?.message ||
//         "Something went wrong";
//       toast.error(errorMessage);
//     }
//   };

//   const settings: Settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 1,
//     slidesToScroll: 1,
//     arrows: false, // Disable default arrows as we're using custom ones
//     autoplay: true,
//     autoplaySpeed: 3000,
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
//       <ToastContainer />
//       {load && <FullscreenLoader />}
//       <div className="max-w-6xl mx-auto">
//         {/* Back button */}
//         <button
//           onClick={() => navigate(-1)}
//           className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
//         >
//           <FiChevronLeft className="mr-1" /> Back to collection
//         </button>

//         {/* Main product card */}
//         <motion.div
//           initial={{ opacity: 0, y: 20 }}
//           animate={{ opacity: 1, y: 0 }}
//           transition={{ duration: 0.5 }}
//           className="bg-white rounded-2xl shadow-lg overflow-hidden"
//         >
//           <div className="flex flex-col md:flex-row">
//             {/* Image carousel */}
//             <div className="md:w-1/2 w-full p-4 sm:p-6 bg-gray-50 relative">
//               <div className="w-full aspect-w-1 aspect-h-1 md:aspect-[4/3] rounded-xl overflow-hidden">
//                 <Slider ref={sliderRef} {...settings}>
//                   {stamp.images.map((img, index) => (
//                     <div key={index} className="flex items-center justify-center">
//                       <img
//                         src={img.publicUrl}
//                         alt={`${stamp.name} - ${index + 1}`}
//                         className="w-full h-[300px] md:h-[400px] object-contain"
//                       />
//                     </div>
//                   ))}
//                 </Slider>
//               </div>

//               {/* Custom arrows for desktop */}
//               <button
//                 className="hidden md:block absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10 transition-all hover:scale-110"
//                 onClick={() => sliderRef.current?.slickPrev()}
//                 aria-label="Previous image"
//               >
//                 <FiChevronLeft className="text-xl" />
//               </button>
//               <button
//                 className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10 transition-all hover:scale-110"
//                 onClick={() => sliderRef.current?.slickNext()}
//                 aria-label="Next image"
//               >
//                 <FiChevronRight className="text-xl" />
//               </button>
//             </div>

//             {/* Product details */}
//             <div className="md:w-1/2 w-full p-4 sm:p-8 flex flex-col">
//               <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
//                 {stamp.name}
//               </h1>
//               <div className="flex items-center text-gray-500 mb-4">
//                 <FiTag className="mr-2 text-blue-500" />
//                 <span>Collectible Stamp</span>
//               </div>

//               <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
//                 {stamp.description}
//               </p>

//               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
//                 <div className="bg-blue-50 p-4 rounded-xl">
//                   <div className="flex items-center text-blue-600 mb-1">
//                     <FiDollarSign className="mr-2" />
//                     <span className="font-medium">Price</span>
//                   </div>
//                   <p className="text-xl font-bold text-gray-900">
//                     ${stamp.price.toFixed(2)}
//                   </p>
//                 </div>

//                 <div
//                   className={`p-4 rounded-xl ${
//                     stamp.stock > 0 ? "bg-green-50" : "bg-red-50"
//                   }`}
//                 >
//                   <div className="flex items-center mb-1">
//                     <FiPackage
//                       className={`mr-2 ${
//                         stamp.stock > 0 ? "text-green-600" : "text-red-600"
//                       }`}
//                     />
//                     <span
//                       className={`font-medium ${
//                         stamp.stock > 0 ? "text-green-600" : "text-red-600"
//                       }`}
//                     >
//                       Stock
//                     </span>
//                   </div>
//                   <p
//                     className={`text-xl font-bold ${
//                       stamp.stock > 0 ? "text-gray-900" : "text-red-600"
//                     }`}
//                   >
//                     {stamp.stock > 0
//                       ? `${stamp.stock} available`
//                       : "Out of stock"}
//                   </p>
//                 </div>
//               </div>

//               {/* Action buttons */}
//               <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={handleAddToCart}
//                   disabled={stamp.stock <= 0}
//                   className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center transition-all
//                     ${
//                       stamp.stock > 0
//                         ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl"
//                         : "bg-gray-200 text-gray-500 cursor-not-allowed"
//                     }`}
//                 >
//                   <FiShoppingCart className="mr-2" />
//                   Add to Cart
//                 </motion.button>

//                 <motion.button
//                   whileHover={{ scale: 1.02 }}
//                   whileTap={{ scale: 0.98 }}
//                   onClick={() => navigate("/cart")}
//                   className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold flex items-center justify-center transition-colors"
//                 >
//                   View Cart
//                 </motion.button>
//               </div>
//             </div>
//           </div>
//         </motion.div>
//       </div>
//     </div>
//   );
// };

// export default ProductDetail;

import React, { useRef, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSingleStampsQuery } from "../../Redux/Api/adminApi";
import {
  FiShoppingCart,
  FiTag,
  FiPackage,
  FiDollarSign,
  FiChevronLeft,
  FiChevronRight,
  FiPlus,
  FiMinus,
} from "react-icons/fi";
import { motion } from "framer-motion";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Slider, { Settings } from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { useAddToCartMutation } from "../../Redux/Api/userApi";
import { useDispatch } from "react-redux";
import { addToCartAction } from "../../Redux/Reducer/cartSlice";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading, isError } = useSingleStampsQuery(id || "");
  const stamp = data?.stamp;
  const navigate = useNavigate();
  const [addToCart, { isLoading: load }] = useAddToCartMutation();
  const dispatch = useDispatch();
  const sliderRef = useRef<Slider>(null);
  const [quantity, setQuantity] = useState(1);

  if(isLoading) return <FullscreenLoader/>

  if (isError || !stamp)
    return (
      <div className="flex flex-col items-center justify-center min-h-screen text-center p-6">
        <div className="bg-red-100 p-4 rounded-full mb-4">
          <FiPackage className="text-red-500 text-3xl" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Stamp Not Found</h2>
        <p className="text-gray-600 mb-6">
          The stamp you're looking for doesn't exist or may have been removed.
        </p>
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-blue-600 hover:text-blue-800 transition-colors"
        >
          <FiChevronLeft className="mr-1" /> Back to stamps
        </button>
      </div>
    );

  const handleAddToCart = async () => {
    const res = await addToCart({ stampId: id as string, quantity });
    if (res.data) {
      dispatch(addToCartAction({CartData:res.data as CartData,ShippingType:""}));
      toast.success(`${quantity} ${stamp.name} added to cart`);
    }

    if (res.error) {
      const errorMessage =
        (res.error as { data?: { message?: string } })?.data?.message ||
        "Something went wrong";
      toast.error(errorMessage);
    }
  };

  const incrementQuantity = () => {
    if (quantity < stamp.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const settings: Settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-6 px-4 sm:px-6 lg:px-8">
      <ToastContainer />
      {(load || isLoading) && <FullscreenLoader />}
      <div className="max-w-6xl mx-auto">
        {/* Back button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
        >
          <FiChevronLeft className="mr-1" /> Back to collection
        </button>

        {/* Main product card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-2xl shadow-lg overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* Image carousel */}
            <div className="md:w-1/2 w-full p-4 sm:p-6 bg-gray-50 relative">
              <div className="w-full aspect-w-1 aspect-h-1 md:aspect-[4/3] rounded-xl overflow-hidden">
                <Slider ref={sliderRef} {...settings}>
                  {stamp.images.map((img, index) => (
                    <div key={index} className="flex items-center justify-center">
                      <img
                        src={img.publicUrl}
                        alt={`${stamp.name} - ${index + 1}`}
                        className="w-full h-[300px] md:h-[400px] object-contain"
                      />
                    </div>
                  ))}
                </Slider>
              </div>

              {/* Custom arrows for desktop */}
              <button
                className="hidden md:block absolute left-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10 transition-all hover:scale-110"
                onClick={() => sliderRef.current?.slickPrev()}
                aria-label="Previous image"
              >
                <FiChevronLeft className="text-xl" />
              </button>
              <button
                className="hidden md:block absolute right-6 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white text-gray-800 rounded-full p-2 shadow-md z-10 transition-all hover:scale-110"
                onClick={() => sliderRef.current?.slickNext()}
                aria-label="Next image"
              >
                <FiChevronRight className="text-xl" />
              </button>
            </div>

            {/* Product details */}
            <div className="md:w-1/2 w-full p-4 sm:p-8 flex flex-col">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">
                {stamp.name}
              </h1>
              <div className="flex items-center text-gray-500 mb-4">
                <FiTag className="mr-2 text-blue-500" />
                <span>Collectible Stamp</span>
              </div>

              <p className="text-gray-700 mb-6 leading-relaxed text-sm sm:text-base">
                {stamp.description}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6">
                <div className="bg-blue-50 p-4 rounded-xl">
                  <div className="flex items-center text-blue-600 mb-1">
                    <FiDollarSign className="mr-2" />
                    <span className="font-medium">Price</span>
                  </div>
                  <p className="text-xl font-bold text-gray-900">
                    ${stamp.price.toFixed(2)}
                  </p>
                </div>

                <div
                  className={`p-4 rounded-xl ${
                    stamp.stock > 0 ? "bg-green-50" : "bg-red-50"
                  }`}
                >
                  <div className="flex items-center mb-1">
                    <FiPackage
                      className={`mr-2 ${
                        stamp.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    />
                    <span
                      className={`font-medium ${
                        stamp.stock > 0 ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      Stock
                    </span>
                  </div>
                  <p
                    className={`text-xl font-bold ${
                      stamp.stock > 0 ? "text-gray-900" : "text-red-600"
                    }`}
                  >
                    {stamp.stock > 0
                      ? `${stamp.stock} available`
                      : "Out of stock"}
                  </p>
                </div>
              </div>

              {/* Quantity Selector */}
              <div className="mb-6">
                <label className="block text-gray-700 font-medium mb-2">
                  Quantity
                </label>
                <div className="flex items-center">
                  <button
                    onClick={decrementQuantity}
                    disabled={quantity <= 1}
                    className={`p-2 rounded-l-lg border border-gray-300 ${
                      quantity <= 1
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <FiMinus />
                  </button>
                  <div className="px-4 py-2 border-t border-b border-gray-300 bg-white text-center w-16">
                    {stamp.stock ? quantity : 0}
                  </div>
                  <button
                    onClick={incrementQuantity}
                    disabled={quantity >= stamp.stock}
                    className={`p-2 rounded-r-lg border border-gray-300 ${
                      quantity >= stamp.stock
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-white hover:bg-gray-50 text-gray-700"
                    }`}
                  >
                    <FiPlus />
                  </button>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mt-auto">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={handleAddToCart}
                  disabled={stamp.stock <= 0 || stamp.stock == quantity}
                  className={`w-full py-3 rounded-xl font-semibold flex items-center justify-center transition-all
                    ${
                      stamp.stock > 0
                        ? "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-lg hover:shadow-xl"
                        : "bg-gray-200 text-gray-500 cursor-not-allowed"
                    }`}
                >
                  <FiShoppingCart className="mr-2" />
                  Add to Cart
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => navigate("/cart")}
                  className="w-full py-3 rounded-xl bg-gray-100 hover:bg-gray-200 text-gray-800 font-semibold flex items-center justify-center transition-colors"
                >
                  View Cart
                </motion.button>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ProductDetail;