import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [stockDetails, setStockDetails] = useState([]);

  useEffect(() => {
    const fetchStockDetails = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/stock');
        setStockDetails(response.data);
      } catch (error) {
        console.error('Error fetching stock details', error);
      }
    };

    fetchStockDetails();
  }, []);

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Stock Balance</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Stock ID</th>
            <th className="px-6 py-3 border-b">Material ID</th>
            <th className="px-6 py-3 border-b">Available Quantity</th>
            <th className="px-6 py-3 border-b">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {stockDetails.map((stock, index) => (
            <tr key={index}>
              <td className="px-6 py-4 border-b">{stock.StockId}</td>
              <td className="px-6 py-4 border-b">{stock.MaterialId}</td>
              <td className="px-6 py-4 border-b">{stock.AvailableQuantity}</td>
              <td className="px-6 py-4 border-b">{new Date(stock.LastUpdated).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
