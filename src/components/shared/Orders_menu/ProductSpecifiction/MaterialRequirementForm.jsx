import React, { useEffect, useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

const MaterialRequirementForm = ({ materials, append, remove, fields, register, handleSubmit, onSubmit, reset }) => {
  return (
    <div className="bg-white shadow-md rounded-lg p-4">
      <h2 className="text-lg font-bold mb-2">Material Requirement</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product Name</label>
          <input 
            {...register('productName')} 
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" 
            required 
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 font-bold mb-2">Product Details</label>
          {fields.map((field, index) => (
            <div key={field.id} className="mb-4 p-4 border border-gray-200 rounded-md">
              <div className="mb-2">
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
              <div className="mb-2">
                <label className="block text-gray-700 font-bold mb-1">Quantity</label>
                <input 
                  type="number" 
                  {...register(`productDetails.${index}.quantity`)} 
                  className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-indigo-500" 
                  required 
                />
              </div>
              <div className="mb-2">
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
                className="mt-2 bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none"
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
          className="w-full bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 focus:outline-none"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default MaterialRequirementForm;
