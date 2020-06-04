
from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager, \
    PermissionsMixin
from django.conf import settings

class UserManager(BaseUserManager):

    def create_user(self, email, password=None, **extra_fields):
        """Creates and saves a new User"""
        if not email:
            raise ValueError('Users must have an email address')

        user = self.model(email=self.normalize_email(email), **extra_fields)
        user.set_password(password)
        user.save(using=self._db)

        return user

    def create_superuser(self, email, password):
        """Creates and saves a new super user"""
        user = self.create_user(email, password)
        user.is_staff = True
        user.is_superuser = True
        user.save(using=self._db)

        return user


class User(AbstractBaseUser, PermissionsMixin):
    """Custom user model that supports using email instead of username"""
    email = models.EmailField(max_length=255, unique=True)
    name = models.CharField(max_length=255)
    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)

    objects = UserManager()

    USERNAME_FIELD = 'email'

class Entreprise(models.Model):
    """Entreprise to be used for a recipe"""
    class Meta:
        db_table = 'entreprises'

    raison_sociale = models.CharField(max_length=300)

    def __str__(self):
        return self.raison_sociale

class Operateur(models.Model):

    class Meta:
        db_table = 'operateurs'
    operateur = models.CharField(max_length=300)

    def __str__(self):
        return f"{self.operateur}"


class Devise(models.Model):

    class Meta:
        db_table = 'devises'

    devise = models.CharField(max_length=300)
    def __str__(self):
        return f"{self.devise}"


class Secteur(models.Model):

    class Meta:
        db_table = 'secteurs'
    secteur = models.CharField(max_length=300)

    def __str__(self):
        return f"{self.secteur}"

class Filiere(models.Model):

    class Meta:
        db_table = 'filieres'
    filiere = models.CharField(max_length=300)
    secteur = models.ForeignKey(Secteur,
                              on_delete=models.CASCADE,
                              related_name="filieres")
    def __str__(self):
        return f"{self.filiere}"

class CreditAlloue(models.Model):
    class Meta:
        db_table = 'credit_alloues'
    fe = models.IntegerField()
    fc = models.IntegerField()
    filiere = models.ForeignKey(Filiere,
                                on_delete=models.DO_NOTHING,
                                related_name="credit_alloue")
    def __str__(self):
        return f"{self.filiere}"


class Formulaire(models.Model):
    class Meta:
        db_table = 'formulaires'
    code = models.CharField(max_length=300)
    theme = models.CharField(max_length=300)
    lieu = models.CharField(max_length=300)
    secteur = models.ForeignKey(Secteur, on_delete=models.DO_NOTHING)
    filiere = models.ForeignKey(Filiere, on_delete=models.DO_NOTHING)
    operateur = models.ForeignKey(Operateur, on_delete=models.DO_NOTHING)
    entreprise = models.ForeignKey(Entreprise, on_delete=models.DO_NOTHING)
    devise = models.ForeignKey(Devise, on_delete=models.DO_NOTHING)
    date_creation = models.DateTimeField(auto_now_add=True)
    date_depot = models.DateField()
    date_demarrage = models.DateField()
    date_achevement = models.DateField()
    montant = models.FloatField()
    competence = models.CharField(max_length=300, null=True)
    user = models.ForeignKey(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE
    )
    def __str__(self):
        return f"{self.code}"