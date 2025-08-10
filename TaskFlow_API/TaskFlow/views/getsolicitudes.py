from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny,IsAuthenticated
from rest_framework.response import Response
from ..models import Solicitud
from ..serializers.getsolicitudes_serializer import getsolicitudes_serializer

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getsolicitudes(request):
    solicitudes = Solicitud.objects.all().order_by('-fecha_creacion')
    serializer = getsolicitudes_serializer(solicitudes, many=True)
    return Response(serializer.data)
