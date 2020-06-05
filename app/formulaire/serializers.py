from rest_framework import serializers

from core.models import Entreprise, Operateur, Secteur, Devise, Filiere, CreditAlloue, Formulaire, Module, Beneficiaire, BeneficiaireFormulaire


class EntrepriseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Entreprise
        fields = "__all__"


class CreditAlloueSerializer(serializers.ModelSerializer):

    class Meta:
        model = CreditAlloue
        fields = ("fe", "fc")

class FiliereSerializer(serializers.ModelSerializer):
    credit_alloue = CreditAlloueSerializer(many=True, read_only=True)
    class Meta:
        model = Filiere
        fields = ("id", "filiere","credit_alloue")

class SecteurSerializer(serializers.ModelSerializer):
    filieres = FiliereSerializer(many=True, read_only=True)

    class Meta:
        model = Secteur
        fields = "__all__"
        read_only_Fields = ('id',)



class OperateurSerializer(serializers.ModelSerializer):
    class Meta:
        model = Operateur
        fields = "__all__"
        read_only_Fields = ('id',)

class DeviseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Devise
        fields = "__all__"
        read_only_Fields = ('id',)



class ModuleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Module
        exclude = ("formulaire",)
        #fields = ("module", "horaire","formulaire")

class FormulaireSerializer(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    class Meta:
        model = Formulaire
        fields = ('id', 'code', 'theme', 'lieu', 'date_depot', 'date_demarrage', 'date_achevement', 'montant', 'devise', 'competence', 'entreprise', 'operateur', 'secteur', 'filiere','modules')

class FormulaireDetailSerializer(FormulaireSerializer):

    modules = ModuleSerializer(many=True, read_only=True)



class AllFormulairesDetail(serializers.ModelSerializer):
    modules = ModuleSerializer(many=True, read_only=True)
    filiere = FiliereSerializer(read_only=True)
    secteur = SecteurSerializer(read_only=True)
    class Meta:
        model = Formulaire
        fields = "__all__"
        depth = 1


class BeneficiaireSerializer(serializers.ModelSerializer):

    class Meta:
        model = Beneficiaire
        fields = ('id', 'cin', 'nom', 'prenom', 'tel', 'email', 'cnss', 'ancien')

class BeneficiaireFormulaireSerializer(serializers.ModelSerializer):
    """Serialize a BeneficiaireFormulaire"""


    class Meta:
        model = BeneficiaireFormulaire
        fields = (
            'id', 'diplome', 'profil_bareme', 'type', 'contrat', 'beneficier', 'non_conforme', 'engagement', 'consommation', 'date_dembauche', 'beneficiaire', 'formulaire'
        )
        read_only_fields = ('id',)