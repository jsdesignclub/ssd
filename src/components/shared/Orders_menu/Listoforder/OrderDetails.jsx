import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // Fetch order details
    axios.get(`http://localhost:5000/api/orders/${orderId}`)
      .then(response => {
        setOrder(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the order details!', error);
      });

    // Fetch materials related to the order
    axios.get(`http://localhost:5000/api/order_materials/${orderId}`)
      .then(response => {
        setMaterials(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the materials!', error);
      });
  }, [orderId]);

  if (!order) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Order Details</h1>
      <div className="bg-white p-5 rounded-md shadow-md">
        <h2 className="text-xl font-bold mb-2">Basic Information</h2>
        <p><strong>Order ID:</strong> {order.OrderId}</p>
        <p><strong>Customer:</strong> {order.CustomerName}</p>
        <p><strong>Product:</strong> {order.ProductName}</p>
        <p><strong>Quantity:</strong> {order.Quantity}</p>
        <p><strong>Order Date:</strong> {new Date(order.OrderDate).toLocaleDateString()}</p>
        <p><strong>Delivery Date:</strong> {new Date(order.DeliveryDate).toLocaleDateString()}</p>

        <h2 className="text-xl font-bold mt-4 mb-2">Material Requirements</h2>
        <table className="min-w-full bg-white border border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">Material</th>
              <th className="px-4 py-2">Quantity</th>
            </tr>
          </thead>
          <tbody>
            {materials.map((material) => (
              <tr key={material.MaterialId} className="border-t border-gray-200">
                <td className="px-4 py-2">{material.MaterialName}</td>
                <td className="px-4 py-2">{material.Quantity}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderDetails;
