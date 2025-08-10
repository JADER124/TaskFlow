import React, { useState, useEffect } from 'react';
import { X, AlertCircle, CheckCircle, Info, AlertTriangle } from 'lucide-react';

export const Alert = ({ type, title, message, isVisible, onClose, autoClose = true }) => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      if (autoClose) {
        const timer = setTimeout(() => {
          handleClose();
        }, 5000);
        return () => clearTimeout(timer);
      }
    }
  }, [isVisible, autoClose]);

  const handleClose = () => {
    setShow(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isVisible) return null;

  const getAlertStyles = () => {
    const baseStyles = "fixed top-4 left-1/2 transform -translate-x-1/2 z-50 w-full max-w-md mx-auto transition-all duration-300 ease-in-out";
    
    const animationStyles = show 
      ? "opacity-100 translate-y-0 scale-100" 
      : "opacity-0 -translate-y-4 scale-95";

    return `${baseStyles} ${animationStyles}`;
  };

  const getContentStyles = () => {
    const baseStyles = "flex items-start gap-4 p-6 rounded-xl shadow-2xl border backdrop-blur-sm";
    
    const typeStyles = {
      error: "bg-red-50/95 border-red-200 text-red-800",
      success: "bg-green-50/95 border-green-200 text-green-800",
      warning: "bg-yellow-50/95 border-yellow-200 text-yellow-800",
      info: "bg-blue-50/95 border-blue-200 text-blue-800"
    };

    return `${baseStyles} ${typeStyles[type]}`;
  };

  const getIcon = () => {
    const iconProps = { size: 24, className: "flex-shrink-0 mt-0.5" };
    
    switch (type) {
      case 'error':
        return <AlertCircle {...iconProps} className="text-red-500 flex-shrink-0 mt-0.5" />;
      case 'success':
        return <CheckCircle {...iconProps} className="text-green-500 flex-shrink-0 mt-0.5" />;
      case 'warning':
        return <AlertTriangle {...iconProps} className="text-yellow-500 flex-shrink-0 mt-0.5" />;
      case 'info':
        return <Info {...iconProps} className="text-blue-500 flex-shrink-0 mt-0.5" />;
      default:
        return <AlertCircle {...iconProps} />;
    }
  };

  return (
    <>
      {/* Overlay */}
      <div className="fixed inset-0 bg-black bg-opacity-20 z-40" onClick={handleClose} />
      
      {/* Alert */}
      <div className={getAlertStyles()}>
        <div className={getContentStyles()}>
          {getIcon()}
          <div className="flex-1 min-w-0">
            <h3 className="font-bold text-lg mb-2">{title}</h3>
            <p className="text-base leading-relaxed">{message}</p>
          </div>
          <button
            onClick={handleClose}
            className="p-2 rounded-full hover:bg-black hover:bg-opacity-10 transition-colors duration-200 flex-shrink-0"
          >
            <X size={20} />
          </button>
        </div>
      </div>
    </>
  );
};

export const useAlert = () => {
  const [currentAlert, setCurrentAlert] = useState(null);

  const showAlert = (alert) => {
    setCurrentAlert({ ...alert, isVisible: true });
  };

  const hideAlert = () => {
    setCurrentAlert(null);
  };

  const showError = (title, message, autoClose = true) => {
    showAlert({ type: 'error', title, message, autoClose });
  };

  const showSuccess = (title, message, autoClose = true) => {
    showAlert({ type: 'success', title, message, autoClose });
  };

  const showWarning = (title, message, autoClose = true) => {
    showAlert({ type: 'warning', title, message, autoClose });
  };

  const showInfo = (title, message, autoClose = true) => {
    showAlert({ type: 'info', title, message, autoClose });
  };

  return {
    currentAlert,
    hideAlert,
    showError,
    showSuccess,
    showWarning,
    showInfo
  };
};