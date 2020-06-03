from django.test import TestCase
from django.contrib.auth import get_user_model
from core import models


def sample_user(email='test@anapec.org', password='testpass'):
    """Create a sample user"""
    return get_user_model().objects.create_user(email, password)


class ModelTests(TestCase):

    def test_create_user_with_email_successful(self):
        """Test creating a new user with an email is successful"""
        email = 'test@anapec.org'
        password = 'Password123'
        user = get_user_model().objects.create_user(
			email=email,
			password=password
		)

        self.assertEqual(user.email, email)
        self.assertTrue(user.check_password(password))

    def test_new_user_email_normalized(self):
        """Test the email for a new user is normalized"""
        email = 'test@ANAPEC.org'
        user = get_user_model().objects.create_user(email, 'test123')

        self.assertEqual(user.email, email.lower())

    def test_new_user_invalid_email(self):
        """Test creating user with no email raises error"""
        with self.assertRaises(ValueError):
            get_user_model().objects.create_user(None, 'test123')

    def test_new_superuser(self):
        """Test creating a new superuser"""
        user = get_user_model().objects.create_superuser(
            'test@anapec.org',
            'test123'
        )

        self.assertTrue(user.is_superuser)
        self.assertTrue(user.is_staff)

    def test_entreprise_str(self):
        """Test the entreprise string representation"""
        entreprise = models.Entreprise.objects.create(
            raison_sociale='Empressa'
        )

        self.assertEqual(str(entreprise), entreprise.raison_sociale)

    def test_operateur_str(self):
        """Test the operateur string representation"""
        operateur = models.Operateur.objects.create(
            operateur='Operateur1'
        )

        self.assertEqual(str(operateur), operateur.operateur)

    def test_secteur_str(self):
        """Test the secteur string representation"""
        secteur = models.Secteur.objects.create(
            secteur='Secteur1'
        )

        self.assertEqual(str(secteur), secteur.secteur)

    def test_devise_str(self):
        """Test the devise string representation"""
        devise = models.Devise.objects.create(
            devise='MAD'
        )

        self.assertEqual(str(devise), devise.devise)
