from django.contrib.auth import get_user_model
from rest_framework import serializers

# Obtiene el modelo de usuario que esté activo en el proyecto.
# Esto permite que funcione igual si usas el User por defecto o un Custom User.
User = get_user_model()

class listUserSerializer(serializers.ModelSerializer):
    """
    Serializador que convierte instancias del modelo User
    en un formato JSON con campos personalizados.
    """

    # Campo calculado (no existe directamente en la base de datos)
    # DRF llamará automáticamente al método get_nombre(self, obj)
    # para rellenar este valor en cada usuario.
    nombre = serializers.SerializerMethodField()

    class Meta:
        # Indica de qué modelo tomamos los datos
        model = User
        # Campos que queremos incluir en la respuesta JSON
        fields = ['id', 'username', 'nombre', 'email']

    def get_nombre(self, obj):
        """
        Retorna el nombre completo del usuario (first_name + last_name).
        Si no tiene nombre completo, se usa el username.
        - obj: es la instancia del modelo User que se está serializando.
        """
        # get_full_name() devuelve "FirstName LastName" o cadena vacía si no hay.
        full = (obj.get_full_name() or '').strip()

        # Si existe nombre completo, lo retornamos;
        # si no, retornamos el username.
        return full or obj.username

