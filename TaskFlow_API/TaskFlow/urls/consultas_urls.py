from django.urls import path
from ..views.getsolicitudes import getsolicitudes  

urlpatterns = [
    path('api/getallsolicitudes/', getsolicitudes, name='getsolicitudes'),
]
