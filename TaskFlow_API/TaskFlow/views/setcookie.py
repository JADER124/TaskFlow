from django.http import JsonResponse
from django.contrib.auth import get_user_model
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework_simplejwt.tokens import AccessToken
from rest_framework_simplejwt.exceptions import TokenError
from django.conf import settings


User = get_user_model()

@api_view(['POST'])
@permission_classes([AllowAny])
def setcookie(request):
    access = request.data.get('access')
    refresh = request.data.get('refresh')

    if not access or not refresh:
        return JsonResponse({'error': 'No se encontró un token en la solicitud.'}, status=400)
    
    try:
        response = JsonResponse({'mensaje': 'Las cookies fueron creadas exitosamente.'}, status=200)
        
        
        # Solo lo necesario: en prod (DEBUG=False) => cross-site requiere SameSite=None y Secure=True
        secure = not settings.DEBUG
        same_site = 'None' if secure else 'Lax'


        response.set_cookie(
            key='access_token',
            value=access,
            httponly=True,
            secure=secure,  # Cambia a True si usas HTTPS
            samesite=same_site
        )
        response.set_cookie(
            key='refresh_token',
            value=refresh,
            httponly=True,
            secure=secure,
            samesite=same_site
        )

        return response

    except Exception as e:
        return JsonResponse({'error': f'Error al establecer las cookies: {str(e)}'}, status=500)


@api_view(['GET'])
@permission_classes([AllowAny])
def verify_cookie(request):
    access_token = request.COOKIES.get('access_token')

    if not access_token:
        return JsonResponse({'error': 'No se encontró la cookie access_token.'}, status=401)
    try:
        # Verificar y decodificar el token
        token = AccessToken(access_token)
        user_id = token['user_id']
        user = User.objects.get(pk=user_id, is_active=True)
        groups = list(user.groups.values_list('name', flat=True))
        return JsonResponse({'mensaje': 'Token válido', 'user_id': user_id, 'groups' : groups}, status=200)

    except TokenError as e:
        return JsonResponse({'error': f'Token inválido o expirado: {str(e)}'}, status=401)
