from rest_framework import serializers

from core.models import Entreprise, Operateur, Secteur, Devise, Filiere, CreditAlloue, Formulaire, Module, Beneficiaire, BeneficiaireFormulaire, Facture, User, DiplomeFiliere


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






class BeneficiaireSerializer(serializers.ModelSerializer):

    class Meta:
        model = Beneficiaire
        fields = ('id', 'cin', 'nom', 'prenom', 'tel', 'email', 'cnss','ancien')

class BeneficiaireFormulaireSerializer(serializers.ModelSerializer):
    """Serialize a BeneficiaireFormulaire"""

    #formulaire = FormulaireSerializer(read_only=True)

    class Meta:
        model = BeneficiaireFormulaire
        fields = (
            'id', 'diplome', 'profil_bareme', 'type', 'contrat', 'beneficier', 'non_conforme', 'engagement', 'consommation', 'date_dembauche', 'beneficiaire', 'formulaire'
        )
        read_only_fields = ('id',)

class AllBeneficiaireFormulaireDetail(serializers.ModelSerializer):

    beneficiaire = BeneficiaireSerializer(read_only=True)
    class Meta:
        model = BeneficiaireFormulaire
        fields = "__all__"

class FactureSerializer(serializers.ModelSerializer):


    class Meta:
        model = Facture
       # exclude = ("formulaire",)
        fields = ('id', 'num_facture', 'date_creation', 'mttc', 'taux', 'montant_dh', 'commentaire', 'formulaire','date_facture')






"""All Details for Formulaires"""

class SecteurDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Secteur
        fields = ('id', 'secteur')


class FactureDetailSerializer(serializers.ModelSerializer):

    class Meta:
        model = Facture
        fields = ('id', 'num_facture', 'date_creation', 'mttc', 'taux', 'montant_dh', 'commentaire','date_facture')


class AllBeneficiaireFormulaireSerializer(serializers.ModelSerializer):
    beneficiaire = BeneficiaireSerializer(read_only=True)
    class Meta:
        model = BeneficiaireFormulaire
        fields = ('id', 'beneficiaire', 'diplome', 'profil_bareme', 'type', 'contrat', 'beneficier', 'non_conforme', 'engagement', 'consommation','date_dembauche')


class AllFormulairesDetailSerializer(serializers.ModelSerializer):
    filiere = FiliereSerializer(read_only=True)
    secteur = SecteurDetailSerializer(read_only=True)
    entreprise = EntrepriseSerializer(read_only=True)
    operateur = OperateurSerializer(read_only=True)
    devise = DeviseSerializer(read_only=True)
    facture = FactureDetailSerializer(many=True, read_only=True)
    modules = ModuleSerializer(many=True, read_only=True)
    beneficiaires = AllBeneficiaireFormulaireSerializer(many=True, read_only=True)

    class Meta:
        model = Formulaire
        fields = (
        'id', 'code', 'theme', 'lieu', 'date_depot', 'date_demarrage', 'date_achevement', 'date_creation', 'montant', 'competence', 'entreprise','operateur',
        'secteur', 'filiere', 'devise', 'facture',
        'modules', 'beneficiaires')



"""
class AllFormulairesDetail(serializers.ModelSerializer):

    filiere = serializers.StringRelatedField(read_only=True)
    secteur = serializers.StringRelatedField(read_only=True)
    entreprise = serializers.StringRelatedField(read_only=True)
    devise = serializers.StringRelatedField(read_only=True)
    engager = serializers.SerializerMethodField()
    facture = FactureDetailSerializer(many=True, read_only=True)
    beneficier = serializers.SerializerMethodField()
    montant_payer = serializers.SerializerMethodField()
    modules = ModuleSerializer(many=True, read_only=True)
    beneficiaires = AllBeneficiaireFormulaireSerializer(many=True, read_only=True)
    class Meta:
        model = Formulaire
        fields = ('id', 'code','theme','lieu','date_depot','date_demarrage','date_achevement','competence', 'entreprise', 'secteur', 'filiere', 'date_creation','montant', 'montant_payer', 'devise', 'engager','beneficier', 'facture','modules', 'beneficiaires')

    def get_engager(self, obj):
        return BeneficiaireFormulaire.objects.all().filter(formulaire_id=obj.id).count()

    def get_beneficier(self, obj):
        return BeneficiaireFormulaire.objects.all().filter(formulaire_id=obj.id, beneficier=True).count()

    def get_montant_payer(self, obj):
        montant = 0
        beneficiaires = BeneficiaireFormulaire.objects.all().filter(formulaire_id=obj.id, beneficier=True)

        for beneficiaire in beneficiaires:
            montant += beneficiaire.consommation

        return montant
"""


"""All Details for Formulaires"""
class DetailFormulaireBeneficiaireSerializer(serializers.ModelSerializer):
    filiere = FiliereSerializer(read_only=True)
    secteur = SecteurDetailSerializer(read_only=True)
    entreprise = EntrepriseSerializer(read_only=True)
    operateur = OperateurSerializer(read_only=True)
    devise = DeviseSerializer(read_only=True)
    facture = FactureDetailSerializer(many=True, read_only=True)
    modules = ModuleSerializer(many=True, read_only=True)

    class Meta:
        model = Formulaire
        fields = (
            'id', 'code', 'theme', 'lieu', 'date_depot', 'date_demarrage', 'date_achevement', 'date_creation',
            'montant', 'competence', 'entreprise', 'operateur',
            'secteur', 'filiere', 'devise', 'facture',
            'modules')


class AllFormulairesBeneficiaireSerializer(serializers.ModelSerializer):
    formulaire = DetailFormulaireBeneficiaireSerializer(read_only=True)
    class Meta:
        model = BeneficiaireFormulaire
        fields = ('id','diplome','profil_bareme','type','contrat','beneficier','non_conforme','engagement','consommation','date_dembauche','formulaire')



class AllBeneficiairesDetailSerializer(serializers.ModelSerializer):

    formulaires = AllFormulairesBeneficiaireSerializer(many=True, read_only=True)

    class Meta:
        model = Beneficiaire
        fields = (
            'id', 'cin', 'nom', 'prenom', 'tel', 'email', 'cnss', 'ancien', 'date_creation', 'formulaires'
            )


class DernierFormulairesDetail(serializers.ModelSerializer):

    modules = ModuleSerializer(many=True, read_only=True)
    engager = serializers.SerializerMethodField()

    class Meta:
        model = Formulaire
        fields = (
        'id', 'code', 'theme', 'lieu', 'date_depot', 'date_demarrage', 'date_achevement', 'competence', 'entreprise', 'operateur',
        'secteur', 'filiere', 'date_creation', 'montant', 'devise', 'modules', 'engager')
        depth = 1

    def get_engager(self, obj):
        return BeneficiaireFormulaire.objects.all().filter(formulaire_id=obj.id).count()




class DiplomeFiliereSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiplomeFiliere
        fields = ("id", "diplome","filiere")
