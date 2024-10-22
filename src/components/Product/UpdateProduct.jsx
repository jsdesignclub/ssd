import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UpdateProduct = () => {
  const [products, setProducts] = useState([]);
  const [selectedProductId, setSelectedProductId] = useState(''); // State for product ID
  const [quantity, setQuantity] = useState(0);
 
  const [successMessage, setSuccessMessage] = useState(''); // State for success message

  useEffect(() => {
    // Fetch products on component mount
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
        
      })
      .catch(error => {
        console.error('Error fetching products:', error);
      });
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!selectedProductId) {
      console.error('No product selected');
      return;
    }

    try {
      // Send request to update the product quantity
      const response = await axios.put(`http://localhost:5000/api/products/${selectedProductId}`, {
        purchaseQuantity: quantity 
      });
      console.log('Updated product:', response.data);
      setSuccessMessage(`Successfully updated quantity to ${quantity} for product ID ${selectedProductId}`); // Set success message
      setQuantity(0); // Clear the quantity input after successful update
      setSelectedProductId(''); // Clear the selected product after successful update
    } catch (error) {
      console.error('Error updating product:', error);
      setSuccessMessage('Failed to update product quantity.'); // Set error message if needed
    }
  };

  return (
    <div className="p-4">
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4 border-2 border-gray-300 rounded-md shadow-md p-4">
        <label className="flex items-center space-x-2">
          Select Product:
          <select 
            value={selectedProductId} 
            onChange={(e) => setSelectedProductId(e.target.value)} 
            className="border-2 border-gray-300 rounded-md p-1"
          >
            <option value="" disabled>Select a product</option>
            {products.map((product) => (
              <option key={product.id} value={product.id}>
                {product.name}
              </option>
            ))}
          </select>
        </label>

        <br />

        <label className="flex items-center space-x-2">
          Enter Quantity:
          <input 
            type="number" 
            value={quantity} 
            onChange={(e) => setQuantity(e.target.value)} 
            className="border-2 border-gray-300 rounded-md p-1"
            placeholder="Enter quantity"
          />
        </label>

        <br />

        <button 
          type="submit" 
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Update Quantity
        </button>
      </form>

      {/* Display success message */}
      {successMessage && (
        <div className="mt-4 text-green-600 font-bold">
          {successMessage}
        </div>
      )}
    </div>
  );
};

export default UpdateProduct;
