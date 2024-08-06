import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export const Form_for_new_order = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [products, setProducts] = useState([]);
  const [customers, setCustomers] = useState([]);
  const navigate = useNavigate(); // Ensure useNavigate is correctly imported and used here

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the products!', error);
      });

    axios.get('http://localhost:5000/api/customers')
      .then(response => {
        setCustomers(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the customers!', error);
      });
  }, []);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      const response = await axios.post('http://localhost:5000/api/orders', data);
      const orderId = response.data.OrderId; // Adjust based on your API response
      console.log(response.data);
      alert('Order submitted successfully!');
      reset();
      navigate(`/List_Of_order`); // Redirect to premade product page with OrderId
    } catch (error) {
      console.error('There was an error submitting the form!', error);
      alert('Error submitting order. Please try again.');
    }
  };


  
  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-5 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">New Order Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer</label>
          <select {...register('CustomerId', { required: 'Customer is required' })} className="mt-1 block w-full p-2 border rounded-md">
           
          <option value="">Select Customer</option>
            {customers.map(customer => (
              <option key={customer.CustomerId} value={customer.CustomerId}>{customer.CustomerName}</option>
            ))}
          </select>
          {errors.CustomerId && <p className="text-red-500 text-xs mt-1">{errors.CustomerId.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product</label>
          <select {...register('ProductId', { required: 'Product is required' })} className="mt-1 block w-full p-2 border rounded-md">
          <option value="">Select Product</option>
            {products.map(product => (
              <option key={product.ProductId} value={product.ProductId}>{product.ProductName}</option>
            ))}
          </select>
          {errors.ProductId && <p className="text-red-500 text-xs mt-1">{errors.ProductId.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Quantity</label>
          <input
            type="number"
            {...register('Quantity', { required: 'Quantity is required', min: 1 })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.Quantity && <p className="text-red-500 text-xs mt-1">{errors.Quantity.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Order Date</label>
          <input
            type="date"
            {...register('OrderDate', { required: 'Order Date is required' })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.OrderDate && <p className="text-red-500 text-xs mt-1">{errors.OrderDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Delivery Date</label>
          <input
            type="date"
            {...register('DeliveryDate', { required: 'Delivery Date is required' })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.DeliveryDate && <p className="text-red-500 text-xs mt-1">{errors.DeliveryDate.message}</p>}
        </div>
        <div>
          <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};
