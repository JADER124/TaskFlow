import React, { useEffect, useMemo, useState } from "react";
import { Filter, Search } from "lucide-react";
import { getRequests } from "../../API/allRequests";
import Loader from "../../components/shared/loader";
import { RequestCard } from "../../components/shared/requestCard";
import { Pagination } from "../../components/pagination/pagination";

export const AdminHome = () => {
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState("todas");
  const [searchTerm, setSearchTerm] = useState("");
  const [requests, setRequests] = useState([]);
  const [filteredRequests, setFilteredRequests] = useState([]);

  const PAGE_SIZE = 22;
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getRequests();
        setRequests(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
    let resultado = [...requests];
    if (selectedFilter !== "todas") {
      resultado = resultado.filter(
        (r) => r.estado_nombre.toLowerCase() === selectedFilter
      );
    }
    if (searchTerm.trim() !== "") {
      const q = searchTerm.toLowerCase();
      resultado = resultado.filter(
        (r) =>
          r.cliente_nombre.toLowerCase().includes(q) ||
          r.descripcion.toLowerCase().includes(q) ||
          r.usuario_asociado_nombre.toLowerCase().includes(q)
      );
    }
    setFilteredRequests(resultado);
  }, [requests, selectedFilter, searchTerm]);

  useEffect(() => {
    setPage(1);
  }, [selectedFilter, searchTerm]);

  const totalPages = Math.max(1, Math.ceil(filteredRequests.length / PAGE_SIZE));
  const pageItems = useMemo(() => {
    const start = (page - 1) * PAGE_SIZE;
    return filteredRequests.slice(start, start + PAGE_SIZE);
  }, [filteredRequests, page]);

  const startCount =
    filteredRequests.length === 0 ? 0 : (page - 1) * PAGE_SIZE + 1;
  const endCount = Math.min(page * PAGE_SIZE, filteredRequests.length);

  return (
    <div className="h-full min-h-0 bg-gray-50 p-3 sm:p-4 lg:p-6 overflow-hidden">
      <div className="max-w-6xl mx-auto flex flex-col h-full min-h-0 overflow-hidden">
        {/* Header (estático) */}
        <div className="mb-3 sm:mb-4 pb-2">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900">
            Solicitudes de Servicio
          </h1>
        </div>

        {/* Filtros (estáticos) */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-3 sm:p-4 mb-3 sm:mb-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 sm:space-x-4">
            <div className="flex items-center space-x-2 flex-shrink-0">
              <Filter className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-auto min-w-0"
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

            <div className="flex items-center space-x-2 flex-1 sm:flex-initial">
              <Search className="w-4 h-4 text-gray-500 flex-shrink-0" />
              <input
                type="text"
                placeholder="Buscar solicitudes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border border-gray-300 rounded-md px-2 sm:px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 w-full sm:w-64 min-w-0"
              />
            </div>
          </div>
        </div>

        {/* Lista: ÚNICA zona con scroll */}
        <div className="flex-1 min-h-0 overflow-y-auto overscroll-contain touch-pan-y space-y-2 sm:space-y-3 pr-1 pb-3">
          {loading ? (
            <div className="flex justify-center items-center h-full">
              <Loader />
            </div>
          ) : pageItems.length === 0 ? (
            <div className="text-center text-gray-500 py-8">
              <p className="text-sm sm:text-base">No hay resultados</p>
            </div>
          ) : (
            pageItems.map((req) => <RequestCard key={req.id} req={req} />)
          )}
        </div>

        {/* Paginación: fija y completa */}
        <div className="bg-white border-t border-gray-200 py-3 sm:py-4 flex-shrink-0 pb-[env(safe-area-inset-bottom)]">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-3 sm:space-y-0 px-2 sm:px-4">
            <p className="text-xs sm:text-sm text-gray-500 text-center sm:text-left">
              Mostrando {startCount}–{endCount} de {filteredRequests.length} solicitudes
            </p>
            <div className="flex justify-center sm:justify-end">
              <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
