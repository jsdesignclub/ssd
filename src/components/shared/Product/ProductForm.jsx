import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const ProductForm = () => {
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const onSubmit = (data) => {
    axios.post('http://localhost:5000/api/products', data)
      .then(response => {
        setSuccessMessage('Product added successfully!');
        setErrorMessage('');
        reset();
      })
      .catch(error => {
        setErrorMessage('There was an error submitting the form!');
        setSuccessMessage('');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productName">
            Product Name
          </label>
          <input
            {...register('productName', { required: 'Product Name is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productName"
            type="text"
            placeholder="Product Name"
          />
          {errors.productName && <p className="text-red-500 text-xs italic">{errors.productName.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCode">
            Product Code
          </label>
          <input
            {...register('productCode', { required: 'Product Code is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productCode"
            type="text"
            placeholder="Product Code"
          />
          {errors.productCode && <p className="text-red-500 text-xs italic">{errors.productCode.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="productCategory">
            Product Category
          </label>
          <input
            {...register('productCategory', { required: 'Product Category is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="productCategory"
            type="text"
            placeholder="Product Category"
          />
          {errors.productCategory && <p className="text-red-500 text-xs italic">{errors.productCategory.message}</p>}
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="unitPrice">
            Unit Price
          </label>
          <input
            {...register('unitPrice', { required: 'Unit Price is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="unitPrice"
            type="number"
            placeholder="Unit Price"
          />
          {errors.unitPrice && <p className="text-red-500 text-xs italic">{errors.unitPrice.message}</p>}
        </div>
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="quantityInStock">
            Quantity in Stock
          </label>
          <input
            {...register('quantityInStock', { required: 'Quantity in Stock is required' })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="quantityInStock"
            type="number"
            placeholder="Quantity in Stock"
          />
          {errors.quantityInStock && <p className="text-red-500 text-xs italic">{errors.quantityInStock.message}</p>}
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-red-700 hover:bg-red-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            Create Product
          </button>
        </div>
      </form>
      {successMessage && <p className="text-green-500 text-xs italic">{successMessage}</p>}
      {errorMessage && <p className="text-red-500 text-xs italic">{errorMessage}</p>}
    </div>
  );
};

export default ProductForm;
