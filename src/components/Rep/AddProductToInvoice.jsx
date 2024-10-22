import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AddProductToInvoice = ({ invoiceId }) => {
    const [products, setProducts] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState('');
    const [quantity, setQuantity] = useState(1);
    const [message, setMessage] = useState('');
    const [addedProducts, setAddedProducts] = useState([]);
    const [invoiceNumber, setInvoiceNumber] = useState('');
    const [customerName, setCustomerName] = useState('');
    const [customerAddress, setCustomerAddress] = useState('');



    // Fetch products and invoice data when the component mounts or when the invoiceId changes
    useEffect(() => {
        fetchProducts();
        fetchInvoiceData(); // Fetch existing invoice data
    }, []);


    const fetchProducts = async () => {
        try {
            const response = await axios.get('http://localhost:5000/api/products');
            setProducts(response.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        }
    };

    const fetchInvoiceData = async () => {
        try {
            const response = await axios.get(`http://localhost:5000/api/invoices/${invoiceId}`);
            setAddedProducts(response.data.products || []);
            setInvoiceNumber(response.data.invoiceNumber || '');
            setCustomerName(response.data.customerName || '');
            setCustomerAddress(response.data.customerAddress || '');
        } catch (error) {
            console.error('Error fetching invoice data:', error);
        }
    };


   

   // Add product to invoice with free item logic
   const addProductToInvoice = async () => {
    const product = products.find(p => p.id === selectedProduct);

    if (!product) {
        setMessage('Selected product not found');
        return;
    }
    if(quantity>product.quantity){
        setMessage(`Insufficient stock. Only ${product.quantity} items available.`);
        return;
    }



    let freeIssue = 0;

    // Apply free item logic: If the quantity is 10 or more, give 3 free items
    if (quantity >= 10) {
        freeIssue = 3; // Give 3 free items
    }

    const totalAmount = quantity * product.price;

    try {
        await axios.post('http://localhost:5000/api/salestransactions', {
            productId: selectedProduct,
            quantity,
            freeIssue, // Track free issue in database as well if necessary
            price: product.price,
            totalAmount,
            invoiceId,
        });

        // Update the added products state
        setAddedProducts(prev => [
            ...prev,
            { id: product.id, name: product.name, quantity, freeIssue, price: product.price, totalAmount }
        ]);

        setMessage('Product added successfully');
    } catch (error) {
        console.error('Error adding product to invoice:', error);
        setMessage('Error adding product to invoice');
    }
};


    // Function to print the invoice
    const printInvoice = () => {
        const invoiceContent = `
            <h1>Invoice</h1>
            <p><strong>Invoice Number:</strong> ${invoiceId}</p>
            <p><strong>Customer Name:</strong> ${customerName}</p>
            <p><strong>Customer Address:</strong> ${customerAddress}</p>
            <table style="width: 100%; border-collapse: collapse;">
                <thead>
                    <tr>
                        <th style="border: 1px solid black; padding: 8px;">Product Name</th>
                        <th style="border: 1px solid black; padding: 8px;">Quantity</th>
                        <th style="border: 1px solid black; padding: 8px;">Price</th>
                        <th style="border: 1px solid black; padding: 8px;">Total</th>
                    </tr>
                </thead>
                <tbody>
                    ${addedProducts
                        .map(product => {
                            const freeIssueQuantity = product.quantity - Math.floor(product.quantity / 4);
                            return `
                                <tr>
                                    <td style="border: 1px solid black; padding: 8px;">${product.name}</td>
                                    <td style="border: 1px solid black; padding: 8px;">${freeIssueQuantity ? `${product.quantity} (Free Issue: ${freeIssueQuantity})` : product.quantity}</td>
                                    <td style="border: 1px solid black; padding: 8px;">$${product.price}</td>
                                    <td style="border: 1px solid black; padding: 8px;">$${product.totalAmount}</td>
                                </tr>
                            `;
                        })
                        .join('')}
                </tbody>
            </table>
            <p><strong>Total Amount:</strong> $${addedProducts.reduce((acc, product) => acc + product.totalAmount, 0)}</p>
        `;

        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <html>
                <head>
                    <title>Invoice</title>
                </head>
                <body>
                    ${invoiceContent}
                </body>
            </html>
        `);
        printWindow.document.close();
        printWindow.print();
    };

// Function to delete product from the invoice
const deleteProductFromInvoice = async (productId) => {
    try {
        // Send delete request to the backend to remove from sales transactions
        await axios.delete(`http://localhost:5000/api/salestransactions/${invoiceId}/product/${productId}`);

        // Update the frontend by removing the product from addedProducts
        setAddedProducts(prev => prev.filter(p => p.id !== productId));

        setMessage('Product removed successfully');
    } catch (error) {
        console.error('Error deleting product from invoice:', error);
        setMessage('Error removing product from invoice');
    }
};




    return (
        <div className="p-6 bg-white shadow-md rounded-lg">
            <h2 className="text-1xl font-semibold mb-4 text-blue-500">Add Products to Invoice</h2>
            <div className="flex items-center mb-2">
                <select onChange={(e) => setSelectedProduct(e.target.value)} value={selectedProduct} className="border border-gray-300 p-2 mr-2">
                    <option value="">Select Product</option>
                    {products.map(product => (
                        <option key={product.id} value={product.id} className="text-blue-500">
                            {product.name} - ${product.price}
                        </option>
                    ))}
                </select>

                <button onClick={() => setQuantity(quantity - 1)} className="border border-gray-300 p-2 w-6 text-center" disabled={quantity <= 1}>
                    -
                </button>

                <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.valueAsNumber || 0)}
                    placeholder="Quantity"
                    className="border border-gray-300 p-2 w-12 text-center"
                />

                <button onClick={() => setQuantity(quantity + 1)} className="border border-gray-300 p-2 w-6 text-center">
                    +
                </button>
            </div>

            <button onClick={addProductToInvoice} disabled={!selectedProduct || !quantity} className="bg-blue-500 text-white p-2 rounded">
                Add to Invoice
            </button>

            {message && <p className="text-green-500">{message}</p>}

            <h3 className="text-lg font-semibold mt-6 text-blue-500">Added Products</h3>
            <table className="min-w-full border-collapse border border-gray-200">
                <thead>
                    <tr>
                        <th className="border border-gray-300 p-2 bg-blue-500 text-white">Product Name</th>
                        <th className="border border-gray-300 p-2 bg-blue-500 text-white">Quantity</th>
                        <th className="border border-gray-300 p-2 bg-blue-500 text-white">Price</th>
                        <th className="border border-gray-300 p-2 bg-blue-500 text-white">Total</th>
                        <th className="border border-gray-300 p-2 bg-blue-500 text-white">Free Issue</th>
                        <th className="border border-gray-300 p-2 bg-blue-500 text-white">Delete</th>
                    </tr>
                </thead>
                <tbody>
                    {addedProducts.map((product) => (
                        <tr key={product.id}>
                            <td className="border border-gray-300 p-2">{product.name}</td>
                            <td className="border border-gray-300 p-2">{product.quantity}</td>
                            <td className="border border-gray-300 p-2">${product.price}</td>
                            <td className="border border-gray-300 p-2">${product.totalAmount}</td>
                            <td className="border border-gray-300 p-2">
                                {product.freeIssue ? `${product.freeIssue} free` : '0'}
                            </td>
                            <td className="border border-gray-300 p-2">
                                <button onClick={() => deleteProductFromInvoice(product.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-6 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                    </svg>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <button className="mt-4 p-2 bg-blue-500 text-white rounded flex items-center" onClick={printInvoice}>
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2-4h6a2 2 0 012 2v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4a2 2 0 012-2h2" />
                </svg>
                Print Invoice
            </button>
        </div>
    );
};

export default AddProductToInvoice;
