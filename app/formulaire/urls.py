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
router.register('beneficiaires', views.BeneficiaireViewSet)
router.register('beneficiaire_formulaires', views.BeneficiaireFormulaireViewSet)
router.register('factures', views.FactureViewSet)
app_name = 'formulaire'

urlpatterns = [
    path('', include(router.urls)),
    path("<int:formulaire_pk>/module/", views.ModuleCreateAPIView.as_view(), name="module-add"),
    path("<int:formulaire_pk>/modules/", views.ModuleListAPIView.as_view(), name="module-add"),
    path("<int:formulaire_pk>/facture/", views.FactureCreateAPIView.as_view(), name="facture-add"),
    path("<int:formulaire_pk>/engager/", views.BeneficiaireFormulaireCreateAPIView.as_view(), name="engager-add"),
    path("all", views.AllFormulairesListAPIView.as_view(), name="formulaires-list"),
    path("<int:formulaire_pk>/beneficiaires/", views.AllBeneficiaireFormulaireAPIView.as_view(), name="beneficiaires-list"),
    path("count/", views.CountBeneficiaireViewSet.as_view(), name="count"),
    path("all/beneficiaires", views.AllBeneficiairesListAPIView.as_view(), name="beneficiaires-list"),
    path("dernier_formulaire/", views.DernierFormulairesDetailAPIView.as_view(), name="dernier_formulaire-list"),
    path("user_formulaires/", views.AllFormulairesUserListAPIView.as_view(), name="user_formulaires-list"),
    path("facture_payer/", views.AllFormulairesPayerListAPIView.as_view(), name="facture_payer-list"),
    path("user_beneficiaires/", views.AllBeneficiairesUserListAPIView.as_view(), name="user_beneficiaires-list"),
    path("<int:filiere_pk>/profil_bareme/", views.DiplomeFiliereViewSet.as_view(), name="profil_bareme-list"),
]