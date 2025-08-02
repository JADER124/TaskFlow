from django.urls import path
from ..views.auth_views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from ..views.setClient import setclient


urlpatterns = [
    path('api/set/', setclient, name='setclient'),]

