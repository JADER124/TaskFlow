import React, { useEffect, useState } from "react";
import { Filter, Search } from "lucide-react";
import { getRequests } from "../../API/allRequests";
import Loader from "../../components/shared/loader"

// Componente visual que representa cada solicitud
import { RequestCard } from "../../components/shared/requestCard";

// Componente principal de la vista de administración
export const AdminHome = () => {
  const [loading, setLoading] = useState(true);
  // Estado para el filtro de estado de la solicitud
  const [selectedFilter, setSelectedFilter] = useState("todas");

  // Estado para el campo de búsqueda por texto
  const [searchTerm, setSearchTerm] = useState("");

  // Estado que contiene todas las solicitudes recibidas desde el backend
  const [requests, setRequests] = useState([]);

  // Estado que contiene solo las solicitudes que pasan los filtros
  const [filteredRequests, setFilteredRequests] = useState([]);

  // useEffect que se ejecuta solo al montar el componente ([]):
  // Llama a la API para obtener todas las solicitudes
  useEffect(() => {
    const axiosrequests = async () => {
      try {
        const data = await getRequests(); // Consulta al backend
        setRequests(data); // Guarda las solicitudes en el estado original
      } catch (err) {
        console.error(err); // Manejo de error (por ejemplo, problema de red)
      } finally {
        setLoading(false);
      }
    };

    axiosrequests(); // Ejecuta la función
  }, []);

  // useEffect que aplica filtros cada vez que cambia alguna dependencia
  useEffect(() => {
    const filtrar = () => {
      // Copia del array original
      let resultado = [...requests];

      //Filtro por estado (si no es "todas")
      if (selectedFilter !== "todas") {
        resultado = resultado.filter(
          (r) => r.estado_nombre.toLowerCase() === selectedFilter
        );
      }

      //Filtro por búsqueda de texto (cliente o descripción)
      if (searchTerm.trim() !== "") {
        resultado = resultado.filter(
          (r) =>
            r.cliente_nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.descripcion.toLowerCase().includes(searchTerm.toLowerCase()) ||
            r.usuario_asociado_nombre.toLowerCase().includes(searchTerm.toLowerCase())
        );
      }

      // Actualiza el estado con las solicitudes filtradas
      setFilteredRequests(resultado);
    };

    filtrar(); // Ejecuta la lógica de filtrado
  }, [requests, selectedFilter, searchTerm]); // Se ejecuta si cambian estos valores

  return (
    <div className="h-screen bg-gray-50 p-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col h-full">
        {/* Header del dashboard */}
        <div className="mb-4 sticky top-0 bg-gray-50 z-20 pb-2">
          <h1 className="text-2xl font-bold text-gray-900">
            Solicitudes de Servicio
          </h1>
        </div>

        {/* Barra de filtros y búsqueda */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-4 mb-4 sticky top-14 z-10">
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
                  <option value="abierta">Abiertas</option>
                  <option value="asignada">Asignadas</option>
                  <option value="en curso">En curso</option>
                  <option value="cerrada">Cerradas</option>
                  <option value="finalizada">Finalizadas</option>
                  <option value="pendiente">Pendientes</option>
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

        {/* Lista de solicitudes (scrollable) */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-3">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : (
            filteredRequests.map((req) => (
              <RequestCard key={req.id} req={req} />
            ))
          )}
        </div>

        {/* Paginación (sticky abajo) */}
        <div className="bg-white border-t border-gray-200 mt-2 pt-4 sticky bottom-0 z-20">
          <div className="flex items-center justify-between px-2">
            <p className="text-sm text-gray-500">
              Mostrando {filteredRequests.length} solicitudes
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
  );
};
