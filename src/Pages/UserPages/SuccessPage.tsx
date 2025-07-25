import type React from "react"
import { useEffect, useState } from "react"
import { useNavigate, useSearchParams } from "react-router-dom"
import { CheckCircle, ArrowRight } from "lucide-react"
import { retrieveCheckoutSession } from "../../services/stripe"
import { useDispatch } from "react-redux"
import { addToCartAction } from "../../Redux/Reducer/cartSlice"

interface PaymentDetails {
  id: string
  amount: number
  status: string
  customer: {
    name: string
    email: string
  }
  created: number
}

const SuccessPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const [paymentDetails, setPaymentDetails] = useState<PaymentDetails | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      setError("No session ID found. Payment verification failed.")
      setLoading(false)
      return
    }

    const verifyPayment = async () => {
      try {
        const {session} = await retrieveCheckoutSession(sessionId);
        if (session.status !== "complete") {
          setError("Payment was not completed successfully.")
          setLoading(false)
          return
        }

        setPaymentDetails({
          id: session.id,
          amount: session.amount_total / 100, // Convert from cents to dollars
          status: session.payment_status,
          customer: {
            name: session.customer_details?.name || "Customer",
            email: session.customer_details?.email || "No email provided",
          },
          created: session.created,
        });
        
        dispatch(addToCartAction(null));
        setLoading(false)
      } catch (err) {
        console.error("Error verifying payment:", err)
        setError("Failed to verify payment. Please contact support.")
        setLoading(false)
      }
    }

    verifyPayment()
  }, [searchParams])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="w-16 h-16 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-lg text-gray-700">Verifying your payment...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
          <div className="flex flex-col items-center">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-gray-900 mb-2">Payment Error</h1>
            <p className="text-gray-600 text-center mb-6">{error}</p>
            <button
              onClick={() => navigate("/cart")}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
            >
              Try Again
            </button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md mx-auto bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="bg-gradient-to-r from-indigo-500 to-purple-600 px-6 py-8 text-center">
          <CheckCircle className="h-16 w-16 text-white mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-white">Payment Successful!</h1>
          <p className="text-indigo-100 mt-2">Thank you for your purchase</p>
        </div>

        <div className="px-6 py-8">
          <div className="mb-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Order Details</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Order ID</span>
                <span className="font-medium text-gray-900">{paymentDetails?.id.slice(-8)}</span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Date</span>
                <span className="font-medium text-gray-900">
                  {paymentDetails?.created ? new Date(paymentDetails.created * 1000).toLocaleDateString() : "N/A"}
                </span>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Total Amount</span>
                <span className="font-medium text-gray-900">${paymentDetails?.amount.toFixed(2) || "0.00"}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Status</span>
                <span className="font-medium text-green-600 capitalize">{paymentDetails?.status || "Paid"}</span>
              </div>
            </div>
          </div>

          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-900 mb-2">Customer Information</h2>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex justify-between py-2 border-b border-gray-200">
                <span className="text-gray-600">Name</span>
                <span className="font-medium text-gray-900">{paymentDetails?.customer.name}</span>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Email</span>
                <span className="font-medium text-gray-900">{paymentDetails?.customer.email}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-3">
            <button
              onClick={() => navigate("/order-tracking")}
              className="w-full flex items-center justify-center px-4 py-3 border border-transparent rounded-lg text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700"
            >
              Track Your Order
            </button>
            <button
              onClick={() => navigate("/")}
              className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg text-base font-medium text-gray-700 bg-white hover:bg-gray-50"
            >
              Continue Shopping <ArrowRight className="ml-2 h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SuccessPage
