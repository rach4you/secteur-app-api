from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import viewsets, mixins, status
from rest_framework.views import APIView
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from core.models import Employe, User
from employe import serializers


class EmployeViewSet(viewsets.ModelViewSet):
    """Manage recipes in the database"""
    authentication_classes = (TokenAuthentication,)
    permission_classes = (IsAuthenticated,)
    queryset = Employe.objects.all()
    serializer_class = serializers.EmployeSerializer

    def get_queryset(self):
        """Retrieve the recipes for the authenticated user"""
        return self.queryset.filter(user=self.request.user)

    def get_serializer_class(self):
        if self.action == 'retrieve':
            return serializers.EmployeDetailSerializer
        elif self.action == 'upload_image':
            return serializers.EmployeImageSerializer

        return self.serializer_class


    def perform_create(self, serializer):
        """Create a new employe"""
        serializer.save(user=self.request.user)

    @action(methods=['POST'], detail=True, url_path='upload-image')
    def upload_image(self, request, pk=None):
        """Upload an image to a employe"""
        employe = self.get_object()
        serializer = self.get_serializer(
            employe,
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()
            return Response(
                serializer.data,
                status=status.HTTP_200_OK
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
