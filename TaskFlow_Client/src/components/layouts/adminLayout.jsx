import React, { useState, useEffect } from "react";
import {
  Home,
  CheckSquare,
  Users,
  BarChart3,
  Settings,
  User,
  Menu,
  X,
} from "lucide-react";
import { Outlet, NavLink } from "react-router-dom";

export const AdminLayout = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [userLogged, setuserLogged] = useState("");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

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

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Overlay para móvil */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={closeSidebar}
        ></div>
      )}

      {/* Sidebar */}
      <div className={`
        fixed lg:static inset-y-0 left-0 z-30
        w-64 bg-gray-900 shadow-lg transform transition-transform duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
      `}>
        {/* Header del sidebar */}
        <div className="p-4 lg:p-6 border-b border-gray-700 flex items-center justify-between">
          <h1 className="text-lg lg:text-xl font-bold text-white">Mi Dashboard</h1>
          {/* Botón cerrar solo en móvil */}
          <button
            onClick={closeSidebar}
            className="lg:hidden p-1 rounded-md text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="mt-4 lg:mt-6 flex-1">
          {sidebarItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.id}
                to={item.path}
                onClick={closeSidebar} // Cerrar sidebar al hacer click en móvil
                className="w-full flex items-center px-4 lg:px-6 py-3 text-left transition-colors duration-200 text-gray-300 hover:text-white hover:bg-gray-800"
              >
                <Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                <span className="truncate">{item.label}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User info en la parte inferior */}
        <div className="absolute bottom-0 w-full p-4 lg:p-6 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gray-900" />
            </div>
            <div className="ml-3 min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-200 truncate">{userLogged}</p>
              <p className="text-xs text-gray-400 truncate">Basculas y balanzas SAS</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido principal */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header móvil */}
        <div className="lg:hidden bg-white shadow-sm border-b border-gray-200 px-4 py-3 flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <Menu className="w-5 h-5" />
          </button>
          <h1 className="text-lg font-semibold text-gray-900">Dashboard</h1>
          <div className="w-9"></div> {/* Spacer para centrar el título */}
        </div>

        {/* Outlet para el contenido */}
        <div className="flex-1 overflow-hidden">
          <Outlet />
        </div>
      </div>
    </div>
  );
};