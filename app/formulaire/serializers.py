from rest_framework import serializers

from core.models import Entreprise


class EntrepriseSerializer(serializers.ModelSerializer):
    """Serializer for tag object"""

    class Meta:
        model = Entreprise
        fields = ('id', 'raison_sociale')
        read_only_Fields = ('id',)