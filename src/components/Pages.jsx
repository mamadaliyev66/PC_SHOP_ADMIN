import React from 'react'
import Computers from './computers/Computers'
import Others from './others/Others'
import All from './All'
import Computer from './computers/Computer'
import Other from './others/Other'
import OrderComputer from './Order/OrderComputer'
import OrderOthers from './Order/OrderOthers'
import Orders from './Orders/Orders'
import AddComputers from './AddComputers/AddComputers'
import EditComputer from './Edit/Computer/EditComputer'
import EditOthers from './Edit/Other/EditOthers'
import DeleteComputer from './Edit/Computer/DeleteComputer'
import DeleteOther from './Edit/Other/DeleteOther'
import NoPage from './NoPage/NoPage'
import AddOther from './AddOthers/AddOther'
import Login from './Auth/Login'
import { useEffect } from 'react'
import { Routes,Route } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Pages() {
    const location= useLocation()
    
  return (
    <Routes location={location}>
      <Route path="/" element={<All/>} />
      <Route path="/computers" element={<Computers/>} />
      <Route path="/computer/:id" element={<Computer/>} />
      <Route path="/add/computer" element={<AddComputers/>} />
      <Route path="/add/other" element={<AddOther/>} />
      <Route path="/Other/:id" element={<Other/>} />
      <Route path="/others" element={<Others/>} />
      <Route path="/orders" element={<Orders/>} />
      <Route path="/order/computer/:id" element={<OrderComputer/>} />
      <Route path="/order/others/:id" element={<OrderOthers/>} />
      <Route path="/edit/computer/:id" element={<EditComputer/>} />
      <Route path="/edit/others/:id" element={<EditOthers/>} />
      <Route path="/delete/computer/:id" element={<DeleteComputer/>} />
      <Route path="/delete/others/:id" element={<DeleteOther/>} />
      <Route path="/login" element={<Login/>} />
      <Route path="*" element={<NoPage/>} />


      

    </Routes>
  )
}
