from rest_framework import serializers
from ..models import Solicitud

class getsolicitudes_serializer(serializers.ModelSerializer):
    cliente_nombre = serializers.CharField(source='cliente.nombre', read_only=True)
    tipo_servicio_nombre = serializers.CharField(source='tipo_servicio.nombre', read_only=True)
    estado_nombre = serializers.CharField(source='estado.nombre', read_only=True)

    class Meta:
        model = Solicitud
        fields = [
            'id',
            'cliente',
            'cliente_nombre',
            'tipo_servicio',
            'tipo_servicio_nombre',
            'estado',
            'estado_nombre',
            'descripcion',
            'fecha_creacion'
        ]
