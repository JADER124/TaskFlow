import React from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User, Phone, Building2, MapPin } from 'lucide-react';

const schema = yup.object().shape({
  nit: yup.string().required("El NIT es requerido"),
  telefono: yup
  .string()
  .required("El teléfono es requerido")
  .matches(/^[0-9]+$/, "Solo se permiten números")
  .min(7, "Debe tener al menos 7 dígitos")
  .max(15, "Máximo 15 dígitos"),
  nombreComercial: yup.string().required("El nombre comercial es requerido"),
  sede: yup.string().required("La sede es requerida"),
  direccion: yup.string().required("La dirección es requerida"),
});

const clientForm = () => {

  const {register,handleSubmit,reset, formState: { errors }} = useForm({
    resolver: yupResolver(schema)
  });

  const onSubmit = (data) => {
    console.log("Datos del cliente:", data);
    alert("Cliente registrado exitosamente!");
    reset();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">Registro de Cliente</h1>
          <p className="text-gray-600">Complete los datos para crear su cuenta como cliente</p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* Fila 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NIT */}
            <div>
              <label htmlFor="nit" className="block text-sm font-medium text-gray-700 mb-2">NIT</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="nit"
                  {...register("nit")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.nit ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 bg-gray-50 focus:ring-blue-500'
                  }`}
                  placeholder="Ingrese el NIT"
                />
              </div>
              {errors.nit && <p className="mt-1 text-sm text-red-600">{errors.nit.message}</p>}
            </div>

            {/* Teléfono */}
            <div>
              <label htmlFor="telefono" className="block text-sm font-medium text-gray-700 mb-2">Teléfono</label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  id="telefono"
                  {...register("telefono")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.telefono ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 bg-gray-50 focus:ring-blue-500'
                  }`}
                  placeholder="Ingrese el teléfono"
                />
              </div>
              {errors.telefono && <p className="mt-1 text-sm text-red-600">{errors.telefono.message}</p>}
            </div>
          </div>

          {/* Fila 2 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre Comercial */}
            <div>
              <label htmlFor="nombreComercial" className="block text-sm font-medium text-gray-700 mb-2">Nombre Comercial</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="nombreComercial"
                  {...register("nombreComercial")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.nombreComercial ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 bg-gray-50 focus:ring-blue-500'
                  }`}
                  placeholder="Ingrese el nombre comercial"
                />
              </div>
              {errors.nombreComercial && <p className="mt-1 text-sm text-red-600">{errors.nombreComercial.message}</p>}
            </div>

            {/* Sede */}
            <div>
              <label htmlFor="sede" className="block text-sm font-medium text-gray-700 mb-2">Sede</label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="sede"
                  {...register("sede")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.sede ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 bg-gray-50 focus:ring-blue-500'
                  }`}
                  placeholder="Ingrese la sede"
                />
              </div>
              {errors.sede && <p className="mt-1 text-sm text-red-600">{errors.sede.message}</p>}
            </div>
          </div>

          {/* Dirección */}
          <div>
            <label htmlFor="direccion" className="block text-sm font-medium text-gray-700 mb-2">Dirección</label>
            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="direccion"
                {...register("direccion")}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                  errors.direccion ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 bg-gray-50 focus:ring-blue-500'
                }`}
                placeholder="Ingrese la dirección completa"
              />
            </div>
            {errors.direccion && <p className="mt-1 text-sm text-red-600">{errors.direccion.message}</p>}
          </div>

          {/* Botón */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Registrarme
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>¿Ya tienes una cuenta? <a href="/request" className="text-blue-600 hover:text-blue-800 font-medium">Crea una solicitud</a></p>
        </div>
      </div>
    </div>
  )
}

export default clientForm