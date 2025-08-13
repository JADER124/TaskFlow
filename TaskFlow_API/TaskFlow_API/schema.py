# TaskFlow_API/schema.py
from drf_spectacular.extensions import OpenApiAuthenticationExtension
from drf_spectacular.openapi import AutoSchema
from drf_spectacular.views import SpectacularAPIView
from drf_spectacular.utils import extend_schema
from drf_spectacular.types import OpenApiTypes
from drf_spectacular.plumbing import build_root_object
from drf_spectacular import openapi

# Esto define la información principal de la API
api_info = openapi.Info(
    title="TaskFlow API",
    version="1.0.0",
    description=(
        "API para la gestión de tareas y flujos de trabajo en TaskFlow.\n\n"
        "Permite autenticación con JWT, creación, modificación y consulta de clientes, "
        "así como manejo de solicitudes y modificaciones."
    ),
    terms_of_service="https://taskflow.com/terminos",
    contact=openapi.Contact(email="soporte@taskflow.com"),
    license=openapi.License(name="MIT License"),
)
