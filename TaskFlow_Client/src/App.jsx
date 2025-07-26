import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/login";
import { AdminHome } from "./pages/AdminHome";
import PrivateRoutes from "./components/privateRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" 
        element={
          <PrivateRoutes>
            <AdminHome />
          </PrivateRoutes>
          } 
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
