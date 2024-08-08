import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

export const Premadeproductdetails = () => {
    const {id:orderId, productId, premadeProductId } = useParams();
    const navigate = useNavigate();
    const [productDetails, setProductDetails] = useState([]);
    const [materials, setMaterials] = useState([]);
    const [images, setImages] = useState([]);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/premade_product_details/${premadeProductId}`);
                setProductDetails(response.data);
            } catch (error) {
                console.error('Error fetching product details', error);
            }
        };

        const fetchMaterials = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/materials`);
                setMaterials(response.data);
            } catch (error) {
                console.error('Error fetching materials', error);
            }
        };

        const fetchImages = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/images/${premadeProductId}`);
                console.log('Images response:', response.data); // Log the response
                setImages(response.data); // Ensure response.data is an array of image objects
            } catch (error) {
                console.error('Error fetching images', error);
            }
        };

        fetchProductDetails();
        fetchMaterials();
        fetchImages();
    }, [premadeProductId]);

    // Create a mapping of MaterialId to MaterialName for easier access
    const materialMap = materials.reduce((acc, material) => {
        acc[material.MaterialId] = material.MaterialName;
        return acc;
    }, {});

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

  const goBackToPreviousPage = () => {
      navigate(-1); // Navigate back to the previous page
  };



    return (
        <div>
            <div className="flex gap-4 flex-col">
                <h1>Product Specification ID: {premadeProductId}</h1>
                <div className="p-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md border border-gray-300 text-center">
                    Product Design {orderId}
                </div>
                <div className="p-4 bg-gray-200 border border-gray-300 text-center">
                    {images.length > 0 ? (
                        <div className="flex flex-wrap gap-4 justify-center">
                            {images.map((image, index) => (
                                <div key={image.ImageId} className="w-1/3 p-2">
                                    <img 
                                        src={image.ImageUrl} 
                                        alt={`Product Image ${index + 1}`} 
                                        className="w-full h-auto rounded-md" 
                                    />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No images available.</p>
                    )}
                </div>
                <div className="p-2 bg-white border-gray-300 text-center">
                    <h1>Material details</h1>
                    {productDetails.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                                <tr>
                                    <th className="px-6 py-3 bg-gray-50">Material Name</th>
                                    <th className="px-6 py-3 bg-gray-50">Quantity</th>
                                    <th className="px-6 py-3 bg-gray-50">Unit Price</th>
                                    <th className="px-6 py-3 bg-gray-50">Total Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {productDetails.map(detail => (
                                    <tr key={detail.MaterialId}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {materialMap[detail.MaterialId] || 'Unknown'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">{detail.Quantity}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{detail.UnitPrice}</td>
                                        <td className="px-6 py-4 whitespace-nowrap">{detail.Quantity * detail.UnitPrice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p>No product details available.</p>
                    )}
                </div>
            </div>
            <div className="flex justify-center gap-4 mt-4">
                <button 
                    onClick={updateOrderWithPremadeProductId} 
                    className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
                >
                    Update Order
                </button>
                <button 
                    onClick={goBackToPreviousPage} 
                    className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600 focus:outline-none"
                >
                    Back
                </button>
            </div>




        </div>
    );
};
