# Generated by Django 3.0.7 on 2020-06-05 11:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0006_auto_20200605_1110'),
    ]

    operations = [
        migrations.AlterField(
            model_name='facture',
            name='commentaire',
            field=models.CharField(blank=True, max_length=300),
        ),
    ]
