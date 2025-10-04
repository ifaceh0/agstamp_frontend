import { useState } from "react";
import {
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} from "../../Redux/Api/adminApi";
import { Category } from "../../types";
import { toast } from "react-toastify";

const CategoryManager = () => {
  const { data: categories, refetch } = useGetAllCategoriesQuery();
  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [newCategoryName, setNewCategoryName] = useState<string>("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState<string>("");

  // Track delete confirmation state
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  // ➤ Add new category
  const handleAdd = async () => {
    if (!newCategoryName.trim()) return toast.error("Category name cannot be empty");
    await addCategory({ name: newCategoryName });
    setNewCategoryName("");
    refetch();
  };

  // ➤ Start editing a category
  const handleEdit = (category: Category) => {
    setEditId(category._id);
    setEditName(category.name);
  };

  // ➤ Save edited category
  const handleUpdate = async () => {
    if (!editName.trim()) return toast.error("Category name cannot be empty");
    if (!editId) return;
    await updateCategory({ id: editId, name: editName });
    setEditId(null);
    setEditName("");
    refetch();
  };

  // ➤ Delete category
  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
      toast.success("Category deleted successfully");
      refetch();
    } catch (error: any) {
      toast.error(error?.data?.message || "Cannot delete category with existing stamps");
    } finally {
      setDeleteConfirmId(null);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow-md bg-white w-full">
      <h2 className="text-xl font-semibold mb-4">Manage Categories</h2>

      {/* Add Category */}
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          value={newCategoryName}
          onChange={(e) => setNewCategoryName(e.target.value)}
          placeholder="New Category Name"
          className="border p-2 rounded w-full"
        />
        <button
          onClick={handleAdd}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {/* List of Categories */}
      <ul className="space-y-2">
        {categories?.map((category) => (
          <li
            key={category._id}
            className="flex items-center justify-between p-2 border rounded"
          >
            {editId === category._id ? (
              <div className="flex gap-2 items-center w-full">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  className="border p-1 rounded w-full"
                />
                <button
                  onClick={handleUpdate}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditId(null)}
                  className="bg-gray-400 text-white px-2 py-1 rounded"
                >
                  Cancel
                </button>
              </div>
            ) : (
              <>
                <span>{category.name}</span>
                <div className="flex gap-2">
                  {deleteConfirmId === category._id ? (
                    <>
                      <button
                        onClick={() => handleDelete(category._id)}
                        className="bg-red-600 text-white px-2 py-1 rounded"
                      >
                        Confirm
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(null)}
                        className="bg-gray-400 text-white px-2 py-1 rounded"
                      >
                        Cancel
                      </button>
                    </>
                  ) : (
                    <>
                      <button
                        onClick={() => handleEdit(category)}
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleteConfirmId(category._id)}
                        className="bg-red-500 text-white px-2 py-1 rounded"
                      >
                        Delete
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CategoryManager;
