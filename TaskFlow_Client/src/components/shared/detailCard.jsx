import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  FileText,
  MessageCircle,
  User,
  MapPin,
  Clock,
  AlertTriangle,
  Play,
  UserCheck,
  Phone,
  Building,
  Wrench,
  Star,
  Send,
  ChevronDown,
  ChevronRight,
  Camera,Download,Edit,Calendar
} from "lucide-react";
import { getAllUsers } from "../../API/allRequests";
import ModalAllUsers from "../admin/modalAllUsers";

const DetailRequest = ({ solicitud, onRefresh }) => {
  const navigate = useNavigate();

  const [expandedSections, setExpandedSections] = useState({
    timeline: false,
    equipments: false,
  });

  const [tecnicos, setTecnicos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showTechSelector, setShowTechSelector] = useState(false);

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

  const getStatusConfig = (estado) => {
    switch (estado) {
      case "Abierta":
        return { textColor: "text-blue-700", bgColor: "bg-blue-50" };
      case "Asignada":
        return { textColor: "text-orange-700", bgColor: "bg-orange-50" };
      case "Finalizada":
        return { textColor: "text-green-700", bgColor: "bg-green-50" };
      default:
        return { textColor: "text-gray-700", bgColor: "bg-gray-50" };
    }
  };

  const getStatusColor = (estado_nombre) => {
    switch (estado_nombre.toLowerCase()) {
      case "finalizada":
        return "bg-green-100 text-green-700";
      case "asignada":
        return "bg-blue-100 text-blue-700";
      case "en curso":
        return "bg-yellow-100 text-yellow-700";
      case "cerrada":
        return "bg-purple-100 text-purple-700";
      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const statusConfig = getStatusConfig(solicitud?.estado_nombre || "");

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={() => navigate("/admin")}
                className="text-gray-400 hover:text-gray-600"
              >
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <h1 className="text-lg font-bold text-gray-900">
                  {solicitud?.cliente_nombre || "Cliente"} #
                  {solicitud?.id ?? "—"}
                </h1>
                <span className={`text-sm ${statusConfig.textColor}`}>
                  • {solicitud?.tipo_servicio_nombre || "Servicio"}
                </span>
                <span
                  className={`px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1 $${getStatusColor(
                    solicitud?.estado_nombre
                  )}`}
                >
                  {solicitud?.estado_nombre || "—"}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Ver Formulario</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Principal */}
          <div className="col-span-12 lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Descripción */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Solicitud #{solicitud?.id ?? "—"}
                </h2>
                <p className="text-gray-600 leading-relaxed">
                  {solicitud?.descripcion || "Sin descripción"}
                </p>
                <div className="mt-4 text-sm text-gray-500">
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

              {/* Info rápida */}
              <div className="p-6 border-b">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-600" /> Personal
                    </h4>
                    <p>
                      <strong>Técnico:</strong>{" "}
                      {solicitud?.usuario_asociado_nombre || "—"}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" />
                      Ubicación
                    </h4>
                    <p>Medellín, Antioquia</p>
                    <p className="text-gray-500">
                      {solicitud?.direccion}
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Wrench className="w-4 h-4 mr-2 text-purple-600" />
                      Servicio
                    </h4>
                    <p>
                      <strong>Tipo:</strong>{" "}
                      {solicitud?.tipo_servicio_nombre || "—"}
                    </p>
                  </div>
                </div>
              </div>

              {/* Secciones colapsables */}
              <div>
                <div className="border-b">
                  <button
                    onClick={() => toggleSection("equipments")}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="flex items-center font-medium">
                      <Building className="h-4 w-4 mr-2 text-orange-600" />
                      Equipos Involucrados (2)
                    </span>
                    {expandedSections.equipments ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                  </button>
                  {expandedSections.equipments && (
                    <div className="px-6 pb-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium">XYZ-2000</p>
                          <p className="text-xs text-gray-500">
                            ID: BAL-001 • Serie: 2024-001
                          </p>
                          <p className="text-xs text-gray-500">Lab A</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium">XYZ-2000</p>
                          <p className="text-xs text-gray-500">
                            ID: BAL-002 • Serie: 2024-002
                          </p>
                          <p className="text-xs text-gray-500">Lab B</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => toggleSection("timeline")}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="flex items-center font-medium">
                      <Clock className="h-4 w-4 mr-2 text-blue-600" />
                      Cronología (2)
                    </span>
                    {expandedSections.timeline ? (
                      <ChevronDown />
                    ) : (
                      <ChevronRight />
                    )}
                  </button>
                  {expandedSections.timeline && (
                    <div className="px-6 pb-4">
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

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-4">
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
                  CM
                </div>
                <div>
                  <p className="font-medium text-sm">{solicitud?.usuario_asociado_nombre}</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" /> 4.8 • 127
                    servicios
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <button className="bg-green-50 text-green-700 px-2 py-1 rounded flex items-center justify-center space-x-1">
                  <Phone className="w-3 h-3" />
                  <span>Llamar</span>
                </button>
                <button className="bg-blue-50 text-blue-700 px-2 py-1 rounded flex items-center justify-center space-x-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>Mensaje</span>
                </button>
              </div>
            </div>

              {/* Acciones rápidas compactas */}
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-medium text-gray-900 mb-3">Acciones Rápidas</h3>
              
              <div className="space-y-2">
                <button className="w-full flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-50 py-2 px-3 rounded transition-colors">
                  <Camera className="h-4 w-4" />
                  <span>Tomar fotos</span>
                </button>
                <button className="w-full flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-50 py-2 px-3 rounded transition-colors">
                  <Download className="h-4 w-4" />
                  <span>Generar PDF</span>
                </button>
                <button className="w-full flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-50 py-2 px-3 rounded transition-colors">
                  <Edit className="h-4 w-4" />
                  <span>Editar solicitud</span>
                </button>
                <button className="w-full flex items-center space-x-2 text-sm text-gray-700 hover:bg-gray-50 py-2 px-3 rounded transition-colors">
                  <Calendar className="h-4 w-4" />
                  <span>Reagendar</span>
                </button>
              </div>
            </div>     

          </div>
        </div>
      </div>

      {/* Modal de selección de técnico */}
      {showTechSelector && (
        <>
          <ModalAllUsers
            tecnicos={tecnicos}
            onClose={() => setShowTechSelector(false)}
            onAssigned={onRefresh}
            id_solicitud={solicitud?.id}
          />
        </>
      )}
    </div>
  );
};

export default DetailRequest;
