# Importamos decoradores y utilidades de DRF (Django REST Framework)
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny  # Permisos (quién puede entrar a la vista)
from rest_framework.response import Response                   # Para responder en formato API (JSON)
from rest_framework import status                              # Códigos HTTP (200, 404, etc.)

# Traemos nuestro modelo y el serializador que convierte la instancia en datos (dict/JSON)
from ..models import Solicitud
from ..serializers.solicitud_detail_serializer import SolicitudDetailSerializer

# Esta vista acepta solo el método GET (leer datos)
@api_view(['GET'])

@permission_classes([IsAuthenticated])
def solicitud_detail(request, id):
    """
    Vista de detalle de una Solicitud.
    Recibe un 'id' por la URL, busca esa Solicitud en la base de datos,
    y devuelve sus datos en formato JSON usando un serializer.
    """
    try:
        # Buscamos 1 registro por clave primaria (pk = id). Si no existe, lanza Solicitud.DoesNotExist
        solicitud = Solicitud.objects.get(pk=id)
    except Solicitud.DoesNotExist:
        # Si no existe, respondemos 404 (no encontrado) con un pequeño mensaje
        return Response({'detail': 'No existe la solicitud'}, status=status.HTTP_404_NOT_FOUND)

    # Creamos el serializador pasándole la instancia encontrada (no es queryset, es un objeto)
    serializer = SolicitudDetailSerializer(solicitud)

    # serializer.data convierte la instancia en un dict (datos listos para JSON).
    # Response lo envuelve y DRF lo renderiza como JSON automáticamente.
    return Response(serializer.data)



