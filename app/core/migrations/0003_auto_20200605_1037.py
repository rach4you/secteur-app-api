from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('core', '0002_facture'),
    ]

    operations = [
        migrations.AlterModelTable(
            name='facture',
            table='facturations',
        ),
    ]