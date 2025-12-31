import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Lock, ShoppingBag } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Store";
import { useCreateGuestCheckoutSessionMutation } from "../../services/stripe";
import { clearGuestCart } from "../../Redux/Reducer/guestCartSlice";
import { toast } from "react-toastify";

const GuestCheckoutPage: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const [createGuestCheckoutSession] = useCreateGuestCheckoutSessionMutation();
  
  // Get guest cart from Redux
  const { items, totalPrice, selectedCountry, shippingRate } = useSelector(
    (state: RootState) => state.guestCart
  );

  const [guestInfo, setGuestInfo] = useState({
    name: "",
    email: "",
    confirmEmail: "",
    phone: "",
  });

  const cartTotal = totalPrice + shippingRate;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGuestInfo({ ...guestInfo, [e.target.id]: e.target.value });
  };

  const validateEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleProceedToPayment = async () => {
    try {
      setIsLoading(true);

      // Validations
      if (!guestInfo.name.trim()) {
        toast.error("Please enter your name");
        return;
      }
      if (!guestInfo.email.trim() || !validateEmail(guestInfo.email)) {
        toast.error("Please enter a valid email address");
        return;
      }
      if (guestInfo.email !== guestInfo.confirmEmail) {
        toast.error("Email addresses do not match");
        return;
      }
      if (!guestInfo.phone.trim()) {
        toast.error("Please enter your phone number");
        return;
      }
      if (items.length === 0) {
        toast.error("Your cart is empty");
        return;
      }
      if (!shippingRate || shippingRate === 0) {
        toast.error("Please select shipping option in cart");
        navigate("/guest-cart");
        return;
      }

      const response = await createGuestCheckoutSession({
        items: items.map((item) => ({
          mongoID: item.stamp._id,
          name: item.stamp.name,
          description: item.stamp.description || "",
          price: item.stamp.price,
          quantity: item.quantity,
          images: item.stamp.images || [],
        })),
        customerEmail: guestInfo.email,
        customerName: guestInfo.name,
        selectedCountry: selectedCountry || "US",
        shippingType: selectedCountry === "US" ? "domestic" : "international",
        shippingRate: shippingRate,
        metadata: {
          phone: guestInfo.phone,
          isGuest: true
        },
      }).unwrap();

      if (response.success && response.url) {
        // Clear guest cart before redirect
        dispatch(clearGuestCart());
        window.location.href = response.url;
      } else {
        throw new Error(response.message || "Failed to create checkout session");
      }
    } catch (error: any) {
      console.error("Guest checkout error:", error);
      toast.error(error.data?.message || "Payment processing failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 py-8 px-4 flex flex-col items-center justify-center">
        <ShoppingBag className="w-16 h-16 text-gray-400 mb-4" />
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Your cart is empty</h1>
        <p className="text-gray-600 mb-8">Add some products before checking out.</p>
        <button
          onClick={() => navigate("/retail-sales")}
          className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
        >
          Browse Products
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900 mb-8">
          <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Cart
        </button>

        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2 text-center">Guest Checkout</h1>
          <p className="text-gray-600 text-center mb-8">
            No account needed! Or{" "}
            <button onClick={() => navigate("/login")} className="text-indigo-600 hover:underline">
              login here
            </button>
          </p>

          {/* Order Summary */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Order Summary</h2>
            <div className="space-y-3">
              {items.map((item) => (
                <div key={item.stamp._id} className="flex justify-between items-center">
                  <div className="flex items-center">
                    {item.stamp.images?.[0] && (
                      <img
                        src={item.stamp.images[0].publicUrl}
                        alt={item.stamp.name}
                        className="w-14 h-14 object-cover rounded-md mr-3"
                      />
                    )}
                    <div>
                      <h3 className="font-medium text-gray-900">{item.stamp.name}</h3>
                      <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                    </div>
                  </div>
                  <p className="font-medium">${(item.stamp.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
              <div className="border-t pt-3 mt-3 space-y-2">
                <div className="flex justify-between text-gray-600">
                  <span>Subtotal</span>
                  <span>${totalPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Shipping ({selectedCountry})</span>
                  <span>${shippingRate.toFixed(2)}</span>
                </div>
                <div className="flex justify-between font-bold text-lg pt-2 border-t">
                  <span>Total</span>
                  <span>${cartTotal.toFixed(2)}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Guest Info Form */}
          <div className="mb-8">
            <h2 className="text-xl font-semibold text-gray-900 mb-4 border-b pb-2">Your Information</h2>
            <div className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name *</label>
                <input
                  type="text" id="name" value={guestInfo.name} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  placeholder="John Doe"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address *</label>
                <input
                  type="email" id="email" value={guestInfo.email} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  placeholder="john@example.com"
                />
                <p className="text-xs text-gray-500 mt-1">Order confirmation will be sent to this email</p>
              </div>
              <div>
                <label htmlFor="confirmEmail" className="block text-sm font-medium text-gray-700">Confirm Email *</label>
                <input
                  type="email" id="confirmEmail" value={guestInfo.confirmEmail} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  placeholder="john@example.com"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number *</label>
                <input
                  type="tel" id="phone" value={guestInfo.phone} onChange={handleInputChange}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 p-2 border"
                  placeholder="555-123-4567"
                />
              </div>
            </div>
          </div>

          {/* Info Box */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
            <p className="text-sm text-blue-800">
              <strong>Note:</strong> You'll enter your shipping address on the next page (Stripe secure checkout). 
              Save your Order ID from the confirmation email to track your order.
            </p>
          </div>

          {/* Payment Button */}
          <button
            onClick={handleProceedToPayment}
            disabled={isLoading}
            className={`w-full flex items-center justify-center px-6 py-4 rounded-xl text-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition-all ${isLoading ? "opacity-75 cursor-not-allowed" : ""}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Processing...
              </>
            ) : (
              <>
                <Lock className="w-5 h-5 mr-2" />
                Pay Securely ${cartTotal.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default GuestCheckoutPage;