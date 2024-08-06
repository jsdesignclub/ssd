import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from 'axios';

const PremadeProductPage = () => {
  const { id: orderId } = useParams(); // Get OrderId from URL
  const { productId: productId } = useParams(); // Get OrderId from URL
  const navigate = useNavigate(); // Use useNavigate for redirection
  const [premadeProducts, setPremadeProducts] = useState([]);
  const [selectedPremadeProduct, setSelectedPremadeProduct] = useState('');
  const [productDetails, setProductDetails] = useState([]);
  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    // Fetch premade products
    axios.get(`http://localhost:5000/api/premade_products/${productId}`)
      .then(response => {
        setPremadeProducts(response.data);
        
      })
      .catch(error => {
        console.error('There was an error fetching the premade products!', error);
      });

    // Fetch all materials for reference
    axios.get('http://localhost:5000/api/materials')
      .then(response => {
        setMaterials(response.data);
      })
      .catch(error => {
        console.error('There was an error fetching the materials!', error);
      });
  }, []);

  const handlePremadeProductChange = (event) => {
    const selectedProductId = event.target.value;
    if (selectedProductId === 'new_specification') {
      // Redirect to the "Create New Specification" page with the orderId
      navigate(`/AddPremadeProductForm/${orderId}/${productId}`);
    } else {
      setSelectedPremadeProduct(selectedProductId);

      if (selectedProductId) {
        // Fetch product details for the selected premade product
        axios.get(`http://localhost:5000/api/premade_product_details/${selectedProductId}`)
          .then(response => {
            setProductDetails(response.data);
           
            navigate(`/Premadeproductdetails/${orderId}/${productId}/${selectedProductId}`);
          })
          .catch(error => {
            console.error('There was an error fetching the product details!', error);
          });
      } else {
        setProductDetails([]);
      }
    }
  };

  // Create a mapping of MaterialId to MaterialName for easier access
  const materialMap = materials.reduce((acc, material) => {
    acc[material.MaterialId] = material.MaterialName;
    return acc;
  }, {});

  const handleAddOrder = () => {
    if (!selectedPremadeProduct) {
      alert('Please select a premade product.');
      return;
    }

    // Send request to backend to update the order with the selected premade product
    axios.put(`http://localhost:5000/api/orders/${orderId}`, {
      PremadeProductId: selectedPremadeProduct
    })
      .then(response => {
        alert('Order successfully updated with the selected premade product!');
        setSelectedPremadeProduct('');
        setProductDetails([]);
        navigate('/List_Of_order'); // Redirect to the desired page after successful update
      })
      .catch(error => {
        console.error('There was an error updating the order!', error);
        alert('Error updating the order. Please try again.');
      });
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white p-5 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">Select or Add Premade Product</h1>
<h1>order Id {orderId}</h1>
<h1>Product Id {productId}</h1>


      <form className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Premade Product</label>
          <select
            className="mt-1 block w-full p-2 border rounded-md"
            value={selectedPremadeProduct}
            onChange={handlePremadeProductChange}
          >
            <option value="">Select a premade product</option>
            {premadeProducts.map(product => (
              <option key={product.PremadeProductId} value={product.PremadeProductId}>
                {product.Name}
              </option>
            ))}
            <option value="new_specification">Create New Specification</option>
          </select>
        </div>

        <button
          type="button"
          onClick={handleAddOrder}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md"
        >
          Add to Order
        </button>
      </form>

      {productDetails.length > 0 && (
        <div className="mt-8">
          <h2 className="text-xl font-bold mb-4">Premade Product Details</h2>
          <table className="min-w-full divide-y divide-gray-200">
            <thead>
              <tr>
                <th className="px-6 py-3 bg-gray-50">Material</th>
                <th className="px-6 py-3 bg-gray-50">Quantity</th>
              </tr>
            </thead>
            <tbody>
              {productDetails.map(detail => (
                <tr key={detail.MaterialId}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {materialMap[detail.MaterialId] || 'Unknown'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {detail.Quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PremadeProductPage;
