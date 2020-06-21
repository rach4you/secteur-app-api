from django.urls import path, include
from rest_framework.routers import DefaultRouter

from employe import views


router = DefaultRouter()
router.register('employes', views.EmployeViewSet)

app_name = 'employe'

urlpatterns = [
    path('', include(router.urls)),

]