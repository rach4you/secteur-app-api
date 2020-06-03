from django.urls import path, include
from rest_framework.routers import DefaultRouter

from formulaire import views


router = DefaultRouter()
router.register('entreprises', views.EntrepriseViewSet)

app_name = 'formulaire'

urlpatterns = [
    path('', include(router.urls))
]