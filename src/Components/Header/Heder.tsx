// import { Link, useLocation } from "react-router-dom";
// import { Menu, ShoppingCart, UserCircle } from "lucide-react";
// import { logo } from "../../assets/image";
// import { useSelector, useDispatch } from "react-redux";
// import { RootState } from "../../Redux/Store";
// import axios from "axios";
// import { setUser } from "../../Redux/Reducer/userSlice";
// import { toast } from "react-toastify";
// import { useEffect, useRef, useState } from "react";
// import FullscreenLoader from "../Loader/FullscreenLoader";

// const Header: React.FC = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const location = useLocation();
//   const menuRef = useRef<HTMLDivElement>(null);
//   const profileRef = useRef<HTMLDivElement>(null);
//   // const { cart } = useCart();
//   const {user,loading} = useSelector<RootState,UserState>((state) => state.userSlice);
//   const dispatch = useDispatch();

//   const {cart} = useSelector<RootState,CartState>(state=>state.cartSlice)
//   const cartCount = cart ? cart?.items.reduce((total: any, item: { quantity: any }) => total + item.quantity, 0) : 0;

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       // Close mobile menu if clicked outside
//       if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
//         setIsOpen(false);
//       }
      
//       // Close profile dropdown if clicked outside
//       if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
//         setIsProfileOpen(false);
//       }
//     };

//     document.addEventListener("mousedown", handleClickOutside);
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, []);

//   const logoutHandler = async () => {
//     try {
//       const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, {
//         withCredentials: true,
//       });
//       dispatch(setUser(res.data?.user));
//       toast.success(res.data?.message);
//     } catch (error: any) {
//       toast.error(error.data?.error);
//     }
//   };

//   return (
//     <header className="bg-white text-blue-800 fixed top-0 left-0 w-full z-50">
//       {loading && <FullscreenLoader/>}
//       <div className="px-6 py-4 flex justify-between items-center">
//         <Link to="/" className="w-30 h-18 bg-white flex items-center justify-center rounded-lg cursor-pointer overflow-hidden">
//           <img src={logo} alt="Logo" className="w-full h-full object-contain" />
//         </Link>

//         <nav className="hidden md:flex gap-5 font-semibold text-sm md:text-base">
//           <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`}>Home</Link>
//           <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`}>About Us</Link>
//           {/* <a href="http://agstamp.com/retailsales.htm" target="_blank" className="hover:text-black">Old Products</a> */}
//           <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`}>Products</Link>
//           <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`}>Contact Us</Link>
//         </nav>

//         <div className="flex items-center space-x-4">
//           {!user ? (
//             <Link to={"/login"} className="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400">
//               Login
//             </Link>
//           ) : (
//             <div className="relative" ref={profileRef}>
//               <button 
//                 onClick={() => setIsProfileOpen(!isProfileOpen)} 
//                 className="text-blue-800 hover:text-gray-600"
//               >
//                 <UserCircle size={28} />
//               </button>
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
//                   <Link to="/profile" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>Profile</Link>
//                   {user.role === "admin" && <Link to="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>Admin Dashboard</Link>}
//                   <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
//                 </div>
//               )}
//             </div>
//           )}

//           <Link to="/cart" className="relative">
//             <ShoppingCart size={28} className="text-blue-800 hover:text-gray-300 transition" />
//             {cartCount > 0 && (
//               <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>

//           <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
//             <Menu size={28} />
//           </button>
//         </div>
//       </div>

//       {isOpen && (
//         <nav 
//           ref={menuRef} 
//           className="md:hidden bg-blue-700 p-6 flex flex-col space-y-6 text-center font-semibold animate-fadeIn"
//         >
//           {/* Menu Items */}
//           {[
//             { path: "/", name: "Home" },
//             { path: "/about-us", name: "About Us" },
//             { path: "http://agstamp.com/retailsales.htm", name: "Old Products", external: true },
//             { path: "/retail-sales", name: "Products" },
//             { path: "/contact-us", name: "Contact Us" },
//           ].map((item) => (
//             item.external ? (
//               <a
//                 key={item.name}
//                 href={item.path}
//                 className="text-white hover:text-blue-200 transition-colors duration-200 py-2 border-b border-blue-600 last:border-b-0"
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.name}
//               </a>
//             ) : (
//               <Link
//                 key={item.name}
//                 to={item.path}
//                 className={`text-white hover:text-blue-200 transition-colors duration-200 py-2 border-b border-blue-600 last:border-b-0 ${
//                   location.pathname === item.path ? "text-blue-200 font-bold" : ""
//                 }`}
//                 onClick={() => setIsOpen(false)}
//               >
//                 {item.name}
//               </Link>
//             )
//           ))}

//           {/* Cart */}
//           <Link 
//             to="/cart" 
//             className="text-white hover:text-blue-200 transition-colors duration-200 py-2 border-b border-blue-600 flex justify-center items-center gap-2"
//             onClick={() => setIsOpen(false)}
//           >
//             <ShoppingCart size={20} />
//             <span>Cart</span>
//             {cartCount > 0 && (
//               <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
//                 {cartCount}
//               </span>
//             )}
//           </Link>
//         </nav>
//       )}
//     </header>
//   );
// };

// export default Header;

import { Link, useLocation } from "react-router-dom";
import { Menu, ShoppingCart, UserCircle } from "lucide-react";
import { logo } from "../../assets/image";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Store";
import axios from "axios";
import { setUser } from "../../Redux/Reducer/userSlice";
import { toast } from "react-toastify";
import { useEffect, useRef, useState } from "react";
import FullscreenLoader from "../Loader/FullscreenLoader";

const Header: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const location = useLocation();
  const menuRef = useRef<HTMLDivElement>(null);
  const profileRef = useRef<HTMLDivElement>(null);
  const { user, loading } = useSelector<RootState, UserState>((state) => state.userSlice);
  const dispatch = useDispatch();

  const { cart } = useSelector<RootState, CartState>(state => state.cartSlice);
  const cartCount = cart ? cart.items.reduce((total, item) => total + item.quantity, 0) : 0;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(event.target as Node)) {
        setIsProfileOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const logoutHandler = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/logout`, {
        withCredentials: true,
      });
      dispatch(setUser(res.data?.user));
      toast.success(res.data?.message);
    } catch (error: any) {
      toast.error(error.data?.error);
    }
  };

  return (
    <header className="bg-white text-blue-800 fixed top-0 left-0 w-full z-50">
      {loading && <FullscreenLoader />}
      <div className="px-6 py-4 flex justify-between items-center">
        <Link to="/" className="w-30 h-18 bg-white flex items-center justify-center rounded-lg cursor-pointer overflow-hidden">
          <img src={logo} alt="Logo" className="w-full h-full object-contain" />
        </Link>

        <nav className="hidden md:flex gap-5 font-semibold text-sm md:text-base">
          <Link to="/" className={`hover:text-black ${location.pathname === "/" ? "border-t-2 border-black" : ""}`}>Home</Link>
          <Link to="/about-us" className={`hover:text-black ${location.pathname === "/about-us" ? "border-t-2 border-black" : ""}`}>About Us</Link>
          <Link to="/retail-sales" className={`hover:text-black ${location.pathname === "/retail-sales" ? "border-t-2 border-black" : ""}`}>Stamps for sale</Link>
          <Link to="/contact-us" className={`hover:text-black ${location.pathname === "/contact-us" ? "border-t-2 border-black" : ""}`}>Contact Us</Link>
        </nav>

        <div className="flex items-center space-x-4">
          {!user ? (
            <Link to="/login" className="bg-blue-800 text-white px-4 py-2 rounded-lg font-semibold hover:bg-blue-400">
              Login
            </Link>
          ) : (
            <div className="relative" ref={profileRef}>
              <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="text-blue-800 hover:text-gray-600">
                <UserCircle size={28} />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white border rounded-lg shadow-lg z-10">
                  <Link to="/orders" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>Order</Link>
                  {user.role === "admin" && (
                    <Link to="/admin/dashboard" className="block px-4 py-2 text-sm hover:bg-gray-100" onClick={() => setIsProfileOpen(false)}>Admin Dashboard</Link>
                  )}
                  <button onClick={logoutHandler} className="w-full text-left px-4 py-2 text-sm hover:bg-gray-100">Logout</button>
                </div>
              )}
            </div>
          )}

          <Link to="/cart" className="relative">
            <ShoppingCart size={28} className="text-blue-800 hover:text-gray-300 transition" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>

          <button onClick={() => setIsOpen(!isOpen)} className="md:hidden focus:outline-none">
            <Menu size={28} />
          </button>
        </div>
      </div>

      {isOpen && (
        <nav ref={menuRef} className="md:hidden bg-blue-700 p-6 flex flex-col space-y-6 text-center font-semibold animate-fadeIn">
          {[
            { path: "/", name: "Home" },
            { path: "/about-us", name: "About Us" },
            { path: "/retail-sales", name: "Stamps for sale" },
            { path: "/contact-us", name: "Contact Us" },
          ].map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`text-white hover:text-blue-200 transition-colors duration-200 py-2 border-b border-blue-600 last:border-b-0 ${
                location.pathname === item.path ? "text-blue-200 font-bold" : ""
              }`}
              onClick={() => setIsOpen(false)}
            >
              {item.name}
            </Link>
          ))}

          <Link
            to="/cart"
            className="text-white hover:text-blue-200 transition-colors duration-200 py-2 border-b border-blue-600 flex justify-center items-center gap-2"
            onClick={() => setIsOpen(false)}
          >
            <ShoppingCart size={20} />
            <span>Cart</span>
            {cartCount > 0 && (
              <span className="bg-red-500 text-white text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </Link>
        </nav>
      )}
    </header>
  );
};

export default Header;
