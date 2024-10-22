import React, { useState, useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa'; // Icons for edit and delete
import SalesRep from './SalesRep'; // Import the SalesRep form component

const SalesRepList = () => {
  const [salesReps, setSalesReps] = useState([]);
  const [editMode, setEditMode] = useState(false);
  const [selectedRep, setSelectedRep] = useState(null);

  // Fetch sales reps when the component mounts
  useEffect(() => {
    fetchSalesReps();
  }, []);

  // Function to fetch all sales reps
  const fetchSalesReps = async () => {
    try {
      const response = await fetch('http://localhost:5000/api/salesreps');
      const data = await response.json();
      setSalesReps(data);
    } catch (error) {
      console.error('Error fetching sales reps:', error);
    }
  };

  // Delete sales rep by ID
  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this sales rep?')) {
      try {
        await fetch(`http://localhost:5000/api/salesreps/${id}`, {
          method: 'DELETE'
        });
        setSalesReps(salesReps.filter((rep) => rep.id !== id));
      } catch (error) {
        console.error('Error deleting sales rep:', error);
      }
    }
  };

  // Edit sales rep by setting the selectedRep and toggling edit mode
  const handleEdit = (rep) => {
    setSelectedRep(rep);
    setEditMode(true);
  };

  // Update sales rep in the list after editing
  const handleUpdate = (updatedRep) => {
    setSalesReps(salesReps.map((rep) => (rep.id === updatedRep.id ? updatedRep : rep)));
    setEditMode(false);
  };

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Sales Representative List</h2>

      {editMode ? (
        <SalesRep rep={selectedRep} onUpdate={handleUpdate} onCancel={() => setEditMode(false)} />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Phone Number</th>
                <th className="px-4 py-2 border">Experience Level</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {salesReps.map((rep) => (
                <tr key={rep.id}>
                  <td className="px-4 py-2 border">{rep.name}</td>
                  <td className="px-4 py-2 border">{rep.address}</td>
                  <td className="px-4 py-2 border">{rep.phoneNumber}</td>
                  <td className="px-4 py-2 border">{rep.experienceLevel}</td>
                  <td className="px-4 py-2 border">
                    <button
                      className="text-blue-500 hover:text-blue-700 mr-2"
                      onClick={() => handleEdit(rep)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="text-red-500 hover:text-red-700"
                      onClick={() => handleDelete(rep.id)}
                    >
                      <FaTrash />
                    </button>
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

export default SalesRepList;
