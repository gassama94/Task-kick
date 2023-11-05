from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.views import APIView
from rest_framework.response import Response
from .serializers import MytaskSerializer, ProfileSerializer
from .models import Mytask, Profile

# Create your views here.
class MytaskView(viewsets.ModelViewSet):
  serializer_class = MytaskSerializer
  queryset = Mytask.objects.all()

class ProfileView(viewsets.ModelViewSet):
  serializer_class = ProfileSerializer
  queryset = Profile.objects.all()
  
class ProfileList(APIView):
  def get(self, request):
    profiles = Profile.objects.all()
    return Response(profiles)
    