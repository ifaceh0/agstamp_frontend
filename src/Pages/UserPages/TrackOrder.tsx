import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search, Package, Truck, CheckCircle, Clock } from "lucide-react";
import { useTrackGuestOrderMutation } from "../../services/stripe";
import { toast } from "react-toastify";

const statusSteps = [
  { key: "pending", label: "Order Placed", icon: Package },
  { key: "processing", label: "Processing", icon: Clock },
  { key: "shipped", label: "Shipped", icon: Truck },
  { key: "delivered", label: "Delivered", icon: CheckCircle },
];

const TrackOrder: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<any>(null);
  const [searched, setSearched] = useState(false);

  const [trackGuestOrder, { isLoading }] = useTrackGuestOrderMutation();

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email.trim() || !orderId.trim()) {
      toast.error("Please enter both email and order ID");
      return;
    }

    try {
      const response = await trackGuestOrder({ email: email.trim(), orderId: orderId.trim() }).unwrap();
      if (response.success && response.order) {
        setOrder(response.order);
        setSearched(true);
      } else {
        toast.error(response.message || "Order not found");
        setOrder(null);
        setSearched(true);
      }
    } catch (err: any) {
      toast.error(err.data?.message || "Order not found. Please check your details.");
      setOrder(null);
      setSearched(true);
    }
  };

  const getStatusIndex = (status: string) => {
    return statusSteps.findIndex((s) => s.key === status);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-indigo-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Track Your Order</h1>
            <p className="text-gray-600">Enter your email and order ID to check your order status</p>
          </div>

          {/* Track Form */}
          <form onSubmit={handleTrack} className="space-y-4 mb-8">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="john@example.com"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label htmlFor="orderId" className="block text-sm font-medium text-gray-700 mb-1">
                Order ID
              </label>
              <input
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Enter your order ID"
                className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 font-mono"
              />
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className="w-full px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 font-medium disabled:opacity-50"
            >
              {isLoading ? "Searching..." : "Track Order"}
            </button>
          </form>

          {/* Order Results */}
          {searched && !order && (
            <div className="text-center py-8 bg-red-50 rounded-lg">
              <p className="text-red-600 font-medium">Order not found</p>
              <p className="text-gray-600 text-sm mt-2">Please check your email and order ID and try again.</p>
            </div>
          )}

          {order && (
            <div className="border-t pt-8">
              <h2 className="text-xl font-semibold mb-6">Order Status</h2>

              {/* Progress Steps */}
              <div className="mb-8">
                <div className="flex justify-between relative">
                  {/* Progress Line */}
                  <div className="absolute top-5 left-0 right-0 h-1 bg-gray-200">
                    <div
                      className="h-full bg-green-500 transition-all"
                      style={{ width: `${(getStatusIndex(order.status) / (statusSteps.length - 1)) * 100}%` }}
                    />
                  </div>

                  {statusSteps.map((step, index) => {
                    const isCompleted = index <= getStatusIndex(order.status);
                    const Icon = step.icon;
                    return (
                      <div key={step.key} className="flex flex-col items-center relative z-10">
                        <div
                          className={`w-10 h-10 rounded-full flex items-center justify-center ${
                            isCompleted ? "bg-green-500 text-white" : "bg-gray-200 text-gray-500"
                          }`}
                        >
                          <Icon className="w-5 h-5" />
                        </div>
                        <p className={`text-xs mt-2 ${isCompleted ? "text-green-600 font-medium" : "text-gray-500"}`}>
                          {step.label}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Details */}
              <div className="bg-gray-50 rounded-lg p-6 space-y-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Order ID</span>
                  <span className="font-mono font-medium">{order._id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Status</span>
                  <span className="font-medium capitalize text-indigo-600">{order.status}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Payment</span>
                  <span className="font-medium capitalize text-green-600">{order.paymentStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Total</span>
                  <span className="font-bold">${order.total?.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Date</span>
                  <span className="font-medium">{new Date(order.createdAt).toLocaleDateString()}</span>
                </div>

                {/* Items */}
                <div className="border-t pt-4 mt-4">
                  <p className="font-medium mb-3">Items ({order.items?.length})</p>
                  {order.items?.map((item: any, idx: number) => (
                    <div key={idx} className="flex justify-between text-sm py-2">
                      <span>{item.name} × {item.quantity}</span>
                      <span>${item.totalPrice?.toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                {/* Shipping Address */}
                {order.shippingAddress && (
                  <div className="border-t pt-4 mt-4">
                    <p className="font-medium mb-2">Shipping Address</p>
                    <p className="text-sm text-gray-600">
                      {order.shippingAddress.line1}
                      {order.shippingAddress.line2 && `, ${order.shippingAddress.line2}`}<br />
                      {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                      {order.shippingAddress.country}
                    </p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Back to Shop */}
          <div className="mt-8 text-center">
            <button
              onClick={() => navigate("/retail-sales")}
              className="text-indigo-600 hover:text-indigo-800 font-medium"
            >
              ← Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrackOrder;