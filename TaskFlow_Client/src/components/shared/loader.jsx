import React from 'react';

export default function Loader({ message = "Cargando...", size = "medium", overlay = false }) {
  // Tamaños disponibles
  const sizes = {
    small: "w-6 h-6",
    medium: "w-10 h-10", 
    large: "w-16 h-16"
  };

  const textSizes = {
    small: "text-sm",
    medium: "text-base",
    large: "text-lg"
  };

  const LoaderContent = () => (
    <div className="flex flex-col items-center justify-center space-y-4">
      {/* Spinner principal */}
      <div className="relative">
        <div className={`${sizes[size]} border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin`}></div>
        {/* Segundo anillo para efecto doble */}
        <div className={`${sizes[size]} border-4 border-transparent border-b-indigo-400 rounded-full animate-spin absolute top-0 left-0`} style={{animationDirection: 'reverse', animationDuration: '1.5s'}}></div>
      </div>
      
      {/* Mensaje de carga */}
      <div className="text-center">
        <p className={`${textSizes[size]} font-medium text-gray-700 mb-1`}>{message}</p>
        <div className="flex space-x-1 justify-center">
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '0ms'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '150ms'}}></div>
          <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce" style={{animationDelay: '300ms'}}></div>
        </div>
      </div>
    </div>
  );

  // Si es overlay, mostrar sobre toda la pantalla
  if (overlay) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-2xl p-8 shadow-xl">
          <LoaderContent />
        </div>
      </div>
    );
  }

  // Loader inline
  return (
    <div className="flex items-center justify-center p-8">
      <LoaderContent />
    </div>
  );
}

// Componente de demostración con diferentes variantes
function LoaderDemo() {
  const [showOverlay, setShowOverlay] = React.useState(false);

  const handleShowOverlay = () => {
    setShowOverlay(true);
    // Simular carga de 3 segundos
    setTimeout(() => {
      setShowOverlay(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">Componente Loader</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {/* Loader pequeño */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tamaño Pequeño</h3>
            <Loader size="small" message="Guardando..." />
          </div>

          {/* Loader mediano */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tamaño Mediano</h3>
            <Loader size="medium" message="Procesando datos..." />
          </div>

          {/* Loader grande */}
          <div className="bg-white rounded-2xl shadow-lg p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">Tamaño Grande</h3>
            <Loader size="large" message="Cargando contenido..." />
          </div>
        </div>

        {/* Botón para mostrar overlay */}
        <div className="text-center">
          <button
            onClick={handleShowOverlay}
            className="bg-gradient-to-r from-blue-500 to-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:from-blue-600 hover:to-indigo-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 transform hover:scale-[1.02] shadow-lg"
          >
            Mostrar Loader Overlay (3s)
          </button>
        </div>

        {/* Ejemplos de uso */}
        <div className="mt-12 bg-white rounded-2xl shadow-lg p-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Ejemplos de uso:</h3>
          <div className="bg-gray-100 rounded-lg p-4 font-mono text-sm overflow-x-auto">
            <div className="space-y-2 text-gray-700">
              <div>{'// Loader básico'}</div>
              <div>{'<Loader />'}</div>
              <br />
              <div>{'// Loader con mensaje personalizado'}</div>
              <div>{'<Loader message="Enviando formulario..." />'}</div>
              <br />
              <div>{'// Loader pequeño'}</div>
              <div>{'<Loader size="small" message="Guardando..." />'}</div>
              <br />
              <div>{'// Loader overlay (pantalla completa)'}</div>
              <div>{'<Loader overlay={true} message="Procesando..." />'}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Overlay loader si está activo */}
      {showOverlay && (
        <Loader 
          overlay={true} 
          message="Procesando solicitud..."
          size="large"
        />
      )}
    </div>
  );
}