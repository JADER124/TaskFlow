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
import { useNavigate } from "react-router-dom";

const getStatusColor = (estado_nombre) => {
  switch (estado_nombre.toLowerCase()) {
    case "finalizada":
      return "bg-green-100 text-green-700"; // Completado exitosamente
    case "asignada":
      return "bg-blue-100 text-blue-700"; // Asignado a técnico
    case "en curso":
      return "bg-yellow-100 text-yellow-700"; // En progreso activo
    case "cerrada":
      return "bg-red-100 text-red-700"; // Cerrado/cancelado
    case "pendiente":
      return "bg-orange-100 text-orange-700"; // Esperando acción
    case "abierta":
      return "bg-cyan-100 text-cyan-700"; // Recién creada
    default:
      return "bg-gray-100 text-gray-600"; // Estado desconocido
  }
};

export const RequestCard = ({ req }) => {
  const navigate = useNavigate();
  return (
    <div
      onClick={() => navigate(`/admin/request/${req.id}`)}
      className="bg-white border border-gray-200 rounded-lg p-3 sm:p-4 hover:shadow-md transition-shadow cursor-pointer"
    >
      {/* Header con título - DESKTOP: Original | MÓVIL: Adaptado */}
      <div className="hidden sm:flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
            <User className="w-5 h-5 text-gray-900" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-900">
              {req.cliente_nombre}{" "}
              <span className="text-blue-500">#{req.id}</span>
            </h3>
            <p className="text-sm text-gray-500">{req.tipo_servicio_nombre}</p>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          {/* Prioridad*/}
          <div className="flex items-center space-x-1">
            <div
              className={`w-2 h-2 rounded-full ${
                req.estado_nombre === "Asignada"
                  ? "bg-blue-500"
                  : req.estado_nombre === "En curso"
                  ? "bg-yellow-500"
                  : req.estado_nombre === "Finalizada"
                  ? "bg-green-500"
                  : req.estado_nombre === "Cerrada"
                  ? "bg-red-500"
                  : req.estado_nombre === "Pendiente"
                  ? "bg-orange-500"
                  : req.estado_nombre === "Abierta"
                  ? "bg-cyan-500"
                  : "bg-gray-400"
              }`}
            ></div>
          </div>

          {/* Tecnico asignado */}
          <div className="flex items-center space-x-2">
            <User className="w-4 h-4 text-gray-400" />
            <span className="text-sm text-gray-700">
              {req.usuario_asociado_nombre}
            </span>
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

      {/* Header MÓVIL: Layout vertical optimizado */}
      <div className="sm:hidden mb-3">
        {/* Primera fila: Cliente y estado */}
        <div className="flex items-start justify-between mb-2">
          <div className="flex items-center space-x-2 min-w-0 flex-1">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
              <User className="w-4 h-4 text-gray-900" />
            </div>
            <div className="min-w-0">
              <h3 className="font-semibold text-gray-900 text-sm truncate">
                {req.cliente_nombre}{" "}
                <span className="text-blue-500">#{req.id}</span>
              </h3>
            </div>
          </div>
          
          {/* Estado con bolita integrada */}
          <div
            className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 flex-shrink-0 ${getStatusColor(
              req.estado_nombre
            )}`}
          >
            <div
              className={`w-2 h-2 rounded-full ${
                req.estado_nombre === "Asignada"
                  ? "bg-blue-600"
                  : req.estado_nombre === "En curso"
                  ? "bg-yellow-600"
                  : req.estado_nombre === "Finalizada"
                  ? "bg-green-600"
                  : req.estado_nombre === "Cerrada"
                  ? "bg-red-600"
                  : req.estado_nombre === "Pendiente"
                  ? "bg-orange-600"
                  : req.estado_nombre === "Abierta"
                  ? "bg-cyan-600"
                  : "bg-gray-500"
              }`}
            ></div>
            <span>{req.estado_nombre}</span>
          </div>
        </div>

        {/* Segunda fila: Tipo de servicio y técnico */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span className="truncate">{req.tipo_servicio_nombre}</span>
          <div className="flex items-center space-x-1 ml-2 flex-shrink-0">
            <User className="w-3 h-3 text-gray-400" />
            <span className="truncate max-w-20">{req.usuario_asociado_nombre}</span>
          </div>
        </div>
      </div>

      {/* Descripción */}
      <p className="text-sm text-gray-700 leading-relaxed my-3 sm:my-3">
        {req.descripcion}
      </p>

      {/* Información del cliente y fechas - DESKTOP: Original | MÓVIL: Adaptado */}
      <div className="hidden sm:flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">BS</span>
          </div>
          <span className="text-sm text-gray-600">Basculas y Balanzas SAS</span>
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

      {/* Footer MÓVIL: Layout adaptado */}
      <div className="sm:hidden flex flex-col space-y-2">
        <div className="flex items-center space-x-2">
          <div className="w-5 h-5 bg-gray-300 rounded-full flex items-center justify-center">
            <span className="text-xs font-medium text-gray-600">BS</span>
          </div>
          <span className="text-xs text-gray-600 truncate">Basculas y Balanzas SAS</span>
        </div>

        <div className="flex items-center space-x-1">
          <Clock className="w-3 h-3 text-gray-400" />
          <span className="text-xs text-gray-500">
            {new Date(req.fecha_creacion).toLocaleString("es-CO", {
              timeZone: "America/Bogota",
              day: "2-digit",
              month: "2-digit",
              year: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
              hour12: true,
            })}
          </span>
        </div>
      </div>
    </div>
  );
};