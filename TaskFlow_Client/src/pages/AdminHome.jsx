import React, { useState } from "react";
import { 
  Home, 
  CheckSquare, 
  Users, 
  BarChart3, 
  Settings, 
  Calendar,
  Clock,
  User,
  MoreVertical
} from 'lucide-react';

export const AdminHome = () => {
  const [activeSection, setActiveSection] = useState('inicio');

  // Una sola tarea de ejemplo
  const task = {
    id: 1,
    titulo: "Desarrollo de API REST",
    cliente: "TechCorp",
    area: "Desarrollo",
    fechaVencimiento: "2025-07-25",
    prioridad: "alta",
    estado: "en_progreso",
    asignado: "Anna Johnson",
    progreso: 65,
    descripcion: "Implementar endpoints para gestión de usuarios y autenticación JWT con middleware de seguridad y validación de datos"
  };

  const sidebarItems = [
    { id: 'inicio', label: 'Inicio', icon: Home },
    { id: 'tareas', label: 'Mis Tareas', icon: CheckSquare },
    { id: 'asignados', label: 'Asignados', icon: Users },
    { id: 'historial', label: 'Historial', icon: BarChart3 },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
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
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-800 transition-colors duration-200 ${
                  activeSection === item.id 
                    ? 'bg-blue-600 text-white border-r-2 border-blue-400' 
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-64 p-6 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="w-4 h-4 text-white" />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-gray-200">Usuario</p>
              <p className="text-xs text-gray-400">Mi Empresa</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}


       {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">

        {/* Content Area */}
        <main className="flex-1 overflow-auto p-6">
          {activeSection === 'inicio' && (
            <div>
              {/* Single Task Card */}
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow duration-200">
                  {/* Header Row */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-4">
                      {/* Status Badge */}
                      <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                      </span>
                      
                      {/* Task Title and ID */}
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900">{task.titulo}. #{task.id}642823</h3>
                      </div>
                    </div>
                    
                    {/* Right side controls */}
                    <div className="flex items-center space-x-4">
                      {/* Priority */}
                      <div className="flex items-center space-x-2">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm text-gray-600 capitalize">{task.prioridad}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      {/* Assignee */}
                      <div className="flex items-center space-x-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-600">{task.cliente} / {task.asignado}</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                      
                      {/* Status */}
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Open</span>
                        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Second Row with Avatar and Description */}
                  <div className="flex items-start space-x-4">
                    {/* Avatar */}
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 bg-gray-300 rounded-full flex items-center justify-center">
                        <User className="w-4 h-4 text-gray-600" />
                      </div>
                    </div>
                    
                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center space-x-2 text-sm text-gray-500 mb-1">
                        <span className="font-medium">{task.asignado}</span>
                        <span>•</span>
                        <span>hace 4 días</span>
                        <span>•</span>
                        <span>Vence en</span>
                      </div>
                      <p className="text-gray-700 text-sm">{task.descripcion}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
          
        </main>
        </div>
      </div>
    </div>
  );
};
