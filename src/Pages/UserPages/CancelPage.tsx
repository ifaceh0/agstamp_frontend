//This component handles the cancellation of a payment process.
// It provides the user with options to return to the checkout page or continue shopping.

import type React from "react"
import { useNavigate } from "react-router-dom"
import { XCircle, ArrowLeft } from "lucide-react"

const CancelPage: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="flex flex-col items-center">
          <XCircle className="h-16 w-16 text-red-500 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Cancelled</h1>
          <p className="text-gray-600 text-center mb-6">
            Your payment process was cancelled. No charges were made to your account.
          </p>
          <div className="flex flex-col space-y-3 w-full">
            <button
              onClick={() => navigate("/cart")}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              <ArrowLeft className="mr-2 h-4 w-4" /> Return to Cart
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CancelPage
