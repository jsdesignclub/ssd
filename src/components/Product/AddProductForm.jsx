import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductForm = () => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [discount, setDiscount] = useState('');
  const [quantity, setQuantity] = useState('');
  const [productCategoryId, setProductCategoryId] = useState('');
  const [categories, setCategories] = useState([]);

  // Fetch product categories on component mount
useEffect(() => {
  const fetchCategories = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/productcategories'); // Adjust URL if necessary
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching product categories:', error);
    }
  };

  fetchCategories();
}, []);

//Handle form submit  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const productData = {
      name,
      price,
      discount,
      quantity,
      productCategoryId,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/products', productData);
      console.log(response.data);
      alert('Product added successfully!');
    } catch (error) {
      console.error('Error adding product:', error);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Add New Product</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Name:
          </label>
          <input 
            type="text" 
            value={name} 
            onChange={(e) => setName(e.target.value)} 
            required 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Price:
          </label>
          <input 
            type="number" 
            value={price} 
            onChange={(e) => setPrice(e.target.value)} 
            required 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Discount:
          </label>
          <input 
            type="number" 
            value={discount} 
            onChange={(e) => setDiscount(e.target.value)} 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Quantity:
          </label>
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            required 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Product Category:
          </label>
          <select 
            value={productCategoryId} 
            onChange={(e) => setProductCategoryId(e.target.value)} 
            required 
            className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          >
            <option value="">Select a category</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex justify-center">
          <button 
            type="submit" 
            className="bg-blue-500 text-white px-6 py-2 rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
          >
            Add Product
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddProductForm;
