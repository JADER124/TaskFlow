import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { User, Phone, Building2, MapPin, Mail,File, AlertTriangle, AlertCircle } from 'lucide-react';
import { saveClient } from '../../API/saveClient';
import { useAlert, Alert } from "../../components/shared/alert";
import { useConfirmationModal, ConfirmationModal } from "../../components/shared/buttonsModal";


const schema = yup.object().shape({
  nit: yup.string().required("El NIT es requerido")
  .min(7, "Debe tener al menos 7 digitos")
  .matches(/^[0-9]+$/, "Solo se permiten números"),
  telefono: yup
  .string()
  .required("El teléfono es requerido")
  .matches(/^[0-9]+$/, "Solo se permiten números")
  .min(7, "Debe tener al menos 7 dígitos")
  .max(15, "Máximo 15 dígitos"),
  nombreComercial: yup.string().required("El nombre comercial es requerido"),
  correo: yup.string().required("El correo es requerido"),
  direccion: yup.string().required("La dirección es requerida"),
});

const clientForm = () => {

  const {
    register,
    handleSubmit,
    reset, 
    formState: { errors },
    getValues,
    } = useForm({
    resolver: yupResolver(schema)
  });


  const { modalConfig, showConfirmation, hideConfirmation } = useConfirmationModal();


  const handleSuccessfulSubmit = () => {
  showConfirmation({
    title: '¡Solicitud creada!',
    message: 'Tu solicitud ha sido registrada exitosamente.',
    type: 'success',
    confirmText: 'Entendido',
    cancelText: null, // Oculta el botón cancelar
    onConfirm: () => hideConfirmation() // Cierra el modal al hacer clic
  });
  setTimeout(() => {
    hideConfirmation();
  }, 6000);
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
      message: "¿Deseas enviar esta solicitud de servicio con los datos ingresados?",
      type: "success",
      confirmText: "Sí, enviar",
      cancelText: "Cancelar",
      icon: () => <AlertCircle size={28} />,
      onConfirm: async () => {
        try {
            // Llama a la función saveClient (probablemente una función que hace una solicitud POST al backend)
            // y espera a que se complete la respuesta
            const result = await saveClient(formValues);

                // Si la petición fue exitosa, se muestra un mensaje al usuario con el contenido del campo 'mensaje' recibido en la respuesta
            handleSuccessfulSubmit();

                // Se limpia el formulario llamando a reset (probablemente proporcionado por React Hook Form)
            reset();

            } catch (error) {
                // Si ocurre un error (por ejemplo, fallo de conexión o error en el backend), se muestra un mensaje de error al usuario
                const backendMessage =
                error.response?.data?.message || '❌ Error al registrar el cliente';
                showConfirmation({
                    title: "Error en la solicitud",
                    message: backendMessage,
                    type: "danger",
                    confirmText: null, // Sin botón de confirmar
                    cancelText: "Cerrar",
                    onConfirm: () => {}, // No hace nada
                  });
                } 
        }
      });
  }

  // Función asíncrona que se ejecuta cuando se envía el formulario

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
        <form onSubmit={(e) => e.preventDefault()} className="space-y-6">
          {/* Fila 1 */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* NIT */}
            <div>
              <label htmlFor="nit" className="block text-sm font-medium text-gray-700 mb-2">NIT</label>
              <div className="relative">
                <File className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
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
              <label htmlFor="sede" className="block text-sm font-medium text-gray-700 mb-2">Correo</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  id="correo"
                  {...register("correo")}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 transition-colors ${
                    errors.correo ? 'border-red-500 bg-red-50 focus:ring-red-500' : 'border-gray-300 bg-gray-50 focus:ring-blue-500'
                  }`}
                  placeholder="Ingrese el correo"
                />
              </div>
              {errors.correo && <p className="mt-1 text-sm text-red-600">{errors.correo.message}</p>}
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
          <p>¿Ya tienes una cuenta? <a href="/createRequest" className="text-blue-600 hover:text-blue-800 font-medium">Crea una solicitud</a></p>
        </div>
      </div>
      {/* Modal de confirmación */}
      {modalConfig.isOpen && (
      <ConfirmationModal {...modalConfig} onClose={hideConfirmation} />
      )}
    </div>
  )
}


export default clientForm