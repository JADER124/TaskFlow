from rest_framework import serializers
from ..models import Solicitud

class getsolicitudes_serializer(serializers.ModelSerializer):
    cliente_nombre = serializers.CharField(source='cliente.nombre', read_only=True)
    tipo_servicio_nombre = serializers.CharField(source='tipo_servicio.nombre', read_only=True)
    estado_nombre = serializers.CharField(source='estado.nombre', read_only=True)
    
    usuario_asociado_nombre = serializers.SerializerMethodField()

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
            'fecha_creacion',
            'usuario_asociado',
            'usuario_asociado_nombre'
        ]


    def get_usuario_asociado_nombre (self, obj):
        user = obj.usuario_asociado
        if not user:
            return 'Sin asignar'
        full = (user.get_full_name() or '').strip()
        return full or user.username