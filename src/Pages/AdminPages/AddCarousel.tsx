// import axios from "axios";
// import React, { useState } from "react";
// import { toast } from "react-toastify";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

// const AddCarousel: React.FC = () => {
//   const [name, setName] = useState("");
//   const [images, setImages] = useState<File[]>([]);
//   const [previewImages, setPreviewImages] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files) {
//       const files = Array.from(e.target.files);

//       const validFiles = files.filter((file) => {
//         if (!file.type.startsWith("image/")) {
//           toast.error(`File ${file.name} is not an image`);
//           return false;
//         }
//         if (file.size > 5 * 1024 * 1024) {
//           toast.error(`File ${file.name} is too large (max 5MB)`);
//           return false;
//         }
//         return true;
//       });

//       setImages((prev) => [...prev, ...validFiles]);
//       const previews = validFiles.map((file) => URL.createObjectURL(file));
//       setPreviewImages((prev) => [...prev, ...previews]);
//     }
//   };

//   const removeImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//     setPreviewImages((prev) => prev.filter((_, i) => i !== index));
//   };

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       toast.error("Carousel name is required");
//       return;
//     }

//     if (images.length === 0) {
//       toast.error("Please upload at least one image");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append("name", name);
//       images.forEach((file) => formData.append("images", file));

//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addCarousel`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       toast.success(res.data?.message);
//       setName("");
//       setImages([]);
//       setPreviewImages([]);
//     } catch (error: any) {
//       console.error(error);
//       toast.error(error.response?.data?.message || "Failed to add carousel");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
//       {isLoading && <FullscreenLoader />}
//       <h2 className="text-2xl font-bold text-center mb-6">Add Carousel Images</h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="name" className="block font-medium mb-1">Carousel Name</label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="e.g. Homepage Hero"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md"
//             required
//           />
//         </div>

//         <div>
//           <label className="block font-medium mb-1">Upload Images</label>
//           <input
//             type="file"
//             accept="image/*"
//             onChange={handleFileChange}
//             className="block w-full text-sm text-gray-500"
//           />
//           <p className="text-xs mt-1 text-gray-500">Only images up to 5MB allowed.</p>
//         </div>

//         {previewImages.length > 0 && (
//           <div className="flex flex-wrap gap-4 mt-2">
//             {previewImages.map((src, index) => (
//               <div key={index} className="relative group">
//                 <img src={src} className="h-24 w-24 rounded-md object-cover border" alt={`Preview ${index}`} />
//                 <button
//                   type="button"
//                   onClick={() => removeImage(index)}
//                   className="absolute -top-2 -right-2 bg-red-500 text-white w-6 h-6 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100"
//                 >
//                   X
//                 </button>
//               </div>
//             ))}
//           </div>
//         )}

//         <div className="text-right">
//           <button
//             type="submit"
//             className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 transition"
//           >
//             Upload
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCarousel;

// import axios from "axios";
// import React, { useState, useCallback, useRef } from "react";
// import { toast } from "react-toastify";
// import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
// import { FiUpload, FiX } from "react-icons/fi";

// const AddCarousel: React.FC = () => {
//   const [name, setName] = useState("");
//   const [images, setImages] = useState<File[]>([]);
//   const [previewImages, setPreviewImages] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [isDragging, setIsDragging] = useState(false);
//   const fileInputRef = useRef<HTMLInputElement>(null);

//   const handleFileChange = (files: FileList | null) => {
//     if (!files) return;

//     const validFiles = Array.from(files).filter((file) => {
//       if (!file.type.startsWith("image/")) {
//         toast.error(`File ${file.name} is not an image`);
//         return false;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         toast.error(`File ${file.name} is too large (max 5MB)`);
//         return false;
//       }
//       return true;
//     });

//     if (validFiles.length === 0) return;

//     setImages((prev) => [...prev, ...validFiles]);
//     const previews = validFiles.map((file) => URL.createObjectURL(file));
//     setPreviewImages((prev) => [...prev, ...previews]);
//   };

//   const removeImage = (index: number) => {
//     setImages((prev) => prev.filter((_, i) => i !== index));
//     setPreviewImages((prev) => prev.filter((_, i) => i !== index));
//     URL.revokeObjectURL(previewImages[index]);
//   };

//   const handleDragEnter = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(true);
//   }, []);

//   const handleDragLeave = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//   }, []);

//   const handleDragOver = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//   }, []);

//   const handleDrop = useCallback((e: React.DragEvent) => {
//     e.preventDefault();
//     e.stopPropagation();
//     setIsDragging(false);
//     handleFileChange(e.dataTransfer.files);
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     if (!name.trim()) {
//       toast.error("Carousel name is required");
//       return;
//     }

//     if (images.length === 0) {
//       toast.error("Please upload at least one image");
//       return;
//     }

//     try {
//       setIsLoading(true);
//       const formData = new FormData();
//       formData.append("name", name);
//       images.forEach((file) => formData.append("images", file));

//       const res = await axios.post(
//         `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addCarousel`,
//         formData,
//         {
//           headers: {
//             "Content-Type": "multipart/form-data",
//           },
//           withCredentials: true,
//         }
//       );

//       toast.success(res.data?.message || "Carousel added successfully");
//       setName("");
//       setImages([]);
//       setPreviewImages([]);
//     } catch (error: any) {
//       console.error("Upload error:", error);
//       toast.error(
//         error.response?.data?.message ||
//           error.message ||
//           "Failed to add carousel"
//       );
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current?.click();
//   };

//   return (
//     <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
//       {isLoading && <FullscreenLoader />}
//       <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
//         Add Carousel Images
//       </h2>
//       <form onSubmit={handleSubmit} className="space-y-6">
//         <div>
//           <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
//             Carousel Name
//           </label>
//           <input
//             id="name"
//             name="name"
//             type="text"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             placeholder="e.g. Homepage Hero Banner"
//             className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
//             required
//           />
//         </div>

//         <div>
//           <label className="block text-sm font-medium text-gray-700 mb-1">
//             Upload Images
//           </label>
//           <div
//             className={`mt-1 flex flex-col items-center justify-center px-6 pt-10 pb-10 border-2 border-dashed rounded-md transition-colors ${
//               isDragging
//                 ? "border-blue-500 bg-blue-50"
//                 : "border-gray-300 hover:border-gray-400"
//             }`}
//             onDragEnter={handleDragEnter}
//             onDragLeave={handleDragLeave}
//             onDragOver={handleDragOver}
//             onDrop={handleDrop}
//             onClick={triggerFileInput}
//           >
//             <div className="text-center space-y-3">
//               <FiUpload className="mx-auto h-10 w-10 text-gray-400" />
//               <div className="flex flex-col items-center text-sm text-gray-600">
//                 <p className="font-medium text-blue-600 hover:text-blue-500 cursor-pointer">
//                   Click to upload
//                 </p>
                
//               </div>
//               <p className="text-xs text-gray-500">
//                 PNG, JPG, JPEG up to 5MB each
//               </p>
//               <p className="text-xs text-gray-500">
//                 {images.length > 0
//                   ? `${images.length} file(s) selected`
//                   : "No files selected"}
//               </p>
//             </div>
//             <input
//               ref={fileInputRef}
//               type="file"
//               accept="image/*"
//               multiple
//               onChange={(e) => handleFileChange(e.target.files)}
//               className="hidden"
//             />
//           </div>
//         </div>

//         {previewImages.length > 0 && (
//           <div className="mt-4">
//             <h3 className="text-sm font-medium text-gray-700 mb-2">
//               Preview ({previewImages.length} image(s))
//             </h3>
//             <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
//               {previewImages.map((src, index) => (
//                 <div
//                   key={index}
//                   className="relative group rounded-md overflow-hidden border border-gray-200"
//                 >
//                   <img
//                     src={src}
//                     className="h-32 w-full object-cover"
//                     alt={`Preview ${index + 1}`}
//                   />
//                   <button
//                     type="button"
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       removeImage(index);
//                     }}
//                     className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
//                   >
//                     <FiX className="h-3 w-3" />
//                   </button>
//                   <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
//                     {images[index].name}
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         )}

//         <div className="flex justify-end space-x-3 pt-4">
//           <button
//             type="button"
//             onClick={() => {
//               setName("");
//               setImages([]);
//               setPreviewImages([]);
//             }}
//             className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
//           >
//             Clear All
//           </button>
//           <button
//             type="submit"
//             disabled={isLoading || !name || images.length === 0}
//             className={`px-6 py-2 rounded-md text-white ${
//               isLoading || !name || images.length === 0
//                 ? "bg-blue-400 cursor-not-allowed"
//                 : "bg-blue-600 hover:bg-blue-700"
//             }`}
//           >
//             {isLoading ? "Uploading..." : "Upload Carousel"}
//           </button>
//         </div>
//       </form>
//     </div>
//   );
// };

// export default AddCarousel;

import axios from "axios";
import React, { useState, useRef } from "react";
import { toast } from "react-toastify";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
import { FiX } from "react-icons/fi";

const AddCarousel: React.FC = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    // Only take the first file (single file selection)
    const file = files[0];

    if (!file.type.startsWith("image/")) {
      toast.error(`File ${file.name} is not an image`);
      return;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error(`File ${file.name} is too large (max 5MB)`);
      return;
    }

    // Clear previous image and preview if any
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }

    setImage(file);
    setPreviewImage(URL.createObjectURL(file));
  };

  const removeImage = () => {
    if (previewImage) {
      URL.revokeObjectURL(previewImage);
    }
    setImage(null);
    setPreviewImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      toast.error("Carousel name is required");
      return;
    }

    if (!image) {
      toast.error("Please upload an image");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", name);
      formData.append("image", image); // Note: field name changed to singular "image"

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addCarousel`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success(res.data?.message || "Carousel added successfully");
      setName("");
      removeImage();
    } catch (error: any) {
      console.error("Upload error:", error);
      toast.error(
        error.response?.data?.message ||
          error.message ||
          "Failed to add carousel"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-8 bg-white p-6 rounded-lg shadow-md">
      {isLoading && <FullscreenLoader />}
      <h2 className="text-2xl font-bold text-center mb-6 text-gray-800">
        Add Carousel
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
            Carousel Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Homepage Hero Banner"
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
          <input
            ref={fileInputRef}
            id="file-upload"
            name="image"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            // Remove the multiple attribute to allow only single file selection
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
        </div>

        {previewImage && (
          <div className="mt-4">
            <h3 className="text-sm font-medium text-gray-700 mb-2">Preview</h3>
            <div className="relative group rounded-md overflow-hidden border border-gray-200 max-w-xs">
              <img
                src={previewImage}
                className="h-32 w-full object-cover"
                alt="Preview"
              />
              <button
                type="button"
                onClick={removeImage}
                className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <FiX className="h-3 w-3" />
              </button>
              <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 truncate">
                {image?.name}
              </div>
            </div>
          </div>
        )}

        <div className="flex justify-end space-x-3 pt-4">
          <button
            type="button"
            onClick={() => {
              setName("");
              removeImage();
            }}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
          >
            Clear All
          </button>
          <button
            type="submit"
            disabled={isLoading || !name || !image}
            className={`px-6 py-2 rounded-md text-white ${
              isLoading || !name || !image
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {isLoading ? "Uploading..." : "Upload Carousel"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddCarousel;