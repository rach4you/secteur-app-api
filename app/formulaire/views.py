from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Entreprise, Operateur

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