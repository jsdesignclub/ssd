import React, { useState, useRef } from 'react';
import { useForm, Controller } from 'react-hook-form';
import Select from 'react-select';
import { AiOutlinePrinter } from 'react-icons/ai';

const existingProducts = [
  { value: 'productA', label: 'Product A' },
  { value: 'productB', label: 'Product B' },
  { value: 'productC', label: 'Product C' },
];

const IssueStockForm = () => {
  const { register, handleSubmit, control, formState: { errors } } = useForm();
  const [stockDetails, setStockDetails] = useState([]);
  const printRef = useRef();

  const onSubmit = data => {
    setStockDetails([...stockDetails, data]);
  };

  const handlePrint = () => {
    const printContent = printRef.current.innerHTML;
    const originalContent = document.body.innerHTML;

    document.body.innerHTML = printContent;
    window.print();
    document.body.innerHTML = originalContent;
    window.location.reload();
  };

  return (
    <div className="flex justify-between p-4">
      {/* Left Container */}
      <div className="w-1/2 bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Issue Stock</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Select Product</label>
            <Controller
              name="product"
              control={control}
              render={({ field }) => (
                <Select
                  {...field}
                  options={existingProducts}
                  className="mt-1"
                />
              )}
            />
            {errors.product && <p className="text-red-500 text-xs mt-1">Product is required</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Quantity</label>
            <input
              type="number"
              {...register('quantity', { required: 'Quantity is required' })}
              className="mt-1 block w-full p-2 border rounded-md"
            />
            {errors.quantity && <p className="text-red-500 text-xs mt-1">{errors.quantity.message}</p>}
          </div>
          <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded-md">Issue Stock</button>
        </form>
      </div>

      {/* Right Container */}
      <div className="w-1/2 bg-white p-4 rounded shadow-md">
        <h2 className="text-2xl font-bold mb-4">Issued Stock Details</h2>
        <div ref={printRef} className="space-y-4">
          {stockDetails.length > 0 ? (
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-200">
                  <th className="border px-4 py-2">Product</th>
                  <th className="border px-4 py-2">Quantity</th>
                </tr>
              </thead>
              <tbody>
                {stockDetails.map((detail, index) => (
                  <tr key={index} className="text-center">
                    <td className="border px-4 py-2">{detail.product.label}</td>
                    <td className="border px-4 py-2">{detail.quantity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No stock details available</p>
          )}
        </div>
        <button 
          onClick={handlePrint} 
          className="w-full bg-green-500 text-white p-2 rounded-md flex items-center justify-center mt-4">
          <AiOutlinePrinter className="mr-2" />
          Print
        </button>
      </div>
    </div>
  );
};

export default IssueStockForm;
