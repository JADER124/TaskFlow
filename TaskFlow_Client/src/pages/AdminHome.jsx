import React, { useState } from "react";
import {
  Menu,
  X,
  Home,
  Users,
  Settings,
  HelpCircle,
  BarChart,
} from "lucide-react";

export const AdminHome = () => {
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { icon: Home, label: "Inicio" },
    { icon: Users, label: "Mis Tareas" },
    { icon: BarChart, label: "Asignados" },
    { icon: Settings, label: "Historial" },
    { icon: HelpCircle, label: "Crear +" },
  ];
  return (
    <div className="flex">
      <div className="relative min-h-screen">
        {/* Mobile menu button - solo visible en móvil */}
        <div className="block lg:hidden">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-4 left-4 z-50 p-2 bg-gray-800 rounded-md text-gray-200 hover:bg-gray-700"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Sidebar */}
        <div
          className={`
        fixed top-0 left-0 h-full 
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
        transition-transform duration-300 ease-in-out
        w-64 bg-gray-900 text-gray-100
        flex flex-col
        shadow-xl
      `}
        >
          {/* Logo area */}
          <div className="p-4 border-b border-gray-800">
            <h1 className="text-xl font-bold">Mi Dashboard</h1>
          </div>

          {/* Navigation */}
          <nav className="flex-1 pt-4">
            <ul className="space-y-2">
              {menuItems.map((item, index) => (
                <li key={index}>
                  <a
                    href="#"
                    className="flex items-center gap-4 px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors duration-200"
                  >
                    <item.icon size={20} />
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-gray-800">
            <p className="text-sm text-gray-400">© 2025 Mi Empresa</p>
          </div>
        </div>
      </div>

      <div class="mt-10 p-1 m-2 flex-1 ml-64">
        <a href="#">
          <div class="flex items-center justify-between bg-white border border-gray-300 rounded-md p-4 shadow-sm">
            <div class="flex items-start">
              <img
                src="https://api.dicebear.com/9.x/bottts-neutral/svg?seed=Scooter"
                alt="Usuario"
                class="w-10 h-10 rounded-full mr-4"
              />

              <div>
                <h2 class="text-sm font-medium text-gray-800">
                  titulo <span class="text-gray-400">####</span>
                </h2>
                <p class="text-xs text-gray-500">cliente area fecha</p>
              </div>
            </div>

            <div class="">
              <span class="text-xs px-2 py-1 bg-green-100 text-green-800 rounded-full">
                prioridad
              </span>

              <div class="text-xs px-2 py-1 text-gray-500">
                <p>AcmeCorp / Anna Joh...</p>
              </div>

              <span class="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded-full">
                estado
              </span>
            </div>
          </div>
        </a>
      </div>
    </div>
  );
};
