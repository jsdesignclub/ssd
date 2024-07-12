import React from 'react';
import { Link } from 'react-router-dom';
import { AiFillEye, AiFillEdit, AiFillDelete } from 'react-icons/ai';
import img1 from "../Product/img/5.PNG"
import img2 from "../Product/img/6.PNG"
import img3 from "../Product/img/12.jpeg"
import img4 from "../Product/img/kk.jpg"
import img5 from "../Product/img/gallery-img04.jpg"

// Example product data (replace with actual data from API or state)
const products = [
  { id: 1, image: img1, name: 'Product A', code: 'P001', category: 'Category A', quantity: 50 },
  { id: 2, image: img2, name: 'Product B', code: 'P002', category: 'Category B', quantity: 30 },
  { id: 3, image: img3, name: 'Product C', code: 'P003', category: 'Category A', quantity: 20 },
  { id: 4, image: img4, name: 'Product D', code: 'P004', category: 'Category C', quantity: 10 },
];

const ProductList = () => {
  return (
    <div className="max-w-6xl mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-4">Product List</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border-collapse border border-gray-200">
          <thead>
            <tr className="bg-gray-100 border-b border-gray-200">
              <th className="text-left py-2 px-3">Image</th>
              <th className="text-left py-2 px-3">Name</th>
              <th className="text-left py-2 px-3">Code</th>
              <th className="text-left py-2 px-3">Category</th>
              <th className="text-left py-2 px-3">Quantity</th>
              <th className="text-left py-2 px-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id} className="border-b border-gray-200 hover:bg-gray-50">
                <td className="py-2 px-3"><img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" /></td>
                <td className="py-2 px-3">{product.name}</td>
                <td className="py-2 px-3">{product.code}</td>
                <td className="py-2 px-3">{product.category}</td>
                <td className="py-2 px-3">{product.quantity}</td>
                <td className="py-2 px-3 flex gap-2">
                  <Link to={`/products/view/${product.id}`} className="text-blue-500 hover:text-blue-700"><AiFillEye size={20} /></Link>
                  <Link to={`/products/edit/${product.id}`} className="text-green-500 hover:text-green-700"><AiFillEdit size={20} /></Link>
                  <Link to={`/products/delete/${product.id}`} className="text-red-500 hover:text-red-700"><AiFillDelete size={20} /></Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductList;
