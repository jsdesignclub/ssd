import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai';
import { AiFillCaretRight } from "react-icons/ai";
import { AiFillEdit } from "react-icons/ai";
import { AiOutlineEye } from "react-icons/ai";
const OrderTable = () => {
  const [orders, setOrders] = useState([]);
  const [customers, setCustomers] = useState([]);
  const [products, setProducts] = useState([]);
  const [premadeProducts, setPremadeProducts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch orders
    axios.get('http://localhost:5000/api/orders')
      .then(response => {
        setOrders(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the orders!', error);
      });

    // Fetch customers
    axios.get('http://localhost:5000/api/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customers!', error);
      });

    // Fetch products
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });

    // Fetch premade products
    axios.get('http://localhost:5000/api/premade_products')
      .then(response => {
        setPremadeProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the premade products!', error);
      });
  }, []);

  const getCustomerName = (customerId) => {
    const customer = customers.find(c => c.CustomerId === customerId);
    return customer ? customer.CustomerName : 'Unknown';
  };

  const getProductName = (productId) => {
    const product = products.find(p => p.ProductId === productId);
    return product ? product.ProductName : 'Unknown';
  };

  const getPremadeProductName = (premadeProductId) => {
    const premadeProduct = premadeProducts.find(pp => pp.PremadeProductId === premadeProductId);
    return premadeProduct ? premadeProduct.Name : 'Unknown';
  };

  const handleAddPSP = (orderId, productId) => {
    navigate(`/PremadeProductPage/${orderId}/${productId}`);
  };

  const handleUpdate = (orderId) => {
    navigate(`/update-order/${orderId}`);
  };

  const handleDelete = (orderId) => {
    if (window.confirm('Are you sure you want to delete this order?')) {
      axios.delete(`http://localhost:5000/api/orders/${orderId}`)
        .then(response => {
          setOrders(orders.filter(order => order.OrderId !== orderId));
          alert('Order deleted successfully!');
        })
        .catch(error => {
          console.error('There was an error deleting the order!', error);
          alert('Error deleting order. Please try again.');
        });
    }
  };

  const handleViewDetails = (orderId) => {
    navigate(`/order-details/${orderId}`);
  };


  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Order List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border  border-gray-200">
          <thead>
            <tr>
              <th className="px-4 py-2">Order ID</th>
              <th className="px-4 py-2">Customer</th>
              <th className="px-4 py-2">Product</th>
              <th className="px-4 py-2">Premade Product</th>
              <th className="px-4 py-2">Quantity</th>
              <th className="px-4 py-2">Order Date</th>
              <th className="px-4 py-2">Delivery Date</th>
              <th className="px-4 py-2">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.OrderId} className="border-t border-gray-200">
                <td className="px-4 py-2">{order.OrderId}</td>
                <td className="px-4 py-2">{getCustomerName(order.CustomerId)}</td>
                <td className="px-4 py-2">{getProductName(order.ProductId)}</td>
                <td className="px-4 py-2">{getPremadeProductName(order.PremadeProductId)}</td>
                <td className="px-4 py-2">{order.Quantity}</td>
                <td className="px-4 py-2">{new Date(order.OrderDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">{new Date(order.DeliveryDate).toLocaleDateString()}</td>
                <td className="px-4 py-2">
                {order.PremadeProductId ? null : (
                    <button
                      onClick={() => handleAddPSP(order.OrderId,order.ProductId)}
                      className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                    >
                     <AiFillCaretRight/>
                    </button>
                  )}
                  <button 
                    onClick={() => handleUpdate(order.OrderId)} 
                    className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">
                    <AiFillEdit/>
                  </button>
                  <button 
                    onClick={() => handleDelete(order.OrderId)} 
                    className="bg-red-500 text-white px-2 py-1 rounded">
                    <AiOutlineClose/>
                  </button>
                  <button
                    onClick={() => handleViewDetails(order.OrderId)}
                    className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  >
                     <AiOutlineEye/>
                  </button>

                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderTable;
