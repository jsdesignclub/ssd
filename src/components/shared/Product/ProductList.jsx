import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch products from the backend
    axios.get('http://localhost:5000/api/products')
      .then(response => {
        setProducts(response.data);
        setError(null);
      })
      .catch(err => {
        setError('Error fetching products');
        setProducts([]);
      });
  }, []);

  return (
    <div className="max-w-4xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      {error && <p className="text-red-500">{error}</p>}
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b">ID</th>
            <th className="py-2 px-4 border-b">Product Name</th>
            <th className="py-2 px-4 border-b">Product Code</th>
            <th className="py-2 px-4 border-b">Product Category</th>
            <th className="py-2 px-4 border-b">Unit Price</th>
            <th className="py-2 px-4 border-b">Quantity in Stock</th>
          </tr>
        </thead>
        <tbody>
          {products.length > 0 ? (
            products.map(product => (
              <tr key={product.id}>
                <td className="py-2 px-4 border-b">{product.id}</td>
                <td className="py-2 px-4 border-b">{product.productName}</td>
                <td className="py-2 px-4 border-b">{product.productCode}</td>
                <td className="py-2 px-4 border-b">{product.productCategory}</td>
                <td className="py-2 px-4 border-b">{product.unitPrice}</td>
                <td className="py-2 px-4 border-b">{product.quantityInStock}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="py-2 px-4 border-b text-center">No products available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
