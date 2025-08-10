from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from ..serializers.list_user_serializer import listUserSerializer

# Obtiene el modelo de usuario activo en el proyecto (soporta Custom User)
User = get_user_model()

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # Solo usuarios autenticados pueden consultar la lista
def list_user(request):
    """
    Devuelve todos los usuarios activos que pertenecen al grupo 'Tecnicos'.

    Método: GET
    Seguridad: Requiere autenticación (IsAuthenticated)
    Respuesta: Lista de usuarios serializados (id, username, nombre, email)
    """

    # 1) Armamos el queryset:
    #    - is_active=True: solo usuarios activos
    #    - groups__name='Tecnicos': usuarios que pertenezcan al grupo (relación ManyToMany)
    #    - distinct(): evita usuarios duplicados por los JOINs de ManyToMany
    usuarios = (
        User.objects
        .filter(is_active=True, groups__name='Tecnicos')
        .distinct()
    )

    # 2) Serializamos la colección (many=True porque es una lista / queryset)
    serializer = listUserSerializer(usuarios, many=True)

    # 3) Devolvemos la respuesta. DRF la renderiza como JSON automáticamente.
    return Response(serializer.data)
