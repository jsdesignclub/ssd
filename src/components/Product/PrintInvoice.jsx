
import React, { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import Invoice from './Invoice'; // Ensure this import is correct

const PrintInvoice = () => {
  const componentRef = useRef();

  const invoiceData = {
    customerName: 'John Doe',
    invoiceNumber: 'INV-00123',
    date: '2024-10-04',
    items: [
      { name: 'Product 1', quantity: 2, price: '$20.00' },
      { name: 'Product 2', quantity: 1, price: '$15.00' },
    ],
    total: '$55.00',
  };

  return (
    <div>
      <ReactToPrint
        trigger={() => <button>Print Invoice</button>}
        content={() => componentRef.current}
      />
      <Invoice ref={componentRef} {...invoiceData} />
    </div>
  );
};

export default PrintInvoice;
