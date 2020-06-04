from django.urls import path, include
from rest_framework.routers import DefaultRouter

from formulaire import views


router = DefaultRouter()
router.register('formulaires', views.FormulaireViewSet)
router.register('entreprises', views.EntrepriseViewSet)
router.register('operateurs', views.OperateurViewSet)
router.register('secteurs', views.SecteurViewSet)
router.register('filieres', views.FiliereViewSet)
router.register('credit_alloues', views.CreditAlloueViewSet)
router.register('devises', views.DeviseViewSet)
router.register('modules', views.ModuleViewSet)

app_name = 'formulaire'

urlpatterns = [
    path('', include(router.urls))
]