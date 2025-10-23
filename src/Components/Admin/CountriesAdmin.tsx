// // // src/Admin/CountriesAdmin.tsx
// // import React, { useState } from "react";
// // import { useGetAllCountriesQuery, useAddCountryMutation,useDeleteCountryMutation } from "../../Redux/Api/adminApi";
// // import { toast } from "react-toastify";

// // const CountriesAdmin: React.FC = () => {
// //   const { data, isLoading } =  useGetAllCountriesQuery();
// //   const [addCountry] =  useAddCountryMutation();

// //   const [deleteCountry] =  useDeleteCountryMutation();

// //   const [name, setName] = useState("");
// //   const [code, setCode] = useState("");
 

// //   const handleAdd = async () => {
// //     try {
// //       await addCountry({ name, code }).unwrap();
// //       toast.success("Added");
// //       setName(""); setCode(""); //setDialCode("");
// //     } catch (err: any) {
// //       toast.error(err?.data?.message || "Failed");
// //     }
// //   };

// //   return (
// //     <div>
// //       <h2>Manage Countries</h2>
// //       <div>
// //         <input value={name} onChange={(e)=>setName(e.target.value)} placeholder="Name"/>
// //         <input value={code} onChange={(e)=>setCode(e.target.value)} placeholder="ISO Code (eg IN)"/>
// //         <button onClick={handleAdd}>Add</button>
// //       </div>

// //       {isLoading ? <p>Loading...</p> :
// //         <table>
// //           <thead><tr><th>Name</th><th>Code</th><th>Dial</th><th>Actions</th></tr></thead>
// //           <tbody>
// //             {data?.countries?.map((c:any) => (
// //               <tr key={c._id}>
// //                 <td>{c.name}</td>
// //                 <td>{c.code}</td>
// //                 {/*<td>{c.dialCode}</td>*/}
// //                 <td>
// //                   <button onClick={async ()=> {
// //                     const newName = prompt("Name", c.name);
// //                     if (!newName) return;
                    
// //                     toast.success("Updated");
// //                   }}>Edit</button>
// //                   <button onClick={async ()=> {
// //                     if (!confirm("Delete?")) return;
// //                     await deleteCountry(c._id).unwrap();
// //                     toast.success("Deleted");
// //                   }}>Delete</button>
// //                 </td>
// //               </tr>
// //             ))}
// //           </tbody>
// //         </table>
// //       }
// //     </div>
// //   );
// // };

// // export default CountriesAdmin;

// // src/Admin/CountriesAdmin.tsx
// import React, { useState } from "react";
// import { useGetAllCountriesQuery, useAddCountryMutation, useDeleteCountryMutation } from "../../Redux/Api/adminApi";
// import { toast } from "react-toastify";
// import { Plus, Edit2, Trash2, X } from "lucide-react";

// const CountriesAdmin: React.FC = () => {
//   const { data, isLoading, refetch } = useGetAllCountriesQuery();
//   const [addCountry, { isLoading: isAdding }] = useAddCountryMutation();
//   //const [updateCountry, { isLoading: isUpdating }] = useUpdateCountryMutation();
//   const [deleteCountry, { isLoading: isDeleting }] = useDeleteCountryMutation();

//   const [name, setName] = useState("");
//   const [code, setCode] = useState("");
//   const [active, setActive] = useState(true);
  
//   const [showEditModal, setShowEditModal] = useState(false);
//   const [editingCountry, setEditingCountry] = useState<any>(null);
//   const [editName, setEditName] = useState("");
//   const [editCode, setEditCode] = useState("");
//   const [editActive, setEditActive] = useState(true);

//   const handleAdd = async () => {
//     if (!name || !code) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     try {
//       await addCountry({ name, code, active }).unwrap();
//       toast.success("Added");
//       setName("");
//       setCode("");
//       setActive(true);
//       refetch();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed");
//     }
//   };

//   const handleEdit = (country: any) => {
//     setEditingCountry(country);
//     setEditName(country.name);
//     setEditCode(country.code);
//     setEditActive(country.active ?? true);
//     setShowEditModal(true);
//   };

//   const handleUpdate = async () => {
//     if (!editName || !editCode) {
//       toast.error("Please fill all fields");
//       return;
//     }
//     try {
//       // await updateCountry({ 
//       //   id: editingCountry._id, 
//       //   name: editName, 
//       //   code: editCode, 
//       //   active: editActive 
//       // }).unwrap();
//       toast.success("Updated");
//       setShowEditModal(false);
//       setEditingCountry(null);
//       refetch();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed");
//     }
//   };

//   const toggleActive = async (country: any) => {
//     try {
//       // await updateCountry({ 
//       //   id: country._id, 
//       //   active: !country.active 
//       // }).unwrap();
//       toast.success(`Country ${!country.active ? 'activated' : 'deactivated'}`);
//       refetch();
//     } catch (err: any) {
//       toast.error(err?.data?.message || "Failed to update status");
//     }
//   };

//   return (
//     <div className="p-4 sm:p-6 max-w-7xl mx-auto">
//       {/* Header */}
//       <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
//         <div>
//           <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Countries</h2>
//           <p className="text-gray-600 text-sm mt-1">Add and manage countries for shipping</p>
//         </div>
//       </div>

//       {/* Add Country Form */}
//       <div className="bg-white rounded-lg shadow-md p-6 mb-6">
//         <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Country</h3>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
//           <input 
//             value={name} 
//             onChange={(e) => setName(e.target.value)} 
//             placeholder="Country Name"
//             className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//           />
//           <input 
//             value={code} 
//             onChange={(e) => setCode(e.target.value.toUpperCase())} 
//             placeholder="ISO Code (eg AU)"
//             maxLength={2}
//             className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
//           />
//           <div className="flex items-center px-4 py-2.5 border border-gray-300 rounded-lg bg-gray-50">
//             <input
//               type="checkbox"
//               id="active-checkbox"
//               checked={active}
//               onChange={(e) => setActive(e.target.checked)}
//               className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
//             />
//             <label htmlFor="active-checkbox" className="ml-2 text-sm text-gray-700 cursor-pointer">
//               Active
//             </label>
//           </div>
//           <button 
//             onClick={handleAdd}
//             disabled={isAdding}
//             className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
//           >
//             <Plus size={18} />
//             {isAdding ? "Adding..." : "Add"}
//           </button>
//         </div>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg shadow-md overflow-hidden">
//         {isLoading ? (
//           <p className="text-center py-8 text-gray-600">Loading...</p>
//         ) : (
//           <div className="overflow-x-auto">
//             <table className="w-full">
//               <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
//                 <tr>
//                   <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
//                   <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
//                   <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Status</th>
//                   <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
//                 </tr>
//               </thead>
//               <tbody className="divide-y divide-gray-200">
//                 {data?.countries?.map((c: any) => (
//                   <tr key={c._id} className="hover:bg-gray-50 transition-colors">
//                     <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
//                       <div className="text-sm font-medium text-gray-900">{c.name}</div>
//                     </td>
//                     <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
//                       <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 font-mono">
//                         {c.code}
//                       </span>
//                     </td>
//                     <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
//                       <button
//                         onClick={() => toggleActive(c)}
//                         //disabled={isUpdating}
//                         className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold transition-all ${
//                           c.active
//                             ? "bg-green-100 text-green-800 hover:bg-green-200"
//                             : "bg-red-100 text-red-800 hover:bg-red-200"
//                         } disabled:opacity-50 disabled:cursor-not-allowed`}
//                       >
//                         <span className={`w-2 h-2 rounded-full mr-2 ${c.active ? 'bg-green-500' : 'bg-red-500'}`}></span>
//                         {c.active ? "Active" : "Inactive"}
//                       </button>
//                     </td>
//                     <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right space-x-2">
//                       <button 
//                         onClick={() => handleEdit(c)}
//                         //disabled={isUpdating || isDeleting}
//                         className="inline-flex items-center p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
//                         title="Edit"
//                       >
//                         <Edit2 size={18} />
//                       </button>
//                       <button 
//                         onClick={async () => {
//                           if (!window.confirm("Delete?")) return;
//                           try {
//                             await deleteCountry(c._id).unwrap();
//                             toast.success("Deleted");
//                             refetch();
//                           } catch (err: any) {
//                             toast.error(err?.data?.message || "Failed");
//                           }
//                         }}
//                         //disabled={isUpdating || isDeleting}
//                         className="inline-flex items-center p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
//                         title="Delete"
//                       >
//                         <Trash2 size={18} />
//                       </button>
//                     </td>
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           </div>
//         )}
//       </div>

//       {/* Edit Modal */}
//       {showEditModal && (
//         <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
//           <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
//             <div className="flex justify-between items-center mb-4">
//               <h3 className="text-xl font-bold text-gray-800">Edit Country</h3>
//               <button 
//                 onClick={() => setShowEditModal(false)} 
//                 className="text-gray-400 hover:text-gray-600 transition-colors"
//               >
//                 <X size={24} />
//               </button>
//             </div>
//             <div className="space-y-4">
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">Country Name *</label>
//                 <input
//                   type="text"
//                   value={editName}
//                   onChange={(e) => setEditName(e.target.value)}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
//                 />
//               </div>
//               <div>
//                 <label className="block text-sm font-medium text-gray-700 mb-2">ISO Code *</label>
//                 <input
//                   type="text"
//                   value={editCode}
//                   onChange={(e) => setEditCode(e.target.value.toUpperCase())}
//                   maxLength={2}
//                   className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
//                 />
//               </div>
//               <div className="flex items-center pt-2">
//                 <input
//                   type="checkbox"
//                   id="edit-active"
//                   checked={editActive}
//                   onChange={(e) => setEditActive(e.target.checked)}
//                   className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
//                 />
//                 <label htmlFor="edit-active" className="ml-3 block text-sm font-medium text-gray-700 cursor-pointer">
//                   Active
//                 </label>
//               </div>
//               <div className="flex gap-3 justify-end pt-4 border-t">
//                 <button
//                   onClick={() => setShowEditModal(false)}
//                   //disabled={isUpdating}
//                   className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   onClick={handleUpdate}
//                   //disabled={isUpdating}
//                   className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
//                 >
//                   {/*{isUpdating ? "Updating..." : "Update"}*/}
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default CountriesAdmin;

// src/Admin/CountriesAdmin.tsx
import React, { useState } from "react";
import { useGetAllCountriesQuery, useAddCountryMutation, useDeleteCountryMutation } from "../../Redux/Api/adminApi";//, useUpdateCountryMutation
import { toast } from "react-toastify";
import { Plus, Edit2, Trash2, X } from "lucide-react";

const CountriesAdmin: React.FC = () => {
  const { data, isLoading, refetch } = useGetAllCountriesQuery();
  const [addCountry, { isLoading: isAdding }] = useAddCountryMutation();
  //const [updateCountry, { isLoading: isUpdating }] = useUpdateCountryMutation();
  const [deleteCountry, { isLoading: isDeleting }] = useDeleteCountryMutation();

  const [name, setName] = useState("");
  const [code, setCode] = useState("");
  
  const [showEditModal, setShowEditModal] = useState(false);
  const [editingCountry, setEditingCountry] = useState<any>(null);
  const [editName, setEditName] = useState("");
  const [editCode, setEditCode] = useState("");

  const handleAdd = async () => {
    if (!name || !code) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      await addCountry({ name, code }).unwrap();
      toast.success("Added");
      setName("");
      setCode("");
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed");
    }
  };

  const handleEdit = (country: any) => {
    setEditingCountry(country);
    setEditName(country.name);
    setEditCode(country.code);
    setShowEditModal(true);
  };

  const handleUpdate = async () => {
    if (!editName || !editCode) {
      toast.error("Please fill all fields");
      return;
    }
    try {
      // await updateCountry({ 
      //   id: editingCountry._id, 
      //   name: editName, 
      //   code: editCode
      // }).unwrap();
      toast.success("Updated");
      setShowEditModal(false);
      setEditingCountry(null);
      refetch();
    } catch (err: any) {
      toast.error(err?.data?.message || "Failed");
    }
  };

  return (
    <div className="p-4 sm:p-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
        <div>
          <h2 className="text-2xl sm:text-3xl font-bold text-gray-800">Manage Countries</h2>
          <p className="text-gray-600 text-sm mt-1">Add and manage countries for shipping</p>
        </div>
      </div>

      {/* Add Country Form */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Add New Country</h3>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <input 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            placeholder="Country Name"
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input 
            value={code} 
            onChange={(e) => setCode(e.target.value.toUpperCase())} 
            placeholder="ISO Code (eg AU)"
            maxLength={2}
            className="px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
          />
          <button 
            onClick={handleAdd}
            disabled={isAdding}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Plus size={18} />
            {isAdding ? "Adding..." : "Add"}
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        {isLoading ? (
          <p className="text-center py-8 text-gray-600">Loading...</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100 border-b-2 border-gray-200">
                <tr>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Name</th>
                  <th className="px-4 sm:px-6 py-4 text-left text-xs font-semibold text-gray-700 uppercase tracking-wider">Code</th>
                  <th className="px-4 sm:px-6 py-4 text-right text-xs font-semibold text-gray-700 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {data?.countries?.map((c: any) => (
                  <tr key={c._id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{c.name}</div>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium bg-gray-100 text-gray-800 font-mono">
                        {c.code}
                      </span>
                    </td>
                    <td className="px-4 sm:px-6 py-4 whitespace-nowrap text-right space-x-2">
                      <button 
                        onClick={() => handleEdit(c)}
                       // disabled={isUpdating || isDeleting}
                        className="inline-flex items-center p-2 text-blue-600 hover:text-blue-900 hover:bg-blue-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Edit"
                      >
                        <Edit2 size={18} />
                      </button>
                      <button 
                        onClick={async () => {
                          if (!window.confirm("Delete?")) return;
                          try {
                            await deleteCountry(c._id).unwrap();
                            toast.success("Deleted");
                            refetch();
                          } catch (err: any) {
                            toast.error(err?.data?.message || "Failed");
                          }
                        }}
                       // disabled={isUpdating || isDeleting}
                        className="inline-flex items-center p-2 text-red-600 hover:text-red-900 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
                        title="Delete"
                      >
                        <Trash2 size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-xl">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-gray-800">Edit Country</h3>
              <button 
                onClick={() => setShowEditModal(false)} 
                className="text-gray-400 hover:text-gray-600 transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Country Name *</label>
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">ISO Code *</label>
                <input
                  type="text"
                  value={editCode}
                  onChange={(e) => setEditCode(e.target.value.toUpperCase())}
                  maxLength={2}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 uppercase"
                />
              </div>
              <div className="flex gap-3 justify-end pt-4 border-t">
                <button
                  onClick={() => setShowEditModal(false)}
                 // disabled={isUpdating}
                  className="px-4 py-2.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors disabled:opacity-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleUpdate}
                 // disabled={isUpdating}
                  className="px-4 py-2.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50"
                >
                 {/*} {isUpdating ? "Updating..." : "Update"}*/}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CountriesAdmin;