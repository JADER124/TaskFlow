from django.urls import path
from ..views.getsolicitudes import getsolicitudes 
from ..views.solicitud_detail import solicitud_detail
from ..views.list_user import list_user

urlpatterns = [
    path('api/getallsolicitudes/', getsolicitudes, name='getsolicitudes'),
    path('api/getsolicitud/<int:id>/', solicitud_detail, name='solicitud-detail'),
    path('api/usuarios/tecnicos/', list_user, name='list_user'),
]
