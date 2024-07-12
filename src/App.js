import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from './Pages/HomePage/HomePage';
import MenuPage from './Pages/MenuPage/MenuPage';
import SignUp from './Pages/SignUp/SignUp';
import SuccessPage from './Pages/SuccessPage/SuccessPage';
import CartPage from './Pages/CartPage/CartPage';
import TableHeaderTitle from './Component/CommonComponent/TableTitle/TableHeaderTitle';
import { useSelector } from 'react-redux';
function App() {
  const { table } = useSelector((state) => state?.table);
  return (
    <>
      <TableHeaderTitle titleicon="/Images/table.svg" title={`Table Number : ${table?.table_number ? table?.table_number : '' }`} className="d-flex" profileimg="/Images/profile.svg" link="#"/>
      <Routes>
        <Route path="/" element={<HomePage />} /> 
        <Route path="/menu" element={<MenuPage />} />
        <Route path="/signUp" element={<SignUp />} /> 
        <Route path="/cart" element={<CartPage />} /> 
        <Route path="/success" element={<SuccessPage />} /> 
      </Routes>
    </>
  );
}

export default App;
