
from rest_framework import viewsets, mixins, generics
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import get_object_or_404
from rest_framework.response import Response
from core.models import Entreprise, Operateur, Secteur, Devise, Filiere, CreditAlloue, Formulaire, Module, Beneficiaire, BeneficiaireFormulaire, Facture, DiplomeFiliere

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
        queryset = Entreprise.objects.all().order_by("id")
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
        queryset = Operateur.objects.all().order_by("id")
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
        queryset = Secteur.objects.all().order_by("id")
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
        queryset = Devise.objects.all().order_by("id")
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
        queryset = Filiere.objects.all().order_by("id")
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
        queryset = CreditAlloue.objects.all().order_by("id")
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
        return self.queryset.filter(user=self.request.user).order_by('-id')

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
        queryset = Module.objects.all().order_by("id")
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

class ModuleListAPIView(generics.ListAPIView):
    queryset = Module.objects.all()

    serializer_class = serializers.ModuleSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        formulaire_pk = self.kwargs.get("formulaire_pk")
        formulaire = get_object_or_404(Formulaire, pk=formulaire_pk)

        return self.queryset.filter(formulaire=formulaire).order_by('id')


class AllFormulairesListAPIView(generics.ListAPIView):
    queryset = Formulaire.objects.all().order_by("-id")

    serializer_class = serializers.AllFormulairesDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""

        return self.queryset.all()



class BeneficiaireViewSet(viewsets.ModelViewSet):
    """Manage Beneficiaire in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Beneficiaire.objects.all()
    serializer_class = serializers.BeneficiaireSerializer

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        queryset = Beneficiaire.objects.all().order_by("cin")
        return queryset

    def perform_create(self, serializer):
        """Create a new formulaire"""
        serializer.save(user=self.request.user)


class BeneficiaireFormulaireViewSet(viewsets.ModelViewSet):
    """Manage BeneficiaireFormulaire in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = BeneficiaireFormulaire.objects.all()
    serializer_class = serializers.BeneficiaireFormulaireSerializer

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        queryset = BeneficiaireFormulaire.objects.all().order_by("id")
        return queryset

class BeneficiaireFormulaireCreateAPIView(generics.CreateAPIView):
    queryset = BeneficiaireFormulaire.objects.all()
    serializer_class = serializers.BeneficiaireFormulaireSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        formulaire_pk = self.kwargs.get("formulaire_pk")
        formulaire = get_object_or_404(Formulaire, pk=formulaire_pk)

        serializer.save(formulaire=formulaire)




class FactureViewSet(viewsets.ModelViewSet):
    """Manage BeneficiaireFormulaire in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Facture.objects.all()
    serializer_class = serializers.FactureSerializer

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        queryset = Facture.objects.all().order_by("-id")
        return queryset
    def perform_create(self, serializer):
        """Create a new formulaire"""
        serializer.save(user=self.request.user)

class FactureCreateAPIView(generics.CreateAPIView):
    queryset = Facture.objects.all()
    serializer_class = serializers.FactureSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def perform_create(self, serializer):
        formulaire_pk = self.kwargs.get("formulaire_pk")
        formulaire = get_object_or_404(Formulaire, pk=formulaire_pk)

        serializer.save(formulaire=formulaire)


class AllBeneficiaireFormulaireAPIView(generics.ListAPIView):

    queryset = BeneficiaireFormulaire.objects.all().order_by("id")
    serializer_class = serializers.AllBeneficiaireFormulaireDetail
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        formulaire_pk = self.kwargs.get("formulaire_pk")
        formulaire = get_object_or_404(Formulaire, pk=formulaire_pk)

        return self.queryset.filter(formulaire=formulaire).order_by('-id')






class AllBeneficiairesListAPIView(generics.ListAPIView):
    queryset = Beneficiaire.objects.all().order_by("cin")

    serializer_class = serializers.AllBeneficiairesDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""

        return self.queryset.all()


class CountBeneficiaireViewSet(APIView):
    """Test API ViewSet"""
    queryset = Beneficiaire.objects.all()
    queryset_formulaire = Formulaire.objects.all()
    queryset_facture = Facture.objects.all()
    #serializer_class = serializers.AllBeneficiaireFormulaireDetail
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get(self, request):
        """Return a count beneficiaires."""

        count_beneficiaire = self.queryset.filter(user=self.request.user).count()
        count_formulaire = self.queryset_formulaire.filter(user=self.request.user).count()
        count_facture = self.queryset_facture.filter(user=self.request.user).count()
        return Response({'count_beneficiaire': count_beneficiaire, 'count_formulaire': count_formulaire , 'count_facture': count_facture, 'count_payer': 0 })


class DernierFormulairesDetailAPIView(generics.ListAPIView):
    queryset = Formulaire.objects.all().order_by("-id")

    serializer_class = serializers.DernierFormulairesDetail
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""
        return self.queryset.filter(user=self.request.user)[:3]

class AllFormulairesUserListAPIView(generics.ListAPIView):
    queryset = Formulaire.objects.all().order_by("-id")

    serializer_class = serializers.AllFormulairesDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""

        return self.queryset.filter(user=self.request.user)



class AllFormulairesPayerListAPIView(generics.ListAPIView):
    queryset = Formulaire.objects.all().order_by("-id")

    serializer_class = serializers.AllFormulairesDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""

        return self.queryset.filter(user=self.request.user).exclude(facture__isnull=True)


class AllBeneficiairesUserListAPIView(generics.ListAPIView):
    queryset = Beneficiaire.objects.all().order_by("cin")

    serializer_class = serializers.AllBeneficiairesDetailSerializer
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)

    def get_queryset(self):
        """Return objects for the current authenticated user only"""

        return self.queryset.filter(user=self.request.user)


class DiplomeFiliereViewSet(generics.ListAPIView):
    """Manage DiplomeFiliere in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = DiplomeFiliere.objects.all()
    serializer_class = serializers.DiplomeFiliereSerializer

    def get_queryset(self):
        filiere_pk = self.kwargs.get("filiere_pk")
        filiere = get_object_or_404(Filiere, pk=filiere_pk)

        return self.queryset.filter(filiere=filiere).order_by('id')