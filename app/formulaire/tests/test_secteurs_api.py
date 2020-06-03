from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Secteur

from formulaire.serializers import SecteurSerializer


SECTEURS_URL = reverse('formulaire:secteur-list')


class PublicSecteursApiTests(TestCase):
    """Test the publicly available Secteur API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test that login required for retrieving Secteur"""
        res = self.client.get(SECTEURS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateSecteursApiTests(TestCase):
    """Test the authorized user Secteurs API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            'test@anapec.org',
            'password'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_secteurs(self):
        """Test retrieving secteurs"""
        Secteur.objects.create(secteur='secteur1')
        Secteur.objects.create(secteur='secteur2')

        res = self.client.get(SECTEURS_URL)

        secteurs = Secteur.objects.all().order_by('-secteur')
        serializer = SecteurSerializer(secteurs, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_secteur_successful(self):
        """Test creating a new Secteur"""
        payload = {'secteur': 'secteur1'}
        self.client.post(SECTEURS_URL, payload)

        exists = Secteur.objects.filter(
            secteur=payload['secteur']
        ).exists()
        self.assertTrue(exists)

    def test_create_secteur_invalid(self):
        """Test creating a new Secteur with invalid payload"""
        payload = {'secteur': ''}
        res = self.client.post(SECTEURS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)