import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  ArrowLeft, FileText, MessageCircle, Calendar, User, MapPin, Clock,
  AlertTriangle, Download, Play, UserCheck, Phone, Building, Wrench,
  Camera, Star, Edit, Send, ChevronDown, ChevronRight
} from 'lucide-react';

const DetailRequest = ({ solicitud }) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    timeline: false,
    equipments: false
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const getStatusConfig = (estado) => {
    switch (estado) {
      case 'Abierta': return { textColor: 'text-blue-700', bgColor: 'bg-blue-50' };
      case 'Asignada': return { textColor: 'text-orange-700', bgColor: 'bg-orange-50' };
      case 'Finalizada': return { textColor: 'text-green-700', bgColor: 'bg-green-50' };
      default: return { textColor: 'text-gray-700', bgColor: 'bg-gray-50' };
    }
  };

  const statusConfig = getStatusConfig(solicitud.estado_nombre || '');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button onClick={() => navigate('/admin')} className="text-gray-400 hover:text-gray-600">
                <ArrowLeft className="h-5 w-5" />
              </button>
              <div className="flex items-center space-x-3">
                <h1 className="text-lg font-bold text-gray-900">
                  {solicitud.cliente_nombre} #{solicitud.id}
                </h1>
                <span className={`text-sm ${statusConfig.textColor}`}>• {solicitud.tipo_servicio_nombre}</span>
                <span className={`px-2 py-1 rounded text-xs font-medium ${statusConfig.textColor} ${statusConfig.bgColor}`}>
                  {solicitud.estado_nombre}
                </span>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
                <FileText className="h-4 w-4" />
                <span>Ver Formulario</span>
              </button>
              <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
                <Play className="h-4 w-4" />
                <span>Iniciar</span>
              </button>
              <button className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg text-sm flex items-center space-x-2">
                <Send className="h-4 w-4" />
                <span>Reportar</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Contenido */}
      <div className="max-w-7xl mx-auto px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Principal */}
          <div className="col-span-8">
            <div className="bg-white rounded-lg shadow-sm border">
              {/* Descripción */}
              <div className="p-6 border-b">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  Solicitud #{solicitud.id}
                </h2>
                <p className="text-gray-600 leading-relaxed">{solicitud.descripcion}</p>
                <div className="mt-4 text-sm text-gray-500">
                  <Clock className="inline w-4 h-4 mr-1" />
                  Fecha de creación:{' '}
                  {new Date(solicitud.fecha_creacion).toLocaleString('es-CO', {
                    timeZone: 'America/Bogota',
                    day: '2-digit',
                    month: '2-digit',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
              </div>

              {/* Información estática (simulada) */}
              <div className="p-6 border-b">
                <div className="grid grid-cols-3 gap-6 text-sm">
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <User className="w-4 h-4 mr-2 text-blue-600" /> Personal
                    </h4>
                    <p><strong>Técnico:</strong> {solicitud.usuario_asociado_nombre}</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <MapPin className="w-4 h-4 mr-2 text-green-600" /> Ubicación
                    </h4>
                    <p>Medellín, Antioquia</p>
                    <p className="text-gray-500">Calle 50 #45-30, Oficina 402</p>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2 flex items-center">
                      <Wrench className="w-4 h-4 mr-2 text-purple-600" /> Servicio
                    </h4>
                    <p><strong>Tipo:</strong> {solicitud.tipo_servicio_nombre}</p>
                    <p><strong>Prioridad:</strong> Alta</p>
                  </div>
                </div>
              </div>

              {/* Observación estática */}
              <div className="p-6 border-b">
                <div className="bg-amber-50 border-l-4 border-amber-400 p-3 rounded">
                  <div className="flex items-start">
                    <AlertTriangle className="h-4 w-4 text-amber-600 mt-0.5 mr-2" />
                    <p className="text-sm text-amber-800">
                      Cliente reporta que el problema comenzó después del último mantenimiento preventivo.
                    </p>
                  </div>
                </div>
              </div>

              {/* Secciones colapsables con datos mock */}
              <div>
                <div className="border-b">
                  <button
                    onClick={() => toggleSection('equipments')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="flex items-center font-medium">
                      <Building className="h-4 w-4 mr-2 text-orange-600" />
                      Equipos Involucrados (2)
                    </span>
                    {expandedSections.equipments ? <ChevronDown /> : <ChevronRight />}
                  </button>
                  {expandedSections.equipments && (
                    <div className="px-6 pb-4">
                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium">XYZ-2000</p>
                          <p className="text-xs text-gray-500">ID: BAL-001 • Serie: 2024-001</p>
                          <p className="text-xs text-gray-500">Lab A</p>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-3">
                          <p className="font-medium">XYZ-2000</p>
                          <p className="text-xs text-gray-500">ID: BAL-002 • Serie: 2024-002</p>
                          <p className="text-xs text-gray-500">Lab B</p>
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div>
                  <button
                    onClick={() => toggleSection('timeline')}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <span className="flex items-center font-medium">
                      <Clock className="h-4 w-4 mr-2 text-blue-600" />
                      Cronología (2)
                    </span>
                    {expandedSections.timeline ? <ChevronDown /> : <ChevronRight />}
                  </button>
                  {expandedSections.timeline && (
                    <div className="px-6 pb-4">
                      <div className="space-y-3 text-sm">
                        <p><strong>03/08 13:10</strong> • Solicitud asignada por A. García</p>
                        <p><strong>03/08 13:00</strong> • Solicitud creada por Sistema</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar simulado */}
          <div className="col-span-4 space-y-4">
            <div className="bg-white rounded-lg shadow-sm border p-4">
              <h3 className="font-medium mb-3 flex items-center">
                <UserCheck className="h-4 w-4 mr-2 text-blue-600" />
                Técnico Asignado
              </h3>
              <div className="flex items-center space-x-3 mb-3">
                <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white text-sm font-semibold">CM</div>
                <div>
                  <p className="font-medium text-sm">Carlos Mendoza</p>
                  <p className="text-xs text-gray-500 flex items-center">
                    <Star className="h-3 w-3 text-yellow-500 mr-1" /> 4.8 • 127 servicios
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailRequest;
