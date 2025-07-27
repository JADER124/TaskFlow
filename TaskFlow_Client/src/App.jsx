import { useState } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import Login from "./pages/login";
import { AdminHome } from "./pages/AdminHome";
import PrivateRoutes from "./components/privateRoutes";
import NewTasks from "./pages/newTasks";
import ClientForm from "./pages/clientForm";
import CreateRequest from "./pages/createRequest";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register-nit" element={<ClientForm />} />
        <Route path="/request" element={<CreateRequest />} />

        {/* Agrupar todas las rutas privadas bajo /admin */}
         <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<Outlet />}>
            <Route index element={<AdminHome />} /> {/* /admin */}
            <Route path="tasks" element={<NewTasks />} /> {/* /admin/tasks */}
            {/* puedes seguir agregando más rutas aquí */}
          </Route>
        </Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
