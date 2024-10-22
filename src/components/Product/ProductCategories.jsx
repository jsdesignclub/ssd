// Example in a React component
import React, { useEffect, useState } from 'react';

const ProductCategories = () => {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('/api/productcategories'); // Ensure this URL is correct
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        setError(error.message);
        console.error('Error fetching categories:', error); // Log the error for debugging
      }
    };

    fetchCategories();
  }, []);

  if (error) {
    return <div>Error: {error}</div>; // Show error message if there is an error
  }

  return (
    <div>
      <h1>Product Categories</h1>
      <ul>
        {categories.map(category => (
          <li key={category.id}>
            {category.name}: {category.description}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ProductCategories;
