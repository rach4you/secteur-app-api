from rest_framework import viewsets, mixins, generics
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404

from core.models import Entreprise, Operateur, Secteur, Devise, Filiere, CreditAlloue, Formulaire, Module, Beneficiaire

from formulaire import serializers


class EntrepriseViewSet(viewsets.GenericViewSet,
                 mixins.ListModelMixin,
                 mixins.CreateModelMixin):
    """Manage Entreprises in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Entreprise.objects.all()
    serializer_class = serializers.EntrepriseSerializer

    def get_queryset(self):
        queryset = Entreprise.objects.all().order_by("-raison_sociale")
        return queryset

    def perform_create(self, serializer):
        """Create a new Entreprise"""
        serializer.save()


class OperateurViewSet(viewsets.GenericViewSet,
                 mixins.ListModelMixin,
                 mixins.CreateModelMixin):
    """Manage operateurs in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Operateur.objects.all()
    serializer_class = serializers.OperateurSerializer

    def get_queryset(self):
        queryset = Operateur.objects.all().order_by("-operateur")
        return queryset

    def perform_create(self, serializer):
        """Create a new operateur"""
        serializer.save()


class SecteurViewSet(viewsets.GenericViewSet,
                 mixins.ListModelMixin,
                 mixins.CreateModelMixin):
    """Manage Secteurs in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Secteur.objects.all()
    serializer_class = serializers.SecteurSerializer

    def get_queryset(self):
        queryset = Secteur.objects.all().order_by("-secteur")
        return queryset

    def perform_create(self, serializer):
        """Create a new Secteur"""
        serializer.save()


class DeviseViewSet(viewsets.GenericViewSet,
                 mixins.ListModelMixin,
                 mixins.CreateModelMixin):
    """Manage Devise in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Devise.objects.all()
    serializer_class = serializers.DeviseSerializer

    def get_queryset(self):
        queryset = Devise.objects.all().order_by("-devise")
        return queryset

    def perform_create(self, serializer):
        """Create a new Devise"""
        serializer.save()

class FiliereViewSet(viewsets.GenericViewSet,
                 mixins.ListModelMixin,
                 mixins.CreateModelMixin):
    """Manage Filiere in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Filiere.objects.all()
    serializer_class = serializers.FiliereSerializer

    def get_queryset(self):
        queryset = Filiere.objects.all().order_by("-id")
        return queryset

    def perform_create(self, serializer):
        """Create a new Filiere"""
        serializer.save()


class CreditAlloueViewSet(viewsets.GenericViewSet,
                 mixins.ListModelMixin,
                 mixins.CreateModelMixin):
    """Manage Filiere in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = CreditAlloue.objects.all()
    serializer_class = serializers.CreditAlloueSerializer

    def get_queryset(self):
        queryset = CreditAlloue.objects.all().order_by("-id")
        return queryset

    def perform_create(self, serializer):
        """Create a new Filiere"""
        serializer.save()



class FormulaireViewSet(viewsets.ModelViewSet):
    """Manage Formulaire in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Formulaire.objects.all()
    serializer_class = serializers.FormulaireSerializer

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-code')

    def get_serializer_class(self):
        """Return appropriate serializer class"""
        if self.action == 'retrieve':
            return serializers.FormulaireDetailSerializer

        return self.serializer_class

    def perform_create(self, serializer):
        """Create a new formulaire"""
        serializer.save(user=self.request.user)


class ModuleViewSet(viewsets.ModelViewSet):
    """Manage Formulaire in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Module.objects.all()
    serializer_class = serializers.ModuleSerializer

    def get_queryset(self):
        queryset = Module.objects.all().order_by("-id")
        return queryset

class ModuleCreateAPIView(generics.CreateAPIView):
    queryset = Module.objects.all()
    serializer_class = serializers.ModuleSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        formulaire_pk = self.kwargs.get("formulaire_pk")
        formulaire = get_object_or_404(Formulaire, pk=formulaire_pk)

        serializer.save(formulaire=formulaire)


class AllFormulairesListAPIView(generics.ListAPIView):
    queryset = Formulaire.objects.all().order_by("id")
    serializer_class = serializers.AllFormulairesDetail
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)


class BeneficiaireViewSet(viewsets.ModelViewSet):
    """Manage Beneficiaire in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Beneficiaire.objects.all()
    serializer_class = serializers.BeneficiaireSerializer

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        queryset = Beneficiaire.objects.all().order_by("-cin")
        return queryset
