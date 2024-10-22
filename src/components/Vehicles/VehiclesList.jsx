import React, { useEffect, useState } from 'react';
import axios from 'axios';

const VehiclesList = () => {
    const [vehicles, setVehicles] = useState([]);
    const [editingVehicle, setEditingVehicle] = useState(null);
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleName, setVehicleName] = useState('');

    useEffect(() => {
        fetchVehicles();
    }, []);

    const fetchVehicles = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/vehicles');
            setVehicles(response.data);
        } catch (error) {
            console.error('Error fetching vehicles:', error);
        }
    };

    const handleEdit = (vehicle) => {
        setEditingVehicle(vehicle);
        setVehicleNumber(vehicle.vehicleNumber);
        setVehicleName(vehicle.vehicleName);
    };

    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:5000/api/vehicles/${editingVehicle.id}`, {
                vehicleNumber,
                vehicleName,
            });
            fetchVehicles();
            setEditingVehicle(null);
            setVehicleNumber('');
            setVehicleName('');
        } catch (error) {
            console.error('Error updating vehicle:', error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/api/vehicles/${id}`);
            fetchVehicles();
        } catch (error) {
            console.error('Error deleting vehicle:', error);
        }
    };

    return (
        <div className="max-w-3xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Vehicles List</h2>
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">Vehicle Number</th>
                        <th className="border px-4 py-2">Vehicle Name</th>
                        <th className="border px-4 py-2">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {vehicles.map((vehicle) => (
                        <tr key={vehicle.id}>
                            <td className="border px-4 py-2">{vehicle.vehicleNumber}</td>
                            <td className="border px-4 py-2">{vehicle.vehicleName}</td>
                            <td className="border px-4 py-2 flex space-x-2">
                                <button
                                    onClick={() => handleEdit(vehicle)}
                                    className="text-blue-500 hover:underline"
                                >
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(vehicle.id)}
                                    className="text-red-500 hover:underline"
                                >
                                    Delete
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {editingVehicle && (
                <form onSubmit={handleUpdate} className="mt-4 bg-white shadow-md rounded px-8 pt-6 pb-8">
                    <h3 className="text-lg font-bold mb-4">Edit Vehicle</h3>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleNumber">
                            Vehicle Number
                        </label>
                        <input
                            type="text"
                            id="vehicleNumber"
                            value={vehicleNumber}
                            onChange={(e) => setVehicleNumber(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleName">
                            Vehicle Name
                        </label>
                        <input
                            type="text"
                            id="vehicleName"
                            value={vehicleName}
                            onChange={(e) => setVehicleName(e.target.value)}
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            required
                        />
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Update Vehicle
                        </button>
                        <button
                            onClick={() => setEditingVehicle(null)}
                            className="text-gray-500 hover:underline"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
};

export default VehiclesList;
