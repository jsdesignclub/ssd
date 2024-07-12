import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { AiOutlinePlus, AiOutlineMinus } from 'react-icons/ai';

const NewOrderForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'materialSpecifications'
  });

  const onSubmit = data => {
    console.log(data);
    // Handle form submission (e.g., send data to an API)
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white p-5 rounded-md shadow-md">
      <h1 className="text-2xl font-bold mb-4">New Order Form</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Order ID</label>
          <input
            type="text"
            {...register('orderId', { required: 'Order ID is required' })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.orderId && <p className="text-red-500 text-xs mt-1">{errors.orderId.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Receiving Date</label>
          <input
            type="date"
            {...register('receivingDate', { required: 'Receiving Date is required' })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.receivingDate && <p className="text-red-500 text-xs mt-1">{errors.receivingDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Supplier</label>
          <input
            type="text"
            {...register('supplier', { required: 'Supplier is required' })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.supplier && <p className="text-red-500 text-xs mt-1">{errors.supplier.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Complete Date</label>
          <input
            type="date"
            {...register('completeDate', { required: 'Complete Date is required' })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.completeDate && <p className="text-red-500 text-xs mt-1">{errors.completeDate.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Name</label>
          <input
            type="text"
            {...register('itemName', { required: 'Item Name is required' })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.itemName && <p className="text-red-500 text-xs mt-1">{errors.itemName.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Image</label>
          <input
            type="file"
            {...register('itemImage', { required: 'Item Image is required' })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.itemImage && <p className="text-red-500 text-xs mt-1">{errors.itemImage.message}</p>}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Item Category</label>
          <input
            type="text"
            {...register('itemCategory', { required: 'Item Category is required' })}
            className="mt-1 block w-full p-2 border rounded-md"
          />
          {errors.itemCategory && <p className="text-red-500 text-xs mt-1">{errors.itemCategory.message}</p>}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">Material Specifications</label>
          {fields.map((item, index) => (
            <div key={item.id} className="flex space-x-2 mb-2">
              <input
                type="text"
                placeholder="Material Name"
                {...register(`materialSpecifications.${index}.name`, { required: 'Material Name is required' })}
                className="block w-1/2 p-2 border rounded-md"
              />
              <input
                type="number"
                placeholder="Quantity"
                {...register(`materialSpecifications.${index}.quantity`, { required: 'Quantity is required' })}
                className="block w-1/2 p-2 border rounded-md"
              />
              <button type="button" onClick={() => remove(index)} className="text-red-500">
                <AiOutlineMinus />
              </button>
            </div>
          ))}
          <button type="button" onClick={() => append({ name: '', quantity: 0 })} className="text-blue-500">
            <AiOutlinePlus /> Add Material
          </button>
        </div>

        <div>
          <button type="submit" className="w-full bg-red-600 text-white p-2 rounded-md">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewOrderForm;
