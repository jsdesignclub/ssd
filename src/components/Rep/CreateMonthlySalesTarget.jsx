import React, { useState, useEffect } from 'react';
import axios from 'axios';

const CreateMonthlySalesTarget = () => {
    const [salesReps, setSalesReps] = useState([]);
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [targets, setTargets] = useState({});
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchSalesReps = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/salesreps');
                setSalesReps(response.data);
            } catch (error) {
                console.error('Error fetching sales representatives:', error);
                setErrorMessage('Failed to fetch sales representatives.');
            }
        };

        fetchSalesReps();
    }, []);

    const handleTargetChange = (salesrepId, value) => {
        setTargets((prevTargets) => ({
            ...prevTargets,
            [salesrepId]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const targetData = salesReps.map(salesRep => ({
            salesrep_id: salesRep.id,
            target_amount: targets[salesRep.id] || 0, // Default to 0 if no target is set
            year,
            month,
        }));

        try {
            const response = await axios.post('http://localhost:5000/api/sales_targets', targetData);
            console.log('Targets created:', response.data);
            setSuccessMessage('Monthly sales targets set successfully!');
            setTargets({}); // Clear targets after submission
        } catch (error) {
            console.error('Error creating sales targets:', error);
            setErrorMessage('Failed to set monthly sales targets.');
        }
    };

    return (
        <div className="p-4">
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4 border-2 border-gray-300 rounded-md shadow-md p-4">
                <label className="flex items-center space-x-2">
                    Select Year:
                    <input
                        type="number"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                        className="border-2 border-gray-300 rounded-md p-1"
                        min={2020} // Adjust the min year as necessary
                    />
                </label>

                <label className="flex items-center space-x-2">
                    Select Month:
                    <select
                        value={month}
                        onChange={(e) => setMonth(e.target.value)}
                        className="border-2 border-gray-300 rounded-md p-1"
                    >
                        {[...Array(12)].map((_, i) => (
                            <option key={i} value={i + 1}>
                                {new Intl.DateTimeFormat('en-US', { month: 'long' }).format(new Date(0, i))}
                            </option>
                        ))}
                    </select>
                </label>

                {/* Sales Representatives List */}
                <div>
                    <h3 className="text-lg font-semibold">Set Targets for Sales Representatives:</h3>
                    {salesReps.map((salesRep) => (
                        <label key={salesRep.id} className="flex items-center space-x-2">
                            <span>{salesRep.name}:</span>
                            <input
                                type="number"
                                value={targets[salesRep.id] || ''}
                                onChange={(e) => handleTargetChange(salesRep.id, e.target.value)}
                                className="border-2 border-gray-300 rounded-md p-1"
                                placeholder="Enter target amount"
                            />
                        </label>
                    ))}
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                    Set Monthly Sales Targets
                </button>
            </form>

            {/* Display success or error messages */}
            {successMessage && <div className="mt-4 text-green-600 font-bold">{successMessage}</div>}
            {errorMessage && <div className="mt-4 text-red-600 font-bold">{errorMessage}</div>}
        </div>
    );
};

export default CreateMonthlySalesTarget;
