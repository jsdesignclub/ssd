import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductList = () => {
  const [stockDetails, setStockDetails] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchStockAndMaterials = async () => {
      try {
        const [stockResponse, materialsResponse] = await Promise.all([
          axios.get('http://localhost:5000/api/stock'),
          axios.get('http://localhost:5000/api/materials'),
        ]);

        setStockDetails(stockResponse.data);
        setMaterials(materialsResponse.data);
      } catch (error) {
        console.error('Error fetching stock or material details', error);
      }
    };

    fetchStockAndMaterials();
  }, []);

  const getMaterialName = (materialId) => {
    const material = materials.find((mat) => mat.MaterialId === materialId);
    return material ? material.MaterialName : 'Unknown';
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Available Stock Balance</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Stock ID</th>
            <th className="px-6 py-3 border-b">Material Name</th>
            <th className="px-6 py-3 border-b">Available Quantity</th>
            <th className="px-6 py-3 border-b">Last Updated</th>
          </tr>
        </thead>
        <tbody>
          {stockDetails.map((stock, index) => (
            <tr key={index}>
              <td className="px-6 py-4 border-b">{stock.StockId}</td>
              <td className="px-6 py-4 border-b">{getMaterialName(stock.MaterialId)}</td>
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
