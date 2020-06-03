from django.contrib.auth import get_user_model
from django.urls import reverse
from django.test import TestCase

from rest_framework import status
from rest_framework.test import APIClient

from core.models import Devise

from formulaire.serializers import DeviseSerializer


DEVISES_URL = reverse('formulaire:devise-list')


class PublicDevisesApiTests(TestCase):
    """Test the publicly available Devises API"""

    def setUp(self):
        self.client = APIClient()

    def test_login_required(self):
        """Test that login required for retrieving Devise"""
        res = self.client.get(DEVISES_URL)

        self.assertEqual(res.status_code, status.HTTP_401_UNAUTHORIZED)


class PrivateDevisesApiTests(TestCase):
    """Test the authorized user Devise API"""

    def setUp(self):
        self.user = get_user_model().objects.create_user(
            'test@anapec.org',
            'password'
        )
        self.client = APIClient()
        self.client.force_authenticate(self.user)

    def test_retrieve_devises(self):
        """Test retrieving devises"""
        Devise.objects.create(devise='devise1')
        Devise.objects.create(devise='devise2')

        res = self.client.get(DEVISES_URL)

        devises = Devise.objects.all().order_by('-devise')
        serializer = DeviseSerializer(devises, many=True)
        self.assertEqual(res.status_code, status.HTTP_200_OK)
        self.assertEqual(res.data, serializer.data)

    def test_create_devise_successful(self):
        """Test creating a new Devise"""
        payload = {'devise': 'devise1'}
        self.client.post(DEVISES_URL, payload)

        exists = Devise.objects.filter(
            devise=payload['devise']
        ).exists()
        self.assertTrue(exists)

    def test_create_devise_invalid(self):
        """Test creating a new devise with invalid payload"""
        payload = {'devise': ''}
        res = self.client.post(DEVISES_URL, payload)

        self.assertEqual(res.status_code, status.HTTP_400_BAD_REQUEST)