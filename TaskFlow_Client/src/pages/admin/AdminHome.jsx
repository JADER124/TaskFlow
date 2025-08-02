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
  MoreVertical,
  ChevronDown,
  Hash,
  AlertCircle,
  Filter,
  Search,
} from "lucide-react";

export const AdminHome = () => {
  const [activeSection, setActiveSection] = useState("inicio");
  const [selectedFilter, setSelectedFilter] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");

  // Datos de ejemplo - múltiples solicitudes
  const orders = [
    {
      id: "#000123",
      title: "Instalación de red",
      client: { name: "Juan Pérez", company: "TechCorp" },
      assignedTo: "Anna Johnson",
      created: "hace 4 días",
      dueDate: "Vence en 2 días",
      priority: "Alta",
      status: "Open",
      code: "SOL-2025-004",
      description:
        "Implementar endpoints para gestión de usuarios y autenticación JWT con middleware de seguridad y validación de datos",
    },
    {
      id: "#000124",
      title: "Mantenimiento de servidores",
      client: { name: "María González", company: "DataSoft" },
      assignedTo: "Carlos Ruiz",
      created: "hace 2 días",
      dueDate: "Vence mañana",
      priority: "Media",
      status: "In Progress",
      code: "SOL-2025-005",
      description:
        "Actualización y mantenimiento preventivo de servidores principales, incluye backup y verificación de integridad",
    },
    {
      id: "#000125",
      title: "Reparación de conectividad",
      client: { name: "Pedro Martín", company: "ConnectPlus" },
      assignedTo: "Luis Hernández",
      created: "hace 1 día",
      dueDate: "Vence en 5 días",
      priority: "Baja",
      status: "Open",
      code: "SOL-2025-006",
      description:
        "Diagnóstico y reparación de problemas de conectividad en la red local de la sede norte",
    },
    {
      id: "#000126",
      title: "Instalación de sistema de seguridad",
      client: { name: "Ana López", company: "SecureNet" },
      assignedTo: "Roberto Silva",
      created: "hace 6 horas",
      dueDate: "Vence en 3 días",
      priority: "Alta",
      status: "Open",
      code: "SOL-2025-007",
      description:
        "Implementación completa de sistema de seguridad perimetral con cámaras y sensores de movimiento",
    },
  ];

  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "open":
        return "bg-green-100 text-green-700";
      case "in progress":
        return "bg-blue-100 text-blue-700";
      case "closed":
        return "bg-gray-100 text-gray-700";
      case "paused":
        return "bg-yellow-100 text-yellow-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority.toLowerCase()) {
      case "alta":
        return "text-red-600";
      case "media":
        return "text-yellow-600";
      case "baja":
        return "text-green-600";
      default:
        return "text-gray-600";
    }
  };

  const ServiceCard = ({ order }) => (
    <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
      {/* Header con título y dropdowns */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-blue-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {order.title} {order.id}
            </h3>
            <p className="text-sm text-gray-500">{order.code}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Prioridad dropdown */}
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${
                order.priority === "Alta"
                  ? "bg-red-500"
                  : order.priority === "Media"
                  ? "bg-yellow-500"
                  : "bg-green-500"
              }`}
            ></div>
            <span
              className={`text-sm font-medium ${getPriorityColor(
                order.priority
              )}`}
            >
              {order.priority}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Cliente/Usuario dropdown */}
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">
              {order.client.company} / {order.assignedTo}
            </span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>

          {/* Estado dropdown */}
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
              order.status
            )}`}
          >
            <span>{order.status}</span>
            <ChevronDown className="w-3 h-3" />
          </div>
        </div>
      </div>

      {/* Información del cliente y fechas */}
      <div className="flex items-center space-x-4 mb-3">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">
              {order.assignedTo
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <span className="text-sm text-gray-600">{order.assignedTo}</span>
        </div>

        <div className="flex items-center space-x-1">
          <Clock className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">{order.created}</span>
        </div>

        <div className="flex items-center space-x-1">
          <AlertCircle className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-500">{order.dueDate}</span>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-sm text-gray-700 leading-relaxed">
        {order.description}
      </p>
    </div>
  );

  const sidebarItems = [
    { id: "inicio", label: "Inicio", icon: Home },
    { id: "tareas", label: "Mis Tareas", icon: CheckSquare },
    { id: "asignados", label: "Asignados", icon: Users },
    { id: "historial", label: "Historial", icon: BarChart3 },
    { id: "configuracion", label: "Configuración", icon: Settings },
  ];
  return (
    <div className="flex h-screen bg-gray-50 ">
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
                    ? "bg-blue-600 text-white border-r-2 border-blue-400"
                    : "text-gray-300 hover:text-white"
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

        <div className="min-h-screen bg-gray-50 p-6">
          <div className="max-w-6xl mx-auto">
            {/* Header del dashboard */}
            <div className="mb-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">
                Solicitudes de Servicio
              </h1>
            </div>

            {/* Barra de filtros y búsqueda */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-6">
              <div className="flex items-center justify-between space-x-4">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Filter className="w-4 h-4 text-gray-500" />
                    <select
                      value={selectedFilter}
                      onChange={(e) => setSelectedFilter(e.target.value)}
                      className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="todas">Todas las solicitudes</option>
                      <option value="abiertas">Abiertas</option>
                      <option value="progreso">En progreso</option>
                      <option value="cerradas">Cerradas</option>
                    </select>
                  </div>

                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-500">Prioridad:</span>
                    <select className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>Todas</option>
                      <option>Alta</option>
                      <option>Media</option>
                      <option>Baja</option>
                    </select>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Buscar solicitudes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-64"
                  />
                </div>
              </div>
            </div>

            {/* Lista de solicitudes */}
            <div className="space-y-3">
              {orders.map((order) => (
                <ServiceCard key={order.id} order={order} />
              ))}
            </div>

            {/* Paginación */}
            <div className="mt-6 flex items-center justify-between">
              <p className="text-sm text-gray-500">
                Mostrando 4 de 24 solicitudes
              </p>
              <div className="flex space-x-2">
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  Anterior
                </button>
                <button className="px-3 py-1 bg-blue-500 text-white rounded-md text-sm">
                  1
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  2
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  3
                </button>
                <button className="px-3 py-1 border border-gray-300 rounded-md text-sm hover:bg-gray-50">
                  Siguiente
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
