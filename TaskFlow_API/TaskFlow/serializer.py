from rest_framework import serializers
from django.contrib.auth.models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer


        
class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        # Llamamos al método original para obtener el usuario y el token
        data = super().validate(attrs) 
        data['groups'] = list(self.user.groups.values_list('name', flat=True))
        print(data)

        return data