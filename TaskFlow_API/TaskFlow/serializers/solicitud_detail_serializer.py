# serializers/solicitud_detail_serializer.py
from rest_framework import serializers
from ..models import Solicitud

class SolicitudDetailSerializer(serializers.ModelSerializer):
    # Campos existentes
    cliente_nombre         = serializers.CharField(source='cliente.nombre', read_only=True)
    tipo_servicio_nombre   = serializers.CharField(source='tipo_servicio.nombre', read_only=True)
    estado_nombre          = serializers.CharField(source='estado.nombre', read_only=True)
    # Nuevo: nombre completo o username, o mensaje por defecto
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
            'usuario_asociado_nombre',
        ]

    def get_usuario_asociado_nombre(self, obj):
        """
        Si existe usuario_asociado → devuelve su nombre completo
        (first_name + last_name) o su username si no tiene nombre.
        Si es None → devuelve 'Sin asignar'.
        """
        user = obj.usuario_asociado
        if not user:
            return 'Sin asignar'
        full_name = user.get_full_name().strip()
        return full_name if full_name else user.username
