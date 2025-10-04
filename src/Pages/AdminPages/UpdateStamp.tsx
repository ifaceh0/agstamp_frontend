import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
import { useGetAllCategoriesQuery } from "../../Redux/Api/adminApi"; // ✅ import API hook

interface StampForm {
  _id?: string;
  name: string;
  description: string;
  price: number;
  stock: number;
  active: boolean;
  beginDate: string;
  images: ({ publicUrl: string; publicId: string } | File)[]; 
  category: string; // New category field
}

const UpdateStamp: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { data: categories = [] } = useGetAllCategoriesQuery(); // ✅ fetch categories
  const [form, setForm] = useState<StampForm>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    active: true,
    beginDate: "",
    images: [],
    category: "", // Default value for category
  });

  //const [categories, setCategories] = useState<string[]>([]); // State for categories
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [existingImages, setExistingImages] = useState<{ publicUrl: string; publicId: string }[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [initialFormData, setInitialFormData] = useState<StampForm | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [stampRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getstamp/${id}`, {
            withCredentials: true,
          }),
        ]);

        const stamp = stampRes.data.stamp;

        const initialData = {
          name: stamp.name,
          description: stamp.description,
          price: stamp.price,
          stock: stamp.stock,
          active: stamp.active,
          beginDate: stamp.beginDate?.slice(0, 10) || "", // Format to yyyy-mm-dd
          images: stamp.images,
          category: stamp.categories?.[0] || "", // ✅ use categoryId (first if multiple)
        };

        setForm(initialData);
        //setCategories(categories); // Set categories
        setInitialFormData(initialData);
        setExistingImages(stamp.images);
        setPreviewImages(stamp.images.map((img: any) => img.publicUrl));
        setIsLoading(false);
      } catch (error) {
        toast.error("Failed to fetch stamp data");
        navigate("/admin/stamps");
      }
    };

    fetchData();
  }, [id, navigate]);

  const hasFormChanged = () => {
    if (!initialFormData) return false;

    return (
      form.name !== initialFormData.name ||
      form.description !== initialFormData.description ||
      form.price !== initialFormData.price ||
      form.stock !== initialFormData.stock ||
      form.active !== initialFormData.active ||
      form.beginDate !== initialFormData.beginDate ||
      form.category !== initialFormData.category ||
      form.images.some(img => img instanceof File) ||
      existingImages.length !== initialFormData.images.length
    );
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleToggleActive = () => {
    setForm(prev => ({ ...prev, active: !prev.active }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const validFiles = files.filter(file => {
        if (!file.type.startsWith('image/')) {
          toast.error(`File ${file.name} is not an image`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`File ${file.name} is too large (max 5MB)`);
          return false;
        }
        return true;
      });

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
      }));

      const newPreviews = validFiles.map(file => URL.createObjectURL(file));
      setPreviewImages(prev => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number, isExisting: boolean) => {
    if (isExisting) {
      setExistingImages(prev => prev.filter((_, i) => i !== index));
    } else {
      const newFiles = [...form.images];
      const removedFile = newFiles.splice(index - existingImages.length, 1)[0];

      if (removedFile instanceof File) {
        URL.revokeObjectURL(previewImages[index]);
      }

      setForm(prev => ({ ...prev, images: newFiles }));
      setPreviewImages(prev => prev.filter((_, i) => i !== index));
    }
  };

  function isUploadedImage(
    img: { publicUrl: string; publicId: string } | File
  ): img is { publicUrl: string; publicId: string } {
    return (img as any).publicId !== undefined;
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!hasFormChanged()) {
      toast.info("No changes detected");
      return;
    }

    if (form.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    if (form.stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    if (existingImages.length === 0 && form.images.every(img => !(img instanceof File))) {
      toast.error("Please upload at least one image");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();

      if (form.name !== initialFormData?.name) formData.append("name", form.name);
      if (form.description !== initialFormData?.description) formData.append("description", form.description);
      if (form.price !== initialFormData?.price) formData.append("price", form.price.toString());
      if (form.stock !== initialFormData?.stock) formData.append("stock", form.stock.toString());
      if (form.active !== initialFormData?.active) formData.append("active", form.active.toString());
      if (form.beginDate !== initialFormData?.beginDate) formData.append("beginDate", form.beginDate);
      if (form.category !== initialFormData?.category) {
  formData.append("categories", JSON.stringify([form.category]));
}


      const newImageFiles = form.images.filter(img => img instanceof File) as File[];
      newImageFiles.forEach(file => {
        formData.append("newImages", file);
      });

      const initialImageIds = initialFormData?.images?.flatMap((img) => isUploadedImage(img) ? [img.publicId] : []) || [];

      const removedImageIds = initialImageIds.filter(id =>
        !existingImages.some(img => img.publicId === id)
      );

      if (removedImageIds.length > 0) {
        formData.append("removedImages", JSON.stringify(removedImageIds));
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/updateStamp/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      toast.success("Stamp updated successfully!");
      navigate("/admin/stamps");
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to update stamp");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <FullscreenLoader />;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Update Stamp</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Stamp Name</label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
            required
          />
        </div>

        {/* Price, Stock, BeginDate */}
        <div className="grid grid-cols-3 gap-4">
          <div>
            <label htmlFor="price" className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <input
              id="price"
              name="price"
              type="number"
              value={form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="stock" className="block text-sm font-medium text-gray-700 mb-1">Stock</label>
            <input
              id="stock"
              name="stock"
              type="number"
              value={form.stock}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
              required
            />
          </div>
          <div>
            <label htmlFor="beginDate" className="block text-sm font-medium text-gray-700 mb-1">Begin Date</label>
            <input
              id="beginDate"
              name="beginDate"
              type="date"
              value={form.beginDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-md shadow-sm"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select
            id="category"
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat: any) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        {/* Images */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
            className="w-full px-4 py-2 border rounded-md shadow-sm"
          />
          <div className="mt-4">
            {previewImages.map((url, index) => (
              <div key={index} className="relative inline-block mr-4 mb-4">
                <img src={url} alt={`preview-${index}`} className="w-32 h-32 object-cover rounded-md shadow-sm" />
                <button
                  type="button"
                  onClick={() => removeImage(index, false)}
                  className="absolute top-0 right-0 bg-red-500 text-white rounded-full px-2 py-1"
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Active */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Active</label>
          <div className="flex items-center">
            <span className="text-sm mr-2">{form.active ? "Active" : "Inactive"}</span>
            <button
              type="button"
              onClick={handleToggleActive}
              className={`w-12 h-6 flex items-center rounded-full ${form.active ? "bg-green-500" : "bg-gray-300"}`}
            >
              <div
                className={`w-6 h-6 bg-white rounded-full transition-transform ${form.active ? "transform translate-x-6" : ""}`}
              />
            </button>
          </div>
        </div>

        {/* Submit Button */}
        <div className="text-center">
          <button
            type="submit"
            className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md"
            disabled={isLoading}
          >
            {isLoading ? "Updating..." : "Update Stamp"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateStamp;
