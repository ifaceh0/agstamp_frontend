import React, { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AddCategory: React.FC = () => {
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!categoryName.trim()) {
      toast.error("Category name is required");
      return;
    }

    try {
      setIsLoading(true);
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addcategories`, { name: categoryName },{withCredentials: true,});
      toast.success(`Category ${res.data.name} added successfully`);
      setCategoryName("");
    } catch (error: any) {
      const message = error.response?.data?.error || "Failed to add category";
      toast.error(message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4 border rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Add New Category</h2>
      <form onSubmit={handleAddCategory}>
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          placeholder="Enter category name"
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          disabled={isLoading}
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
          disabled={isLoading}
        >
          {isLoading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  );
};

export default AddCategory;
