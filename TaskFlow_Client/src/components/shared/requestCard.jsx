import React from "react";
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

const getStatusColor = (estado_nombre) => {
  switch (estado_nombre.toLowerCase()) {
    case "completado":
      return "bg-green-100 text-green-700";
    case "asignado":
      return "bg-blue-100 text-blue-700";
    case "pendiente":
      return "bg-yellow-100 text-yellow-700";
    default:
      return "bg-gray-100 text-gray-700";
  }
};

export const RequestCard = ({ req }) => (
  <div className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
    {/* Header con título y dropdowns */}
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
          <User className="w-5 h-5 text-blue-600" />
        </div>
        <div>
          <h3 className="font-semibold text-gray-900">
            {req.cliente_nombre} <span className="text-red-600">#{req.id}</span>
          </h3>
          <p className="text-sm text-gray-500">{req.tipo_servicio_nombre}</p>
        </div>
      </div>

      <div className="flex items-center space-x-3">
        {/* Prioridad*/}
        <div className="flex items-center space-x-1">
          <div
            className={`w-2 h-2 rounded-full ${
              req.estado_nombre === "Asignado"
                ? "bg-blue-500"
                : req.estado_nombre === "Pendiente"
                ? "bg-yellow-500"
                : "bg-green-500"
            }`}
          ></div>
        </div>

        {/* Tecnico asignado */}
        <div className="flex items-center space-x-2">
          <User className="w-4 h-4 text-gray-400" />
          <span className="text-sm text-gray-700">Nombre_Tecnico</span>
          <ChevronDown className="w-4 h-4 text-gray-400" />
        </div>

        {/* Estado del servicio*/}
        <div
          className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
            req.estado_nombre
          )}`}
        >
          <span>{req.estado_nombre}</span>
        </div>
      </div>
    </div>

        {/* Descripción */}
    <p className="text-sm text-gray-700 leading-relaxed my-3">{req.descripcion}</p>

    {/* Información del cliente y fechas */}
    <div className="flex items-center space-x-4">
      <div className="flex items-center space-x-2">
        <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
          <span className="text-xs font-medium text-gray-600">
            {req.cliente_nombre
              .split(" ")
              .map((n) => n[0])
              .join("")}
          </span>
        </div>
        <span className="text-sm text-gray-600">Nombre_Coordinador</span>
      </div>

      <div className="flex items-center space-x-1">
        <Clock className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-500">
          {new Date(req.fecha_creacion).toLocaleString("es-CO", {
            timeZone: "America/Bogota",
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit",
            hour12: true,
          })}
        </span>
      </div>
    </div>


  </div>
);
