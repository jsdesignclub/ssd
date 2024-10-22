import React, { useState } from 'react';
import AddProductToInvoice from './AddProductToInvoice';

const CustomerSelection = ({ customers, onInvoiceCreated }) => {
    const [selectedCustomer, setSelectedCustomer] = useState(null);

    const handleCustomerSelect = (customer) => {
        setSelectedCustomer(customer);
    };

    if (selectedCustomer) {
        // If a customer is selected, render the AddProductToInvoice component
        return <AddProductToInvoice customer={selectedCustomer} onInvoiceCreated={onInvoiceCreated} />;
    }

    return (
        <div>
            <h2>Select Customer</h2>
            <ul>
                {customers.map((customer) => (
                    <li key={customer.id} onClick={() => handleCustomerSelect(customer)}>
                        {customer.name}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CustomerSelection;
