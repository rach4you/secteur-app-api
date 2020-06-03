from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Entreprise

from formulaire.serializers import EntrepriseSerializer


ENTREPRISES_URL = reverse('formulaire:entreprise-list')


class PublicEntreprisesApiTests(TestCase):
    """Test the publicly available Entreprises API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test that login required for retrieving tags"""
        res = self.client.get(ENTREPRISES_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateTagsApiTests(TestCase):
    """Test the authorized user tags API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            'test@anapec.org',
            'password'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_entreprises(self):
        """Test retrieving entreprises"""
        Entreprise.objects.create(raison_sociale='Empressa')
        Entreprise.objects.create(raison_sociale='Renault')

        res = self.client.get(ENTREPRISES_URL)

        entreprises = Entreprise.objects.all().order_by('-raison_sociale')
        serializer = EntrepriseSerializer(entreprises, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

