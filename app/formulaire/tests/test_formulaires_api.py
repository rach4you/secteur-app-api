from django.contrib.auth import get_user_model
from django.test import TestCase
from django.urls import reverse

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Formulaire, Entreprise, Secteur, Filiere, Operateur, Devise, Module

from formulaire.serializers import FormulaireSerializer, FormulaireDetailSerializer

from datetime import datetime

FORMULAIRES_URL = reverse('formulaire:formulaire-list')

def detail_url(formulaire_id):
    """Return formulaire detail URL"""
    return reverse('formulaire:formulaire-detail', args=[formulaire_id])



def sample_secteur(secteur='Offshoring'):
    """Create and return a sample secteur"""
    return Secteur.objects.create(secteur=secteur)

def sample_filiere(secteur=sample_secteur(secteur='Offshoring'),filiere='Management'):
    """Create and return a sample secteur"""
    return Filiere.objects.create(secteur=secteur, filiere=filiere)

def sample_devise(devise='MAD'):
    """Create and return a sample secteur"""
    return Devise.objects.create(devise=devise)

def sample_entreprise(raison_sociale='Empressa'):
    """Create and return a sample secteur"""
    return Entreprise.objects.create(raison_sociale=raison_sociale)

def sample_operateur(operateur='operateur1'):
    """Create and return a sample secteur"""
    return Operateur.objects.create(operateur=operateur)

def sample_user(email='test@anapec.org', password='testpass'):
    """Create a sample user"""
    return get_user_model().objects.create_user(email, password)


def sample_formulaire(user, **params):
    """Create and return a sample formulaire"""
    defaults = {
            "code": "0001",
            "theme": "theme",
            "lieu": "casablanca",
            "date_depot": "2020-06-11",
            "date_demarrage": "2020-06-10",
            "date_achevement": "2020-06-10",
            "montant": 30000.0,
            "entreprise": sample_entreprise('Empressa'),
            "operateur": sample_operateur('operateur1'),
            "devise": sample_devise('MAD'),
            "secteur": sample_secteur('Offshoring'),
            "filiere": sample_filiere(secteur=sample_secteur(secteur='Offshoring'), filiere='Management'),

    }
    defaults.update(params)

    return Formulaire.objects.create(user=user, **defaults)

def sample_module(formulaire, module='Français', horaire=10):
    """Create and return a sample ingredient"""
    return Module.objects.create(formulaire=formulaire, module=module, horaire=horaire)

class PublicFormulaireApiTests(TestCase):
    """Test unauthenticated Formulaire API access"""

    def setUp(self):
        self.client = APIClient()

    def test_required_auth(self):
        """Test the authenticaiton is required"""
        res = self.client.get(FORMULAIRES_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)

class PrivateFormulaireApiTests(TestCase):
    """Test authenticated recipe API access"""

    def setUp(self):
        self.client = APIClient()
        self.user = get_user_model().objects.create_user(
            'test@anapec.org',
            'testpass'
        )
        self.client.force_authenticate(self.user)

    def test_retrieve_formulairs(self):
        """Test retrieving list of formulairs"""
        sample_formulaire(user=self.user)
        sample_formulaire(user=self.user)

        res = self.client.get(FORMULAIRES_URL)

        formulairs = Formulaire.objects.all().order_by('-id')
        serializer = FormulaireSerializer(formulairs, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_formulaires_limited_to_user(self):
        """Test retrieving formulaires for user"""
        user2 = get_user_model().objects.create_user(
            'other@anapec.org',
            'pass'
        )
        sample_formulaire(user=user2)
        sample_formulaire(user=self.user)

        res = self.client.get(FORMULAIRES_URL)

        formulaires = Formulaire.objects.filter(user=self.user)
        serializer = FormulaireSerializer(formulaires, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(len(res.data), 1)
        self.assertEqual(res.data, serializer.data)

    def test_view_formulaire_detail(self):
        """Test viewing a formulaire detail"""
        formulaire = sample_formulaire(user=self.user)
        formulaire.modules.add(sample_module(formulaire=formulaire))


        url = detail_url(formulaire.id)
        res = self.client.get(url)

        serializer = FormulaireDetailSerializer(formulaire)
        self.assertEqual(res.data, serializer.data)

    def test_create_basic_formulaire(self):
        """Test creating formulaire"""
        entreprise = sample_entreprise('Empressa')
        operateur = sample_operateur('operateur1')
        devise = sample_devise('MAD')
        secteur = sample_secteur('Offshoring')
        filiere = sample_filiere(secteur=sample_secteur(secteur='Offshoring'), filiere='Management')
        payload = {
            "code": "0001",
            "theme": "theme",
            "lieu": "casablanca",
            "date_depot": "2020-06-10",
            "date_demarrage": "2020-06-10",
            "date_achevement": "2020-06-10",
            "montant": 30000.0,
            "entreprise": entreprise.id,
            "operateur": operateur.id,
            "devise": devise.id,
            "secteur": secteur.id,
            "filiere": filiere.id,
        }
        res = self.client.post(FORMULAIRES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_201_CREATED)
        formulaire = Formulaire.objects.get(id=res.data['id'])

