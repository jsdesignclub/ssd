import React from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom'; 

const AddPremadeProductForm = () => {
    const { orderId, productId } = useParams(); // Get orderId and productId from URL
    const navigate = useNavigate(); // Initialize navigate
    const { register, handleSubmit, reset } = useForm({
        defaultValues: {
            name: ''
        }
    });

    const onSubmit = async (data) => {
        try {
            // Make the API call and capture the response
            const response = await axios.post('http://localhost:5000/api/premadeproduct', {
                productId, // Send productId directly
                name: data.name // Use name instead of Name
            });
    
            // Extract the PremadeProductId from the response
            const premadeProductId = response.data.id;
    
            // Reset the form
            reset();
    
            // Show success alert
            alert('Premade Product added successfully!');
    
            // Navigate to the desired page using PremadeProductId
            navigate(`/CreateNewSpecification/${orderId}/${productId}/${premadeProductId}`);
        } catch (error) {
            console.error('Error submitting form', error);
            alert('Failed to submit form');
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
            <h2 className="text-xl font-bold mb-4">Add Premade Product Name</h2>
            <div className="mb-4">
                <label className="block text-gray-700 font-bold mb-2">Name</label>
                <input 
                    type="text" 
                    {...register('name')} 
                    className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" 
                    required 
                />
            </div>
            <button 
                type="submit" 
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
            >
                Submit
            </button>
        </form>
    );
};

export default AddPremadeProductForm;
