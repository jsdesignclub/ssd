import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DailySalesPlanList = () => {
    const [salesPlans, setSalesPlans] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    
    // For updating
    const [editingPlan, setEditingPlan] = useState(null); // Plan currently being edited
    const [formData, setFormData] = useState({
        date: '',
        salesRepId: '',
        vehicleId: '',
        rootId: ''
    });

    // Fetch daily sales plans
    useEffect(() => {
        fetchSalesPlans();
    }, []);

    const fetchSalesPlans = async () => {
        try {
            setLoading(true);
            const response = await axios.get('http://localhost:5000/api/dailysalesplanningss');
            setSalesPlans(response.data);
        } catch (error) {
            console.error('Error fetching sales plans:', error);
            setErrorMessage('Error fetching sales plans.');
        } finally {
            setLoading(false);
        }
    };

    // Delete sales plan
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this daily sales plan?')) {
            try {
                await axios.delete(`http://localhost:5000/api/dailysalesplanningss/${id}`);
                setSuccessMessage('Sales plan deleted successfully');
                fetchSalesPlans();
            } catch (error) {
                console.error('Error deleting sales plan:', error);
                setErrorMessage('Error deleting sales plan.');
            }
        }
    };

    // Open the update form with default values
    const handleEdit = (plan) => {
        setEditingPlan(plan.id);
        setFormData({
            date: plan.date,              // Pre-fill the date field
            salesRepId: plan.salesRepId,  // Pre-fill the salesRepId field
            vehicleId: plan.vehicleId,    // Pre-fill the vehicleId field
            rootId: plan.rootId           // Pre-fill the rootId field
        });
    };

    // Handle form input changes
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Submit update form
    const handleUpdate = async () => {
        try {
            await axios.put(`http://localhost:5000/api/dailysalesplanningss/${editingPlan}`, formData);
            setSuccessMessage('Sales plan updated successfully');
            setEditingPlan(null); // Close the update form after successful update
            fetchSalesPlans();
        } catch (error) {
            console.error('Error updating sales plan:', error);
            setErrorMessage('Error updating sales plan.');
        }
    };

    // Search logic: filter by vehicle number or sales rep name
    const filteredPlans = salesPlans.filter(plan => 
        plan.vehicleNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
        plan.salesRepName.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-3xl font-bold mb-4">Daily Sales Plans</h1>
            
            {/* Search Bar */}
            <div className="mb-4">
                <input
                    type="text"
                    placeholder="Search by vehicle number or sales rep name"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
            </div>

            {/* Success/Error Messages */}
            {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}
            {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}

            {/* Loading Spinner */}
            {loading && <div>Loading...</div>}

            {/* Sales Plan List */}
            {!loading && (
                <table className="table-auto w-full bg-white shadow-md rounded">
                    <thead>
                        <tr>
                            <th className="px-4 py-2">Date</th>
                            <th className="px-4 py-2">Sales Rep</th>
                            <th className="px-4 py-2">Vehicle</th>
                            <th className="px-4 py-2">Root</th>
                            <th className="px-4 py-2">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredPlans.map((plan) => (
                            <tr key={plan.id} className="border-b">
                                <td className="px-4 py-2">{plan.date}</td>
                                <td className="px-4 py-2">{plan.salesRepName}</td>
                                <td className="px-4 py-2">{plan.vehicleNumber}</td>
                                <td className="px-4 py-2">{plan.rootName}</td>
                                <td className="px-4 py-2 flex justify-between">
                                    {/* Update Button */}
                                    <button
                                        onClick={() => handleEdit(plan)}
                                        className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                                    >
                                        Update
                                    </button>
                                    {/* Delete Button */}
                                    <button
                                        onClick={() => handleDelete(plan.id)}
                                        className="bg-red-500 text-white px-3 py-1 rounded"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}

            {/* Update Form (Conditional Rendering) */}
            {editingPlan && (
                <div className="mt-4">
                    <h2 className="text-2xl font-bold mb-4">Update Sales Plan</h2>
                    <div className="mb-4">
                        <label>Date:</label>
                        <input
                            type="date"
                            name="date"
                            value={formData.date}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label>Sales Rep ID:</label>
                        <input
                            type="text"
                            name="salesRepId"
                            value={formData.salesRepId}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label>Vehicle ID:</label>
                        <input
                            type="text"
                            name="vehicleId"
                            value={formData.vehicleId}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <div className="mb-4">
                        <label>Root ID:</label>
                        <input
                            type="text"
                            name="rootId"
                            value={formData.rootId}
                            onChange={handleInputChange}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        />
                    </div>
                    <button
                        onClick={handleUpdate}
                        className="bg-green-500 text-white px-4 py-2 rounded"
                    >
                        Save Changes
                    </button>
                </div>
            )}
        </div>
    );
};

export default DailySalesPlanList;
