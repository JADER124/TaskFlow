import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import {
  FileText,
  User,
  Settings,
  AlertCircle,
  MapPin,
  Plug,
  Wrench,
  Hammer,
} from "lucide-react";
import { clientRequest } from "../../API/saveClient";
import {
  useConfirmationModal,
  ConfirmationModal,
} from "../../components/shared/buttonsModal";
import { useAlert, Alert } from "../../components/shared/alert";

// Validaciones con Yup
const schema = yup.object().shape({
  nit: yup
    .string()
    .required("El NIT es requerido")
    .min(7, "Debe tener al menos 7 digitos")
    .matches(/^[0-9]+$/, "Solo se permiten números"),
  direccion: yup.string().required("La dirección es requerida"),
  motivoSolicitud: yup
    .string()
    .required("El motivo de la solicitud es requerido"),
  tipoServicio: yup.string().required("Debe seleccionar un tipo de servicio"),
});

const CreateRequest = () => {
  const { currentAlert, hideAlert, showSuccess, showError } = useAlert();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    getValues, // Para obtener valores sin hacer submit aún
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Invoco mi componente para traer la plantilla de los modales
  const { modalConfig, showConfirmation, hideConfirmation } =
    useConfirmationModal();

  const handleSuccessfulSubmit = () => {
    showSuccess("Solicitud creada exitosamente");
  };

  const handleFormSubmit = () => {
    const formValues = getValues(); // Obtener valores actuales del formulario

    const isValid = Object.keys(schema.fields).every((key) => {
      try {
        schema.fields[key].validateSync(formValues[key]);
        return true;
      } catch {
        return false;
      }
    });

    if (!isValid) {
      handleSubmit(() => {})(new Event("submit")); // Dispara validación visual
      return;
    }

    showConfirmation({
      title: "¿Confirmar solicitud?",
      message:
        "¿Deseas enviar esta solicitud de servicio con los datos ingresados?",
      type: "success",
      confirmText: "Sí, enviar",
      cancelText: "Cancelar",
      icon: () => <AlertCircle size={28} />,
      onConfirm: async () => {
        try {
          const data = getValues();
          const result = await clientRequest(data);
          handleSuccessfulSubmit();
          reset();
        } catch (error) {
          const backendMessage =
            error.response?.data?.error || "❌ Error al realizar la solicitud";
          showError("Error: " + backendMessage);
        }
      },
    });
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
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
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
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
              <p className="mt-1 text-sm text-red-600">
                {errors.direccion.message}
              </p>
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
              {["instalación", "mantenimiento", "reparación"].map((tipo) => (
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
                    {/* reemplaza <Settings ... /> por esto */}
                    {tipo === "instalación" ? (
                      <Plug className="w-4 h-4 mr-2 text-gray-500" />
                    ) : tipo === "mantenimiento" ? (
                      <Wrench className="w-4 h-4 mr-2 text-gray-500" />
                    ) : tipo === "reparación" ? (
                      <Hammer className="w-4 h-4 mr-2 text-gray-500" />
                    ) : (
                      <Settings className="w-4 h-4 mr-2 text-gray-500" />
                    )}

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
              type="button"
              onClick={handleFormSubmit}
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
              href="https://api.whatsapp.com/send?phone=573012511449&text=%20Hola%20me%20interesa%20realizar%20una%20%20solicitud%20y%20no%20me%20esta%20dejando%20hacerla%20en%20la%20app"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              Contactar soporte
            </a>
          </p>
        </div>
      </div>
      {/* Render Alert */}
      {currentAlert && <Alert {...currentAlert} onClose={hideAlert} />}
      {/* Modal de confirmación */}
      {modalConfig.isOpen && (
        <ConfirmationModal {...modalConfig} onClose={hideConfirmation} />
      )}
    </div>
  );
};

export default CreateRequest;
