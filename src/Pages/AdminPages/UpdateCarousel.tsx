import axios from "axios";
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useParams, useNavigate } from "react-router-dom";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";

interface CarouselForm {
  name: string;
  // for simplicity, we only keep new File objects here;
  // existing uploads live in their own state
  newFiles: File[];
}

const UpdateCarousel: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState<CarouselForm>({ name: "", newFiles: [] });
  const [existingImages, setExistingImages] = useState<{ publicUrl: string; publicId: string }[]>([]);
  const [previewUrls, setPreviewUrls] = useState<string[]>([]);

  const [initialName, setInitialName] = useState<string>("");
  const [initialImageIds, setInitialImageIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch existing carousel
  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/carousel/${id}`,
          { withCredentials: true }
        );
        const carousel = res.data.carousel;
        setForm({ name: carousel.name, newFiles: [] });
        setExistingImages(carousel.images);
        setPreviewUrls(carousel.images.map((img: any) => img.publicUrl));
        setInitialName(carousel.name);
        setInitialImageIds(carousel.images.map((img: any) => img.publicId));
      } catch(e) {
        console.log(e);
        toast.error("Failed to load carousel");
        navigate("/admin/carousels");
      } finally {
        setIsLoading(false);
      }
    })();
  }, [id, navigate]);

  const hasFormChanged = () => {
    if (form.name !== initialName) return true;
    if (form.newFiles.length > 0) return true;
    if (existingImages.length !== initialImageIds.length) return true;
    return initialImageIds.some((pid) => !existingImages.find((img) => img.publicId === pid));
  };

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, name: e.target.value }));

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files).filter((f) => {
      if (!f.type.startsWith("image/")) {
        toast.error(`${f.name} is not an image`);
        return false;
      }
      if (f.size > 5 * 1024 * 1024) {
        toast.error(`${f.name} exceeds 5MB`);
        return false;
      }
      return true;
    });

    setForm((f) => ({ ...f, newFiles: [...f.newFiles, ...files] }));
    setPreviewUrls((urls) => [...urls, ...files.map((f) => URL.createObjectURL(f))]);
  };

  const removeImage = (index: number) => {
    if (index < existingImages.length) {
      // remove an existing upload
      setExistingImages((imgs) => imgs.filter((_, i) => i !== index));
    } else {
      // remove a newly added File
      const fileIndex = index - existingImages.length;
      setForm((f) => ({
        ...f,
        newFiles: f.newFiles.filter((_, i) => i !== fileIndex),
      }));
    }
    setPreviewUrls((urls) => urls.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!hasFormChanged()) {
      toast.info("No changes detected");
      return;
    }

    if(previewUrls.length > 1){
        toast.error(`only one image allowed`);
        return;
    }
    try {
      setIsLoading(true);
      const fd = new FormData();

      if (form.name !== initialName) {
        fd.append("name", form.name);
      }

      // attach new files
      form.newFiles.forEach((file) => fd.append("file", file));

      // track removed existing images
      const removed = initialImageIds.filter(
        (pid) => !existingImages.find((img) => img.publicId === pid)
      );
      if (removed.length) {
        fd.append("removedImages", JSON.stringify(removed));
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/updatecarousel/${id}`,
        fd,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      toast.success("Carousel updated successfully");
      navigate("/admin/carousels");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Update failed");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) return <FullscreenLoader />;

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Update Carousel
      </h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Carousel Name
          </label>
          <input
            type="text"
            value={form.name}
            onChange={handleNameChange}
            className="w-full px-4 py-2 border rounded-md"
            required
          />
        </div>

        {/* File upload */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Images
          </label>
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-md file:border-0
              file:text-sm file:font-semibold
              file:bg-blue-50 file:text-blue-700
              hover:file:bg-blue-100"
          />
          <p className="mt-1 text-xs text-gray-500">
            PNG, JPG, GIF up to 5MB
          </p>
        </div>

        {/* Preview */}
        {previewUrls.length > 0 && (
          <div>
            <h3 className="text-sm font-medium text-gray-700 mb-2">
              Selected Images
            </h3>
            <div className="flex flex-wrap gap-4">
              {previewUrls.map((src, idx) => (
                <div key={idx} className="relative group">
                  <img
                    src={src}
                    alt={`Preview ${idx}`}
                    className="h-24 w-24 object-cover rounded-md border"
                  />
                  <button
                    type="button"
                    onClick={() => removeImage(idx)}
                    className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={() => navigate("/admin/carousel")}
            className="px-6 py-3 bg-gray-300 rounded-md"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-6 py-3 bg-blue-600 text-white rounded-md"
          >
            Update Carousel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UpdateCarousel;
