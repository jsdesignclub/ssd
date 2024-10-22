import React, { useEffect, useState } from 'react';
import axios from 'axios';

const RootsList = () => {
    const [roots, setRoots] = useState([]);
    const [name, setName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [message, setMessage] = useState('');

    // Fetch roots from the server
    const fetchRoots = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/roots');
            setRoots(response.data);
        } catch (error) {
            console.error('Error fetching roots:', error);
        }
    };

    useEffect(() => {
        fetchRoots();
    }, []);

    // Handle delete
    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/roots/${id}`);
            setMessage('Root deleted successfully!');
            fetchRoots(); // Refresh the list
        } catch (error) {
            console.error('Error deleting root:', error);
            setMessage('Error deleting root');
        }
    };

    // Handle edit
    const handleEdit = (root) => {
        setEditingId(root.id);
        setName(root.name);
    };

    // Handle update
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/roots/${editingId}`, { name });
            setMessage('Root updated successfully!');
            setEditingId(null);
            setName('');
            fetchRoots(); // Refresh the list
        } catch (error) {
            console.error('Error updating root:', error);
            setMessage('Error updating root');
        }
    };

    return (
        <div className="max-w-4xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Roots List</h2>

            {message && <p className="mt-4 text-green-500">{message}</p>}

            <table className="min-w-full bg-white shadow-md rounded mb-4">
                <thead>
                    <tr>
                        <th className="py-2 px-4 border-b">ID</th>
                        <th className="py-2 px-4 border-b">Name</th>
                        <th className="py-2 px-4 border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {roots.map((root) => (
                        <tr key={root.id}>
                            <td className="py-2 px-4 border-b">{root.id}</td>
                            <td className="py-2 px-4 border-b">{root.name}</td>
                            <td className="py-2 px-4 border-b">
                                <button
                                    onClick={() => handleEdit(root)}
                                    className="text-blue-600 hover:text-blue-800 mr-4"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(root.id)}
                                    className="text-red-600 hover:text-red-800"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingId && (
                <form onSubmit={handleUpdate} className="bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <h3 className="text-lg font-bold mb-2">Update Root</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                            Root Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update Root
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default RootsList;
