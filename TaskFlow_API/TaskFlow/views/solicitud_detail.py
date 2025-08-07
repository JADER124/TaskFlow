from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status
from ..models import Solicitud
from ..serializers.solicitud_detail_serializer import SolicitudDetailSerializer

@api_view(['GET'])
@permission_classes([AllowAny])
def solicitud_detail(request, id):
    try:
        solicitud = Solicitud.objects.get(pk=id)
    except Solicitud.DoesNotExist:
        return Response({'detail': 'No existe la solicitud'}, status=status.HTTP_404_NOT_FOUND)

    serializer = SolicitudDetailSerializer(solicitud)
    return Response(serializer.data)
