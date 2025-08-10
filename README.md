# Proyecto Full Stack con Django en el backend y React + Vite en el frontend.

---

## Tecnologías

- Backend: Django 5.1.5
- Frontend: React 18 + Vite
- Comunicación: REST API - DRF-djangorestframework
- Autenticación: (JWT, token)

---

## Requisitos Previos

Asegúrate de tener instalado:

- Python 3.13.1+
- Node.js 20+
- npm
- Git

---

## 📁 Estructura del Proyecto

taskflow/
├── TaskFlow_API/ -> Backend (Django)
└── TaskFlow_Client/ -> Frontend (React + Vite)

---

## Instalación y Ejecución Local

1. Clonar el repositorio: https://github.com/JADER124/TaskFlow.git
   cd taskflow

entrar al directorio:

cd TaskFlow_API

2. Crear y activar entorno virtual:

   python -m venv venv

   - En Windows:
     venv\Scripts\activate

   - En macOS/Linux:
     source venv/bin/activate

3. Instalar dependencias:

   pip install -r requirements.txt

4. Aplicar migraciones:

   python manage.py migrate

5. Ejecutar el servidor:

   python manage.py runserver

   El backend estará disponible en: http://127.0.0.1:8000/

---

## Frontend – React + Vite (TaskFlow_Client)

1. Entrar al directorio desde otra Bash:

   cd ../TaskFlow_Client

2. Instalar dependencias:

   npm install

3. Ejecutar la app en modo desarrollo:

   npm run dev

   El frontend estará disponible en: http://localhost:5173/

---

## Autor y Créditos

Desarrollado por el equipo de TaskFlow.
