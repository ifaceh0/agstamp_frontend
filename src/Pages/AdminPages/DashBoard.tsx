// import React from 'react';
// import {
//   ComposedChart,
//   LineChart,
//   Bar,
//   Line,
//   XAxis,
//   YAxis,
//   CartesianGrid,
//   Tooltip,
//   Legend,
//   ResponsiveContainer,
// } from 'recharts';
// import { useGetDashBoardDataQuery } from '../../Redux/Api/adminApi';

// const DashBoard: React.FC = () => {
//   const {data} = useGetDashBoardDataQuery();

//   const categories = [
//   "Russia 1858-1918",
//   "Russia 1919-1941",
//   "Russia 1941-2000",
//   "Russia Airmails",
//   "Russia Semi-postal"
//   ];

//   const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a28fd0"];
//   // Placeholder/mock data
//   const barData = data?.data.barchatData || [];

//   const userData = data?.data.lineChatData || [];


//   const popularStamps = data?.data.topStampsThisMonth || [];

//   return (
//     <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
//       {/* Bar Chart Card */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold mb-2">Monthly Sales by Category</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <ComposedChart data={barData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis yAxisId="left" />
//             <YAxis yAxisId="right" orientation="right" />
//             <Tooltip />
//             <Legend />
//             {categories.map((cat, idx) => (
//               <Bar
//                 key={cat}
//                 yAxisId="left"
//                 dataKey={cat}
//                 stackId="a"
//                 fill={colors[idx % colors.length]}
//                 name={cat}
//               />
//             ))}
//             <Line yAxisId="right" type="monotone" dataKey="quantity" stroke="#ffc658" name="Quantity" />
//           </ComposedChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Line Chart Card */}
//       <div className="bg-white p-4 rounded-lg shadow-md">
//         <h2 className="text-lg font-semibold mb-2">Monthly Purchasers</h2>
//         <ResponsiveContainer width="100%" height={300}>
//           <LineChart data={userData}>
//             <CartesianGrid strokeDasharray="3 3" />
//             <XAxis dataKey="month" />
//             <YAxis />
//             <Tooltip />
//             <Line type="monotone" dataKey="Purchasers" stroke="#8884d8" />
//           </LineChart>
//         </ResponsiveContainer>
//       </div>

//       {/* Popular Stamps Section (full-width) */}
//       <div className="bg-white p-4 rounded-lg shadow-md col-span-full">
//         <h2 className="text-lg font-semibold mb-4">Popular Stamps</h2>
//         <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
//           {popularStamps.map((stamp) => (
//             <div key={stamp.id} className="bg-gray-100 p-4 rounded-lg flex flex-col items-center">
//               <img src={stamp.image} alt={stamp.name} className="h-24 w-24 object-cover mb-2" />
//               <h3 className="font-medium text-center">{stamp.name}</h3>
//               <p className="text-sm text-gray-600">{stamp.unitsSold} sold</p>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashBoard;

import React from 'react';
import {
  ComposedChart,
  LineChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';
import { useGetDashBoardDataQuery } from '../../Redux/Api/adminApi';

const DashBoard: React.FC = () => {
  const { data, isLoading, isError, error } = useGetDashBoardDataQuery();

  // Extract chart data safely
  const barData = data?.data?.barchatData || [];
  const userData = data?.data?.lineChatData || [];
  const popularStamps = data?.data?.topStampsThisMonth || [];

  // Dynamically determine categories from barData keys
  const categories =
    barData.length > 0
      ? Object.keys(barData[0]).filter(
          (key) => key !== "month" && key !== "quantity"
        )
      : [];

  const colors = ["#8884d8", "#82ca9d", "#ffc658", "#ff7f50", "#a28fd0", "#4bc0c0", "#f39c12"];

  if (isLoading) {
    return <div className="p-6">Loading dashboard...</div>;
  }

  if (isError) {
    return (
      <div className="p-6 text-red-600">
        Error loading dashboard: {
          typeof error === "object" && error !== null && "message" in error
            ? (error as { message: string }).message
            : "Something went wrong"
        }
      </div>
    );
  }

  return (
    <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Bar Chart Card */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Monthly Sales by Category</h2>
        <ResponsiveContainer width="100%" height={300}>
          <ComposedChart data={barData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            {categories.map((cat, idx) => (
              <Bar
                key={cat}
                yAxisId="left"
                dataKey={cat}
                stackId="a"
                fill={colors[idx % colors.length]}
                name={cat}
              />
            ))}
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="quantity"
              stroke="#000"
              name="Quantity"
            />
          </ComposedChart>
        </ResponsiveContainer>
      </div>

      {/* Line Chart Card */}
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-lg font-semibold mb-2">Monthly Purchasers</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={userData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="month" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="Purchasers" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Popular Stamps Section (full-width) */}
      <div className="bg-white p-4 rounded-lg shadow-md col-span-full">
        <h2 className="text-lg font-semibold mb-4">Popular Stamps</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {popularStamps.map((stamp, index) => (
            <div
              key={stamp.id || index}
              className="bg-gray-100 p-4 rounded-lg flex flex-col items-center"
            >
              <img
                src={stamp.image}
                alt={stamp.name}
                className="h-24 w-24 object-cover mb-2"
              />
              <h3 className="font-medium text-center">{stamp.name}</h3>
              <p className="text-sm text-gray-600">{stamp.unitsSold} sold</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashBoard;
