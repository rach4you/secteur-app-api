from rest_framework import serializers

from core.models import Entreprise, Operateur


class EntrepriseSerializer(serializers.ModelSerializer):
    """Serializer for tag object"""

    class Meta:
        model = Entreprise
        fields = ('id', 'raison_sociale')
        read_only_Fields = ('id',)

class OperateurSerializer(serializers.ModelSerializer):
    """Serializer for tag object"""

    class Meta:
        model = Operateur
        fields = ('id', 'operateur')
        read_only_Fields = ('id',)