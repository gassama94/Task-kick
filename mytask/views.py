from django.shortcuts import render
from rest_framework import viewsets
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MytaskSerializer, ProfileSerializer
from .models import Mytask, Profile
from tasking.permissions import IsOwnerOrReadOnly

# Create your views here.
class MytaskView(viewsets.ModelViewSet):
  serializer_class = MytaskSerializer
  queryset = Mytask.objects.all()

class ProfileView(viewsets.ModelViewSet):
  serializer_class = ProfileSerializer
  queryset = Profile.objects.all()
  permission_classes = [IsOwnerOrReadOnly]
  
class ProfileList(APIView):
  def get(self, request):
    profiles = Profile.objects.all()
    return Response(profiles)

class ProfileDetail(APIView):
    serializer_class = ProfileSerializer
    permission_classes = [IsOwnerOrReadOnly]
    def get_object(self, pk):
        try:
            profile = Profile.objects.get(pk=pk)
            self.check_object_permissions(self.request, profile)
            return profile
        except Profile.DoesNotExist:
            raise Http404

    def get(self, request, pk):
        profile = self.get_object(pk)
        serializer = ProfileSerializer(
          profile, context={'request': request}
        )
        return Response(serializer.data)

    def put(self, request, pk):
        profile = self.get_object(pk)
        serializer = ProfileSerializer(
          profile, data=request.data, context={'request': request} )
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    