import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
import { Category } from "../../types"; // adjust path

// ✅ Fix StampForm to hold category IDs (strings), not objects
interface StampForm {
  name: string;
  description: string;
  price: number;
  stock: number;
  images: File[];
  beginDate: string;
  categories: string[]; // store IDs only
}

const AddStamp: React.FC = () => {
  const [form, setForm] = useState<StampForm>({
    name: "",
    description: "",
    price: 0,
    stock: 0,
    images: [],
    beginDate: "",
    categories: [],
  });

  const [categories, setCategories] = useState<Category[]>([]);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const [showModal, setShowModal] = useState(false);
  const [newCategory, setNewCategory] = useState("");
  const [isAddingCategory, setIsAddingCategory] = useState(false);

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/getcategories`,
        { withCredentials: true }
      );
      setCategories(res.data);
    } catch (error: any) {
      toast.error(error.response?.data?.error || "Failed to load categories");
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  function removeLeadingZeros(value: string): string {
    const cleaned = value.replace(/^0+/, "");
    return cleaned === "" ? "0" : cleaned;
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    if (name === "categories") {
      // ✅ Handle category selection (multi or single)
      setForm((prev) => ({
        ...prev,
        categories: [value], // single select
      }));
    } else {
      setForm((prev) => ({
        ...prev,
        [name]:
          name === "price" || name === "stock"
            ? name === "stock"
              ? Number(removeLeadingZeros(value))
              : Number(value)
            : value,
      }));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);

      const validFiles = files.filter((file) => {
        if (!file.type.startsWith("image/")) {
          alert(`File ${file.name} is not an image`);
          return false;
        }
        if (file.size > 5 * 1024 * 1024) {
          alert(`File ${file.name} is too large (max 5MB)`);
          return false;
        }
        return true;
      });

      setForm((prev) => ({
        ...prev,
        images: [...prev.images, ...validFiles],
      }));

      const newPreviews = validFiles.map((file) => URL.createObjectURL(file));
      setPreviewImages((prev) => [...prev, ...newPreviews]);
    }
  };

  const removeImage = (index: number) => {
    setForm((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Cleanup object URLs on unmount
  useEffect(() => {
    return () => previewImages.forEach((url) => URL.revokeObjectURL(url));
  }, [previewImages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (form.price <= 0) {
      toast.error("Price must be greater than 0");
      return;
    }

    if (form.stock < 0) {
      toast.error("Stock cannot be negative");
      return;
    }

    if (form.images.length === 0) {
      toast.error("Please upload at least one image");
      return;
    }

    if (!form.beginDate) {
      toast.error("Begin Date is required");
      return;
    }

    if (!form.categories.length) {
      toast.error("Please select a category");
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append("name", form.name);
      formData.append("description", form.description);
      formData.append("price", form.price.toString());
      formData.append("stock", form.stock.toString());
      formData.append("beginDate", form.beginDate);

      // ✅ send array of IDs as JSON
      formData.append("categories", JSON.stringify(form.categories));

      form.images.forEach((file) => formData.append("images", file));

      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addStamp`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success(res.data?.message || "Stamp added successfully");
      setForm({
        name: "",
        description: "",
        price: 0,
        stock: 0,
        images: [],
        beginDate: "",
        categories: [],
      });
      setPreviewImages([]);
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || "Failed to add stamp");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      {isLoading && <FullscreenLoader />}
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Add New Stamp
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Stamp Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            placeholder="e.g. Rare Vintage Stamp"
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Categories */}
        <div>
          <label
            htmlFor="categories"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Category
          </label>
          <select
            id="categories"
            name="categories"
            value={form.categories[0] || ""} // ✅ single select
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat._id}>
                {cat.name}
              </option>
            ))}
          </select>

          <button
            type="button"
            className="text-blue-600 mt-2 underline"
            onClick={() => setShowModal(true)}
          >
            + Add New Category
          </button>
        </div>

        {/* Description */}
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            placeholder="Describe the stamp details..."
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            required
          />
        </div>

        {/* Price, Stock, Begin Date */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Price ($)
            </label>
            <input
              id="price"
              name="price"
              type="number"
              min="0.01"
              step="0.01"
              placeholder="1.00"
              value={form.price === 0 ? "" : form.price}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Stock Quantity
            </label>
            <input
              id="stock"
              name="stock"
              type="number"
              min="0"
              placeholder="0"
              value={removeLeadingZeros(`${form.stock}`)}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <label
              htmlFor="beginDate"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Begin Date
            </label>
            <input
              id="beginDate"
              name="beginDate"
              type="date"
              value={form.beginDate}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
          </label>
          <input
            id="file-upload"
            name="images"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            multiple
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
          />
          <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF up to 5MB</p>
        </div>

        {/* Image Preview */}
        {previewImages.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Preview Images
            </h3>
            <div className="flex flex-wrap gap-4">
              {previewImages.map((preview, index) => (
                <div key={index} className="relative group">
                  <img
                    src={preview}
                    alt={`Preview ${index}`}
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    X
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Submit */}
        <div className="flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
          >
            Submit Form
          </button>
        </div>
      </form>

      {/* Add Category Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-md w-96">
            <h3 className="text-lg font-semibold mb-4">Add New Category</h3>
            <input
              type="text"
              placeholder="Category name"
              className="w-full border p-2 rounded mb-4"
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
            />
            <div className="flex justify-end gap-2">
              <button
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                className="px-4 py-2 bg-blue-600 text-white rounded"
                disabled={isAddingCategory}
                onClick={async () => {
                  if (!newCategory.trim()) {
                    toast.error("Category name required");
                    return;
                  }
                  try {
                    setIsAddingCategory(true);
                    const res = await axios.post(
                      `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addcategories`,
                      { name: newCategory },
                      { withCredentials: true }
                    );
                    toast.success("Category added");
                    setNewCategory("");
                    setShowModal(false);
                    fetchCategories();
                    // ✅ auto-select newly added category
                    setForm((prev) => ({
                      ...prev,
                      categories: [res.data._id],
                    }));
                  } catch (error: any) {
                    toast.error(error.response?.data?.error || "Failed to add");
                  } finally {
                    setIsAddingCategory(false);
                  }
                }}
              >
                {isAddingCategory ? "Adding..." : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AddStamp;
