from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Llamamos al método original para obtener el usuario y el token
        data = super().validate(attrs) 
        
        if not self.user.is_active:
            raise serializers.ValidationError("Este usuario está inactivo.")

        data['groups'] = list(self.user.groups.values_list('id', flat=True))

        return data