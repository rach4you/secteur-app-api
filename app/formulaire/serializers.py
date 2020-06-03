from rest_framework import serializers

from core.models import Entreprise, Operateur, Secteur, Devise


class EntrepriseSerializer(serializers.ModelSerializer):
    """Serializer for Entreprise object"""

    class Meta:
        model = Entreprise
        fields = ('id', 'raison_sociale')
        read_only_Fields = ('id',)

class OperateurSerializer(serializers.ModelSerializer):
    """Serializer for Operateur object"""

    class Meta:
        model = Operateur
        fields = ('id', 'operateur')
        read_only_Fields = ('id',)


class SecteurSerializer(serializers.ModelSerializer):
    """Serializer for Secteur object"""

    class Meta:
        model = Secteur
        fields = ('id', 'secteur')
        read_only_Fields = ('id',)


class DeviseSerializer(serializers.ModelSerializer):
    """Serializer for Devise object"""

    class Meta:
        model = Devise
        fields = ('id', 'devise')
        read_only_Fields = ('id',)