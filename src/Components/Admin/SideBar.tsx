import { useState, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import {
  FiPlus,
  FiList,
  FiHome,
  FiUsers,
  FiSettings,
  FiMenu,
  FiX,
  FiFolder,
} from 'react-icons/fi';

const SideBar: React.FC = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

  useEffect(() => {
    const handleResize = () => {
      const isNowMobile = window.innerWidth < 1024;
      setIsMobile(isNowMobile);
      setIsOpen(!isNowMobile);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const sidebar = document.getElementById('sidebar');
      const burgerButton = document.getElementById('burger-button');
      if (
        isOpen &&
        sidebar &&
        !sidebar.contains(event.target as Node) &&
        burgerButton &&
        !burgerButton.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <>
      {isMobile && (
        <button
          id="burger-button"
          onClick={() => setIsOpen(!isOpen)}
          className="fixed top-4 left-4 z-40 p-2 rounded-md bg-gray-800 text-white lg:hidden"
        >
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      )}

      <div
        id="sidebar"
        className={`fixed min-w-[260px] lg:relative z-30 w-64 min-h-screen bg-gray-800 text-white overflow-y-auto transition-all duration-300 ease-in-out
          ${isOpen ? 'left-0' : '-left-72'} lg:left-0`}
      >
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h1 className="text-xl font-bold">Admin Dashboard</h1>
          <button
            onClick={() => navigate('/')}
            className="p-2 rounded-full hover:bg-gray-700 transition-colors"
            aria-label="Back to home"
          >
            <FiHome className="text-lg" />
          </button>
        </div>

        <nav className="p-4">
          <NavLink
            to="/admin/dashboard"
            onClick={() => isMobile && setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg mb-2 transition-colors ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`
            }
          >
            <FiHome className="mr-3" />
            Dashboard
          </NavLink>

          <div className="mb-6">
            <h2 className="text-sm uppercase font-semibold text-gray-400 mb-2 px-3">
              Stamp Management
            </h2>

            {/* Stamp Dropdown */}
            <div className="mb-2">
              <div className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer group relative">
                <FiPlus className="mr-3" />
                <span className="group-hover:text-white font-medium">Stamp</span>
              </div>
              <div className="ml-8 mt-1 space-y-1">
                <NavLink
                  to="/admin/addstamp"
                  onClick={() => isMobile && setIsOpen(false)}
                  className={({ isActive }) =>
                    `block p-2 rounded-md transition-colors text-sm ${
                      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`
                  }
                >
                  New Stamp
                </NavLink>
                <NavLink
                  to="/admin/updatewave"
                  onClick={() => isMobile && setIsOpen(false)}
                  className={({ isActive }) =>
                    `block p-2 rounded-md transition-colors text-sm ${
                      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`
                  }
                >
                  Banner
                </NavLink>
                <NavLink
                  to="/admin/addcarousel"
                  onClick={() => isMobile && setIsOpen(false)}
                  className={({ isActive }) =>
                    `block p-2 rounded-md transition-colors text-sm ${
                      isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                    }`
                  }
                >
                  Carousel
                </NavLink>
              </div>
            </div>

            <NavLink
              to="/admin/stamps"
              onClick={() => isMobile && setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg mb-1 transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <FiList className="mr-3" />
              All Stamps
            </NavLink>

            <NavLink
              to="/admin/category-manager"
              onClick={() => isMobile && setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg mb-1 transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <FiFolder className="mr-3" />
              Category Manager
            </NavLink>

            <NavLink
              to="/admin/carousels"
              onClick={() => isMobile && setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg mb-1 transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <FiList className="mr-3" />
              All Carousel
            </NavLink>

            <NavLink
              to="/admin/all/orders"
              onClick={() => isMobile && setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg mb-1 transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <FiList className="mr-3" />
              All Orders
            </NavLink>
          </div>

          <NavLink
            to="/admin/shipping-rates"
            onClick={() => isMobile && setIsOpen(false)}
            className={({ isActive }) =>`flex items-center p-3 rounded-lg mb-1 transition-colors ${
              isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`
            }
          > 
          <FiList className="mr-3" />
            Shipping Rate Manager
          </NavLink>


          <div className="mb-6">
            <h2 className="text-sm uppercase font-semibold text-gray-400 mb-2 px-3">
              User Management
            </h2>
            <NavLink
              to="/admin/EmailCampaign"
              onClick={() => isMobile && setIsOpen(false)}
              className={({ isActive }) =>
                `flex items-center p-3 rounded-lg mb-1 transition-colors ${
                  isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
                }`
              }
            >
              <FiUsers className="mr-3" />
              Manage Users
            </NavLink>
          </div>

          <NavLink
            to="/admin/settings"
            onClick={() => isMobile && setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`
            }
          >
            <FiSettings className="mr-3" />
            Settings
          </NavLink>
          <NavLink
            to="/admin/countries"
            onClick={() => isMobile && setIsOpen(false)}
            className={({ isActive }) =>
              `flex items-center p-3 rounded-lg transition-colors ${
                isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
              }`
            }
          >
            <FiSettings className="mr-3" />
            Countries
          </NavLink>  
        </nav>
      </div>

      {isMobile && isOpen && (
        <div
          className="fixed inset-0 bg-[rgba(0,0,0,0.1)] bg-opacity-50 z-20 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default SideBar;

//old code
// import { useState, useEffect } from 'react';
// import { NavLink, useNavigate } from 'react-router-dom';
// import {
//   FiPlus,
//   FiList,
//   FiHome,
//   FiUsers,
//   FiSettings,
//   FiMenu,
//   FiX,
// } from 'react-icons/fi';

// const SideBar: React.FC = () => {
//   const navigate = useNavigate();
//   const [isOpen, setIsOpen] = useState<boolean>(false);
//   const [isMobile, setIsMobile] = useState<boolean>(window.innerWidth < 1024);

//   useEffect(() => {
//     const handleResize = () => {
//       const isNowMobile = window.innerWidth < 1024;
//       setIsMobile(isNowMobile);
//       setIsOpen(!isNowMobile);
//     };

//     window.addEventListener('resize', handleResize);
//     handleResize();

//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   useEffect(() => {
//     const handleClickOutside = (event: MouseEvent) => {
//       const sidebar = document.getElementById('sidebar');
//       const burgerButton = document.getElementById('burger-button');
//       if (
//         isOpen &&
//         sidebar &&
//         !sidebar.contains(event.target as Node) &&
//         burgerButton &&
//         !burgerButton.contains(event.target as Node)
//       ) {
//         setIsOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isOpen]);

//   return (
//     <>
//       {isMobile && (
//         <button
//           id="burger-button"
//           onClick={() => setIsOpen(!isOpen)}
//           className="fixed top-4 left-4 z-40 p-2 rounded-md bg-gray-800 text-white lg:hidden"
//         >
//           {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
//         </button>
//       )}

//       <div
//         id="sidebar"
//         className={`fixed min-w-[260px] lg:relative z-30 w-64 min-h-screen bg-gray-800 text-white overflow-y-auto transition-all duration-300 ease-in-out
//           ${isOpen ? 'left-0' : '-left-72'} lg:left-0`}
//       >
//         <div className="p-4 border-b border-gray-700 flex justify-between items-center">
//           <h1 className="text-xl font-bold">Admin Dashboard</h1>
//           <button
//             onClick={() => navigate('/')}
//             className="p-2 rounded-full hover:bg-gray-700 transition-colors"
//             aria-label="Back to home"
//           >
//             <FiHome className="text-lg" />
//           </button>
//         </div>

//         <nav className="p-4">
//           <NavLink
//             to="/admin/dashboard"
//             onClick={() => isMobile && setIsOpen(false)}
//             className={({ isActive }) =>
//               `flex items-center p-3 rounded-lg mb-2 transition-colors ${
//                 isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
//               }`
//             }
//           >
//             <FiHome className="mr-3" />
//             Dashboard
//           </NavLink>

//           <div className="mb-6">
//             <h2 className="text-sm uppercase font-semibold text-gray-400 mb-2 px-3">
//               Stamp Management
//             </h2>

//             {/* Add Dropdown */}
//             <div className="mb-2">
//               <div className="flex items-center p-3 rounded-lg hover:bg-gray-700 cursor-pointer group relative">
//                 <FiPlus className="mr-3" />
//                 <span className="group-hover:text-white font-medium">Stamp</span>
//               </div>
//               <div className="ml-8 mt-1 space-y-1">
//                 <NavLink
//                   to="/admin/addstamp"
//                   onClick={() => isMobile && setIsOpen(false)}
//                   className={({ isActive }) =>
//                     `block p-2 rounded-md transition-colors text-sm ${
//                       isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
//                     }`
//                   }
//                 >
//                   New Stamp
//                 </NavLink>
//                 <NavLink
//                   to="/admin/updatewave"
//                   onClick={() => isMobile && setIsOpen(false)}
//                   className={({ isActive }) =>
//                     `block p-2 rounded-md transition-colors text-sm ${
//                       isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
//                     }`
//                   }
//                 >
//                   Banner
//                 </NavLink>
//                 <NavLink
//                   to="/admin/addcarousel"
//                   onClick={() => isMobile && setIsOpen(false)}
//                   className={({ isActive }) =>
//                     `block p-2 rounded-md transition-colors text-sm ${
//                       isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
//                     }`
//                   }
//                 >
//                   Carousel
//                 </NavLink>
//               </div>
//             </div>

//             <NavLink
//               to="/admin/stamps"
//               onClick={() => isMobile && setIsOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center p-3 rounded-lg mb-1 transition-colors ${
//                   isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
//                 }`
//               }
//             >
//               <FiList className="mr-3" />
//               All Stamps
//             </NavLink>
//             <NavLink
//               to="/admin/carousels"
//               onClick={() => isMobile && setIsOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center p-3 rounded-lg mb-1 transition-colors ${
//                   isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
//                 }`
//               }
//             >
//               <FiList className="mr-3" />
//               All Carousel
//             </NavLink>
//             <NavLink
//               to="/admin/all/orders"
//               onClick={() => isMobile && setIsOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center p-3 rounded-lg mb-1 transition-colors ${
//                   isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
//                 }`
//               }
//             >
//               <FiList className="mr-3" />
//               All Orders
//             </NavLink>
//             {/* <NavLink
//               to="/admin/all/feedbacks"
//               onClick={() => isMobile && setIsOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center p-3 rounded-lg mb-1 transition-colors ${
//                   isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
//                 }`
//               }
//             >
//               <FiList className="mr-3" />
//               All Messages
//             </NavLink> */}
//           </div>

//           <div className="mb-6">
//             <h2 className="text-sm uppercase font-semibold text-gray-400 mb-2 px-3">
//               User Management
//             </h2>
//             <NavLink
//               to="/admin/EmailCampaign"
//               onClick={() => isMobile && setIsOpen(false)}
//               className={({ isActive }) =>
//                 `flex items-center p-3 rounded-lg mb-1 transition-colors ${
//                   isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
//                 }`
//               }
//             >
//               <FiUsers className="mr-3" />
//               Manage Users
//             </NavLink>
//           </div>

//           <NavLink
//             to="/admin/settings"
//             onClick={() => isMobile && setIsOpen(false)}
//             className={({ isActive }) =>
//               `flex items-center p-3 rounded-lg transition-colors ${
//                 isActive ? 'bg-blue-600' : 'hover:bg-gray-700'
//               }`
//             }
//           >
//             <FiSettings className="mr-3" />
//             Settings
//           </NavLink>
//         </nav>
//       </div>

//       {isMobile && isOpen && (
//         <div
//           className="fixed inset-0 bg-[rgba(0,0,0,0.1)] bg-opacity-50 z-20 lg:hidden"
//           onClick={() => setIsOpen(false)}
//         />
//       )}
//     </>
//   );
// };

// export default SideBar;


// "use client";
// import React, { useState, createContext, useContext, useEffect } from "react";
// import { AnimatePresence, motion } from "framer-motion";
// import { 
//   IconMenu2, 
//   IconX, 
//   IconHome, 
//   IconList, 
//   IconUsers, 
//   IconSettings, 
//   IconPlus 
// } from "@tabler/icons-react";
// import {Link} from "react-router-dom";



// // === Local cn utility function (removes need for "@/lib/utils") ===
// function cn(...classes: (string | false | null | undefined)[]) {
//   return classes.filter(Boolean).join(" ");
// }

// // Types and Context
// interface Links {
//   label: string;
//   href: string;
//   icon: React.ReactNode;
// }

// interface SidebarContextProps {
//   open: boolean;
//   setOpen: React.Dispatch<React.SetStateAction<boolean>>;
//   animate: boolean;
// }

// const SidebarContext = createContext<SidebarContextProps | undefined>(undefined);

// export const useSidebar = () => {
//   const context = useContext(SidebarContext);
//   if (!context) {
//     throw new Error("useSidebar must be used within a SidebarProvider");
//   }
//   return context;
// };

// export const SidebarProvider = ({
//   children,
//   open: openProp,
//   setOpen: setOpenProp,
//   animate = true,
// }: {
//   children: React.ReactNode;
//   open?: boolean;
//   setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
//   animate?: boolean;
// }) => {
//   const [openState, setOpenState] = useState(false);
//   const open = openProp !== undefined ? openProp : openState;
//   const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

//   return (
//     <SidebarContext.Provider value={{ open, setOpen, animate }}>
//       {children}
//     </SidebarContext.Provider>
//   );
// };

// export const Sidebar = ({
//   children,
//   open,
//   setOpen,
//   animate,
// }: {
//   children: React.ReactNode;
//   open?: boolean;
//   setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
//   animate?: boolean;
// }) => {
//   return (
//     <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
//       {children}
//     </SidebarProvider>
//   );
// };

// export const SidebarBody = (props: React.ComponentProps<typeof motion.div>) => {
//   return (
//     <>
//       <DesktopSidebar {...props} />
//       <MobileSidebar {...(props as React.ComponentProps<"div">)} />
//     </>
//   );
// };

// export const DesktopSidebar = ({
//   className,
//   children,
//   ...props
// }: React.ComponentProps<typeof motion.div>) => {
//   const { open, setOpen, animate } = useSidebar();
//   return (
//     <motion.div
//       className={cn(
//         "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-neutral-800 w-[300px] shrink-0",
//         className
//       )}
//       animate={{
//         width: animate ? (open ? "300px" : "80px") : "300px",
//       }}
//       onMouseEnter={() => setOpen(true)}
//       onMouseLeave={() => setOpen(false)}
//       {...props}
//     >
//       {children}
//     </motion.div>
//   );
// };

// export const MobileSidebar = ({
//   className,
//   children,
//   ...props
// }: React.ComponentProps<"div">) => {
//   const { open, setOpen } = useSidebar();
//   return (
//     <div
//       className={cn(
//         "h-16 px-4 py-4 flex md:hidden items-center justify-between bg-neutral-100 dark:bg-neutral-800 w-full"
//       )}
//       {...props}
//     >
//       <div className="flex justify-end z-20 w-full">
//         <IconMenu2
//           className="text-neutral-800 dark:text-neutral-200"
//           onClick={() => setOpen(!open)}
//         />
//       </div>
//       <AnimatePresence>
//         {open && (
//           <motion.div
//             initial={{ x: "-100%", opacity: 0 }}
//             animate={{ x: 0, opacity: 1 }}
//             exit={{ x: "-100%", opacity: 0 }}
//             transition={{ duration: 0.3, ease: "easeInOut" }}
//             className={cn(
//               "fixed h-full w-full inset-0 bg-white dark:bg-neutral-900 p-10 z-[100] flex flex-col justify-between",
//               className
//             )}
//           >
//             <div
//               className="absolute right-10 top-10 z-50 text-neutral-800 dark:text-neutral-200"
//               onClick={() => setOpen(!open)}
//             >
//               <IconX />
//             </div>
//             {children}
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </div>
//   );
// };

// export const SidebarLink = ({
//   link,
//   className,
//   ...props
// }: {
//   link: Links;
//   className?: string;
// }) => {
//   const { open, animate } = useSidebar();
//   return (
//     <Link
//       to={link.href}
//       className={cn(
//         "flex items-center justify-start gap-2 group/sidebar py-2 px-3 rounded-lg hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors",
//         className
//       )}
//       {...props}
//     >
//       <span className="flex-shrink-0">{link.icon}</span>
//       <motion.span
//         animate={{
//           display: animate ? (open ? "inline-block" : "none") : "inline-block",
//           opacity: animate ? (open ? 1 : 0) : 1,
//         }}
//         className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre"
//       >
//         {link.label}
//       </motion.span>
//     </Link>
//   );
// };

// // Admin Sidebar
// export const AdminSidebar = () => {
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };

//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const mainLinks: Links[] = [
//     { label: "Dashboard", href: "/admin/dashboard", icon: <IconHome size={20} /> },
//     { label: "All Stamps", href: "/admin/stamps", icon: <IconList size={20} /> },
//     { label: "Manage Users", href: "/admin/users", icon: <IconUsers size={20} /> },
//     { label: "Settings", href: "/admin/settings", icon: <IconSettings size={20} /> },
//   ];

//   const stampLinks: Links[] = [
//     { label: "New Stamp", href: "/admin/addstamp", icon: <IconPlus size={20} /> },
//     { label: "Update Banner", href: "/admin/updatewave", icon: <IconPlus size={20} /> },
//     { label: "Add Carousel", href: "/admin/addcarousel", icon: <IconPlus size={20} /> },
//   ];

//   const { open, setOpen } = useSidebar();

//   return (
//     <Sidebar>
//       <SidebarBody>
//         <div className="flex flex-col gap-6 h-full">
//           <div className="flex items-center justify-between">
//             <motion.h1 
//               className="text-xl font-bold text-neutral-800 dark:text-neutral-200"
//               animate={{
//                 opacity: open ? 1 : 0,
//                 display: open ? "block" : "none",
//               }}
//             >
//               Admin Panel
//             </motion.h1>
//             <Link to="/" className="p-2 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-700">
//               <IconHome className="text-neutral-800 dark:text-neutral-200" />
//             </Link>
//           </div>

//           <nav className="flex flex-col gap-1">
//             {mainLinks.map((link) => (
//               <SidebarLink key={link.href} link={link} />
//             ))}
//           </nav>

//           <div className="mt-4">
//             <motion.h2 
//               className="text-xs uppercase font-semibold text-neutral-500 mb-2 px-3"
//               animate={{
//                 opacity: open ? 1 : 0,
//                 display: open ? "block" : "none",
//               }}
//             >
//               Stamp Management
//             </motion.h2>
//             <div className="flex flex-col gap-1">
//               {stampLinks.map((link) => (
//                 <SidebarLink key={link.href} link={link} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </SidebarBody>

//       {isMobile && (
//         <button
//           onClick={() => setOpen(!open)}
//           className="fixed top-4 left-4 z-40 p-2 rounded-md bg-neutral-800 text-white md:hidden"
//         >
//           {open ? <IconX size={24} /> : <IconMenu2 size={24} />}
//         </button>
//       )}
//     </Sidebar>
//   );
// };