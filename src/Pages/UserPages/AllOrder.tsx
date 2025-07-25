import { useUserOrderQuery } from "../../Redux/Api/userApi";
import { format } from "date-fns";
import { Loader2, PackageSearch } from "lucide-react";

const AllOrder: React.FC = () => {
  const { data, isLoading, isError } = useUserOrderQuery();
  console.dir(data)

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="animate-spin h-10 w-10 text-blue-600" />
      </div>
    );
  }

  if (isError || !data?.success) {
    return (
      <div className="text-red-600 text-center mt-10">
        Something went wrong while fetching orders.
      </div>
    );
  }

  const orders = data.orders;

  return (
    <div className="max-w-5xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        Your Orders
      </h2>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 mt-20">
          <PackageSearch size={50} />
          <p className="mt-4 text-lg">No orders found.</p>
        </div>
      ) : (
        <div className="space-y-6">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white rounded-2xl shadow-md p-6 transition hover:shadow-lg border border-gray-200"
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-semibold text-blue-600">
                  Order #{order._id.slice(-6).toUpperCase()}
                </h3>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    order.status === "pending"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {order.status}
                </span>
              </div>

              <p className="text-sm text-gray-500 mb-4">
                Placed on:{" "}
                {format(new Date(order.dateOfSale), "PPPpp")}
              </p>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-700 mb-1">
                    Shipping Address
                  </h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {order.shippingAddress.line1}, {order.shippingAddress.line2}
                    <br />
                    {order.shippingAddress.city}, {order.shippingAddress.state},{" "}
                    {order.shippingAddress.country}
                  </p>
                </div>

                <div>
                  <h4 className="font-medium text-gray-700 mb-1">
                    Payment Details
                  </h4>
                  <p className="text-gray-600 text-sm">
                    Method: {order.paymentDetails.paymentMethod.toUpperCase()} <br />
                    Amount: ${order.paymentDetails.amount.toFixed(2)}{" "}
                    ({order.paymentDetails.currency.toUpperCase()})
                  </p>
                </div>
              </div>

              <div className="mt-6">
                <h4 className="font-medium text-gray-700 mb-2">Items</h4>
                <div className="space-y-4">
                  {order.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex items-center gap-4 border p-3 rounded-lg"
                    >
                      <img
                        src={item.image.publicUrl}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-lg"
                      />
                      <div className="flex-1">
                        <h5 className="font-medium text-gray-800">{item.name}</h5>
                        <p className="text-sm text-gray-500">
                          Category: {item.category}
                        </p>
                        <p className="text-sm text-gray-500">
                          Quantity: {item.quantity} × ${item.unitPrice.toFixed(2)}
                        </p>
                      </div>
                      <div className="font-semibold text-gray-700">
                        ${item.totalPrice.toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Added order summary section */}
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Subtotal:</span>
                  <span className="font-medium">
                    ${order.paymentDetails.amountSubtotal.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mb-1">
                  <span className="text-gray-600">Shipping:</span>
                  <span className="font-medium">
                    ${order.paymentDetails.shippingCost.toFixed(2)}
                  </span>
                </div>
                <div className="flex justify-between mt-2 pt-2 border-t border-gray-200">
                  <span className="text-lg font-semibold text-blue-600">Total:</span>
                  <span className="text-lg font-semibold text-blue-600">
                    ${order.paymentDetails.amount.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AllOrder;