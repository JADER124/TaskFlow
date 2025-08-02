from django.urls import path
from ..views.auth_views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from ..views.setClient import setclient,createrequest


urlpatterns = [
    path('api/set/', setclient, name='setclient'),
    path('api/set/createrequest', createrequest, name='createrequest') 
]

