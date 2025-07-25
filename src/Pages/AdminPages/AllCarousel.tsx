import { useEffect, useState } from "react";
import { FiImage, FiEdit2, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useGetAllCarouselsQuery, useDeleteCarouselMutation } from "../../Redux/Api/adminApi";
import { toast } from "react-toastify";
import FullscreenLoader from "../../Components/Loader/FullscreenLoader";



const AllCarousel = () => {
  const { data, isLoading: loadingCarousels } = useGetAllCarouselsQuery();
  const [deleteCarousel, { isLoading: deleting }] = useDeleteCarouselMutation();
  const [carousels, setCarousels] = useState<Carousel[]>([]);

  useEffect(() => {
    if (data) {
      setCarousels(data?.Carousels);
    }
  }, [data]);

  const handleDelete = async (id: string) => {
    try {
      const res = await deleteCarousel(id).unwrap();
      toast.success(res?.message || "Deleted");
      if (res?.carousels) {
        setCarousels(res.carousels);
      }
    } catch (error) {
      toast.error("Failed to delete carousel");
    }
  };

  return (
    <div className="w-full overflow-x-auto border border-gray-200 rounded-lg shadow-sm mt-16">
      {(loadingCarousels || deleting) && <FullscreenLoader />}
      <table className="min-w-full divide-y divide-gray-200 text-sm md:text-base">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Image</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Name</th>
            <th className="px-4 py-3 text-left font-medium text-gray-500 uppercase tracking-wider">Actions</th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {carousels?.map((carousel) => (
            <tr key={carousel._id} className="hover:bg-gray-50 transition-colors">
              <td className="px-4 py-3 whitespace-nowrap">
                {carousel.images?.[0]?.publicUrl ? (
                  <img
                    className="h-10 w-10 rounded-full object-cover"
                    src={carousel.images[0].publicUrl}
                    alt={carousel.name}
                  />
                ) : (
                  <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                    <FiImage className="text-gray-400" />
                  </div>
                )}
              </td>
              <td className="px-4 py-3 font-medium whitespace-nowrap">
                {carousel.name.length > 10
                  ? carousel.name.substring(0, 9) + "..."
                  : carousel.name}
              </td>
              <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
                <div className="flex space-x-3">
                  <Link
                    to={`/admin/carouselimage/${carousel._id}`}
                    className="text-blue-600 hover:text-blue-900 p-1 rounded-md hover:bg-blue-50 transition-colors"
                  >
                    <FiEdit2 className="h-5 w-5" />
                  </Link>
                  <button
                    onClick={() => handleDelete(carousel._id)}
                    className="text-red-600 hover:text-red-900 p-1 rounded-md hover:bg-red-50 transition-colors"
                  >
                    <FiTrash2 className="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-xs text-gray-400 p-3 md:hidden">
        Scroll sideways to view full table on mobile →
      </p>
    </div>
  );
};

export default AllCarousel;
