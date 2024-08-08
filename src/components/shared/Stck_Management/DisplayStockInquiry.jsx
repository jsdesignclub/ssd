import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const DisplayStockInquiry = () => {
  const [orders, setOrders] = useState([]);
  const navigate = useNavigate();
  const [selectedOrder, setSelectedOrder] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/orders/stock-department');
        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders', error);
      }
    };

    fetchOrders();
  }, []);

  const handleShowDetails = (order) => {
    setSelectedOrder(order);
  };

  return (
    <div>
      <h2>Stock Department Orders</h2>
      <table className="min-w-full divide-y divide-gray-200">
        <thead>
          <tr>
            <th className="px-6 py-3 bg-gray-50">Order ID</th>
            <th className="px-6 py-3 bg-gray-50">Premade Product ID</th>
            <th className="px-6 py-3 bg-gray-50">Action</th>
            <th className="px-6 py-3 bg-gray-50">Details</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.OrderId}>
              <td className="px-6 py-4 whitespace-nowrap">{order.OrderId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.PremadeProductId}</td>
              <td className="px-6 py-4 whitespace-nowrap">{order.Action}</td>
              <td className="px-6 py-4 whitespace-nowrap">
              <button
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
                  onClick={() => navigate(`/stock_requirement/${order.PremadeProductId}/${order.OrderId}`)}
                >
                  Show Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {selectedOrder && (
        <div>
          <h3>Order Details</h3>
          <p>Order ID: {selectedOrder.OrderId}</p>
          <p>Premade Product ID: {selectedOrder.PremadeProductId}</p>
          <p>Action: {selectedOrder.Action}</p>
          {/* Add more details as needed */}
        </div>
      )}
    </div>
  );
};

export default DisplayStockInquiry;
