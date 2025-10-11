import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";

// Define an interface for the structure of the shipping rates state
interface ShippingRates {
  domestic: number | string; // Using `number | string` to allow for empty input
  international: number | string;
}

// Define the structure of a single rate object from the API
interface Rate {
  type: "domestic" | "international";
  price: number;
}

// Define the expected API response for the GET request
interface FetchRatesResponse {
  success: boolean;
  rates: Rate[];
}

const ShippingRateManager: React.FC = () => {
  const [rates, setRates] = useState<ShippingRates>({ domestic: "", international: "" });
  const [loading, setLoading] = useState<boolean>(false);

  // --- Fetch existing shipping rates from the server ---
  const fetchRates = async () => {
    try {
      const res = await axios.get<FetchRatesResponse>(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/shipping-rates`, { withCredentials: true });
      if (res.data.success) {
        const domesticRate = res.data.rates.find(r => r.type === "domestic");
        const internationalRate = res.data.rates.find(r => r.type === "international");
        
        setRates({
          domestic: domesticRate?.price ?? "",
          international: internationalRate?.price ?? "",
        });
      }
    } catch (err) {
      console.error("Error fetching shipping rates:", err);
      // Optionally, show a user-facing error message here
    }
  };

  // --- Handle saving a specific rate type ---
  const handleSave = async (type: keyof ShippingRates) => {
    try {
      setLoading(true);
      const price = rates[type];
      
      // Basic validation to ensure a price is entered
      if (price === "") {
        alert("Please enter a price before saving.");
        return;
      }

      await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/shipping-rates`,
        { type, price: Number(price) }, // Ensure price is sent as a number
        { withCredentials: true }
      );
      alert(`${type.charAt(0).toUpperCase() + type.slice(1)} shipping price updated successfully!`);
      fetchRates(); // Refresh rates after saving
    } catch (err) {
      console.error("Error saving rate:", err);
      alert("Error updating shipping price. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // --- Handle input changes ---
  const handleChange = (e: ChangeEvent<HTMLInputElement>, type: keyof ShippingRates) => {
    setRates({ ...rates, [type]: e.target.value });
  };
  
  // --- Fetch rates on initial component mount ---
  useEffect(() => {
    fetchRates();
  }, []);

  return (
    <div className="max-w-lg mx-auto mt-8 p-4 bg-white shadow rounded-xl">
      <h2 className="text-xl font-semibold mb-4 text-center">Shipping Rate Settings</h2>

      {/* Domestic Shipping */}
      <div className="flex items-center justify-between mb-3">
        <label className="font-medium">US Shipping Price ($):</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            className="border rounded px-2 py-1 w-32 text-right"
            value={rates.domestic}
            onChange={(e) => handleChange(e, "domestic")}
            placeholder="e.g., 5.99"
          />
          <button
            disabled={loading}
            onClick={() => handleSave("domestic")}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Save
          </button>
        </div>
      </div>

      {/* International Shipping */}
      <div className="flex items-center justify-between">
        <label className="font-medium">International Shipping Price ($):</label>
        <div className="flex items-center space-x-2">
          <input
            type="number"
            className="border rounded px-2 py-1 w-32 text-right"
            value={rates.international}
            onChange={(e) => handleChange(e, "international")}
            placeholder="e.g., 15.99"
          />
          <button
            disabled={loading}
            onClick={() => handleSave("international")}
            className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 disabled:bg-gray-400"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default ShippingRateManager;