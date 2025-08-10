// Nuevo archivo: src/components/layouts/AdminLayout.jsx
import React, { useState, useEffect } from "react";
import {
  Home,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  User,
} from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

export const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [userLogged, setuserLogged] = useState("");

  useEffect(() => {
    const username = sessionStorage.getItem("username");
    if (username) {
      setuserLogged(username);
    }
  }, []);

  const sidebarItems = [
    { id: "inicio", label: "Inicio", icon: Home, path: "." },
    { id: "tareas", label: "Mis Tareas", icon: CheckSquare, path: "tasks" },
    { id: "asignados", label: "Asignados", icon: Users, path: "." },
    { id: "historial", label: "Historial", icon: BarChart3, path: "." },
    { id: "configuracion", label: "Configuración", icon: Settings, path: "." },
  ];

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-gray-900 shadow-lg">
        <div className="p-6 border-b border-gray-700">
          <h1 className="text-xl font-bold text-white">Mi Dashboard</h1>
        </div>

        <nav className="mt-6">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                className="w-full flex items-center px-6 py-3 text-left transition-colors duration-200 text-gray-300 hover:text-white hover:bg-gray-800">
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </NavLink>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-gray-900" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-200">{userLogged}</p>
              <p className="text-xs text-gray-400">Basculas y balanzas SAS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        <Outlet />
      </div>
    </div>
  );
};
