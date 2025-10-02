// import { Link } from "react-router-dom";
// import {
//   useAllStampsQuery,
//   useDeleteStampMutation,
// } from "../../Redux/Api/adminApi";
// import {
//   FiImage,
//   FiEdit2,
//   FiTrash2,
//   FiToggleLeft,
//   FiToggleRight,
//   FiSearch,
// } from "react-icons/fi";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

// const AllStamp = () => {
//   const { data: data1, isLoading: load } = useAllStampsQuery();
//   const [stamps, setStamps] = useState<Stamp[]>();
//   const [filteredStamps, setFilteredStamps] = useState<Stamp[]>();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [deleteStamp, { isLoading }] = useDeleteStampMutation();

//   useEffect(() => {
//     if (data1) {
//       setStamps(data1.stamps);
//       setFilteredStamps(data1.stamps);
//     }
//   }, [data1?.stamps]);

//   useEffect(() => {
//     if (stamps) {
//       const filtered = stamps.filter(
//         (stamp) =>
//           stamp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           stamp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (stamp.categories && stamp.categories.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//       setFilteredStamps(filtered);
//     }
//   }, [searchTerm, stamps]);

//   const formatDate = (isoString: string) => {
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   return (
//     <div className="w-full">
//       {/* Search Bar */}
//       <div className="mb-4 relative max-w-md">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <FiSearch className="text-gray-400" />
//         </div>
//         <input
//           type="text"
//           className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           placeholder="Search by name, description or category..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm">
//         {(isLoading || load) && <FullscreenLoader />}
//         <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Image</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Description</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Begin Date</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">End Date</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Created</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Updated</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {filteredStamps?.map((stamp) => (
//               <tr key={stamp._id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   {stamp.images?.[0]?.publicUrl ? (
//                     <img
//                       className="h-10 w-10 rounded-full object-cover"
//                       src={stamp.images[0].publicUrl}
//                       alt={stamp.name}
//                     />
//                   ) : (
//                     <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
//                       <FiImage className="text-gray-400" />
//                     </div>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap font-medium">
//                   {stamp.name.length > 10 ? stamp.name.substring(0, 9) + "..." : stamp.name}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   {stamp.categories || "—"}
//                 </td>
//                 <td className="px-4 py-3 max-w-xs line-clamp-2 text-gray-500">
//                   {stamp.description.length > 10 ? stamp.description.substring(0, 9) + "..." : stamp.description}
//                 </td>
//                 <td className="px-4 py-3 font-semibold text-gray-900">
//                   ${stamp.price.toFixed(2)}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     stamp.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                   }`}>
//                     {stamp.stock} {stamp.stock === 1 ? "item" : "items"}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <button
//                     className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
//                       stamp.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                     }`}
//                     onClick={() => {
//                       console.log("Toggle status for:", stamp._id);
//                     }}
//                   >
//                     {stamp.active ? (
//                       <FiToggleRight className="h-5 w-5 text-green-600" />
//                     ) : (
//                       <FiToggleLeft className="h-5 w-5 text-red-600" />
//                     )}
//                     {stamp.active ? "Active" : "Inactive"}
//                   </button>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-gray-500">
//                   {stamp.beginDate ? formatDate(stamp.beginDate) : "—"}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-gray-500">
//                   {stamp.endDate ? formatDate(stamp.endDate) : "—"}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-gray-500">
//                   {formatDate(stamp.createdAt as string)}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-gray-500">
//                   {formatDate(stamp.updatedAt as string)}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
//                   <div className="flex space-x-3">
//                     <Link
//                       to={`${stamp._id}`}
//                       className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
//                     >
//                       <FiEdit2 className="h-5 w-5" />
//                     </Link>
//                     <button
//                       className={`${
//                         stamp?.active
//                           ? "text-gray-600 hover:text-gray-900"
//                           : "text-red-600 hover:text-red-900"
//                       } p-1 rounded-md hover:bg-red-50 transition-colors`}
//                       disabled={stamp?.active}
//                       onClick={async () => {
//                         try {
//                           const result = await deleteStamp(stamp._id).unwrap();
//                           if (result?.stamps) {
//                             setStamps(result.stamps);
//                           }
//                           if (result?.message) {
//                             toast.success(result.message);
//                           }
//                         } catch (error) {
//                           toast.error("Failed to delete stamp");
//                         }
//                       }}
//                     >
//                       <FiTrash2 className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredStamps?.length === 0 && (
//           <div className="p-4 text-center text-gray-500">
//             No stamps found matching your search criteria
//           </div>
//         )}

//         <p className="text-xs text-gray-400 p-3 md:hidden">
//           Scroll sideways to view full table on mobile →
//         </p>
//       </div>
//     </div>
//   );
// };

// export default AllStamp;


// import { Link } from "react-router-dom";
// import {
//   useAllStampsQuery,
//   useDeleteStampMutation,
// } from "../../Redux/Api/adminApi";
// import {
//   FiImage,
//   FiEdit2,
//   FiTrash2,
//   FiToggleLeft,
//   FiToggleRight,
//   FiSearch,
//   FiChevronLeft,
//   FiChevronRight,
// } from "react-icons/fi";
// import { useEffect, useState } from "react";
// import { toast } from "react-toastify";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

// const AllStamp = () => {
//   const { data: data1, isLoading: load } = useAllStampsQuery();
//   const [stamps, setStamps] = useState<Stamp[]>();
//   const [filteredStamps, setFilteredStamps] = useState<Stamp[]>();
//   const [searchTerm, setSearchTerm] = useState("");
//   const [deleteStamp, { isLoading }] = useDeleteStampMutation();
  
//   // Pagination state
//   const [currentPage, setCurrentPage] = useState(1);
//   const itemsPerPage = 20;

//   useEffect(() => {
//     if (data1) {
//       setStamps(data1.stamps);
//       setFilteredStamps(data1.stamps);
//       setCurrentPage(1); // Reset to first page when data changes
//     }
//   }, [data1?.stamps]);

//   useEffect(() => {
//     if (stamps) {
//       const filtered = stamps.filter(
//         (stamp) =>
//           stamp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           stamp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
//           (stamp.categories && stamp.categories.toLowerCase().includes(searchTerm.toLowerCase()))
//       );
//       setFilteredStamps(filtered);
//       setCurrentPage(1); // Reset to first page when search changes
//     }
//   }, [searchTerm, stamps]);

//   // Get current stamps for the current page
//   const indexOfLastItem = currentPage * itemsPerPage;
//   const indexOfFirstItem = indexOfLastItem - itemsPerPage;
//   const currentStamps = filteredStamps?.slice(indexOfFirstItem, indexOfLastItem) || [];
//   const totalPages = Math.ceil((filteredStamps?.length || 0) / itemsPerPage);

//   const formatDate = (isoString: string) => {
//     const date = new Date(isoString);
//     return date.toLocaleString();
//   };

//   // Pagination controls component
//   const PaginationControls = () => (
//     <div className="flex items-center justify-between mt-4">
//       <div className="text-sm text-gray-500">
//         Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
//         <span className="font-medium">
//           {Math.min(indexOfLastItem, filteredStamps?.length || 0)}
//         </span> of{" "}
//         <span className="font-medium">{filteredStamps?.length || 0}</span> results
//       </div>
//       <div className="flex space-x-2">
//         <button
//           onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
//           disabled={currentPage === 1}
//           className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <FiChevronLeft className="h-4 w-4" />
//         </button>
        
//         {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//           // Show pages around current page
//           let pageNum;
//           if (totalPages <= 5) {
//             pageNum = i + 1;
//           } else if (currentPage <= 3) {
//             pageNum = i + 1;
//           } else if (currentPage >= totalPages - 2) {
//             pageNum = totalPages - 4 + i;
//           } else {
//             pageNum = currentPage - 2 + i;
//           }
          
//           return (
//             <button
//               key={pageNum}
//               onClick={() => setCurrentPage(pageNum)}
//               className={`px-3 py-1 rounded-md border text-sm font-medium ${
//                 currentPage === pageNum
//                   ? "bg-blue-600 border-blue-600 text-white"
//                   : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
//               }`}
//             >
//               {pageNum}
//             </button>
//           );
//         })}
        
//         {totalPages > 5 && currentPage < totalPages - 2 && (
//           <span className="px-3 py-1 text-gray-500">...</span>
//         )}
        
//         {totalPages > 5 && currentPage < totalPages - 2 && (
//           <button
//             onClick={() => setCurrentPage(totalPages)}
//             className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
//           >
//             {totalPages}
//           </button>
//         )}
        
//         <button
//           onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
//           disabled={currentPage === totalPages || totalPages === 0}
//           className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
//         >
//           <FiChevronRight className="h-4 w-4" />
//         </button>
//       </div>
//     </div>
//   );

//   return (
//     <div className="w-full">
//       {/* Search Bar */}
//       <div className="mb-4 relative max-w-md">
//         <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
//           <FiSearch className="text-gray-400" />
//         </div>
//         <input
//           type="text"
//           className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
//           placeholder="Search by name, description or category..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       {/* Pagination at the top */}
//       <PaginationControls />

//       <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm mt-2">
//         {(isLoading || load) && <FullscreenLoader />}
//         <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
//           <thead className="bg-gray-50">
//             <tr>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Image</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Name</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Category</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Description</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Price</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Stock</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Status</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Begin Date</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">End Date</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Created</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Updated</th>
//               <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
//             </tr>
//           </thead>
//           <tbody className="bg-white divide-y divide-gray-200">
//             {currentStamps.map((stamp) => (
//               <tr key={stamp._id} className="hover:bg-gray-50 transition-colors">
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   {stamp.images?.[0]?.publicUrl ? (
//                     <img
//                       className="h-10 w-10 rounded-full object-cover"
//                       src={stamp.images[0].publicUrl}
//                       alt={stamp.name}
//                     />
//                   ) : (
//                     <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
//                       <FiImage className="text-gray-400" />
//                     </div>
//                   )}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap font-medium">
//                   {stamp.name.length > 10 ? stamp.name.substring(0, 9) + "..." : stamp.name}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   {stamp.categories || "—"}
//                 </td>
//                 <td className="px-4 py-3 max-w-xs line-clamp-2 text-gray-500">
//                   {stamp.description.length > 10 ? stamp.description.substring(0, 9) + "..." : stamp.description}
//                 </td>
//                 <td className="px-4 py-3 font-semibold text-gray-900">
//                   ${stamp.price.toFixed(2)}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
//                     stamp.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                   }`}>
//                     {stamp.stock} {stamp.stock === 1 ? "item" : "items"}
//                   </span>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap">
//                   <button
//                     className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
//                       stamp.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
//                     }`}
//                     onClick={() => {
//                       console.log("Toggle status for:", stamp._id);
//                     }}
//                   >
//                     {stamp.active ? (
//                       <FiToggleRight className="h-5 w-5 text-green-600" />
//                     ) : (
//                       <FiToggleLeft className="h-5 w-5 text-red-600" />
//                     )}
//                     {stamp.active ? "Active" : "Inactive"}
//                   </button>
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-gray-500">
//                   {stamp.beginDate ? formatDate(stamp.beginDate) : "—"}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-gray-500">
//                   {stamp.endDate ? formatDate(stamp.endDate) : "—"}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-gray-500">
//                   {formatDate(stamp.createdAt as string)}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-gray-500">
//                   {formatDate(stamp.updatedAt as string)}
//                 </td>
//                 <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
//                   <div className="flex space-x-3">
//                     <Link
//                       to={`${stamp._id}`}
//                       className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
//                     >
//                       <FiEdit2 className="h-5 w-5" />
//                     </Link>
//                     <button
//                       className={`${
//                         stamp?.active
//                           ? "text-gray-600 hover:text-gray-900"
//                           : "text-red-600 hover:text-red-900"
//                       } p-1 rounded-md hover:bg-red-50 transition-colors`}
//                       disabled={stamp?.active}
//                       onClick={async () => {
//                         try {
//                           const result = await deleteStamp(stamp._id).unwrap();
//                           if (result?.stamps) {
//                             setStamps(result.stamps);
//                           }
//                           if (result?.message) {
//                             toast.success(result.message);
//                           }
//                         } catch (error) {
//                           toast.error("Failed to delete stamp");
//                         }
//                       }}
//                     >
//                       <FiTrash2 className="h-5 w-5" />
//                     </button>
//                   </div>
//                 </td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {filteredStamps?.length === 0 && (
//           <div className="p-4 text-center text-gray-500">
//             No stamps found matching your search criteria
//           </div>
//         )}

//         <p className="text-xs text-gray-400 p-3 md:hidden">
//           Scroll sideways to view full table on mobile →
//         </p>
//       </div>

//       {/* Pagination at the bottom */}
//       <PaginationControls />
//     </div>
//   );
// };

// export default AllStamp;

import { Link } from "react-router-dom";
import {
  useAllStampsQuery,
  useDeleteStampMutation,
} from "../../Redux/Api/adminApi";
import {
  FiImage,
  FiEdit2,
  FiTrash2,
  FiToggleLeft,
  FiToggleRight,
  FiSearch,
  FiChevronLeft,
  FiChevronRight,
  FiArrowUp,
  FiArrowDown,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
import { Stamp } from "../../types"; // Adjust path if needed

const AllStamp = () => {
  const { data: data1, isLoading: load } = useAllStampsQuery();
  const [stamps, setStamps] = useState<Stamp[]>();
  const [filteredStamps, setFilteredStamps] = useState<Stamp[]>();
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteStamp, { isLoading }] = useDeleteStampMutation();
  
  // Sorting state
  const [sortConfig, setSortConfig] = useState<{
    key: keyof Stamp | "categories";
    direction: "ascending" | "descending";
  } | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  useEffect(() => {
    if (data1) {
      // Map categories to array if needed
      const mappedStamps = data1.stamps.map((stamp: any) => ({
        ...stamp,
        categories: Array.isArray(stamp.categories)
          ? stamp.categories
          : typeof stamp.categories === "string"
            ? [stamp.categories]
            : [],
      }));
      setStamps(mappedStamps);
      setFilteredStamps(mappedStamps);
      setCurrentPage(1);
    }
  }, [data1?.stamps]);

  // Apply sorting to stamps
  const applySort = (stampsToSort: Stamp[]) => {
    if (!sortConfig) return stampsToSort;
    
    return [...stampsToSort].sort((a, b) => {
      let valueA: any;
      let valueB: any;

      // Handle category sort (array of categories)
      if (sortConfig.key === "categories") {
        valueA = Array.isArray(a.categories)
          ? a.categories.map((cat: any) => cat?.name).join(", ")
          : "";
        valueB = Array.isArray(b.categories)
          ? b.categories.map((cat: any) => cat?.name).join(", ")
          : "";
      } else {
        valueA = a[sortConfig.key as keyof Stamp];
        valueB = b[sortConfig.key as keyof Stamp];
      }

      // Handle different data types
      if (typeof valueA === "string" && typeof valueB === "string") {
        valueA = valueA.toLowerCase();
        valueB = valueB.toLowerCase();
      } else if (valueA instanceof Date && valueB instanceof Date) {
        valueA = valueA.getTime();
        valueB = valueB.getTime();
      }

      if (valueA < valueB) {
        return sortConfig.direction === "ascending" ? -1 : 1;
      }
      if (valueA > valueB) {
        return sortConfig.direction === "ascending" ? 1 : -1;
      }
      return 0;
    });
  };

  useEffect(() => {
    if (stamps) {
      const filtered = stamps.filter((stamp) =>
        stamp.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        stamp.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (Array.isArray(stamp.categories) &&
          stamp.categories.some((cat: any) =>
            cat?.name?.toLowerCase().includes(searchTerm.toLowerCase())
          ))
      );
      
      const sorted = applySort(filtered);
      setFilteredStamps(sorted);
      setCurrentPage(1);
    }
  }, [searchTerm, stamps, sortConfig]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentStamps = filteredStamps?.slice(indexOfFirstItem, indexOfLastItem) || [];
  const totalPages = Math.ceil((filteredStamps?.length || 0) / itemsPerPage);

  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleString();
  };

  const requestSort = (key: keyof Stamp | "categories") => {
    let direction: "ascending" | "descending" = "ascending";
    if (sortConfig && sortConfig.key === key) {
      direction = sortConfig.direction === "ascending" ? "descending" : "ascending";
    }
    setSortConfig({ key, direction });
  };

  const getSortIndicator = (key: keyof Stamp | "categories") => {
    if (!sortConfig || sortConfig.key !== key) return null;
    return sortConfig.direction === "ascending" ? (
      <FiArrowUp className="ml-1 inline" size={14} />
    ) : (
      <FiArrowDown className="ml-1 inline" size={14} />
    );
  };

  const PaginationControls = () => (
    <div className="flex items-center justify-between mt-4">
      <div className="text-sm text-gray-500">
        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
        <span className="font-medium">
          {Math.min(indexOfLastItem, filteredStamps?.length || 0)}
        </span> of{" "}
        <span className="font-medium">{filteredStamps?.length || 0}</span> results
      </div>
      <div className="flex space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronLeft className="h-4 w-4" />
        </button>

        {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
          let pageNum;
          if (totalPages <= 5) {
            pageNum = i + 1;
          } else if (currentPage <= 3) {
            pageNum = i + 1;
          } else if (currentPage >= totalPages - 2) {
            pageNum = totalPages - 4 + i;
          } else {
            pageNum = currentPage - 2 + i;
          }

          return (
            <button
              key={pageNum}
              onClick={() => setCurrentPage(pageNum)}
              className={`px-3 py-1 rounded-md border text-sm font-medium ${
                currentPage === pageNum
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-gray-300 text-gray-700 hover:bg-gray-50"
              }`}
            >
              {pageNum}
            </button>
          );
        })}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <span className="px-3 py-1 text-gray-500">...</span>
        )}

        {totalPages > 5 && currentPage < totalPages - 2 && (
          <button
            onClick={() => setCurrentPage(totalPages)}
            className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
          >
            {totalPages}
          </button>
        )}

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages || totalPages === 0}
          className="px-3 py-1 rounded-md border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );

  return (
    <div className="w-full">
      {/* Search Bar */}
      <div className="mb-4 relative max-w-md">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
        <input
          type="text"
          className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Search by name, description or category..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <PaginationControls />

      <div className="overflow-x-auto border border-gray-200 rounded-lg shadow-sm mt-2">
        {(isLoading || load) && <FullscreenLoader />}
        <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Image</th>
              <th 
                className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("name")}
              >
                <div className="flex items-center">Name {getSortIndicator("name")}</div>
              </th>
              <th 
                className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("categories")}
              >
                <div className="flex items-center">Category {getSortIndicator("categories")}</div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th 
                className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("price")}
              >
                <div className="flex items-center">Price {getSortIndicator("price")}</div>
              </th>
              <th 
                className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("stock")}
              >
                <div className="flex items-center">Stock {getSortIndicator("stock")}</div>
              </th>
              <th 
                className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("active")}
              >
                <div className="flex items-center">Status {getSortIndicator("active")}</div>
              </th>
              <th 
                className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("beginDate")}
              >
                <div className="flex items-center">Begin Date {getSortIndicator("beginDate")}</div>
              </th>
              <th 
                className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("endDate")}
              >
                <div className="flex items-center">End Date {getSortIndicator("endDate")}</div>
              </th>
              <th 
                className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("createdAt")}
              >
                <div className="flex items-center">Created {getSortIndicator("createdAt")}</div>
              </th>
              <th 
                className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                onClick={() => requestSort("updatedAt")}
              >
                <div className="flex items-center">Updated {getSortIndicator("updatedAt")}</div>
              </th>
              <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {currentStamps.map((stamp) => (
              <tr key={stamp._id} className="hover:bg-gray-50 transition-colors">
                <td className="px-4 py-3 whitespace-nowrap">
                  {stamp.images?.[0]?.publicUrl ? (
                    <img className="h-10 w-10 rounded-full object-cover" src={stamp.images[0].publicUrl} alt={stamp.name} />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <FiImage className="text-gray-400" />
                    </div>
                  )}
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-medium">
                  {stamp.name.length > 10 ? stamp.name.substring(0, 9) + "..." : stamp.name}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {Array.isArray(stamp.categories)
                    ? stamp.categories.map((cat: any) => cat?.name).join(", ")
                    : "—"}
                </td>
                <td className="px-4 py-3 max-w-xs line-clamp-2 text-gray-500">
                  {stamp.description.length > 10 ? stamp.description.substring(0, 9) + "..." : stamp.description}
                </td>
                <td className="px-4 py-3 font-semibold text-gray-900">${stamp.price.toFixed(2)}</td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span
                    className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      stamp.stock > 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stamp.stock} {stamp.stock === 1 ? "item" : "items"}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <button
                    className={`flex items-center gap-2 px-3 py-1 rounded-full text-sm font-medium ${
                      stamp.active ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {stamp.active ? (
                      <FiToggleRight className="h-5 w-5 text-green-600" />
                    ) : (
                      <FiToggleLeft className="h-5 w-5 text-red-600" />
                    )}
                    {stamp.active ? "Active" : "Inactive"}
                  </button>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                  {stamp.beginDate ? formatDate(stamp.beginDate) : "—"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">
                  {stamp.endDate ? formatDate(stamp.endDate) : "—"}
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{formatDate(stamp.createdAt as string)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-gray-500">{formatDate(stamp.updatedAt as string)}</td>
                <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                  <div className="flex space-x-3">
                    <Link
                      to={`${stamp._id}`}
                      className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                    >
                      <FiEdit2 className="h-5 w-5" />
                    </Link>
                    <button
                      className={`${
                        stamp?.active ? "text-gray-600 hover:text-gray-900" : "text-red-600 hover:text-red-900"
                      } p-1 rounded-md hover:bg-red-50 transition-colors`}
                      disabled={stamp?.active}
                      onClick={async () => {
                        try {
                          const result = await deleteStamp(stamp._id).unwrap();
                          if (result?.stamps) {
                            const mappedStamps = result.stamps.map((stamp: any) => ({
                              ...stamp,
                              categories: Array.isArray(stamp.categories)
                                ? stamp.categories
                                : typeof stamp.categories === "string"
                                  ? [stamp.categories]
                                  : [],
                            }));
                            setStamps(mappedStamps);
                          }
                          if (result?.message) {
                            toast.success(result.message);
                          }
                        } catch (error) {
                          toast.error("Failed to delete stamp");
                        }
                      }}
                    >
                      <FiTrash2 className="h-5 w-5" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStamps?.length === 0 && (
          <div className="p-4 text-center text-gray-500">No stamps found matching your search criteria</div>
        )}
        <p className="text-xs text-gray-400 p-3 md:hidden">Scroll sideways to view full table on mobile →</p>
      </div>

      <PaginationControls />
    </div>
  );
};

export default AllStamp;
