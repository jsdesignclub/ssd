import React, { useState } from 'react';
import axios from 'axios';

const Vehicles = () => {
    const [vehicleNumber, setVehicleNumber] = useState('');
    const [vehicleName, setVehicleName] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/vehicles', {
                vehicleNumber,
                vehicleName,
            });
            setSuccessMessage(response.data.message);
            setVehicleNumber('');
            setVehicleName('');
        } catch (error) {
            setErrorMessage(error.response.data.message || 'Error adding vehicle');
        }
    };

    return (
        <div className="max-w-md mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Add Vehicle</h2>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
                        Add Vehicle
                    </button>
                </div>
                {successMessage && <p className="text-green-500 text-xs italic mt-4">{successMessage}</p>}
                {errorMessage && <p className="text-red-500 text-xs italic mt-4">{errorMessage}</p>}
            </form>
        </div>
    );
};

export default Vehicles;
