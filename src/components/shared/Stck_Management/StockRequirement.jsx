import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const StockRequirement = () => {
  const { orderId } = useParams();
  const { premadeProductId } = useParams();
  const [materialDetails, setMaterialDetails] = useState([]);

  useEffect(() => {
    const fetchMaterialDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/material_details/${orderId}`);
        setMaterialDetails(response.data);
      } catch (error) {
        console.error('Error fetching material details', error);
      }
    };

    fetchMaterialDetails();
  }, [orderId]);

  const updateOrderAction = async () => {
    try {
      for (let detail of materialDetails) {
        const { MaterialId, Quantity } = detail;
        console.log(`Detail:`, detail); // Log the entire detail object
  // Check if MaterialId and Quantity are defined
        if (!MaterialId || !Quantity) {
            console.error('MaterialId or Quantity is undefined');
            continue;
        }
        alert(`Updating stock for MaterialId: ${MaterialId} with Quantity: ${Quantity}`);

        // Update the stock table
        await axios.put(`http://localhost:5000/api/stock/${MaterialId}`, { issuedQuantity: Quantity });

        // Optionally, update the material table if needed
        await axios.put(`http://localhost:5000/api/material/${MaterialId}`, { issuedQuantity: Quantity });
      }

      await axios.put(`http://localhost:5000/api/orders/${premadeProductId}/action`, { action: 'cutting department' });
      alert('Order action updated to cutting department!');
      //navigate('Product_list'); // Optional: navigate to another page after updating
    } catch (error) {
      console.error('Error updating order action', error);
      alert('Failed to update order action');
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Material Requirements for Order {premadeProductId}</h2>
      <table className="min-w-full bg-white border">
        <thead>
          <tr>
            <th className="px-6 py-3 border-b">Material Name</th>
            <th className="px-6 py-3 border-b">Quantity</th>
            <th className="px-6 py-3 border-b">Unit Price</th>
            <th className="px-6 py-3 border-b">Total Price</th>
          </tr>
        </thead>
        <tbody>
          {materialDetails.map((detail, index) => (
            <tr key={index}>
              <td className="px-6 py-4 border-b">{detail.MaterialName}</td>
              <td className="px-6 py-4 border-b">{detail.Quantity}</td>
              <td className="px-6 py-4 border-b">{detail.UnitPrice}</td>
              <td className="px-6 py-4 border-b">{detail.TotalPrice}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <button 
        onClick={updateOrderAction} 
        className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
      >
        Update to Cutting Department
      </button>
    </div>
  );
};

export default StockRequirement;
