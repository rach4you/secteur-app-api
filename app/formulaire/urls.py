from django.urls import path, include
from rest_framework.routers import DefaultRouter

from formulaire import views


router = DefaultRouter()
router.register('entreprises', views.EntrepriseViewSet)
router.register('operateurs', views.OperateurViewSet)
router.register('secteurs', views.SecteurViewSet)
router.register('devises', views.DeviseViewSet)
router.register('filieres', views.FiliereViewSet)
router.register('credit_alloues', views.CreditAlloueViewSet)

app_name = 'formulaire'

urlpatterns = [
    path('', include(router.urls))
]