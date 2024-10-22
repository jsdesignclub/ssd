import React, { useState, useEffect } from 'react';

const SalesRep = ({ rep, onUpdate, onCancel }) => {
  const [salesRep, setSalesRep] = useState({
    name: '',
    address: '',
    phoneNumber: '',
    experienceLevel: ''
  });

  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (rep) {
      setSalesRep(rep); // Prefill the form if in edit mode
    }
  }, [rep]);

  // Handle input change
  const handleChange = (e) => {
    setSalesRep({
      ...salesRep,
      [e.target.name]: e.target.value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = rep
        ? await fetch(`http://localhost:5000/api/salesreps/${rep.id}`, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(salesRep)
          })
        : await fetch('http://localhost:5000/api/salesreps', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(salesRep)
          });

      const data = await response.json();
      if (response.ok) {
        setIsSuccess(true);
        setMessage(rep ? 'Sales rep updated successfully!' : 'Sales rep added successfully!');
        onUpdate(salesRep); // Call update handler if edit mode
        if (!rep) {
          setSalesRep({ name: '', address: '', phoneNumber: '', experienceLevel: '' });
        }
      } else {
        setIsSuccess(false);
        setMessage(`Error: ${data.message}`);
      }
    } catch (error) {
      setIsSuccess(false);
      setMessage(`Error: ${error.message}`);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">{rep ? 'Edit Sales Representative' : 'Add Sales Representative'}</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-semibold">Name</label>
          <input
            type="text"
            name="name"
            value={salesRep.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Address</label>
          <input
            type="text"
            name="address"
            value={salesRep.address}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Phone Number</label>
          <input
            type="text"
            name="phoneNumber"
            value={salesRep.phoneNumber}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-gray-700 font-semibold">Experience Level</label>
          <input
            type="text"
            name="experienceLevel"
            value={salesRep.experienceLevel}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-indigo-500 text-white p-2 rounded-md hover:bg-indigo-600 transition-colors"
        >
          {rep ? 'Update Sales Representative' : 'Add Sales Representative'}
        </button>

        {/* Cancel Button */}
        {rep && (
          <button
            type="button"
            className="w-full mt-2 bg-gray-500 text-white p-2 rounded-md hover:bg-gray-600 transition-colors"
            onClick={onCancel}
          >
            Cancel
          </button>
        )}

        {/* Success/Error Message */}
        {message && (
          <p className={`text-center mt-4 ${isSuccess ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
};

export default SalesRep;
