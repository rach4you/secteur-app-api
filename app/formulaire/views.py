from rest_framework import viewsets, mixins
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated

from core.models import Entreprise

from formulaire import serializers


class EntrepriseViewSet(viewsets.GenericViewSet, mixins.ListModelMixin):
    """Manage tags in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Entreprise.objects.all()
    serializer_class = serializers.EntrepriseSerializer

    def get_queryset(self):
        queryset = Entreprise.objects.all().order_by("-raison_sociale")
        return queryset