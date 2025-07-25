import FullscreenLoader from "../../Components/Loader/FullscreenLoader";
import { useGetAllUsersOrderQuery, useUpdateOrderMutation } from "../../Redux/Api/adminApi"
import React, { useEffect, useState } from "react";

const AllUserOrder = () => {
  const { data, isLoading } = useGetAllUsersOrderQuery();
  const [updateOrder,{isLoading:loading}] = useUpdateOrderMutation();
  const [orders,setOrder] = useState<Order50[]>([]);
  const [editingOrderId, setEditingOrderId] = useState<string | null>(null);
  const [statusValue, setStatusValue] = useState("");
  const [expandedOrderId, setExpandedOrderId] = useState<string | null>(null);

  useEffect(() => {
    if (data?.orders) {
      setOrder(data.orders);
    }
  }, [data]);

  const handleEditClick = (order: any) => {
    setEditingOrderId(order._id);
    setStatusValue(order.status);
  };

  const handleSaveStatus = async(orderId: string) => {
   try {
      const res = await updateOrder({id:orderId,status:statusValue});
      setOrder(res.data?.orders || []);
      setEditingOrderId(null);
    } catch (error) {
      
    }
  };

  const toggleOrderDetails = (e: React.MouseEvent<HTMLTableRowElement>,orderId: string) => {
    const target = e.target as HTMLTableRowElement;
    if (target.classList.contains("saveEdit") || target.classList.contains("selectButton")) return;
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const statusColors: Record<string, string> = {
    pending: "bg-yellow-100 text-yellow-800",
    shipped: "bg-blue-100 text-blue-800",
    delivered: "bg-green-100 text-green-800",
    cancelled: "bg-red-100 text-red-800",
    processing: "bg-purple-100 text-purple-800",
  };

  const paymentStatusColors: Record<string, string> = {
    paid: "bg-green-100 text-green-800",
    pending: "bg-yellow-100 text-yellow-800",
    failed: "bg-red-100 text-red-800",
    refunded: "bg-blue-100 text-blue-800",
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatCurrency = (amount: number, currency: string) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: currency.toUpperCase(),
    }).format(amount);
  };

  return (
    (isLoading || loading)? <FullscreenLoader /> :
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Product</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Delivery Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders?.map((order) => (
                <React.Fragment key={order._id}>
                  <tr
                    className="hover:bg-gray-50 cursor-pointer transition-colors"
                    onClick={(e) => toggleOrderDetails(e,order._id)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="flex-shrink-0 flex">
                          {order.items.slice(0, 3).map((item, index) => (
                            <div
                              key={item._id}
                              className={`relative ${index > 0 ? '-ml-2' : ''}`}
                              style={{ zIndex: 3 - index }}
                            >
                              <img
                                className="h-10 w-10 rounded-md border-2 border-white shadow"
                                src={item.image.publicUrl}
                                alt={item.name}
                              />
                              {index === 2 && order.items.length > 3 && (
                                <div className="absolute inset-0 bg-black bg-opacity-50 rounded-md flex items-center justify-center">
                                  <span className="text-xs text-white font-bold">
                                    +{order.items.length - 3}
                                  </span>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {order.items[0].name}
                            {order.items.length > 1 && ` + ${order.items.length - 1} more`}
                          </div>
                          <div className="text-sm text-gray-500">
                            {formatDate(order.dateOfSale)}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900 font-medium">
                        {formatCurrency(order.total, order.paymentDetails.currency)}
                      </div>
                      <div className="text-sm text-gray-500">
                        {order.items.length} item{order.items.length > 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {editingOrderId === order._id ? (
                        <select
                          value={statusValue}
                          onChange={(e) => setStatusValue(e.target.value)}
                          className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md selectButton"
                        >
                          <option value="pending">Pending</option>
                          <option value="processing">Processing</option>
                          <option value="shipped">Shipped</option>
                          <option value="delivered">Delivered</option>
                        </select>
                      ) : (
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${statusColors[order.status] || "bg-gray-100 text-gray-800"}`}>
                          {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${paymentStatusColors[order.paymentStatus] || "bg-gray-100 text-gray-800"}`}>
                        {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      {editingOrderId === order._id ? (
                        <button
                          onClick={() => handleSaveStatus(order._id)}
                          className="text-indigo-600 hover:text-indigo-900 bg-indigo-100 hover:bg-indigo-200 px-3 py-1 rounded-md transition-colors saveEdit"
                        >
                          Save
                        </button>
                      ) : (
                        <button
                          onClick={() => handleEditClick(order)}
                          className="text-gray-600 hover:text-gray-900 bg-gray-100 hover:bg-gray-200 px-3 py-1 rounded-md transition-colors saveEdit"
                        >
                          Edit
                        </button>
                      )}
                    </td>
                  </tr>

                  {expandedOrderId === order._id && (
                    <tr className="bg-blue-300">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {/* Items List */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Items</h3>
                            <ul className="divide-y divide-gray-200">
                              {order.items.map((item) => (
                                <li key={item._id} className="py-3 flex items-center">
                                  <img
                                    className="h-10 w-10 rounded-md object-cover"
                                    src={item.image.publicUrl}
                                    alt={item.name}
                                  />
                                  <div className="ml-4">
                                    <p className="text-sm font-medium text-gray-900">{item.name}</p>
                                    <p className="text-sm text-gray-500">
                                      {item.quantity} × {formatCurrency(item.unitPrice, order.paymentDetails.currency)}
                                    </p>
                                  </div>
                                  <div className="ml-auto text-sm font-medium text-gray-900">
                                    {formatCurrency(item.totalPrice, order.paymentDetails.currency)}
                                  </div>
                                </li>
                              ))}
                            </ul>
                          </div>

                          {/* Shipping and Payment */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Shipping Information</h3>
                            <div className="text-sm text-gray-700 space-y-1">
                              <p>{order.shippingAddress.line1}</p>
                              <p>{order.shippingAddress.line2}</p>
                              <p>{order.shippingAddress.city}, {order.shippingAddress.state}</p>
                              <p>{order.shippingAddress.country}</p>
                            </div>

                            <h3 className="text-sm font-medium text-gray-900 mt-4 mb-2">Payment Information</h3>
                            <div className="text-sm text-gray-700 space-y-1">
                              <p>Method: {order.paymentDetails.paymentMethod}</p>
                              <p>Payment ID: {order.paymentDetails.paymentId}</p>
                              <p>Amount: {formatCurrency(order.paymentDetails.amount, order.paymentDetails.currency)}</p>
                              <p>Subtotal: {formatCurrency(order.paymentDetails.amountSubtotal, order.paymentDetails.currency)}</p>
                              <p>Shipping: {formatCurrency(order.paymentDetails.shippingCost, order.paymentDetails.currency)}</p>
                            </div>
                          </div>

                          {/* Order Summary */}
                          <div>
                            <h3 className="text-sm font-medium text-gray-900 mb-2">Order Summary</h3>
                            <div className="text-sm text-gray-700 space-y-2">
                              <div className="flex justify-between">
                                <span>Order ID:</span>
                                <span>{order._id}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Subtotal:</span>
                                <span>{formatCurrency(order.paymentDetails.amountSubtotal, order.paymentDetails.currency)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Shipping:</span>
                                <span>{formatCurrency(order.paymentDetails.shippingCost, order.paymentDetails.currency)}</span>
                              </div>
                              <div className="flex justify-between">
                                <span>Tax:</span>
                                <span>{formatCurrency(0, order.paymentDetails.currency)}</span>
                              </div>
                              <div className="flex justify-between border-t border-gray-200 pt-2 font-medium">
                                <span>Total:</span>
                                <span>{formatCurrency(order.paymentDetails.amount, order.paymentDetails.currency)}</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>

        {orders?.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-400 mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-1">No orders found</h3>
            <p className="text-gray-500">There are currently no orders to display.</p>
          </div>
        )}
      </div>
  );
};

export default AllUserOrder;
