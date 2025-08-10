# views/solicitudes.py
from django.db import transaction
from django.contrib.auth.models import User
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated,AllowAny
from rest_framework.response import Response
from rest_framework import status

from ..models import Solicitud, EstadoServicios

@api_view(['PATCH'])
@permission_classes([IsAuthenticated])  # recomendado
def asignarusuario(request, solicitud_id):
    id_tecnico = request.data.get('id_tecnico')
    if not id_tecnico:
        return Response({"detail": "id_tecnico es requerido."}, status=status.HTTP_400_BAD_REQUEST)

    # 1) Validar técnico activo y del grupo 'Tecnicos'
    try:
        tecnico = User.objects.get(pk=id_tecnico, is_active=True)
    except User.DoesNotExist:
        return Response({"detail": "Técnico no encontrado o inactivo."}, status=status.HTTP_404_NOT_FOUND)

    if not tecnico.groups.filter(name='Tecnicos').exists():
        return Response({"detail": "El usuario no pertenece al grupo 'Tecnicos'."}, status=status.HTTP_400_BAD_REQUEST)

    # 2) Transacción + bloqueo de fila
    try:
        with transaction.atomic():
            solicitud = (Solicitud.objects
                         .select_for_update()
                         .select_related('estado')
                         .only('id', 'estado_id', 'usuario_asociado_id')
                         .get(pk=solicitud_id))

            # Idempotente: ya está asignada al mismo técnico
            if solicitud.usuario_asociado_id == tecnico.id:
                return Response(status=status.HTTP_204_NO_CONTENT)

            # Estados no reasignables 
            estado_actual = (getattr(solicitud.estado, 'nombre', '') or '').lower()
            if estado_actual in ('cerrada', 'finalizada'):
                return Response(
                    {"detail": f"No se puede reasignar una solicitud en estado '{solicitud.estado.nombre}'."},
                    status=status.HTTP_409_CONFLICT
                )

            # Asignar nuevo técnico
            solicitud.usuario_asociado_id = tecnico.id
            update_fields = ['usuario_asociado']

            # Si estaba Abierta o Pendiente, mover a Asignada (si existe)
            if estado_actual in ('abierta', 'pendiente', 'en curso'):
                try:
                    estado_asignada = EstadoServicios.objects.get(nombre__iexact='Asignada')
                    solicitud.estado = estado_asignada
                    update_fields.append('estado')
                except EstadoServicios.DoesNotExist:
                    pass  # no romper si falta el estado

            solicitud.save(update_fields=update_fields)

    except Solicitud.DoesNotExist:
        return Response({"detail": "Solicitud no encontrada."}, status=status.HTTP_404_NOT_FOUND)

    return Response(status=status.HTTP_200_OK)
