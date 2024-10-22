import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddCustomer = () => {
    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [whatsappNumber, setWhatsappNumber] = useState('');
    const [birthday, setBirthday] = useState('');
    const [rootId, setRootId] = useState('');
    const [roots, setRoots] = useState([]);
    const [message, setMessage] = useState('');

    // Fetch roots for the dropdown
    useEffect(() => {
        const fetchRoots = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/roots');
                setRoots(response.data);
            } catch (error) {
                console.error('Error fetching roots:', error);
            }
        };
        fetchRoots();
    }, []);

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        const newCustomer = {
            name,
            address,
            whatsappNumber,
            birthday,
            rootId,
        };

        try {
            const response = await axios.post('http://localhost:5000/api/customers', newCustomer);
            setMessage(response.data.message);
            setName('');
            setAddress('');
            setWhatsappNumber('');
            setBirthday('');
            setRootId('');
        } catch (error) {
            console.error('Error adding customer:', error);
            setMessage('Error adding customer');
        }
    };

    return (
        <div className="max-w-xl mx-auto mt-10">
            <h2 className="text-2xl font-bold mb-4">Add Customer</h2>

            {message && <p className="mt-4 text-green-500">{message}</p>}

            <form onSubmit={handleSubmit} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="name">
                        Name
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

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="address">
                        Address
                    </label>
                    <input
                        type="text"
                        id="address"
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="whatsappNumber">
                        WhatsApp Number
                    </label>
                    <input
                        type="text"
                        id="whatsappNumber"
                        value={whatsappNumber}
                        onChange={(e) => setWhatsappNumber(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="birthday">
                        Birthday
                    </label>
                    <input
                        type="date"
                        id="birthday"
                        value={birthday}
                        onChange={(e) => setBirthday(e.target.value)}
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        required
                    />
                </div>

                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rootId">
                        Associated Root
                    </label>
                    <select
                        id="rootId"
                        value={rootId}
                        onChange={(e) => setRootId(e.target.value)}
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

                <div className="flex items-center justify-between">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                        Add Customer
                    </button>
                </div>
            </form>
        </div>
    );
};

export default AddCustomer;
