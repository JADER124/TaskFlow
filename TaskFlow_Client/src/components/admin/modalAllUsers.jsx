import { useState, useMemo } from "react";
import { User, MapPin, X, Search, CheckCircle, Wrench } from "lucide-react";
import { assignTechToRequest } from "../../API/updateData";
import { useAlert, Alert } from "../shared/alert";

const ModalAllUsers = ({ tecnicos, onClose, id_solicitud, onAssigned }) => {
  const { showInfo, currentAlert, hideAlert } = useAlert();
  const [searchTech, setSearchTech] = useState("");
  const [selectedTech, setSelectedTech] = useState(null);

  // ---- Filtro (¡ahora sí después de declarar searchTech!)
  const filteredTecnicos = useMemo(() => {
    const term = (searchTech || "").toLowerCase();
    if (!term) return tecnicos;
    return tecnicos.filter((t) => t.nombre.toLowerCase().includes(term));
  }, [searchTech, tecnicos]);

  const handleTechSelection = (tech) => {
    setSelectedTech(tech);
  };

  const confirmTechAssignment = async () => {
    if (!selectedTech) return;

    try {
      // Llamada al backend
      const response = await assignTechToRequest(id_solicitud, selectedTech.id);
      if (response?.status === 200) {
        onAssigned?.();
        onClose();
        setSelectedTech(null);
        setSearchTech("");
      }else{
        onClose();
      }
    } catch (error) {
      showInfo("Info: " + error.detail);
      setSelectedTech(null);
      setSearchTech("");
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden">
        {/* Header modal */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">Asignar Técnico</h2>
            <p className="text-sm text-gray-500 mt-1">
              Selecciona un técnico para esta solicitud
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Buscador */}
        <div className="p-4 border-b border-gray-100">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar por nombre, especialidad o ubicación..."
              value={searchTech}
              onChange={(e) => setSearchTech(e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        </div>

        {/* Lista de técnicos */}
        <div className="max-h-96 overflow-y-auto">
          {filteredTecnicos.map((tecnico) => (
            <div
              key={tecnico.id}
              onClick={() => handleTechSelection(tecnico)}
              className={`p-4 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition-colors ${
                selectedTech?.id === tecnico.id
                  ? "bg-blue-50 border-blue-200"
                  : ""
              }`}
            >
              <div className="flex items-center space-x-4">
                <div className="relative flex-shrink-0">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {tecnico.nombre
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white bg-green-500" />
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">
                      {tecnico.nombre}
                    </h4>
                  </div>

                  <p className="text-sm text-gray-600 mb-1">{tecnico.email}</p>

                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <span className="flex items-center">
                        <MapPin className="h-3 w-3 mr-1" />
                        Medellín
                      </span>
                      <span>cantidad_servicios</span>
                    </div>
                  </div>
                </div>

                {selectedTech?.id === tecnico.id && (
                  <CheckCircle className="h-5 w-5 text-blue-600 flex-shrink-0" />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Footer modal */}
        <div className="p-6 border-t border-gray-200 flex items-center justify-between bg-gray-50">
          <div className="text-sm text-gray-500">
            {selectedTech
              ? `Seleccionado: ${selectedTech.nombre}`
              : "Selecciona un técnico"}
          </div>
          <div className="flex space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancelar
            </button>
            <button
              onClick={confirmTechAssignment}
              disabled={!selectedTech}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Asignar Técnico
            </button>
          </div>
        </div>
        {/* Render Alert */}
        {currentAlert && <Alert {...currentAlert} onClose={hideAlert} />}
      </div>
    </div>
  );
};

export default ModalAllUsers;
