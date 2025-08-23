import React, { useState } from 'react';
import { Calendar, Clock, MapPin, User, CheckCircle, XCircle, AlertCircle, ChevronLeft, ChevronRight } from 'lucide-react';

export const MaintenanceCalendar = ({ onSchedule, currentAppointment }) => {
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [customTime, setCustomTime] = useState('');
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());

  // Generar días del mes
  const generateCalendarDays = () => {
    const firstDay = new Date(currentYear, currentMonth, 1);
    const lastDay = new Date(currentYear, currentMonth + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());

    const days = [];
    for (let i = 0; i < 42; i++) {
      const date = new Date(startDate);
      date.setDate(startDate.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const days = generateCalendarDays();
  const today = new Date();
  const monthNames = [
    'Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
    'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'
  ];

  const handleDateSelect = (date) => {
    if (date < today.setHours(0,0,0,0)) return;
    setSelectedDate(date.toISOString().split('T')[0]);
    setSelectedTime('');
    setCustomTime('');
  };

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  const prevMonth = () => {
    const now = new Date();
    if (currentYear > now.getFullYear() || (currentYear === now.getFullYear() && currentMonth > now.getMonth())) {
      if (currentMonth === 0) {
        setCurrentMonth(11);
        setCurrentYear(currentYear - 1);
      } else {
        setCurrentMonth(currentMonth - 1);
      }
    }
  };

  const canGoPrevious = () => {
    const now = new Date();
    return currentYear > now.getFullYear() || (currentYear === now.getFullYear() && currentMonth > now.getMonth());
  };

  const handleSchedule = () => {
    if (selectedDate && (selectedTime || customTime)) {
      setShowConfirmation(true);
    }
  };

  const confirmSchedule = () => {
    const finalTime = customTime || selectedTime;
    onSchedule({
      date: selectedDate,
      time: finalTime,
      datetime: new Date(`${selectedDate}T${finalTime}:00`)
    });
    setShowConfirmation(false);
  };

  const isDateDisabled = (date) => {
    return date < today.setHours(0,0,0,0) || date.getDay() === 0;
  };

  const isDateSelected = (date) => {
    return selectedDate === date.toISOString().split('T')[0];
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm p-4">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-medium text-gray-900 flex items-center">
          <Calendar className="h-4 w-4 mr-2 text-blue-600" />
          Programar Mantenimiento
        </h3>
        {currentAppointment && (
          <div className="flex items-center space-x-1 text-xs text-green-600 bg-green-50 px-2 py-1 rounded">
            <CheckCircle className="h-3 w-3" />
            <span>Programado</span>
          </div>
        )}
      </div>

      {currentAppointment && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center space-x-2 text-sm">
            <Clock className="h-4 w-4 text-blue-600" />
            <span className="font-medium">
              {new Date(currentAppointment.datetime).toLocaleDateString('es-CO', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
            <span>a las {currentAppointment.time}</span>
          </div>
          {currentAppointment.notes && (
            <p className="text-xs text-gray-600 mt-1">
              Notas: {currentAppointment.notes}
            </p>
          )}
          <button className="text-xs text-blue-600 hover:text-blue-800 mt-2 flex items-center space-x-1">
            <AlertCircle className="h-3 w-3" />
            <span>Reprogramar cita</span>
          </button>
        </div>
      )}

      <div className="mb-4">
        {/* Header del calendario con navegación */}
        <div className="flex items-center justify-between mb-3">
          <button
            onClick={prevMonth}
            disabled={!canGoPrevious()}
            className={`p-1 rounded-full transition-colors ${
              canGoPrevious() 
                ? 'hover:bg-gray-100 text-gray-600' 
                : 'text-gray-300 cursor-not-allowed'
            }`}
          >
            <ChevronLeft className="h-4 w-4" />
          </button>
          
          <h4 className="font-medium text-sm">
            {monthNames[currentMonth]} {currentYear}
          </h4>
          
          <button
            onClick={nextMonth}
            className="p-1 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
          >
            <ChevronRight className="h-4 w-4" />
          </button>
        </div>
        
        <div className="grid grid-cols-7 gap-1 text-xs">
          {['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'].map(day => (
            <div key={day} className="text-center text-gray-500 font-medium py-1">
              {day}
            </div>
          ))}
          
          {days.map((date, index) => {
            const isDisabled = isDateDisabled(date);
            const isSelected = isDateSelected(date);
            const isCurrentMonth = date.getMonth() === currentMonth;
            const isToday = date.toDateString() === today.toDateString();
            
            return (
              <button
                key={index}
                onClick={() => !isDisabled && handleDateSelect(date)}
                disabled={isDisabled}
                className={`
                  h-8 w-8 text-xs rounded-full transition-colors
                  ${isSelected 
                    ? 'bg-blue-600 text-white' 
                    : isToday 
                    ? 'bg-blue-100 text-blue-600 font-medium'
                    : isCurrentMonth
                    ? 'hover:bg-gray-100 text-gray-700'
                    : 'text-gray-300'
                  }
                  ${isDisabled ? 'cursor-not-allowed opacity-50' : 'cursor-pointer'}
                `}
              >
                {date.getDate()}
              </button>
            );
          })}
        </div>
      </div>

      {selectedDate && (
        <div className="mb-4">
          <h5 className="text-sm font-medium mb-2 flex items-center">
            <Clock className="h-4 w-4 mr-1 text-gray-500" />
            Seleccionar hora
          </h5>
          
          <div className="mb-3">
            <p className="text-xs text-gray-500 mb-2">Horarios sugeridos:</p>
            <div className="grid grid-cols-4 gap-2">
              {['08:00', '09:00', '10:00', '11:00', '14:00', '15:00', '16:00', '17:00'].map(slot => (
                <button
                  key={slot}
                  onClick={() => {
                    setSelectedTime(slot);
                    setCustomTime('');
                  }}
                  className={`
                    text-xs py-2 px-3 rounded border transition-colors
                    ${selectedTime === slot
                      ? 'bg-blue-600 text-white border-blue-600'
                      : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                    }
                  `}
                >
                  {slot}
                </button>
              ))}
            </div>
          </div>

          <div>
            <p className="text-xs text-gray-500 mb-2">O selecciona una hora específica:</p>
            <input
              type="time"
              value={customTime}
              onChange={(e) => {
                setCustomTime(e.target.value);
                setSelectedTime('');
              }}
              className="w-full text-sm border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              min="07:00"
              max="18:00"
            />
          </div>
        </div>
      )}

      {selectedDate && (selectedTime || customTime) && (
        <div className="flex space-x-2">
          <button
            onClick={handleSchedule}
            className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 px-4 rounded-lg transition-colors flex items-center justify-center space-x-2"
          >
            <Calendar className="h-4 w-4" />
            <span>Programar Cita</span>
          </button>
          <button
            onClick={() => {
              setSelectedDate('');
              setSelectedTime('');
              setCustomTime('');
            }}
            className="px-3 py-2 text-gray-600 hover:text-gray-800 text-sm"
          >
            <XCircle className="h-4 w-4" />
          </button>
        </div>
      )}

      {showConfirmation && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                <Calendar className="h-5 w-5 text-blue-600" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900">Confirmar Cita</h3>
                <p className="text-sm text-gray-500">Revisa los detalles antes de programar</p>
              </div>
            </div>
            
            <div className="space-y-3 mb-6 text-sm">
              <div className="flex items-center space-x-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span>
                  {new Date(selectedDate).toLocaleDateString('es-CO', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span>{customTime || selectedTime}</span>
              </div>
              <div className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 text-gray-400 mt-0.5" />
                <span className="text-xs">Medellín, Antioquia</span>
              </div>
            </div>
            
            <div className="flex space-x-3">
              <button
                onClick={() => setShowConfirmation(false)}
                className="flex-1 border border-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancelar
              </button>
              <button
                onClick={confirmSchedule}
                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg transition-colors"
              >
                Confirmar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};