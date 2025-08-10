from django.urls import path
from ..views.auth_views import CustomTokenObtainPairView
from rest_framework_simplejwt.views import TokenRefreshView
from ..views.setcookie import setcookie,verify_cookie

urlpatterns = [
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('api/token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('api/token/setcookie/',setcookie,name='setcookie'),
    path('api/token/verifycookie/',verify_cookie,name='verify_cookie')
]