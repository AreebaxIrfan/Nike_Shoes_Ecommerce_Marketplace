import React from 'react';

interface OrderSummaryProps {
    subtotal: number;
    shipping: number;
    total: number;
}


const OrderSummary: React.FC<OrderSummaryProps> = ({ subtotal, shipping, total }) => {

    return (
        <div className="border p-6 rounded-lg shadow-md mb-4 mt-4">
            <h2 className="text-xl font-semibold mb-4">Order Summary</h2>
            <div className="flex justify-between">
                <p>Subtotal:</p>
                <p>${subtotal.toFixed(2)}</p>
            </div>
            <div className="flex justify-between">
                <p>Shipping:</p>
                <p>${shipping.toFixed(2)}</p>
            </div>
            <hr className="my-2 mt-2" />
            <div className="flex justify-between font-bold">
                <p>Total:</p>
                <p>${total.toFixed(2)}</p>
            </div>
        </div>
    );
};

export default OrderSummary;
