import React, { useState } from 'react';
import axios from 'axios';

export const AddProductCategoryForm = () => {
  const [categoryName, setCategoryName] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/product-categories', { CategoryName: categoryName });
      setMessage(response.data.message);
      setCategoryName(''); // Clear the form after submission
    } catch (error) {
      setMessage('Error adding product category. Please try again.');
      console.error('There was an error adding the product category!', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-5 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Product Category</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Category Name</label>
          <input
            type="text"
            value={categoryName}
            onChange={(e) => setCategoryName(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-md">
            Submit
          </button>
        </div>
        {message && <p className="text-center text-green-500 mt-4">{message}</p>}
      </form>
    </div>
  );
};
