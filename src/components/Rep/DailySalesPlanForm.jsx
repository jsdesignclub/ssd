import React, { useState, useEffect } from 'react';
import axios from 'axios';

const DailySalesPlanForm = () => {
    const [salesReps, setSalesReps] = useState([]);
    const [vehicles, setVehicles] = useState([]);
    const [roots, setRoots] = useState([]);
    const [formData, setFormData] = useState({
        date: '',
        salesRepId: '',
        vehicleId: '',
        rootId: ''
    });
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    // Fetch sales reps, vehicles, and roots
    useEffect(() => {
        const fetchData = async () => {
            try {
                const [salesRepResponse, vehicleResponse, rootResponse] = await Promise.all([
                    axios.get('http://localhost:5000/api/salesreps'),
                    axios.get('http://localhost:5000/api/vehicles'),
                    axios.get('http://localhost:5000/api/roots')
                ]);

                setSalesReps(salesRepResponse.data);
                setVehicles(vehicleResponse.data);
                setRoots(rootResponse.data);
            } catch (error) {
                console.error('Error fetching data:', error);
                setErrorMessage('Error fetching data.');
            }
        };

        fetchData();
    }, []);

    // Handle input change
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setSuccessMessage('');
        setErrorMessage('');

        try {
            const response = await axios.post('http://localhost:5000/api/dailysalesplanningss', formData);
            setSuccessMessage(response.data.message);
            setFormData({
                date: '',
                salesRepId: '',
                vehicleId: '',
                rootId: ''
            });
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrorMessage('Error submitting form.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-3xl font-bold mb-4">Manual Daily Sales Planning</h1>
            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full max-w-lg">
                {/* Date */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="date">
                        Date
                    </label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        value={formData.date}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                {/* SalesRep */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="salesRepId">
                        Sales Representative
                    </label>
                    <select
                        id="salesRepId"
                        name="salesRepId"
                        value={formData.salesRepId}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Sales Rep</option>
                        {salesReps.map((rep) => (
                            <option key={rep.id} value={rep.id}>
                                {rep.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Vehicle */}
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="vehicleId">
                        Vehicle
                    </label>
                    <select
                        id="vehicleId"
                        name="vehicleId"
                        value={formData.vehicleId}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Vehicle</option>
                        {vehicles.map((vehicle) => (
                            <option key={vehicle.id} value={vehicle.id}>
                                {vehicle.vehicleName}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Root */}
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rootId">
                        Root
                    </label>
                    <select
                        id="rootId"
                        name="rootId"
                        value={formData.rootId}
                        onChange={handleInputChange}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    >
                        <option value="">Select Root</option>
                        {roots.map((root) => (
                            <option key={root.id} value={root.id}>
                                {root.name}
                            </option>
                        ))}
                    </select>
                </div>

                {/* Submit Button */}
                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className={`${
                            loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-700'
                        } text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Daily Plan'}
                    </button>
                </div>

                {/* Success and Error Messages */}
                {successMessage && (
                    <div className="mt-4 text-green-500">
                        <strong>Success!</strong> {successMessage}
                    </div>
                )}
                {errorMessage && (
                    <div className="mt-4 text-red-500">
                        <strong>Error!</strong> {errorMessage}
                    </div>
                )}
            </form>
        </div>
    );
};

export default DailySalesPlanForm;
