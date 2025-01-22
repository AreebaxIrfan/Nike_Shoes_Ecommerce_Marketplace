'use client'
import React, { useState } from 'react';

interface OrderStatus {
  status: string;
  location: string;
  estimatedDelivery: string;
}


const mockOrderStatuses: { [key: string]: OrderStatus } = {
  '12345': { status: 'In Transit', location: 'New York City', estimatedDelivery: '2023-05-20' },
  '67890': { status: 'Delivered', location: 'Los Angeles', estimatedDelivery: '2023-05-15' },
};

const OrderTracking: React.FC = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [orderStatus, setOrderStatus] = useState<OrderStatus | null>(null);

  const handleTrack = () => {
    const status = mockOrderStatuses[orderNumber];
    setOrderStatus(status || null);
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl font-bold mb-4">Order Tracking</h2>
      <div className="mb-4">
        <label htmlFor="orderNumber" className="block text-sm font-medium text-gray-700">Order Number</label>
        <input
          type="text"
          id="orderNumber"
          value={orderNumber}
          onChange={(e) => setOrderNumber(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          placeholder="Enter your order number"
        />
      </div>
      <button
        onClick={handleTrack}
        className="w-full bg-black p-2 text-white py-2 px-4 rounded-md  focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-opacity-50"
      >
        Track Order
      </button>
      {orderStatus && (
        <div className="mt-6">
          <h3 className="text-lg font-semibold mb-2">Order Status:</h3>
          <p><strong>Status:</strong> {orderStatus.status}</p>
          <p><strong>Current Location:</strong> {orderStatus.location}</p>
          <p><strong>Estimated Delivery:</strong> {orderStatus.estimatedDelivery}</p>
        </div>
      )}
      {orderStatus === null && orderNumber && (
        <p className="mt-4 text-red-600">Order not found. Please check the order number and try again.</p>
      )}
    </div>
  );
};

export default OrderTracking;

