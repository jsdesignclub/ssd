import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import ImageUpload from './ImageUpload';
import GeneralInformation from './GeneralInformation';

const PremadeProductForm = () => {
  const navigate = useNavigate();
  const { id: orderId, productId,premadeProductId } = useParams();
  const { register, handleSubmit, control, reset } = useForm({
    defaultValues: {
      productName: '',
      productDetails: [{ materialId: '', quantity: '', unitPrice: '' }]
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'productDetails'
  });

  const [materials, setMaterials] = useState([]);

  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/materials');
        setMaterials(response.data);
      } catch (error) {
        console.error('Error fetching materials', error);
      }
    };
    fetchMaterials();
  }, []);

  const onSubmit = async (data) => {
    try {
     

      const detailsPromises = data.productDetails.map(detail =>
        axios.post('http://localhost:5000/api/premadeproductdetails', {
          ...detail,
          premadeProductId,
          totalPrice: detail.quantity * detail.unitPrice
        })
      );

      await Promise.all(detailsPromises);

      // Update the order with the PremadeProductId
      await axios.put(`http://localhost:5000/api/orders/${orderId}`, {
        PremadeProductId: premadeProductId,
      });

      reset();
      alert('Product, details, and order updated successfully!');
      navigate(`/List_Of_order`);
    } catch (error) {
      console.error('Error submitting form', error);
      alert('Failed to submit form');
    }
  };

  return (


    

    <div className="flex gap-4 flex-col">
      <h1>Product Specification ID: {premadeProductId}</h1>
       <div className="p-4 bg-gradient-to-r from-slate-200 to-slate-300 rounded-md border border-gray-300 text-center">
    <GeneralInformation orderId={orderId}/>
    </div>
    <div className="p-4 bg-gray-200 border border-gray-300 text-center">
    <ImageUpload premadeProductId={premadeProductId} />
    
    </div>
   
    <div className="p-2 bg-white border-gray-300 text-center">
      
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
        <h2 className="text-xl font-bold mb-2">Material Requirement</h2>
        <div className="space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="p-4 border border-gray-200 rounded-md flex space-x-4">
              <div className="flex-1 h-5">
                <label className="block text-gray-700 font-bold mb-1">Material Name</label>
                <select 
                  {...register(`productDetails.${index}.materialId`)} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" 
                  required
                >
                  <option value="">Select Material</option>
                  {materials.map(material => (
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
                  {...register(`productDetails.${index}.quantity`)} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" 
                  required 
                />
              </div>
              <div className="flex-1">
                <label className="block text-gray-700 font-bold mb-1">Unit Price</label>
                <input 
                  type="number" 
                  {...register(`productDetails.${index}.unitPrice`)} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" 
                  required 
                />
              </div>
              <button 
                type="button" 
                onClick={() => remove(index)} 
                className="mt-6 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
              >
                Remove
              </button>
            </div>
          ))}
          <button 
            type="button" 
            onClick={() => append({ materialId: '', quantity: '', unitPrice: '' })} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Add Detail
          </button>
        </div>
        <button 
          type="submit" 
          className="bg-green-500 text-white w-full px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
    
  </div>
  



  );
};

export default PremadeProductForm;
