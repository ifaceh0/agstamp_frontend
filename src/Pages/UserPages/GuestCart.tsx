import React, { useState, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../Redux/Store";
import { useGetShippingRatesQuery } from "../../Redux/Api/userApi";
import {
  updateGuestCartQuantity,
  removeFromGuestCart,
  clearGuestCart,
  setGuestSelectedCountry,
  setGuestShippingRate,
} from "../../Redux/Reducer/guestCartSlice";
import { toast } from "react-toastify";
import countries from "world-countries";

const GuestCart: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectRef = useRef<HTMLSelectElement>(null);

  const sortedCountries = useMemo(() => {
    return countries
      .map((c) => ({ code: c.cca2, name: c.name.common, flag: c.flag }))
      .sort((a, b) => a.name.localeCompare(b.name));
  }, []);

  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);

  const { items, totalPrice, selectedCountry } = useSelector(
    (state: RootState) => state.guestCart
  );

  const { data: shippingRatesData, isLoading: shippingLoading } = useGetShippingRatesQuery();

  const handleCountryChange = (countryCode: string) => {
    dispatch(setGuestSelectedCountry(countryCode));
    const rate = countryCode === "US"
      ? shippingRatesData?.usPrice || 0
      : shippingRatesData?.internationalPrice || 0;
    dispatch(setGuestShippingRate(rate));
    setIsCountryDropdownOpen(false);
  };

  const subtotal = totalPrice;
  const currentShippingRate = selectedCountry === "US"
    ? shippingRatesData?.usPrice || 0
    : shippingRatesData?.internationalPrice || 0;
  const total = subtotal + currentShippingRate;

  const handleCheckout = () => {
    if (items.length === 0) {
      toast.error("Your cart is empty!");
      return;
    }
    if (!selectedCountry) {
      toast.error("Please select a country!");
      return;
    }
    dispatch(setGuestShippingRate(currentShippingRate));
    navigate("/guest-checkout");
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 p-4 sm:p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-xl sm:text-2xl font-bold">Shopping Cart</h1>
        <div className="text-sm text-gray-600 bg-yellow-100 px-3 py-1 rounded-full">
          Guest Cart
        </div>
      </div>

      {/* Login prompt */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
        <p className="text-blue-800">
          <strong>Have an account?</strong>{" "}
          <button onClick={() => navigate("/login")} className="text-blue-600 underline hover:text-blue-800">
            Login
          </button>{" "}
          to save your cart and track orders easily.
        </p>
      </div>

      {items.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 mb-4">Your cart is empty.</p>
          <button
            onClick={() => navigate("/retail-sales")}
            className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
          >
            Browse Products
          </button>
        </div>
      ) : (
        <div>
          {items.map((item) => (
            <div
              key={item.stamp._id}
              className="mb-4 p-4 bg-white shadow-md rounded-lg flex items-center space-x-4"
            >
              <img
                src={item.stamp.images?.[0]?.publicUrl || "/placeholder.svg"}
                alt={item.stamp.name}
                className="w-24 h-24 object-contain rounded-lg border"
              />
              <div className="flex-1">
                <h2 className="text-lg font-semibold">{item.stamp.name}</h2>
                <p className="mb-1">Price: ${item.stamp.price.toFixed(2)}</p>
                <p className="mb-2 font-bold">
                  Total: ${(item.stamp.price * item.quantity).toFixed(2)}
                </p>
                <div className="flex items-center space-x-2">
                  <button
                    className="px-3 py-1 border rounded hover:bg-gray-200"
                    onClick={() => dispatch(updateGuestCartQuantity({ stampId: item.stamp._id, delta: -1 }))}
                  >
                    -
                  </button>
                  <span className="text-lg">{item.quantity}</span>
                  <button
                    className="px-3 py-1 border rounded hover:bg-gray-200 disabled:bg-gray-300"
                    disabled={item.quantity >= item.stamp.stock}
                    onClick={() => dispatch(updateGuestCartQuantity({ stampId: item.stamp._id, delta: 1 }))}
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                className="bg-red-500 text-white px-3 py-2 rounded hover:bg-red-600"
                onClick={() => {
                  dispatch(removeFromGuestCart(item.stamp._id));
                  toast.success(`${item.stamp.name} removed`);
                }}
              >
                Remove
              </button>
            </div>
          ))}

          {/* Country Selection */}
          <div className="mt-6 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-3">Select Shipping Country: *</h3>
            <select
              ref={selectRef}
              value={selectedCountry}
              onChange={(e) => handleCountryChange(e.target.value)}
              onFocus={() => setIsCountryDropdownOpen(true)}
              onBlur={() => setIsCountryDropdownOpen(false)}
              size={isCountryDropdownOpen ? 6 : 1}
              className="w-full sm:w-2/3 px-4 py-3 border-2 rounded-lg bg-white cursor-pointer focus:border-blue-500"
              style={{ appearance: "none" }}
            >
              {sortedCountries.map((c) => (
                <option key={c.code} value={c.code}>
                  {c.flag} {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* Shipping Display */}
          <div className="mt-4 bg-white p-4 rounded-lg shadow-md">
            <h3 className="font-semibold mb-3">Shipping Method</h3>
            {shippingLoading ? (
              <p>Loading...</p>
            ) : (
              <div className={`p-4 border-2 rounded-lg ${selectedCountry === "US" ? "border-blue-500 bg-blue-50" : "border-green-500 bg-green-50"}`}>
                <div className="flex justify-between items-center">
                  <span className="font-medium">
                    {selectedCountry === "US" ? "🇺🇸 US Shipping" : "🌍 International Shipping"}
                  </span>
                  <span className="font-bold text-lg">${currentShippingRate.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Totals */}
          <div className="mt-6 p-6 bg-white shadow-md rounded-lg">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span className="font-semibold">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping:</span>
                <span className="font-semibold">${currentShippingRate.toFixed(2)}</span>
              </div>
              <div className="border-t pt-3 mt-3 flex justify-between">
                <span className="text-xl font-bold">Total:</span>
                <span className="text-2xl font-bold text-green-600">${total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 mt-6">
              <button
                onClick={handleCheckout}
                className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 font-semibold"
              >
                Proceed to Guest Checkout
              </button>
              <button
                onClick={() => dispatch(clearGuestCart())}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 font-semibold"
              >
                Clear Cart
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6 flex justify-center">
        <button
          onClick={() => navigate("/retail-sales")}
          className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 font-semibold"
        >
          Continue Shopping
        </button>
      </div>
    </div>
  );
};

export default GuestCart;