import React, { useState } from 'react';
import ProductForm from "../Product/ProductForm"

export const New_product = () => {
  return (
    <div>
        <h1 className="text-2xl font-bold mb-4">Create New Product</h1>
        <ProductForm />
        
    </div>
  )
}
