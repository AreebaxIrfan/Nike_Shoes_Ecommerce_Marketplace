import React from 'react';
import OrderTracking from '../../components/OrderTrackling';

const OrderTrackingPage: React.FC = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Track Your Order</h1>

      <OrderTracking />
    </div>
  );
};

export default OrderTrackingPage;

