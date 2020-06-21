from django.contrib import admin
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.utils.translation import gettext as _
from core import models


class UserAdmin(BaseUserAdmin):
    ordering = ['id']
    list_display = ['email', 'name']
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        (_('Personal Info'), {'fields': ('name',)}),
        (
            _('Permissions'),
            {
                'fields': (
                    'is_active',
                    'is_staff',
                    'is_superuser',
                )
            }
        ),
        (_('Important dates'), {'fields': ('last_login',)}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2')
        }),
    )

class BeneficiaireAdmin(admin.ModelAdmin):
    ordering = ['cin']
    list_display_links = ('id', 'cin')
    list_editable = ('ancien',)
    search_fields = ('cin', 'nom')
    list_display = ['id', 'cin', 'nom', 'prenom', 'tel', 'email', 'cnss', 'ancien', 'date_creation']
    list_per_page = 25

class FormulaireAdmin(admin.ModelAdmin):
    ordering = ['code']
    list_display_links = ('id', 'code')
    list_filter = ('secteur',)

    search_fields = ('code', 'entreprise__raison_sociale')
    list_display = ['id', 'code', 'entreprise', 'secteur', 'filiere', 'theme', 'lieu', 'date_depot', 'date_demarrage', 'date_achevement', 'date_creation',
            'montant', 'competence', 'operateur', 'devise']
    list_per_page = 25

class BeneficiaireFormulaireAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display_links = ('id', 'formulaire')
    list_editable = ('beneficier', 'non_conforme')
    search_fields = ('formulaire__code','beneficiaire__cin')
    list_display = ['id','formulaire','beneficiaire','diplome','profil_bareme','type','contrat','beneficier','non_conforme','engagement','consommation','date_dembauche']
    list_per_page = 25

class FactureAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display_links = ('id', 'num_facture')
    search_fields = ('num_facture', 'formulaire__code')
    list_display = ['id', 'num_facture', 'formulaire', 'date_creation', 'mttc', 'taux', 'montant_dh', 'commentaire','date_facture']
    list_per_page = 25

class FiliereAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display_links = ('id', 'secteur')
    list_filter = ('secteur',)

    list_display = ['id', 'secteur', 'filiere']
    list_per_page = 25

class CreditAlloueAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display_links = ('id', 'filiere')
    list_display = ['id', 'filiere', 'fe', 'fc']
    list_per_page = 25

class DiplomeFiliereAdmin(admin.ModelAdmin):
    ordering = ['id']
    list_display_links = ('id', 'filiere')
    list_filter = ('filiere',)
    list_display = ['id', 'diplome', 'filiere']
    list_per_page = 25

admin.site.register(models.User, UserAdmin)
admin.site.register(models.Formulaire, FormulaireAdmin)
admin.site.register(models.Entreprise)
admin.site.register(models.Operateur)
admin.site.register(models.Secteur)
admin.site.register(models.Devise)
admin.site.register(models.Filiere, FiliereAdmin)
admin.site.register(models.CreditAlloue, CreditAlloueAdmin)
admin.site.register(models.Module)
admin.site.register(models.Beneficiaire, BeneficiaireAdmin)
admin.site.register(models.BeneficiaireFormulaire, BeneficiaireFormulaireAdmin)
admin.site.register(models.Facture, FactureAdmin)
admin.site.register(models.Employe)
admin.site.register(models.DiplomeFiliere, DiplomeFiliereAdmin)