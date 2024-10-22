import React, { useEffect, useState } from 'react';
import axios from 'axios';

const ProductCategoryList = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:5000/api/productcategories')
      .then(response =>
        Promise.all(
          response.data.map(category =>
            axios
              .get(
                `http://localhost:5000/api/products?productCategoryId=${category.id}&_sort=id&_order=DESC&_limit=1`
              )
              .then(response => ({
                ...category,
                lastQuantity: response.data[0] ? response.data[0].quantity : 0
              }))
          )
        )
      )
      .then(categoriesWithLastQuantity => setData(categoriesWithLastQuantity))
      .catch(error => console.error(error));
  }, []);

  return (
    <div className="overflow-x-auto">
      <table className="table w-full">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="px-4 py-2 text-center">Category Name</th>
            <th className="px-4 py-2 text-center">Last Quantity</th>
          </tr>
        </thead>
        <tbody>
          {data.map(category => (
            <tr key={category.id} className="hover:bg-gray-100">
              <td className="px-4 py-2 text-center">{category.name}</td>
              <td className="px-4 py-2 text-center">{category.lastQuantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductCategoryList;

