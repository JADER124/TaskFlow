import React from "react";
import { X } from "lucide-react";

const confirmationModal = ({ title, message, onConfirm, onClose, confirmText = "Confirmar", cancelText = "Cancelar" }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-6 relative animate-fade-in">
        {/* Botón cerrar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Título */}
        <h2 className="text-xl font-bold text-gray-800 mb-3">{title}</h2>

        {/* Mensaje */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Botones */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition"
          >
            {cancelText}
          </button>
          <button
            onClick={() => {
              onConfirm?.();
              onClose?.();
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default confirmationModal;
