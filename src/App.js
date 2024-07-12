import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "./components/shared/Layout";
import { Home } from "./components/shared/Home";
import { Dashboard } from "./components/shared/Dashboard";
import { About } from "./components/shared/About";
import { Contact } from "./components/shared/Contact";
import { Products } from "./components/shared/Products";
import { New_product } from "./components/shared/Product/New_product";
import { Product_list } from "./components/shared/Product/Product_list";
import { Add_Product } from "./components/shared/Product/Add_Product";
import { Product_Issue } from "./components/shared/Product/Product_Issue";
import NewOrderForm from "./components/shared/Orders_menu/NewOrderForm";
import AddProductToStock from "./components/shared/Product/AddProductToStock";
import IssueStockForm from "./components/shared/Product/IssueStockForm";
import LoginPage from './components/shared/LoginPage';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { AuthProvider } from './AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <Routes>
            <Route path="/Login" element={<LoginPage />} />
            <Route path="/" element={<ProtectedRoute element={<Layout />} />}>
              <Route index element={<Navigate to="Dashboard" />} />
              <Route path="Dashboard" element={<Dashboard />} />
              <Route path="About" element={<About />} />
              <Route path="Contact" element={<Contact />} />
              <Route path="Products" element={<Products />} />
              <Route path="New_product" element={<New_product />} />
              <Route path="Product_list" element={<Product_list />} />
              <Route path="Add_product" element={<Add_Product />} />
              <Route path="Product_Issue" element={<Product_Issue />} />
              <Route path="New_Order" element={<NewOrderForm />} />
              <Route path="Add_product" element={<AddProductToStock />} />
              <Route path="Issue_product" element={<IssueStockForm />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
