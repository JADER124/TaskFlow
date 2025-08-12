// components/modals/ConfirmationModal.jsx
import React, { useEffect, useState } from 'react';
import {
  X,
  AlertTriangle,
  AlertCircle,
  Check,
  Shield
} from 'lucide-react';

export const ConfirmationModal = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  type = 'default',
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  icon: CustomIcon
}) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShow(true);
      document.body.style.overflow = 'hidden';
    } else {
      setShow(false);
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const typeStyles = {
    danger: {
      iconBg: "bg-red-100",
      iconColor: "text-red-600",
      confirmBtn: "bg-red-600 hover:bg-red-700 focus:ring-red-500",
      titleColor: "text-red-900"
    },
    warning: {
      iconBg: "bg-yellow-100",
      iconColor: "text-yellow-600",
      confirmBtn: "bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-500",
      titleColor: "text-yellow-900"
    },
    success: {
      iconBg: "bg-blue-500",
      iconColor: "text-blue-100",
      confirmBtn: "bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium text-lg hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg",
      titleColor: "text-blue-500"
    },
    info: {
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      confirmBtn: "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500",
      titleColor: "text-blue-900"
    },
    default: {
      iconBg: "bg-gray-100",
      iconColor: "text-gray-600",
      confirmBtn: "bg-gray-600 hover:bg-gray-700 focus:ring-gray-500",
      titleColor: "text-gray-900"
    }
  };

  const getDefaultIcon = () => {
    const iconProps = { size: 28 };
    switch (type) {
      case 'danger': return <AlertTriangle {...iconProps} />;
      case 'warning': return <AlertCircle {...iconProps} />;
      case 'success': return <Check {...iconProps} />;
      case 'info': return <Shield {...iconProps} />;
      default: return <AlertCircle {...iconProps} />;
    }
  };

  const styles = typeStyles[type] || typeStyles.default;
  const IconComponent = CustomIcon ? <CustomIcon /> : getDefaultIcon();

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleConfirm = () => {
    if (typeof onConfirm === 'function') onConfirm();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={handleBackdropClick}
    >
      <div className={`absolute inset-0 bg-black transition-opacity duration-300 ${show ? 'opacity-50' : 'opacity-0'}`} />

      <div
        className={`
          relative bg-white rounded-2xl shadow-2xl w-full max-w-md transform transition-all duration-300
          ${show ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
        `}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative p-6 pb-4">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-full transition"
          >
            <X size={20} />
          </button>
        </div>

        <div className="px-6 pb-6">
          <div className={`w-16 h-16 mx-auto mb-6 ${styles.iconBg} rounded-full flex items-center justify-center`}>
            <div className={styles.iconColor}>{IconComponent}</div>
          </div>

          <h3 className={`text-2xl font-bold text-center mb-4 ${styles.titleColor}`}>{title}</h3>
          <p className="text-gray-600 text-center leading-relaxed mb-8">{message}</p>

          <div className="flex gap-3">
            {cancelText && (
              <button
                onClick={onClose}
                className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold transition-colors"
              >
                {cancelText}
              </button>
            )}
            {confirmText && (
              <button
                onClick={handleConfirm}
                className={`flex-1 px-6 py-3 text-white rounded-lg font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-opacity-50 ${styles.confirmBtn}`}
              >
                {confirmText}
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Hook reutilizable
export const useConfirmationModal = () => {
  const [modalConfig, setModalConfig] = useState({
    isOpen: false,
    title: '',
    message: '',
    type: 'default',
    confirmText: 'Confirmar',
    cancelText: 'Cancelar',
    onConfirm: () => {},
    icon: null
  });

  const showConfirmation = (config) => {
    setModalConfig({
      ...modalConfig,
      ...config,
      isOpen: true
    });
  };

  const hideConfirmation = () => {
    setModalConfig(prev => ({ ...prev, isOpen: false }));
  };

  return {
    modalConfig,
    showConfirmation,
    hideConfirmation
  };
};
