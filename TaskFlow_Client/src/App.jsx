import { useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login";
import { AdminHome } from "./pages/admin/AdminHome";
import PrivateRoutes from "./components/auth/privateRoutes";
import NewTasks from "./pages/admin/newTasks";
import ClientForm from "./pages/client/clientForm";
import CreateRequest from "./pages/client/createRequest";
import { AdminLayout } from "./components/layouts/adminLayout";
import RequestDetail from "./pages/admin/requestDetail";
import ViewForm from "./pages/admin/viewForm";
import TechHome from "./pages/technical/TechHome";
import TechLayout from "./components/layouts/techLayout";
import RequestLayout from "./components/layouts/requestLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/clientForm" element={<ClientForm />} />
        <Route path="/createRequest" element={<CreateRequest />} />

        {/* Agrupar todas las rutas privadas bajo /admin */}
        <Route element={<PrivateRoutes />}>
          <Route path="/admin" element={<AdminLayout />}>
            <Route index element={<AdminHome />} /> {/* /admin */}
            <Route path="tasks" element={<NewTasks />} /> {/* /admin/tasks */}
            <Route path="request/:id" element={<RequestLayout />}>
              <Route index element={<RequestDetail />} />{/* /admin/request/:id */}
              <Route path="form" element={<ViewForm />} />{/* /admin/request/:id/form */}
            </Route>
          </Route>
        </Route>

        {/* Agrupar todas las rutas privadas bajo /tecnico */}
        <Route element={<PrivateRoutes />}>
          <Route path="/tecnico" element={<TechLayout />}>
            <Route index element={<TechHome />} /> {/* /tecnico */}
            {/*<Route path="tasks" element={<TechTasks />} /> /tecnico/tasks */}
            {/*<Route path="request/:id" element={<TechRequestDetail />} /> /tecnico/request/:id */}
          </Route>
        </Route>
        {/* Ruta comodín para rutas no encontradas */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
