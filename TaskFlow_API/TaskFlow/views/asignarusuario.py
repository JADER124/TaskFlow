# views/solicitudes.py
from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status

from ..models import Solicitud, EstadoServicios

@api_view(['PATCH'])
@permission_classes([AllowAny])
def asignarusuario(request, solicitud_id):
    id_tecnico = request.data.get('id_tecnico')
    if not id_tecnico:
        return Response({"detail": "id_tecnico es requerido."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        tecnico = User.objects.get(pk=id_tecnico, is_active=True)
    except User.DoesNotExist:
        return Response({"detail": "Técnico no encontrado o inactivo."}, status=status.HTTP_404_NOT_FOUND)

    # (Opcional) validar grupo
    if not tecnico.groups.filter(name='Tecnicos').exists():
        return Response({"detail": "El usuario no pertenece al grupo 'Tecnicos'."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        with transaction.atomic():
            # usamos el id de la URL para traer la solicitud específica y bloquearla
            solicitud = (Solicitud.objects
                         .select_for_update()
                         .only('id', 'estado_id', 'usuario_asociado_id')  # optimiza lectura
                         .get(pk=solicitud_id))

            # Si ya está asignado al mismo técnico, no hacemos nada (idempotente)
            if solicitud.usuario_asociado_id == tecnico.id:
                return Response(status=status.HTTP_204_NO_CONTENT)

            # Actualizar asignación
            solicitud.usuario_asociado_id = tecnico.id

            # (Opcional) mover a "Asignada" si está "Abierta" o "Pendiente"
            try:
                estado_asignada = EstadoServicios.objects.get(nombre__iexact='Asignada')
                # si no tienes normalizado el estado, puedes comparar por ID si lo conoces
                if getattr(solicitud.estado, 'nombre', '').lower() in ('abierta', 'pendiente'):
                    solicitud.estado = estado_asignada
                    solicitud.save(update_fields=['usuario_asociado', 'estado'])
                else:
                    solicitud.save(update_fields=['usuario_asociado'])
            except EstadoServicios.DoesNotExist:
                solicitud.save(update_fields=['usuario_asociado'])

    except Solicitud.DoesNotExist:
        return Response({"detail": "Solicitud no encontrada."}, status=status.HTTP_404_NOT_FOUND)

    # Éxito sin cuerpo
    return Response(status=status.HTTP_200_OK)
