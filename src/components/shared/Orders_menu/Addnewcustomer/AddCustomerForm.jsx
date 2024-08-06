import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

export const AddCustomerForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/api/customers', data);
      console.log(response.data);
      alert('Customer added successfully!');
      reset();
    } catch (error) {
      console.error('There was an error adding the customer!', error);
      alert('Error adding customer. Please try again.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-5 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Customer</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Name</label>
          <input
            type="text"
            {...register('CustomerName', { required: 'Customer Name is required' })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.CustomerName && <p className="text-red-500 text-xs mt-1">{errors.CustomerName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Address</label>
          <input
            type="text"
            {...register('CustomerAddress')}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.CustomerAddress && <p className="text-red-500 text-xs mt-1">{errors.CustomerAddress.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Phone Number</label>
          <input
            type="text"
            {...register('CustomerPhoneNumber')}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.CustomerPhoneNumber && <p className="text-red-500 text-xs mt-1">{errors.CustomerPhoneNumber.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Email</label>
          <input
            type="email"
            {...register('CustomerEmail')}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.CustomerEmail && <p className="text-red-500 text-xs mt-1">{errors.CustomerEmail.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Customer Website</label>
          <input
            type="text"
            {...register('CustomerWebsite')}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.CustomerWebsite && <p className="text-red-500 text-xs mt-1">{errors.CustomerWebsite.message}</p>}
        </div>
        <div>
          <button type="submit" className="w-full bg-blue-600 text-white p-2 rounded-md">
            Add Customer
          </button>
        </div>
      </form>
    </div>
  );
};
