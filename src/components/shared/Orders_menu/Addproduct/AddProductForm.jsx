import React, { useState, useEffect } from 'react';
import axios from 'axios';

export const AddProductForm = () => {
  const [productName, setProductName] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [categories, setCategories] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/product-categories')
      .then(response => {
        setCategories(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the product categories!', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/product', {
        ProductName: productName,
        ProductCategoryId: productCategoryId
      });
      setMessage(response.data.message);
      setProductName('');
      setProductCategoryId('');
    } catch (error) {
      setMessage('Error adding product. Please try again.');
      console.error('There was an error adding the product!', error);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-5 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Add New Product</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Name</label>
          <input
            type="text"
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Product Category</label>
          <select
            value={productCategoryId}
            onChange={(e) => setProductCategoryId(e.target.value)}
            className="mt-1 block w-full p-2 border rounded-md"
            required
          >
            <option value="">Select a category</option>
            {categories.map(category => (
              <option key={category.ProductCategoryId} value={category.ProductCategoryId}>{category.CategoryName}</option>
            ))}
          </select>
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
