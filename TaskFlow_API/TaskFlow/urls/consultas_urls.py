from django.urls import path
from ..views.getsolicitudes import getsolicitudes 
from ..views.solicitud_detail import solicitud_detail

urlpatterns = [
    path('api/getallsolicitudes/', getsolicitudes, name='getsolicitudes'),
    path('api/getsolicitud/<int:id>/', solicitud_detail, name='solicitud-detail'),
]
