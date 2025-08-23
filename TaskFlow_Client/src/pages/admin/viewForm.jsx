import React, { useState } from 'react';
import { FileText, User, Clock, DollarSign, Edit3, Calendar, ArrowLeft } from 'lucide-react';
import { NavLink } from 'react-router-dom';

const ViewForm = () => {
    const [formData, setFormData] = useState({
    clientNames: ['', '', '', ''],
    serviceDescription: '',
    requests: [{ description: '', amount: '' }],
    startTime: '',
    endTime: '',
    signature: ''
  });

  const handleClientNameChange = (index, value) => {
    const newClientNames = [...formData.clientNames];
    newClientNames[index] = value;
    setFormData({ ...formData, clientNames: newClientNames });
  };

  const handleRequestChange = (index, field, value) => {
    const newRequests = [...formData.requests];
    newRequests[index] = { ...newRequests[index], [field]: value };
    setFormData({ ...formData, requests: newRequests });
  };

  const addRequest = () => {
    setFormData({
      ...formData,
      requests: [...formData.requests, { description: '', amount: '' }]
    });
  };

  const removeRequest = (index) => {
    const newRequests = formData.requests.filter((_, i) => i !== index);
    setFormData({ ...formData, requests: newRequests });
  };

  const getTotalAmount = () => {
    return formData.requests.reduce((total, request) => {
      const amount = parseFloat(request.amount) || 0;
      return total + amount;
    }, 0);
  };

  const handleSubmit = () => {
    // Aquí enviarías los datos a tu backend Django
    console.log('Datos del formulario:', formData);
  };
  return (
    <div><div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-4">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-slate-800 to-slate-600 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <NavLink 
                  to=".." // Cambia esta ruta por la que necesites
                  className="p-2 hover:bg-white/20 rounded-full transition-all duration-200 group"
                >
                  <ArrowLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
                </NavLink>
                <div className="flex items-center gap-3">
                  <FileText className="w-8 h-8" />
                  <h1 className="text-2xl font-bold">Revisar Balanza</h1>
                </div>
              </div>
              <div className="bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
                <span className="font-mono">N° #####</span>
              </div>
            </div>
          </div>

          <div className="p-8 space-y-8">
            {/* Datos del Cliente */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-semibold text-gray-800">Datos del Cliente</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-blue-600 to-transparent ml-4"></div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {formData.clientNames.map((name, index) => (
                  <div key={index} className="relative">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Nombre {index + 1}:
                    </label>
                    <input
                      type="text"
                      value={name}
                      onChange={(e) => handleClientNameChange(index, e.target.value)}
                      className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 hover:border-gray-300"
                      placeholder={`Ingrese nombre ${index + 1}`}
                    />
                  </div>
                ))}
              </div>
            </section>

            {/* Descripción del Servicio */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-green-600" />
                <h2 className="text-xl font-semibold text-gray-800">Descripción del Servicio</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-green-600 to-transparent ml-4"></div>
              </div>
              
              <textarea
                value={formData.serviceDescription}
                onChange={(e) => setFormData({ ...formData, serviceDescription: e.target.value })}
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 hover:border-gray-300 resize-none"
                placeholder="Describe detalladamente el servicio realizado..."
              />
            </section>

            {/* Cotización Repuestos */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-semibold text-gray-800">Cotización Repuestos</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-purple-600 to-transparent ml-4"></div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="font-medium text-gray-700">Repuestos:</h3>
                  <button
                    type="button"
                    onClick={addRequest}
                    className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors duration-200 text-sm font-medium"
                  >
                    + Agregar Repuesto
                  </button>
                </div>

                <div className="space-y-3">
                  {formData.requests.map((request, index) => (
                    <div key={index} className="flex gap-3 items-center bg-white rounded-lg p-3 border border-gray-200">
                      <input
                        type="text"
                        placeholder="Descripción del repuesto"
                        value={request.description}
                        onChange={(e) => handleRequestChange(index, 'description', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                      />
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                        <input
                          type="number"
                          placeholder="0.00"
                          value={request.amount}
                          onChange={(e) => handleRequestChange(index, 'amount', e.target.value)}
                          className="w-32 pl-7 pr-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 text-right"
                          step="0.01"
                        />
                      </div>
                      {formData.requests.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeRequest(index)}
                          className="px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors duration-200"
                        >
                          ×
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex justify-end pt-4 border-t border-gray-200">
                  <div className="bg-white rounded-lg px-4 py-3 border-2 border-purple-200">
                    <span className="text-lg font-semibold text-gray-800">
                      Total: <span className="text-purple-600">${getTotalAmount().toFixed(2)}</span>
                    </span>
                  </div>
                </div>
              </div>
            </section>

            {/* Horarios */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-orange-600" />
                <h2 className="text-xl font-semibold text-gray-800">Horarios</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-orange-600 to-transparent ml-4"></div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora Inicio:
                  </label>
                  <input
                    type="time"
                    value={formData.startTime}
                    onChange={(e) => setFormData({ ...formData, startTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hora Fin:
                  </label>
                  <input
                    type="time"
                    value={formData.endTime}
                    onChange={(e) => setFormData({ ...formData, endTime: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200"
                  />
                </div>
              </div>
            </section>

            {/* Firma */}
            <section className="space-y-4">
              <div className="flex items-center gap-2 mb-4">
                <Edit3 className="w-5 h-5 text-indigo-600" />
                <h2 className="text-xl font-semibold text-gray-800">Firma</h2>
                <div className="flex-1 h-px bg-gradient-to-r from-indigo-600 to-transparent ml-4"></div>
              </div>

              <div className="bg-gray-50 rounded-xl p-6">
                <div className="bg-white border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-indigo-400 transition-colors duration-200 cursor-pointer">
                  <Edit3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-600 font-medium">Área de Firma Digital</p>
                  <p className="text-gray-400 text-sm mt-1">Click para firmar o cargar imagen</p>
                </div>
              </div>
            </section>

            {/* Botones de Acción */}
            <div className="flex gap-4 pt-6 border-t border-gray-200">
              <button
                type="button"
                className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-all duration-200 font-medium"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all duration-200 font-medium shadow-lg hover:shadow-xl"
              >
                Guardar Revisión
              </button>
            </div>
          </div>
        </div>
      </div>
    </div></div>
  )
}

export default ViewForm