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
import AddProductToStock from "./components/shared/Product/AddProductToStock";
import IssueStockForm from "./components/shared/Product/IssueStockForm";
import LoginPage from './components/shared/LoginPage';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { AuthProvider } from './AuthContext';
import {Add_new_order} from './components/shared/Orders_menu/Addneworder/Add_new_order'
import List_Of_order from './components/shared/Orders_menu/Listoforder/List_Of_order'
import {Addnewcustomer} from './components/shared/Orders_menu/Addnewcustomer/Addnewcustomer';
import { Addproductcatagry } from './components/shared/Orders_menu/Addproduct/Addproductcatagry';
import { Addproduct } from './components/shared/Orders_menu/Addproduct/Addproduct';
import  PremadeProductPage  from './components/shared/Orders_menu/Addneworder/PremadeProductPage';
import { CreateNewSpecification } from './components/shared/Orders_menu/ProductSpecifiction/CreateNewSpecification';
import OrderDetails  from './components/shared/Orders_menu/Listoforder/OrderDetails'
import AddPremadeProductForm from './components/shared/Orders_menu/ProductSpecifiction/AddPremadeProductForm';
import { Premadeproductdetails } from './components/shared/Orders_menu/ProductSpecifiction/Premadeproductdetails';
import StockManagement from './components/shared/Stck_Management/StockManagement';
import StockRequirement from './components/shared/Stck_Management/StockRequirement';
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
              <Route path="Add_product" element={<AddProductToStock />} />
              <Route path="Issue_product" element={<IssueStockForm />} />
              <Route path="Add_new_order" element={<Add_new_order />} />
              <Route path="List_Of_order" element={<List_Of_order />} />
              <Route path="Addnewcustomer" element={<Addnewcustomer />} />
              <Route path="Addproductcatagry" element={<Addproductcatagry />} />
              <Route path="Addproduct" element={<Addproduct />} />
              <Route path="PremadeProductPage/:id/:productId" element={<PremadeProductPage />} />
              <Route path="order-details/:orderId" element={<OrderDetails />} />
              <Route path="AddPremadeProductForm/:orderId/:productId" element={<AddPremadeProductForm />} />
              <Route path="CreateNewSpecification/:id/:productId/:premadeProductId" element={<CreateNewSpecification />} />
              <Route path="Premadeproductdetails/:id/:productId/:premadeProductId" element={<Premadeproductdetails/>} />
              <Route path="StockManagement" element={<StockManagement/>} />
              <Route path="/stock_requirement/:orderId/:premadeProductId" element={<StockRequirement />} />
            
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
