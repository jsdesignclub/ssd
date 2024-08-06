import React, { useEffect, useState } from 'react';
import axios from 'axios';

const GeneralInformation = ({ orderId }) => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrderDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/order/${orderId}`);
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching order details:', error);
      }
    };

    fetchOrderDetails();
  }, [orderId ]);

  return (
    <div className="p-4 bg-white shadow-md rounded-lg ">
      <h2 className="text-xl font-bold mb-4">Order Details</h2>
      
     
      <table className="min-w-full bg-white border border-gray-300 ">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">Order ID </th>
            <th className="py-2 px-4 border-b">Customer Name</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Quantity</th>
            <th className="py-2 px-4 border-b">Order Date</th>
            <th className="py-2 px-4 border-b">Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.OrderId}>
              <td className="py-2 px-4 border-b">{order.OrderId}</td>
              <td className="py-2 px-4 border-b">{order.CustomerName}</td>
              <td className="py-2 px-4 border-b">{order.ProductName}</td>
              <td className="py-2 px-4 border-b">{order.Quantity}</td>
              <td className="py-2 px-4 border-b">{new Date(order.OrderDate).toLocaleDateString()}</td>
              <td className="py-2 px-4 border-b">{new Date(order.DeliveryDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default GeneralInformation;
