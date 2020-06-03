from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Operateur

from formulaire.serializers import OperateurSerializer


OPERATEURS_URL = reverse('formulaire:operateur-list')


class PublicOperateursApiTests(TestCase):
    """Test the publicly available operateurs API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test that login required for retrieving operateurs"""
        res = self.client.get(OPERATEURS_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateOperateursApiTests(TestCase):
    """Test the authorized user operateurs API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            'test@anapec.org',
            'password'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_operateurs(self):
        """Test retrieving operateurs"""
        Operateur.objects.create(operateur='Empressa')
        Operateur.objects.create(operateur='Renault')

        res = self.client.get(OPERATEURS_URL)

        operateurs = Operateur.objects.all().order_by('-operateur')
        serializer = OperateurSerializer(operateurs, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_operateur_successful(self):
        """Test creating a new operateurs"""
        payload = {'operateur': 'Operateur1'}
        self.client.post(OPERATEURS_URL, payload)

        exists = Operateur.objects.filter(
            operateur=payload['operateur']
        ).exists()
        self.assertTrue(exists)

    def test_create_operateur_invalid(self):
        """Test creating a new operateur with invalid payload"""
        payload = {'operateur': ''}
        res = self.client.post(OPERATEURS_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)