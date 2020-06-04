from rest_framework import serializers

from core.models import Entreprise, Operateur, Secteur, Devise, Filiere, CreditAlloue, Formulaire, Module


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

class FiliereSerializer(serializers.ModelSerializer):

    class Meta:
        model = Filiere
        fields = ("id", "filiere","secteur")
        read_only_Fields = ('id',)

class CreditAlloueSerializer(serializers.ModelSerializer):

    class Meta:
        model = CreditAlloue
        fields = ("id", "filiere","fe","fc")
        read_only_Fields = ('id',)

class DeviseSerializer(serializers.ModelSerializer):
    """Serializer for Devise object"""

    class Meta:
        model = Devise
        fields = ('id', 'devise')
        read_only_Fields = ('id',)


class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        #exclude = ("formulaire",)
        fields = ("module", "horaire","formulaire")

class FormulaireSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    class Meta:
        model = Formulaire
        fields = ('id', 'code', 'theme', 'lieu', 'date_depot', 'date_demarrage', 'date_achevement', 'montant', 'devise', 'competence', 'entreprise', 'operateur', 'secteur', 'filiere','modules')

class FormulaireDetailSerializer(FormulaireSerializer):

    modules = ModuleSerializer(many=True, read_only=True)