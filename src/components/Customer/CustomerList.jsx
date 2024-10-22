import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaTrash, FaEdit } from 'react-icons/fa';

const CustomerList = () => {
    const [customers, setCustomers] = useState([]);
    const [roots, setRoots] = useState([]); // Roots state for dropdown
    const [message, setMessage] = useState('');
    const [editingCustomer, setEditingCustomer] = useState(null); // Holds the customer being edited
    const [formData, setFormData] = useState({
        name: '',
        address: '',
        whatsappNumber: '',
        birthday: '',
        rootId: '',
    });

    // Fetch customers from the API
    const fetchCustomers = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/customers');
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

    // Fetch roots for the dropdown
    const fetchRoots = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/roots'); // Assuming you have this endpoint
            setRoots(response.data);
        } catch (error) {
            console.error('Error fetching roots:', error);
        }
    };

    useEffect(() => {
        fetchCustomers();
        fetchRoots(); // Fetch roots when component loads
    }, []);

    // Handle delete customer
    const handleDelete = async (id) => {
        if (window.confirm('Are you sure you want to delete this customer?')) {
            try {
                await axios.delete(`http://localhost:5000/api/customers/${id}`);
                setMessage('Customer deleted successfully!');
                fetchCustomers(); // Refresh the list
            } catch (error) {
                console.error('Error deleting customer:', error);
                setMessage('Error deleting customer');
            }
        }
    };

    // Handle edit customer
    const handleEdit = (customer) => {
        setEditingCustomer(customer.id); // Set the editing mode with the customer ID
        setFormData({
            name: customer.name,
            address: customer.address,
            whatsappNumber: customer.whatsappNumber,
            birthday: customer.birthday,
            rootId: customer.rootId || '', // Use rootId if present
        });
    };

    // Handle form changes for editing
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFormData) => ({
            ...prevFormData,
            [name]: value,
        }));
    };

    // Handle form submission for updating a customer
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/customers/${editingCustomer}`, formData);
            setMessage('Customer updated successfully!');
            setEditingCustomer(null); // Exit editing mode
            fetchCustomers(); // Refresh the list
        } catch (error) {
            console.error('Error updating customer:', error);
            setMessage('Error updating customer');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Customer List</h2>

            {message && <p className="mt-4 text-green-500">{message}</p>}

            {editingCustomer ? (
                <form className="mb-6" onSubmit={handleUpdate}>
                    <h3 className="text-xl font-semibold mb-4">Edit Customer</h3>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className="border p-2 w-full mb-4"
                    />
                    <input
                        type="text"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Address"
                        className="border p-2 w-full mb-4"
                    />
                    <input
                        type="text"
                        name="whatsappNumber"
                        value={formData.whatsappNumber}
                        onChange={handleChange}
                        placeholder="WhatsApp Number"
                        className="border p-2 w-full mb-4"
                    />
                    <input
                        type="date"
                        name="birthday"
                        value={formData.birthday}
                        onChange={handleChange}
                        className="border p-2 w-full mb-4"
                    />

                    {/* Roots Dropdown */}
                    <select
                        name="rootId"
                        value={formData.rootId}
                        onChange={handleChange}
                        className="border p-2 w-full mb-4"
                    >
                        <option value="">Select Root</option>
                        {roots.map((root) => (
                            <option key={root.id} value={root.id}>
                                {root.name}
                            </option>
                        ))}
                    </select>

                    <button type="submit" className="bg-blue-500 text-white p-2 rounded">
                        Update Customer
                    </button>
                    <button
                        type="button"
                        onClick={() => setEditingCustomer(null)}
                        className="ml-4 bg-gray-400 text-white p-2 rounded"
                    >
                        Cancel
                    </button>
                </form>
            ) : (
                <table className="min-w-full bg-white shadow-md rounded-lg">
                    <thead>
                        <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                            <th className="py-3 px-6 text-left">Name</th>
                            <th className="py-3 px-6 text-left">Address</th>
                            <th className="py-3 px-6 text-left">WhatsApp</th>
                            <th className="py-3 px-6 text-left">Birthday</th>
                            <th className="py-3 px-6 text-left">Associated Root</th>
                            <th className="py-3 px-6 text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-gray-600 text-sm font-light">
                        {customers.map((customer) => (
                            <tr key={customer.id} className="border-b border-gray-200 hover:bg-gray-100">
                                <td className="py-3 px-6 text-left whitespace-nowrap">{customer.name}</td>
                                <td className="py-3 px-6 text-left">{customer.address}</td>
                                <td className="py-3 px-6 text-left">{customer.whatsappNumber}</td>
                                <td className="py-3 px-6 text-left">{customer.birthday}</td>
                                <td className="py-3 px-6 text-left">
                                    {roots.find((root) => root.id === customer.rootId)?.name || 'No Root'}
                                </td>
                                <td className="py-3 px-6 text-center">
                                    <button
                                        onClick={() => handleEdit(customer)}
                                        className="text-blue-500 hover:text-blue-700 mr-4"
                                    >
                                        <FaEdit />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(customer.id)}
                                        className="text-red-500 hover:text-red-700"
                                    >
                                        <FaTrash />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default CustomerList;
