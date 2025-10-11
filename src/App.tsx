import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Pages/UserPages/Home";
import AboutUs from "./Pages/UserPages/AboutUs";
import RetailSales from "./Pages/UserPages/RetailSales";
import Cart from "./Pages/UserPages/Cart";
import ProductDetail from "./Pages/UserPages/ProductDetail";
import ContactUs from "./Pages/UserPages/ContactUs";
import { useEffect } from "react";
import PaymentMethod from "./Pages/UserPages/PaymentMethod";
import CheckoutPage from "./Pages/UserPages/CheckoutPage";
import Login from "./Pages/CommonPages/Login";
import SignUp from "./Pages/CommonPages/SignUp";
import { useUserCartItemQuery, useUserInfoQuery } from "./Redux/Api/userApi";
import { useDispatch } from "react-redux";
import { setLoading, setUser } from "./Redux/Reducer/userSlice";
import AddStamp from "./Pages/AdminPages/AddStamp";
import AdminLayout from "./Components/Admin/AdminLayout";
import AllStamp from "./Pages/AdminPages/AllStamp";
import UserLayout from "./Components/User/UserLayout";
import UpdateStamp from "./Pages/AdminPages/UpdateStamp";
import SuccessPage from "./Pages/UserPages/SuccessPage";
import CancelPage from "./Pages/UserPages/CancelPage";
import PhotoUploadForm from "./Pages/AdminPages/PhotoUploadForm";
import { addToCartAction, setCartLording } from "./Redux/Reducer/cartSlice";
import AddCarousel from "./Pages/AdminPages/AddCarousel";
import AllCarousel from "./Pages/AdminPages/AllCarousel";
import UpdateCarousel from "./Pages/AdminPages/UpdateCarousel";
import EmailCampaign from "./Pages/AdminPages/EmailCampaign";
import DashBoard from "./Pages/AdminPages/DashBoard";
import AllOrder from "./Pages/UserPages/AllOrder";
import AllUserOrder from "./Pages/AdminPages/AllUserOrder";
import FeedBack from "./Pages/AdminPages/FeedBack";
import CategoryManager from "./Components/Admin/CategoryManager";
import ShippingRateManager from "./Components/Admin/ShippingRateManager";



const App = () => {
  const dispatch = useDispatch();
  const { data,isError } = useUserInfoQuery();
  const {data:cartData,isError:ie} = useUserCartItemQuery();
  useEffect(() => {
    if (data) {
      dispatch(setUser(data.user));  // Dispatch only when data is available
    }

    if(cartData){
      dispatch(addToCartAction({CartData:cartData,ShippingType:""}));
    }

    if(isError)
      dispatch(setLoading(false));

    if(ie){
      dispatch(setCartLording(false));
    }
  }, [data, dispatch,isError,cartData]);
  
  return (
      <BrowserRouter>
        <div className="flex flex-col min-h-screen whitespace-normal break-words">
        <Routes>
          {/* user routes */}
          <Route path="/" element={<UserLayout/>}>
            <Route path="/" element={<Home/>}/>
            <Route path="/login" element={<Login/>} />
            <Route path="/signup" element={<SignUp/>}/> 
            <Route path="/about-us" element={<AboutUs/>}/>
            <Route path="/retail-sales" element={<RetailSales/>}/>
          
            <Route path="/product/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/contact-us" element={<ContactUs/>} />
            <Route path="/paymentmethod" element={<PaymentMethod/>} />
            <Route path="/checkout" element={<CheckoutPage/>} />
            <Route path="/checkout/success" element={<SuccessPage />} />
            <Route path="/checkout/cancel" element={<CancelPage />} />
            <Route path="/orders" element={<AllOrder />} />
          </Route>
          {/* admin routes  */}
          <Route path="/admin" element={<AdminLayout/>}>
            <Route path="dashboard" element={<DashBoard/>} />
            <Route path="addstamp" element={<AddStamp/>}/>
            <Route path="stamps" element={<AllStamp/>}/>
            <Route path="/admin/category-manager" element={<CategoryManager />} />
            <Route path="/admin/shipping-rates" element={<ShippingRateManager />} />
            <Route path="all/orders" element={<AllUserOrder/>}/>
            <Route path="carousels" element={<AllCarousel/>}/>
            <Route path="updatewave" element={<PhotoUploadForm/>}/>
            <Route path="addcarousel" element={<AddCarousel/>}/>
            <Route path="EmailCampaign" element={<EmailCampaign/>}/>
            <Route path="all/orders" element={<AllUserOrder/>}/>
            <Route path="all/feedbacks" element={<FeedBack/>}/>
            <Route path="stamps/:id" element={<UpdateStamp/>}/>
            <Route path="carouselimage/:id" element={<UpdateCarousel/>}/>
          </Route> 
        </Routes>
        </div>
      </BrowserRouter>
  );
};

export default App;

