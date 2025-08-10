from django.urls import path
from ..views.asignarusuario import asignarusuario

urlpatterns = [
    path('api/modificacion/asignar-usuario/<int:solicitud_id>/', asignarusuario),
]
