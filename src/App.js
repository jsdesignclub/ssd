import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Layout } from "./components/shared/Layout";
import { Home } from "./components/shared/Home";
import { Dashboard } from "./components/shared/Dashboard";
import { About } from "./components/shared/About";
import { Contact } from "./components/shared/Contact";
import LoginPage from './components/shared/LoginPage';
import ProtectedRoute from './components/shared/ProtectedRoute';
import { AuthProvider } from './AuthContext';
import  Product_lists  from './components/shared/Product_flr/Product_lists';
import CreateTablePage from './CreateTablePage';
import AddProductForm from './components/Product/AddProductForm';
import ProductCategories from './components/Product/ProductCategories';
import ProductList from './components/Product/ProductList';
import PrintInvoice from './components/Product/PrintInvoice';
import WhatsAppForm from './components/Product/WhatsAppForm';
import SalesRep from './components/Rep/SalesRep';
import SalesRepList from './components/Rep/SalesRepList';
import Vehicles from './components/Vehicles/Vehicles';
import VehiclesList from './components/Vehicles/VehiclesList';
import AddRoot from './components/Vehicles/AddRoot';
import RootsList from './components/Vehicles/RootsList';
import AddCustomer from './components/Customer/AddCustomer';
import CustomerList from './components/Customer/CustomerList';
import DailySalesPlanForm from './components/Rep/DailySalesPlanForm';
import DailySalesPlanList from './components/Rep/DailySalesPlanList';
import CreateInvoice from './components/Rep/CreateInvoice';
import AddProductToInvoice from './components/Rep/AddProductToInvoice';
import SalesRepAchievement from './components/Rep/SalesRepAchievement';
import ProductCategoryList from './components/Product/Productchatagorylist';
import UpdateProduct from './components/Product/UpdateProduct';
import CreateMonthlySalesTarget from './components/Rep/CreateMonthlySalesTarget';
import CompanySalesReport from './components/Reports/CompanySalesReport';

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
              <Route path="CreateTablePage" element={<CreateTablePage />} />
              <Route path="Contact" element={<Contact />} />
              <Route path="Addnewproduct" element={<AddProductForm />} />
              <Route path="ProductCategories" element={<ProductCategories />} />
              <Route path="ProductList" element={<ProductList />} />
              <Route path="PrintInvoice" element={<PrintInvoice />} />
              <Route path="WhatsAppForm" element={<WhatsAppForm />} />
              <Route path="SalesRep" element={<SalesRep />} />
              <Route path="SalesRepList" element={<SalesRepList />} />
              <Route path="Vehicles" element={<Vehicles />} />
              <Route path="VehiclesList" element={<VehiclesList />} />
              <Route path="AddRoot" element={<AddRoot />} />
              <Route path="RootsList" element={<RootsList />} />
              <Route path="AddCustomer" element={<AddCustomer />} />
              <Route path="CustomerList" element={<CustomerList />} />
              <Route path="DailySalesPlanForm" element={<DailySalesPlanForm />} />
              <Route path="DailySalesPlanList" element={<DailySalesPlanList />} />
              <Route path="CreateInvoice" element={<CreateInvoice />} />
              <Route path="AddProductToInvoice" element={<AddProductToInvoice />} />
              <Route path="SalesRepAchievement" element={<SalesRepAchievement />} />
              <Route path="ProductCategoryList" element={<ProductCategoryList />} />
              <Route path="UpdateProduct" element={<UpdateProduct />} />
              <Route path="CreateMonthlySalesTarget" element={<CreateMonthlySalesTarget />} />
              <Route path="CompanySalesReport" element={<CompanySalesReport />} />
            </Route>
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
