from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Entreprise, Operateur, Secteur, Devise, Filiere, CreditAlloue, Formulaire

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

class FormulaireViewSet(viewsets.GenericViewSet,
                 mixins.ListModelMixin,
                 mixins.CreateModelMixin):
    """Manage Formulaire in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Formulaire.objects.all()
    serializer_class = serializers.FormulaireSerializer

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user).order_by('-code')

    def perform_create(self, serializer):
        """Create a new formulaire"""
        serializer.save(user=self.request.user)