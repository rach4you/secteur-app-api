from rest_framework import serializers

from core.models import User, Employe


class EmployeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employe
        fields = ('id', 'nom_employe', 'prenom_employe', 'tel', 'agence')
        read_only_fields = ('id',)



class EmployeImageSerializer(serializers.ModelSerializer):
    """Serializer for uploading images to recipe"""

    class Meta:
        model = Employe
        fields = ('id', 'image')
        read_only_fields = ('id',)


class EmployeDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employe
        fields = ('id', 'nom_employe', 'prenom_employe', 'tel', 'image', 'agence')
        read_only_fields = ('id', )