import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import GeneralInformation from './GeneralInformation';

const PremadeProductForm = () => {
  const navigate = useNavigate();
  const { id: orderId, productId, premadeProductId } = useParams();
  const { register, handleSubmit, reset } = useForm();
  const [materials, setMaterials] = useState([]);
  const [productDetails, setProductDetails] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/materials');
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials', error);
      }
    };

    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/premadeproductdetails/${premadeProductId}`);
        setProductDetails(response.data);
        console.log('Product Details:', response.data);
      } catch (error) {
        console.error('Error fetching product details', error);
      }
    };

    fetchMaterials();
    fetchProductDetails();
  }, [premadeProductId]);

  const onSubmit = async (data) => {
    try {
      await axios.post('http://localhost:5000/api/premadeproductdetails', {
        ...data,
        premadeProductId,
        totalPrice: data.quantity * data.unitPrice,
      });

      // Refetch product details after submission
      const response = await axios.get(`http://localhost:5000/api/premadeproductdetails/${premadeProductId}`);
      setProductDetails(response.data);
      
      reset();
      alert('Product details added successfully!');
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Failed to submit form');
    }
  };

  const handleDelete = async (index, id) => {
    try {
      await axios.delete(`http://localhost:5000/api/premadeproductdetails/${id}`);
      setProductDetails(productDetails.filter((_, i) => i !== index));
      alert('Product detail deleted successfully!');
    } catch (error) {
      console.error('Error deleting product detail', error);
      alert('Failed to delete product detail');
    }
  };
  const updateOrderWithPremadeProductId = async () => {
    try {
        await axios.put(`http://localhost:5000/api/orders/${orderId}`, { premadeProductId });
        alert('Order updated successfully!');
        navigate(`/List_Of_order`);
    } catch (error) {
        console.error('Error updating order', error);
        alert('Failed to update order');
    }
};

  return (
    <div className="flex gap-4 flex-col">
      <h1>Product Specification ID: {premadeProductId}</h1>
      <div className="p-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md border border-gray-300 text-center">
        <GeneralInformation orderId={orderId} />
      </div>
      <div className="p-4 bg-gray-200 border border-gray-300 text-center">
        <ImageUpload premadeProductId={premadeProductId} />
      </div>
      <div className="p-2 bg-white border-gray-300 text-center">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
          <h2 className="text-xl font-bold mb-2">Material Requirement</h2>
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-md flex space-x-4">
              <div className="flex-1 h-5">
                <label className="block text-gray-700 font-bold mb-1">Material Name</label>
                <select
                  {...register('materialId')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                >
                  <option value="">Select Material</option>
                  {materials.map((material) => (
                    <option key={material.MaterialId} value={material.MaterialId}>
                      {material.MaterialName}
                    </option>
                  ))}
                </select>
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-1 ">Quantity</label>
                <input
                  type="number"
                  {...register('quantity')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-1">Unit Price</label>
                <input
                  type="number"
                  {...register('unitPrice')}
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500"
                  required
                />
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-green-500 text-white w-full px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
          >
            Add Material Requirement
          </button>
        </form>
      </div>
      <div className="mt-8 p-2 bg-white border-gray-300 text-center">
        <h2 className="text-xl font-bold mb-2">Material Requirements</h2>
        {productDetails.length > 0 ? (
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50">Material Name</th>
                <th className="px-6 py-3 bg-gray-50">Quantity</th>
                <th className="px-6 py-3 bg-gray-50">Unit Price</th>
                <th className="px-6 py-3 bg-gray-50">Total Price</th>
                <th className="px-6 py-3 bg-gray-50">Actions</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map((detail, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {materials.find((mat) => mat.MaterialId === detail.MaterialId)?.MaterialName || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.Quantity}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.UnitPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{detail.totalPrice}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      type="button"
                      onClick={() => handleDelete(index, detail.id)}
                      className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No material requirements added yet.</p>
        )}
      </div>

      <div className="flex justify-center gap-4 mt-4">
                <button 
                    onClick={updateOrderWithPremadeProductId} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Update Order
                </button>
               
            </div>




    </div>
  );
};

export default PremadeProductForm;
