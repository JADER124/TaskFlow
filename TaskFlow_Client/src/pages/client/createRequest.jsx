import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { FileText, User, Settings } from "lucide-react";
import { clientRequest } from "../../API/saveClient";

// Validaciones con Yup
const schema = yup.object().shape({
  nit: yup.string().required("El NIT es requerido"),
  direccion: yup.string().required("La dirección es requerida"),
  motivoSolicitud: yup
    .string()
    .required("El motivo de la solicitud es requerido"),
  tipoServicio: yup.string().required("Debe seleccionar un tipo de servicio"),
});

const createRequest = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    console.log("Datos de la solicitud:", data);
    try {
      // Llama a la función saveClient (probablemente una función que hace una solicitud POST al backend)
      // y espera a que se complete la respuesta
      const result = await clientRequest(data);
      console.log(result);
      // Si la petición fue exitosa, se muestra un mensaje al usuario con el contenido del campo 'mensaje' recibido en la respuesta
      alert(result.mensaje);

      // Se limpia el formulario llamando a reset (probablemente proporcionado por React Hook Form)
      reset();
    } catch (e) {
      // Si ocurre un error (por ejemplo, fallo de conexión o error en el backend), se muestra un mensaje de error al usuario
      alert("Error al registrar cliente");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4 flex items-center justify-center">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-2">
            Solicitud de Servicio
          </h1>
          <p className="text-gray-600">
            Complete los datos para generar su solicitud
          </p>
        </div>

        {/* Formulario */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {/* NIT */}
          <div>
            <label
              htmlFor="nit"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              NIT
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="nit"
                {...register("nit")}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                  errors.nit
                    ? "border-red-500 bg-red-50 focus:ring-red-500"
                    : "border-gray-300 bg-gray-50 focus:ring-blue-500"
                }`}
                placeholder="Ingrese su NIT"
              />
            </div>
            {errors.nit && (
              <p className="mt-1 text-sm text-red-600">{errors.nit.message}</p>
            )}
          </div>
          {/* DIRECCIÓN */}
          <div>
            <label
              htmlFor="direccion"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              DIRECCIÓN
            </label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                id="direccion"
                {...register("direccion")}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                  errors.direccion
                    ? "border-red-500 bg-red-50 focus:ring-red-500"
                    : "border-gray-300 bg-gray-50 focus:ring-blue-500"
                }`}
                placeholder="Ingrese su dirección"
              />
            </div>
            {errors.direccion && (
              <p className="mt-1 text-sm text-red-600">{errors.direccion.message}</p>
            )}
          </div>

          {/* Motivo de la solicitud */}
          <div>
            <label
              htmlFor="motivoSolicitud"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Motivo de la solicitud
            </label>
            <div className="relative">
              <FileText className="absolute left-3 top-3 w-5 h-5 text-gray-400" />
              <textarea
                id="motivoSolicitud"
                rows={4}
                {...register("motivoSolicitud")}
                className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors resize-none ${
                  errors.motivoSolicitud
                    ? "border-red-500 bg-red-50 focus:ring-red-500"
                    : "border-gray-300 bg-gray-50 focus:ring-blue-500"
                }`}
                placeholder="Describa el motivo de su solicitud..."
              />
            </div>
            {errors.motivoSolicitud && (
              <p className="mt-1 text-sm text-red-600">
                {errors.motivoSolicitud.message}
              </p>
            )}
          </div>

          {/* Tipo de servicio */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Tipo de servicio
            </label>
            <div
              className={`border rounded-lg p-4 space-y-3 ${
                errors.tipoServicio
                  ? "border-red-500 bg-red-50"
                  : "border-gray-300 bg-gray-50"
              }`}
            >
              {["instalacion", "mantenimiento", "reparacion"].map((tipo) => (
                <div className="flex items-center" key={tipo}>
                  <input
                    type="radio"
                    id={tipo}
                    value={tipo}
                    {...register("tipoServicio")}
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 focus:ring-2"
                  />
                  <label
                    htmlFor={tipo}
                    className="ml-3 text-sm font-medium text-gray-700 cursor-pointer flex items-center"
                  >
                    <Settings className="w-4 h-4 mr-2 text-gray-500" />
                    {tipo.charAt(0).toUpperCase() + tipo.slice(1)}
                  </label>
                </div>
              ))}
            </div>
            {errors.tipoServicio && (
              <p className="mt-1 text-sm text-red-600">
                {errors.tipoServicio.message}
              </p>
            )}
          </div>

          {/* Botón */}
          <div className="pt-4">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg"
            >
              Enviar Solicitud
            </button>
          </div>
        </form>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-gray-500">
          <p>
            ¿Necesita actualizar sus datos?{" "}
            <a
              href="#"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contactar soporte
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

export default createRequest;
