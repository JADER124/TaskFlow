import { useState, useEffect } from "react";
import { useNavigate,NavLink  } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  MessageCircle,
  User,
  MapPin,
  Clock,
  UserCheck,
  Phone,
  Building,
  Wrench,
  Star,
  ChevronDown,
  ChevronRight,
  Camera,
  Download,
  Edit,
  Calendar,
} from "lucide-react";
import { getAllUsers } from "../../API/allRequests";
import ModalAllUsers from "../admin/modalAllUsers";
import { MaintenanceCalendar } from "../admin/maintenanceCalendar";

const DetailRequest = ({ solicitud, onRefresh }) => {
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState({
    timeline: false,
    equipments: false,
  });

  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTechSelector, setShowTechSelector] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSolicitud = async () => {
      try {
        const response = await getAllUsers();
        setTecnicos(response);
      } catch (err) {
        console.error("Error cargando la solicitud", err);
        setError("No se pudo cargar la solicitud");
      } finally {
        setLoading(false);
      }
    };
    fetchSolicitud();
  }, []);

  // ---- Helpers
  const toggleSection = (section) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  // Badge fino (texto + fondo suave)
  const getStatusConfig = (estado) => {
    const name = (estado || "").toLowerCase();
    switch (name) {
      case "abierta":
        return { textColor: "text-cyan-700", bgColor: "bg-cyan-50" };
      case "asignada":
        return { textColor: "text-blue-700", bgColor: "bg-blue-50" };
      case "en curso":
        return { textColor: "text-yellow-700", bgColor: "bg-yellow-50" };
      case "pendiente":
        return { textColor: "text-orange-700", bgColor: "bg-orange-50" };
      case "cerrada":
        return { textColor: "text-red-700", bgColor: "bg-red-50" };
      case "finalizada":
        return { textColor: "text-green-700", bgColor: "bg-green-50" };
      default:
        return { textColor: "text-gray-700", bgColor: "bg-gray-50" };
    }
  };

  // Chip relleno (fondo más marcado)
  const getStatusColor = (estado_nombre) => {
    const name = (estado_nombre || "").toLowerCase();
    switch (name) {
      case "finalizada":
        return "bg-green-100 text-green-700";
      case "asignada":
        return "bg-blue-100 text-blue-700";
      case "en curso":
        return "bg-yellow-100 text-yellow-700";
      case "cerrada":
        return "bg-red-100 text-red-700";
      case "pendiente":
        return "bg-orange-100 text-orange-700";
      case "abierta":
        return "bg-cyan-100 text-cyan-700";
      default:
        return "bg-gray-100 text-gray-600";
    }
  };

  const [appointment, setAppointment] = useState(null);

  const handleSchedule = (appointmentData) => {
    setAppointment(appointmentData);
    console.log("Cita programada:", appointmentData);
  };

  const statusConfig = getStatusConfig(solicitud?.estado_nombre || "");

  return (
    // 👇 Este contenedor es el ÚNICO que scrollea en esta vista
    <div className="h-full min-h-0 bg-gray-50 overflow-y-auto overflow-x-hidden overscroll-contain touch-pan-y">
      {/* Header - Responsive (sticky sobre el root que scrollea) */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2 sm:space-x-4 flex-1 min-w-0">
              <button
                onClick={() => navigate("/admin")}
                className="text-gray-400 hover:text-gray-600 flex-shrink-0"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-3 min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-bold text-gray-900 truncate">
                  {solicitud?.cliente_nombre || "Cliente"} #
                  {solicitud?.id ?? "—"}
                </h1>
                <div className="flex flex-wrap items-center gap-2 mt-1 sm:mt-0">
                  <span
                    className={`text-xs sm:text-sm ${statusConfig.textColor} truncate`}
                  >
                    • {solicitud?.tipo_servicio_nombre || "Servicio"}
                  </span>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 ${getStatusColor(
                      solicitud?.estado_nombre
                    )} whitespace-nowrap`}
                  >
                    {solicitud?.estado_nombre || "—"}
                  </span>
                </div>
              </div>
            </div>

            {/* Botón responsive */}
            <div className="flex items-center space-x-2 ml-2 flex-shrink-0">
              <NavLink
                to="form" // <-- aquí va la ruta a la que quieres ir
                className="bg-blue-600 hover:bg-blue-700 text-white px-2 sm:px-4 py-2 rounded-lg text-xs sm:text-sm flex items-center space-x-1 sm:space-x-2"
              >
                <FileText className="h-3 w-3 sm:h-4 sm:w-4" />
                <span className="hidden sm:inline">Ver Formulario</span>
                <span className="sm:hidden">Ver</span>
              </NavLink>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido - Layout responsive */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-6 pb-20">
        {!!error && (
          <div className="mb-4 rounded-md border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-6 space-y-4 lg:space-y-0">
          {/* En mobile: Técnico asignado aparece primero */}
          <div className="lg:hidden">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium flex items-center text-sm">
                  <UserCheck className="h-4 w-4 mr-2 text-blue-600" />
                  Técnico Asignado
                </h3>
                <button
                  onClick={() => setShowTechSelector(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span className="hidden xs:inline">Cambiar</span>
                </button>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold flex-shrink-0">
                  CM
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-sm truncate">
                    {solicitud?.usuario_asociado_nombre}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" /> 4.8 • 127
                    servicios
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button className="bg-green-50 text-green-700 px-2 py-2 rounded flex items-center justify-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>Llamar</span>
                </button>
                <button className="bg-blue-50 text-blue-700 px-2 py-2 rounded flex items-center justify-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>Mensaje</span>
                </button>
              </div>
            </div>
          </div>

          {/* Contenido Principal */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
              {/* Descripción */}
              <div className="p-4 sm:p-6 border-b">
                <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">
                  Solicitud #{solicitud?.id ?? "—"}
                </h2>
                <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                  {solicitud?.descripcion || "Sin descripción"}
                </p>
                <div className="mt-4 text-xs sm:text-sm text-gray-500">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Fecha de creación:{" "}
                  {solicitud?.fecha_creacion
                    ? new Date(solicitud.fecha_creacion).toLocaleString(
                        "es-CO",
                        {
                          timeZone: "America/Bogota",
                          day: "2-digit",
                          month: "2-digit",
                          year: "numeric",
                          hour: "2-digit",
                          minute: "2-digit",
                          hour12: true,
                        }
                      )
                    : "—"}
                </div>
              </div>

              {/* Info rápida - Grid responsive */}
              <div className="p-4 sm:p-6 border-b">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-600" /> Personal
                    </h4>
                    <p className="truncate">
                      <strong>Técnico:</strong>{" "}
                      <span className="block sm:inline">
                        {solicitud?.usuario_asociado_nombre || "—"}
                      </span>
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      Ubicación
                    </h4>
                    <p>Medellín, Antioquia</p>
                    <p className="text-gray-500 text-xs sm:text-sm break-words">
                      {solicitud?.direccion}
                    </p>
                  </div>
                  <div className="sm:col-span-2 lg:col-span-1">
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Wrench className="w-4 h-4 mr-2 text-purple-600" />
                      Servicio
                    </h4>
                    <p>
                      <strong>Tipo:</strong>{" "}
                      <span className="block sm:inline">
                        {solicitud?.tipo_servicio_nombre || "—"}
                      </span>
                    </p>
                  </div>
                </div>
              </div>

              {/* Secciones colapsables */}
              <div>
                {/* Equipos */}
                <div className="border-b">
                  <button
                    onClick={() => toggleSection("equipments")}
                    className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
                  >
                    <span className="flex items-center font-medium text-sm sm:text-base">
                      <Building className="h-4 w-4 mr-2 text-orange-600 flex-shrink-0" />
                      <span>Equipos Involucrados (2)</span>
                    </span>
                    {expandedSections.equipments ? (
                      <ChevronDown className="flex-shrink-0" />
                    ) : (
                      <ChevronRight className="flex-shrink-0" />
                    )}
                  </button>
                  {expandedSections.equipments && (
                    <div className="px-4 sm:px-6 pb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-sm">XYZ-2000</p>
                          <p className="text-xs text-gray-500">
                            ID: BAL-001 • Serie: 2024-001
                          </p>
                          <p className="text-xs text-gray-500">Lab A</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium text-sm">XYZ-2000</p>
                          <p className="text-xs text-gray-500">
                            ID: BAL-002 • Serie: 2024-002
                          </p>
                          <p className="text-xs text-gray-500">Lab B</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Timeline */}
                <div>
                  <button
                    onClick={() => toggleSection("timeline")}
                    className="w-full px-4 sm:px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition text-left"
                  >
                    <span className="flex items-center font-medium text-sm sm:text-base">
                      <Clock className="h-4 w-4 mr-2 text-blue-600 flex-shrink-0" />
                      <span>Cronología (2)</span>
                    </span>
                    {expandedSections.timeline ? (
                      <ChevronDown className="flex-shrink-0" />
                    ) : (
                      <ChevronRight className="flex-shrink-0" />
                    )}
                  </button>
                  {expandedSections.timeline && (
                    <div className="px-4 sm:px-6 pb-4">
                      <div className="space-y-3 text-sm">
                        <p>
                          <strong>03/08 13:10</strong> • Solicitud asignada por
                          A. García
                        </p>
                        <p>
                          <strong>03/08 13:00</strong> • Solicitud creada por
                          Sistema
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Desktop a la derecha; en mobile abajo y SIN scroll propio */}
          <div className="lg:col-span-4 space-y-4 lg:max-h-full lg:overflow-y-auto">
            {/* Técnico asignado - Solo desktop */}
            <div className="hidden lg:block bg-white rounded-lg shadow-sm border p-4">
              <div className="flex justify-between items-center mb-3">
                <h3 className="font-medium flex items-center">
                  <UserCheck className="h-4 w-4 mr-2 text-blue-600" />
                  Técnico Asignado
                </h3>
                <button
                  onClick={() => setShowTechSelector(true)}
                  className="text-blue-600 hover:text-blue-700 text-sm font-medium flex items-center space-x-1"
                >
                  <User className="h-4 w-4" />
                  <span>Cambiar</span>
                </button>
              </div>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">
                  {solicitud?.usuario_asociado_nombre
                    .trim()
                    .split(/\s+/)
                    .reduce(
                      (a, w, i, arr) =>
                        i === 0 ? w[0] : i === arr.length - 1 ? a + w[0] : a,
                      ""
                    )
                    .toUpperCase()}
                </div>
                <div>
                  <p className="font-medium text-sm">
                    {solicitud?.usuario_asociado_nombre}
                  </p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" /> Correo
                  </p>
                </div>
              </div>
            </div>

            {/* Reservar cita */}
            {/* Calendario de mantenimiento */}
            <MaintenanceCalendar
              onSchedule={handleSchedule}
              currentAppointment={appointment}
            />
          </div>
        </div>
      </div>

      {/* Modal de selección de técnico */}
      {showTechSelector && (
        <ModalAllUsers
          tecnicos={tecnicos}
          onClose={() => setShowTechSelector(false)}
          onAssigned={onRefresh}
          id_solicitud={solicitud?.id}
        />
      )}
    </div>
  );
};

export default DetailRequest;
