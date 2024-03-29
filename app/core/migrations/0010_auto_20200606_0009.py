# Generated by Django 3.0.7 on 2020-06-06 00:09

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0009_auto_20200605_2212'),
    ]

    operations = [
        migrations.AlterField(
            model_name='beneficiaireformulaire',
            name='beneficiaire',
            field=models.ForeignKey(on_delete=django.db.models.deletion.DO_NOTHING, related_name='formulaires', to='core.Beneficiaire'),
        ),
        migrations.AlterField(
            model_name='beneficiaireformulaire',
            name='formulaire',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='beneficiaires', to='core.Formulaire'),
        ),
    ]
