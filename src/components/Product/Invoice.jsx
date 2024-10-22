
import React from 'react';

const Invoice = React.forwardRef((props, ref) => (
  <div ref={ref} style={{ padding: '20px', fontFamily: 'Arial' }}>
    <h1>Invoice</h1>
    <p>Customer Name: {props.customerName}</p>
    <p>Invoice Number: {props.invoiceNumber}</p>
    <p>Date: {props.date}</p>

    <table border="1" style={{ width: '100%', marginTop: '20px', borderCollapse: 'collapse' }}>
      <thead>
        <tr>
          <th>Item</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>
      <tbody>
        {props.items.map((item, index) => (
          <tr key={index}>
            <td>{item.name}</td>
            <td>{item.quantity}</td>
            <td>{item.price}</td>
          </tr>
        ))}
      </tbody>
    </table>

    <h2>Total: {props.total}</h2>
  </div>
));

export default Invoice;
