from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from django.http import JsonResponse

@api_view(['POST'])
@permission_classes([AllowAny])
def setcookie(request):
    access = request.data.get('access')
    refresh = request.data.get('refresh')

    if not access or not refresh:
        return Response({'error': 'No se encontró un token en la solicitud.'}, status=400)
    
    try:
        response = JsonResponse({'mensaje': 'Las cookies fueron creadas exitosamente.'}, status=200)

        response.set_cookie(
            key='access_token',
            value=access,
            httponly=True,
            secure=False,  # Cambia a True si usas HTTPS
            samesite='Lax'
        )
        response.set_cookie(
            key='refresh_token',
            value=refresh,
            httponly=True,
            secure=False,
            samesite='Lax'
        )

        return response

    except Exception as e:
        return JsonResponse({'error': f'Error al establecer las cookies: {str(e)}'}, status=500)
