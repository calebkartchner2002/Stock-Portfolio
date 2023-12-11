from django.urls import path
from . import views

urlpatterns = [
    path('', view=views.index, name="index"),
    path('me/', view=views.me, name="current user"),
    path('makeTrade/', view=views.makeTrade, name='make Trade'),
    path('removeTrade/', view=views.removeTrade, name="remove Trade"),
]