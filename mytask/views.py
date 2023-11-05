from django.shortcuts import render
from rest_framework import viewsets
from .serializers import MytaskSerializer, ProfileSerializer
from .models import Mytask, Profile

# Create your views here.
class MytaskView(viewsets.ModelViewSet):
  serializer_class = MytaskSerializer
  queryset = Mytask.objects.all()

class ProfileView(viewsets.ModelViewSet):
  serializer_class = ProfileSerializer
  queryset = Profile.objects.all()