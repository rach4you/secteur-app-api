from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Facture',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('num_facture', models.CharField(max_length=100)),
                ('commentaire', models.CharField(max_length=300)),
                ('mttc', models.FloatField()),
                ('montant_dh', models.FloatField()),
                ('date_creation', models.DateTimeField(auto_now_add=True)),
                ('formulaire', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='core.Formulaire')),
            ],
            options={
                'db_table': 'factures',
            },
        ),
    ]