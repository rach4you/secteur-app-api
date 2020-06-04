from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Filiere, Secteur

from formulaire.serializers import FiliereSerializer


FILIERES_URL = reverse('formulaire:filiere-list')

def sample_secteur(secteur='Offshoring'):
    """Create and return a sample secteur"""
    return Secteur.objects.create(secteur=secteur)

class PublicFilieresApiTests(TestCase):
    """Test the publicly available Filiere API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test that login required for retrieving Filiere"""
        res = self.client.get(FILIERES_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateFilieresApiTests(TestCase):
    """Test the authorized user operateurs API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            'test@anapec.org',
            'password'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_filieres(self):
        """Test retrieving Filiere"""
        Filiere.objects.create(
            secteur=sample_secteur(secteur='Offshoring'),
            filiere='Management')

        Filiere.objects.create(
            secteur=sample_secteur(secteur='Offshoring'),
            filiere='IT')

        res = self.client.get(FILIERES_URL)

        filieres = Filiere.objects.all().order_by('-id')
        serializer = FiliereSerializer(filieres, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_filiere_successful(self):
        """Test creating a new filiere"""
        secteur = sample_secteur(secteur='Offshoring')
        payload = {'filiere': 'Management',
                   'secteur': secteur.id}
        self.client.post(FILIERES_URL, payload)

        exists = Filiere.objects.filter(
            secteur=payload['secteur'],
            filiere=payload['filiere'],
        ).exists()
        self.assertTrue(exists)

    def test_create_filiere_invalid(self):
        """Test creating a new filiere with invalid payload"""
        secteur = sample_secteur(secteur='Offshoring')
        payload = {'filiere': '',
                   'secteur': secteur.id}
        res = self.client.post(FILIERES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)