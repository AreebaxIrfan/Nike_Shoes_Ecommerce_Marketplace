import type React from "react"

interface SummaryProps {
  subtotal: number
  shipping: number
  total: number
}

const Summary: React.FC<SummaryProps> = ({ subtotal, shipping, total }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h2>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-gray-600">Subtotal</span>
          <span className="font-medium text-gray-900">₹{subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-600">Shipping</span>
          <span className="font-medium text-gray-900">{shipping === 0 ? "Free" : `₹${shipping.toFixed(2)}`}</span>
        </div>
        <div className="border-t pt-3 mt-3">
          <div className="flex justify-between">
            <span className="text-lg font-semibold text-gray-900">Total</span>
            <span className="text-lg font-semibold text-gray-900">₹{total.toFixed(2)}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Summary

