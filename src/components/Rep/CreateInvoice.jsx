import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddProductToInvoice from './AddProductToInvoice'; // Make sure this component exists and is imported

const CreateInvoice = () => {
    const [dailySalesPlans, setDailySalesPlans] = useState([]);
    const [selectedPlan, setSelectedPlan] = useState('');
    const [customers, setCustomers] = useState([]);
    const [selectedCustomer, setSelectedCustomer] = useState('');
    const [invoiceId, setInvoiceId] = useState(null);
    const [message, setMessage] = useState('');

    useEffect(() => {
        fetchDailySalesPlans();
    }, []);

    // Fetch daily sales plans
    const fetchDailySalesPlans = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/dailysalesplanningss');
            setDailySalesPlans(response.data);
        } catch (error) {
            console.error('Error fetching daily sales plans:', error);
        }
    };

    // Generate Invoice after selecting a daily sales plan
    const createInvoice = async () => {
        try {
            const response = await axios.post('http://localhost:5000/api/invoices', {
                dailySalesPlanningId: selectedPlan, 
                date: new Date(), 
                totalAmount: 0 // Initially set to 0
            });
            setInvoiceId(response.data.id);
            setMessage('Invoice created successfully!');
        } catch (error) {
            console.error('Error creating invoice:', error);
            setMessage('Error creating invoice.');
        }
    };

    // Fetch customers related to the selected daily sales plan's root
    useEffect(() => {
        if (selectedPlan) {
            fetchCustomersByRoot();
        }
    }, [selectedPlan]);


    const fetchCustomersByRoot = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/customers?rootId=${selectedPlan.rootId}`);
            setCustomers(response.data);
        } catch (error) {
            console.error('Error fetching customers:', error);
        }
    };

// Function to handle customer change
const handleCustomerChange = async (customerId) => {
    // Set the selected customer ID
    setSelectedCustomer(customerId);

    // Call the backend API to update the customerId in the invoice
    try {
        await updateCustomerForInvoice(invoiceId, customerId); // invoiceId is passed from the parent component
        console.log(`Customer ID: ${customerId} updated for Invoice ID: ${invoiceId}`);
    } catch (error) {
        console.error('Error updating customer for the invoice:', error);
    }
};

// Function to update customerId for invoice in the backend
const updateCustomerForInvoice = async (invoiceId, customerId) => {
    try {
        const response = await axios.put(`http://localhost:5000/api/invoices/${invoiceId}/customer`, { customerId });
        console.log(response.data.message);
    } catch (error) {
        console.error('Error updating customer for invoice:', error);
    }
};

    return (
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
            <h2 className="text-2xl font-bold">Create Invoice</h2>
            <select onChange={(e) => setSelectedPlan(e.target.value)} value={selectedPlan} className="mt-4 block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
                <option value="">Select Daily Sales Plan</option>
                {dailySalesPlans.map(plan => (
                    <option key={plan.id} value={plan.id}>
                        {plan.salesRepName} - {plan.vehicleNumber} - {plan.date}
                    </option>
                ))}
            </select>

            <button onClick={createInvoice} disabled={!selectedPlan} className="mt-4 w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Generate Invoice
            </button>

            {message && <p className="mt-4 text-center">{message}</p>}

           {invoiceId && (
    <div className="mt-4">
        <h3 className="text-2xl font-bold">Invoice Created (ID: {invoiceId})</h3>
        <h4 className="mt-4">Select Customer</h4>
        <select
            onChange={(e) => handleCustomerChange(e.target.value)} // Call the handler when a customer is selected
            value={selectedCustomer}
            className="mt-4 block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm">
            <option value="">Select Customer</option>
            {customers.map(customer => (
                <option key={customer.id} value={customer.id}>
                    {customer.name} 
                </option>
            ))}
        </select>
    </div>
)}

            {/* AddProductToInvoice component should be rendered after customer is selected */}
            {selectedCustomer && invoiceId && (
                <AddProductToInvoice customerId={selectedCustomer} invoiceId={invoiceId} />
            )}
        </div>
    );
};

export default CreateInvoice;
