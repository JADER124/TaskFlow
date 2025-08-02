# Importaciones necesarias para definir vistas API y trabajar con permisos y respuestas
from rest_framework.decorators import api_view, permission_classes  # Decoradores para vistas basadas en funciones
from rest_framework_simplejwt.tokens import AccessToken, TokenError  # (No se usan aquí, pero quedan importados por si se usan luego)
from rest_framework.permissions import AllowAny  # Permite acceso sin autenticación
from rest_framework.response import Response  # Para retornar respuestas estándar de DRF
from django.http import JsonResponse  # Para retornar respuestas JSON nativas de Django
from ..models import Cliente  # Se importa el modelo Cliente desde la carpeta superior (carpeta padre)

# Vista API para registrar un nuevo cliente
@api_view(['POST'])  # Esta vista solo acepta solicitudes HTTP de tipo POST
@permission_classes([AllowAny])  # No requiere autenticación; cualquier usuario puede acceder
def setclient(request):
    # Se extraen los campos enviados en el cuerpo del request (generalmente en formato JSON)
    nit = request.data.get('nit')
    telefono = request.data.get('telefono')
    nombreComercial = request.data.get('nombreComercial')
    correo = request.data.get('correo')
    direccion = request.data.get('direccion')

    # Se valida que el campo obligatorio 'nit' no esté vacío
    if not nit:
        return Response({'error': 'El NIT es requerido.'}, status=400)  # Si falta el NIT, se retorna un error 400

    try:
        # Se imprime por consola el contenido del request para fines de depuración (solo visible en el backend)
        print("Datos recibidos:", request.data)

        # Se crea un nuevo objeto Cliente en la base de datos usando los valores recibidos
        Cliente.objects.create(
            nit=nit,
            telefono=telefono,
            nombre=nombreComercial,
            correo=correo,
            direccion=direccion
        )

        # Se retorna una respuesta exitosa con los datos enviados como confirmación
        return JsonResponse({
            'mensaje': 'El cliente fue creado exitosamente.',
            'data': {
                'nit': nit,
                'telefono': telefono,
                'nombreComercial': nombreComercial,
                'correo': correo,
                'direccion': direccion
            }
        }, status=200)

    except Exception as e:
        # Si ocurre un error inesperado (por ejemplo, fallo en la base de datos), se captura y se informa con código 500
        return JsonResponse({'error': f'Error al procesar la solicitud: {str(e)}'}, status=500)
