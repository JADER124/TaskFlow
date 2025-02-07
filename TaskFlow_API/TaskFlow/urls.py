from django.contrib import admin
from django.urls import path,include
from rest_framework import routers
from .views import UserView,CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView

router = routers.DefaultRouter()
router.register(r'users',UserView,'user')
urlpatterns = [
    path('Api_User/',include(router.urls)),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
]