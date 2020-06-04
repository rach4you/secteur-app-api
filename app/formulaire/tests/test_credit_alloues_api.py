from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Filiere, Secteur, CreditAlloue

from formulaire.serializers import CreditAlloueSerializer


CREDITS_URL = reverse('formulaire:creditalloue-list')

def sample_secteur(secteur='Offshoring'):
    """Create and return a sample secteur"""
    return Secteur.objects.create(secteur=secteur)

def sample_filiere(secteur=sample_secteur(secteur='Offshoring'),filiere='Management'):
    """Create and return a sample secteur"""
    return Filiere.objects.create(secteur=secteur,filiere=filiere)

class PublicFilieresApiTests(TestCase):
    """Test the publicly available Filiere API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test that login required for retrieving Filiere"""
        res = self.client.get(CREDITS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateCreditAllouesApiTests(TestCase):
    """Test the authorized user CreditAlloue API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            'test@anapec.org',
            'password'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_filieres(self):
        """Test retrieving CreditAlloue"""
        CreditAlloue.objects.create(
            filiere=sample_filiere(secteur=sample_secteur(secteur='Offshoring'), filiere='Management'),
            fe=30000,fc=30000)

        CreditAlloue.objects.create(
            filiere=sample_filiere(secteur=sample_secteur(secteur='Offshoring'), filiere='IT'),
            fe=35000, fc=30000)

        res = self.client.get(CREDITS_URL)

        credit_alloues = CreditAlloue.objects.all().order_by('-id')
        serializer = CreditAlloueSerializer(credit_alloues, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_credit_alloue_successful(self):
        """Test creating a new credit_alloue"""
        filiere = sample_filiere(secteur=sample_secteur(secteur='Offshoring'), filiere='Management')
        payload = {'fe': 30000,
                   'fc': 30000,
                   'filiere': filiere.id}
        self.client.post(CREDITS_URL, payload)

        exists = CreditAlloue.objects.filter(
            filiere=payload['filiere'],
        ).exists()
        self.assertTrue(exists)

    def test_create_credit_alloue_invalid(self):
        """Test creating a new credit_alloue with invalid payload"""

        payload = {'fe': '',
                   'fc': '',
                   'filiere': ''}
        res = self.client.post(CREDITS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)